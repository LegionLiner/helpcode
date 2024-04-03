import { beforeAll, beforeEach } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import {
  VueRouterMock,
  createRouterMock,
  injectRouterMock,
} from "vue-router-mock";
import { config } from "@vue/test-utils";

beforeAll(() => {
  setActivePinia(createPinia());
});

const router = createRouterMock();
beforeEach(() => {
  router.reset(); // reset the router state
  injectRouterMock(router);
});

config.plugins.VueWrapper.install(VueRouterMock);
