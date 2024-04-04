import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
// @ts-ignore
import { Course } from "@core/src/Interfaces/Course.ts";
import core from "../../frontend-core/src/Core";

interface Filters {
  query: string;
  name: string[];
  blocks: string[];
  level: string[];
  stars: "default" | "more" | "less";
}

export const useCourseStore = defineStore("courseStore", () => {
  const allCourses = ref<Course[]>([]);
  const currentCourse = ref<Course>({});
  const filters = reactive<Filters>({
    query: "",
    name: [],
    blocks: [],
    level: [],
    stars: "default",
  });
  const courses = computed(() => {
    return allCourses.value
      .filter((course: Course) => {
        let isQueryValid = false;

        if (filters.query?.length) {
          if (course.description.short.toLowerCase().includes(filters.query.toLowerCase())) {
            isQueryValid = true;
          }
          if (course.description.full.toLowerCase().includes(filters.query.toLowerCase())) {
            isQueryValid = true;
          }
          if (course.title.toLowerCase().includes(filters.query.toLowerCase())) {
            isQueryValid = true;
          }
        } else {
          isQueryValid = true;
        }

        let isNameValid = false;
        if (filters.name.length) {
          for (const query of filters.name) {
            if (course.description.type.includes(query)) {
              isNameValid = true;
            }
          }
        } else {
          isNameValid = true;
        }
        let isLevelValid = false;
        if (filters.level.length) {
          for (const level of filters.level) {
            if (course.description.level == level) {
              isLevelValid = true;
            }
          }
        } else {
          isLevelValid = true;
        }
        let isBlockValid = false;
        if (filters.blocks.length) {
          for (const len of filters.blocks) {
            if (len == "3" && course.description.blocks_count < 3) {
              isBlockValid = true;
            }

            if (
              len == "5" &&
              course.description.blocks_count > 3 &&
              course.description.blocks_count <= 5
            ) {
              isBlockValid = true;
            }

            if (
              len == "10" &&
              course.description.blocks_count > 5 &&
              course.description.blocks_count <= 10
            ) {
              isBlockValid = true;
            }

            if (len == "10+" && course.description.blocks_count > 10) {
              isBlockValid = true;
            }
          }
        } else {
          isBlockValid = true;
        }
        
        return isBlockValid && isLevelValid && isNameValid && isQueryValid;
      })
      .sort((a: Course, b: Course) => {
        if (filters.stars == "default") return 0;

        if (filters.stars == "less") {
          return a.rate.stars > b.rate.stars ? 1 : -1;
        }
        if (filters.stars == "more") {
          return a.rate.stars > b.rate.stars ? -1 : 1;
        }
        return 0;
      });
  });

  async function getAllCourses() {
    const response = await core.api.course.getCourses();
    if (response.status) {
      allCourses.value = response.data.courses;
    }
    // получить курсы с апи
  }

  function resetFilters() {
    filters.query = '';
    filters.name = [];
    filters.blocks = [];
    filters.level = [];
    filters.stars = "default";
  }

  // @ts-ignore
  function setStars(stars: number) {}

  // @ts-ignore
  function getCourseId(id: string, save: boolean): Course {
    const course = allCourses.value.find((course) => {
      return course.id == id;
    });
    if (save) {
      currentCourse.value = course;
      return;
    }
    return course;
  }

  return {
    allCourses,
    courses,
    currentCourse,
    filters,

    getAllCourses,
    resetFilters,
    setStars,
    getCourseId,
  };
});
