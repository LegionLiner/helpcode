<template>
    <div class="wrapper">
        <div class="block_header">
            <div class="title">
                <img src="../../assets/line.svg">
                Популярные курсы
            </div>
            <div class="description">
                Мы предоставляем ряды бесплатных категорий, которые помогут вам выбрать курсы, соответствующие вашим
                знаниям. Списки курсов помогут вам начать с базовых основ и помогут в продвижении.
            </div>
        </div>
        <div class="block_courses">
            <SelectCourse @changeSelected="changeCourses"></SelectCourse>
            <CoursesBlock :type="selectedCourseType" :courses="storeCourse.courses"></CoursesBlock>
        </div>
        <div class="more">
            <Button :fill="false" @click="router.push('/courses?page=1')">Больше курсов</Button>
        </div>
    </div>
</template>

<script setup>
import SelectCourse from './SecondBlock/SelectCourse.vue';
import CoursesBlock from './SecondBlock/CoursesBlock.vue';
import Button from '../../../frontend-core/src/components/Button.vue';
import { useCourseStore } from '../../stores/CoursesStore';

const router = useRouter();
const storeCourse = useCourseStore();
storeCourse.resetFilters();

const selectedCourseType = ref('all');

function changeCourses(item) {
    selectedCourseType.value = item;
}

watch(() => selectedCourseType.value, () => {
    selectedCourseType.value !== 'all' ? storeCourse.filters.name = [selectedCourseType.value] : storeCourse.filters.name = [];
})
</script>

<style lang="scss" scoped>
.wrapper {
    padding: 30px 124px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 64px;

    .block_header {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        .title {
            display: flex;
            align-items: center;
            gap: 6px;

            font-size: 24px;
            font-weight: bold;
            line-height: 150%;
            color: #32BCA3;
        }

        .description {
            max-width: 550px;
            font-size: 18px;
            line-height: 135%;
            color: #7C7C7C;
        }
    }

    .block_courses {
        max-width: 1208px;
        display: flex;
        flex-direction: column;
        gap: 32px;
    }
}
</style>