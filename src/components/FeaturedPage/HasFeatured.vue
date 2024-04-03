<template>
    <div class="wrapper">
        <div class="text">
            <p class="hero">Избранные курсы</p>
        </div>
        <div class="courses">
            <div class="cours" v-for="course in coursesFeatured">
                <div class="description">
                    <img src="../../assets/ImageCours.png">
                    <div class="descriptionText">
                        <p class="title" @click="$router.push(`/course/${course.id}`)">{{ course.title }}</p>
                        <p class="titleHero">Прогресс курса</p>
                    </div>
                </div>
                <div class="Progress">
                    <Button :fill='false' @click="removeFromFeatured(course.id)">Удалить из избранного</Button>
                    <div class="progress-wrapper">
                        <div class="progress-value" :style="{ 'width': course.progress + '%' }"></div>
                    </div>
                    <input v-if="isChange" type="text" class="change-progress"
                        @keyup.enter="saveProgress($event, course.id)">
                    <img v-else src="../../assets/Pencil.svg" class="change" @click="isChange = true">
                    <p class="progressValue">{{ course.progress }}%</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Button from '../../../frontend-core/src/components/Button.vue';
import { useUserStore } from '../../stores/UserStore';
import { useCourseStore } from '../../stores/CoursesStore';

const userStore = useUserStore();
const courseStore = useCourseStore();

const coursesFeatured = computed(() => {
    return userStore.user.featured.map((featured) => {
        return {
            ...courseStore.getCourseId(featured.id, false),
            progress: featured.progress
        }
    });
});
const isChange = ref(false);

function removeFromFeatured(id) {
    userStore.removeFeatured(id);
}
function saveProgress(event, id) {
    isChange.value = false;
    let value = event.target.value > 100 ? 100 : event.target.value;
    value = event.target.value < 0 ? 0 : event.target.value;
    userStore.changeProgress(id, +value);
}
</script>

<style scoped>
.text {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 30px;
}

.hero {
    color: #3E3E3E;
    font-size: 40px;
}

.courses {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 30px;
}

.cours {
    width: 1275px;
    height: 123px;
    border-top: 1px solid #DDDDDD;
    border-bottom: 1px solid #DDDDDD;
    display: flex;
    justify-content: space-between;
}

.description {
    display: flex;
    gap: 16px;
    padding: 15px;
}

.descriptionText {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.title {
    font-size: 20px;
    color: #252525;
    cursor: pointer;
}

.titleHero {
    color: #1C1C1C;
    font-size: 14px;
}

.Progress {
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: end;
    gap: 10px;
    padding-bottom: 10px;
    position: relative;
}

.progress-wrapper {
    width: 210px;
    height: 4px;
    background: #E4E4E4;
    border-radius: 20px;
}

.progress-value {
    height: 4px;
    background: #FFC761;
    border-radius: 20px;
}

.change {
    position: absolute;
    right: 45px;
    cursor: pointer;
}

.change-progress {
    position: absolute;
    right: 12px;
    width: 30px;
}
input {
    border: 1px solid #E0E0E0;
    outline: none;
    border-radius: 5px;
    padding: 2px;
}
</style>
