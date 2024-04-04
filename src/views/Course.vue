<template>
    <Header v-if="userStore.authorized"></Header>
    <UnregisteredHeader v-else @login="handleLogin" @register="handleRegister"></UnregisteredHeader>
    <Course :course="CourseStore.currentCourse"></Course>
</template>

<script setup>
import Course from '../components/CoursePage/Course.vue'
import Header from '../components/UI/Header.vue';
import UnregisteredHeader from '../components/UI/UnregisteredHeader.vue';
import { useUserStore } from '../stores/UserStore.ts';
import { useCourseStore } from '../stores/CoursesStore'


const userStore = useUserStore();
const CourseStore = useCourseStore();
const router = useRouter();
CourseStore.getCourseId(router.currentRoute.value.params.id, true);
</script>