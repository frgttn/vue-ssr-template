import { createApp } from "./main";
import { renderToString } from "vue/server-renderer";

export async function render(url: string) {
  const { app, store, router } = createApp();

  await router.push(url);
  await router.isReady();

  const ctx = {} as any;
  const html = await renderToString(app, ctx);
  const initialState = store.state.value;

  // Get metadata from current route
  const meta = router.currentRoute.value.meta;

  return [html, initialState, meta];
}
