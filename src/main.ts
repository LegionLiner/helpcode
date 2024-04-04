import { createApp } from 'vue'
import './style.css';
import router from './router';
import App from './App.vue';
import { createPinia } from 'pinia';
import { useUserStore } from './stores/UserStore';
import { useCourseStore } from './stores/CoursesStore';
import core from '../frontend-core/src/Core'
import { useFeedbackStore } from './stores/FeedbackStore';

window.core = core;

createApp(App).use(createPinia()).use(router).mount('#app');

const userStore = useUserStore();
userStore.onloaded();

const storeCourse = useCourseStore();
storeCourse.getAllCourses();

const feedbackStore = useFeedbackStore();
feedbackStore.onloaded();