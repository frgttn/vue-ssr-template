import {
  createRouter as _createRouter,
  createMemoryHistory,
  createWebHistory,
  RouteRecordRaw,
} from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: () => import("./pages/Home.vue"),
    meta: {
      pageName: "Home",
      title: "Amazing Home",
      description: "Awesome Home",
      metaTags: [
        {
          name: "title",
          content: "Amazing Home",
        },
        {
          name: "og:title",
          content: "Amazing Home",
        },
        {
          name: "description",
          content: "Awesome Home",
        },
        {
          property: "og:description",
          content: "Awesome Home",
        },
      ],
    },
  },
  {
    path: "/test",
    name: "test",
    component: () => import("./pages/Test.vue"),

    meta: {
      pageName: "Test",
      title: "Testing Page",
      description: "A page for testing purposes",
      metaTags: [
        {
          name: "title",
          content: "Amazing Test",
        },
        {
          name: "og:title",
          content: "Amazing Test",
        },
        {
          name: "description",
          content: "Awesome Test",
        },
        {
          property: "og:description",
          content: "Awesome Test",
        },
      ],
    },
  },
  {
    path: "/about",
    name: "about",
    component: () => import("./pages/About.vue"),
  },
];

export function createRouter() {
  const router = _createRouter({
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes,
  });

  return router;
}
