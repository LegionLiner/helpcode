<template>
    <div class="courses">
        <Course v-for="course in courses.slice(0, 3)" :course="course" @click="reDirect(course.id)"></Course>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import Course from './Course.vue';

const router = useRouter()


const reDirect = (id)=>{

    router.push(`/course/${id}`)
}

const props = defineProps({
    courses: Array
});
</script>

<style lang="scss" scoped>
.courses {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 40px;
}
</style>