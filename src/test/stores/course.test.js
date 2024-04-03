import { useCourseStore } from "../../stores/CoursesStore";
import { expect, it } from "vitest";

it('Проверка получения курсов', async () => {
    const store = useCourseStore(createPinia());

    store.getAllCourses();

    expect(store.allCourses).not.toBe([]);
});

it('Проверка фильтра курсов 1', async () => {
    const store = useCourseStore(createPinia());

    await store.getAllCourses();
    store.filters.query = 'java';

    expect(store.allCourses).not.toBe([]);
    expect(store.courses.length).toBe(2);
});

it('Проверка фильтра курсов 2', async () => {
    const store = useCourseStore(createPinia());

    await store.getAllCourses();
    store.filters.name = ['front'];

    expect(store.allCourses).not.toBe([]);
    expect(store.courses.length).toBe(4);

    store.resetFilters();

    expect(store.courses.length).toBe(store.allCourses.length);
});

it('Проверка выбора курса', async () => {
    const store = useCourseStore(createPinia());

    await store.getAllCourses();
    store.getCourseId(1, true);

    expect(store.allCourses).not.toBe([]);
    expect(store.currentCourse).toEqual(store.allCourses[0]);
});