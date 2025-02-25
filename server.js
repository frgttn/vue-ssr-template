// @ts-check
import fs from "fs";
import path from "path";
import express from "express";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function createServer(
  root = process.cwd(),
  isProd = process.env.NODE_ENV === "production"
) {
  const resolve = (p) => path.resolve(__dirname, p);

  const indexProd = isProd
    ? fs.readFileSync(resolve("dist/client/index.html"), "utf-8")
    : "";

  const manifest = isProd
    ? // @ts-ignore
      JSON.parse(
        fs.readFileSync(
          resolve("./dist/client/.vite/ssr-manifest.json"),
          "utf-8"
        )
      )
    : {};

  const app = express();

  /**
   * @type {import('vite').ViteDevServer}
   */
  let vite;
  if (!isProd) {
    const { createServer: createViteServer } = await import("vite");
    vite = await createViteServer({
      root,
      logLevel: "info",
      server: {
        middlewareMode: true,
        watch: {
          // During tests we edit the files too fast and sometimes chokidar
          // misses change events, so enforce polling for consistency
          usePolling: true,
          interval: 100,
        },
      },
    });
    // use vite's connect instance as middleware
    app.use(vite.middlewares);
  } else {
    const compression = (await import("compression")).default;
    const serveStatic = (await import("serve-static")).default;

    app.use(compression());
    app.use(
      serveStatic(resolve("dist/client"), {
        index: false,
      })
    );
  }

  app.use("*", async (req, res) => {
    try {
      const url = req.originalUrl;

      let template, render;
      if (!isProd) {
        // always read fresh template in dev
        template = fs.readFileSync(resolve("index.html"), "utf-8");
        template = await vite.transformIndexHtml(url, template);
        const { render: ssrRender } = await vite.ssrLoadModule(
          "/src/entry-server.ts"
        );
        render = ssrRender;
      } else {
        template = indexProd;
        const { render: ssrRender } = await import(
          "./dist/server/entry-server.js"
        );
        render = ssrRender;
      }

      const [appHtml, initialState, meta] = await render(url);

      const renderState = `<script>window.__INITIAL_STATE__=${JSON.stringify(
        initialState
      )}</script>`;

      // Generate meta tags
      const metaTags = meta?.metaTags
        ? meta.metaTags
            .map(
              (tag) =>
                `<meta ${Object.entries(tag)
                  .map(([key, value]) => `${key}="${value}"`)
                  .join(" ")
                  .concat("</meta>")}`
            )
            .join("\n")
        : "";

      const title = meta?.title ? `<title>${meta.title}</title>` : "";

      const html = template
        .replace(`<!--head-tags-->`, `${title}\n${metaTags}`)
        .replace(`<!-- head-end -->`, `${renderState}`)
        .replace(`<!--app-html-->`, appHtml);

      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e) {
      vite && vite.ssrFixStacktrace(e);
      console.info("app error", e);
      res.status(500).end(e.stack || e);
    }
  });

  return { app };
}

const { app } = await createServer();
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.info(`App run on http://localhost:${port} Cheer!`);
});
