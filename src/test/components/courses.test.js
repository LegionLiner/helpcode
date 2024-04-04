import { mount } from "@vue/test-utils";
import { expect, it } from "vitest";
import Courses from '../../views/Courses.vue';
import { useUserStore } from "../../stores/UserStore";
import { useCourseStore } from "../../stores/CoursesStore";
import { createTestingPinia } from '@pinia/testing';

it("Проверка отсутствия курсов", async () => {
    const store = useUserStore(createPinia());
    const wrapper = mount(Courses, {
        global: {
            plugins: [store]
        }
    });

    // console.log(wrapper.html(), 'Courses');//Упс! Курсов по вашему запросу не найдено.
    // // await wrapper.find('.buttons .register').trigger('click');
    // // await flushPromises();

    expect(wrapper.text()).toContain('Упс! Курсов по вашему запросу не найдено.');
});

it("Проверка наличия курсов", async () => {
    const store = useCourseStore();
    await store.getAllCourses();

    const wrapper = mount(Courses, {
        global: {
            plugins: [createTestingPinia({
                initialState: {
                    courseStore: {
                        allCourses: store.allCourses,
                    }
                },
            })]
        }
    });

    expect(wrapper.text()).toContain(`Найдено ${store.allCourses.length} курсов`);
});

// it("Проверка фильтров курсов", async () => {
//     const store = useCourseStore();
//     await store.getAllCourses();

//     const wrapper = mount(Courses, {
//         global: {
//             plugins: [createTestingPinia({
//                 initialState: {
//                     courseStore: {
//                         allCourses: store.allCourses,
//                     }
//                 },
//             })]
//         }
//     });

//     expect(wrapper.text()).toContain(`Найдено ${store.allCourses.length} курсов`);

//     wrapper.find('.checkbox').trigger('click');
//     console.log( wrapper.get('.checkbox').html());

//     expect(wrapper.text()).toContain(`Найдено 15 курсов`);
// });