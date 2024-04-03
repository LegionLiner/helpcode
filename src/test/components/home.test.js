import { mount, flushPromises } from "@vue/test-utils";
import { createRouter, createWebHistory } from "vue-router";
import { expect, it } from "vitest";
import { routes } from '../../router/index.ts'
import Home from '../../views/Home.vue';
import { useUserStore } from "../../stores/UserStore";

const router = createRouter({
    history: createWebHistory(),
    routes
});

it("Проверка регистрации", async () => {
    router.push('/');
    await router.isReady();
    const store = useUserStore(createPinia());
    const wrapper = mount(Home, {
        global: {
            plugins: [store, router]
        }
    });
    await wrapper.find('.buttons .register').trigger('click');
    await flushPromises();
    
    expect(router.currentRoute.value.path).toBe('/');
})