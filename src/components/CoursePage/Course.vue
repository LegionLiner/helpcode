<template>
    <div class="wrapper">
        <div class="first">
            <div class="hero">
                <div class="text">
                    <p class="titleCourse">{{ course.title }}</p>
                    <p class="short">{{ course.description.short }}</p>
                </div>
                <div class="shortDescr">
                    <p class="modules">{{ course.description.blocks_count }} модулей в курсе</p>
                    <img src="../../assets/circle.svg" >
                    <div class="stars">
                        <img src="../../assets/StarFild.svg" v-for="item in starCount">
                        <div v-if="starCount != 5">
                            <img src="../../assets/star.svg" v-for="item in 5 - starCount">
                        </div>
                    </div>
                    <p class="starsVal">{{ course.rate.stars }}</p>
                </div>
            </div>
            <div class="modal">
                <img src="../../assets/course.png" >
                <div class="buttons">
                    <Button @click="redirect(course.link)">Начать обучение прямо сейчас</Button>
                    <Button v-if="!inFeatured" :fill='false' @click="addToFeatured(course.id)">Добавить в избранное</Button>
                    <Button v-else :fill='false' @click="removeFromFeatured(course.id)">Удалить из избранного</Button>
                </div>
                <div class="full">
                    <p class="descriptionCourse">Описание курса</p>
                    <div class="fullDescription">{{ course.description.full }}</div>
                    <div class="details">
                        <p class="detailsText">Подробности курса</p>
                        <div class="detailsItem">
                            <div class="detailsItemContent">
                                <img src="../../assets/stack.svg"  class="imgDetails">
                                <p>{{ course.description.blocks_count }} Учебный план</p>
                            </div>
                            <div class="detailsItemContent">
                                <img :src="courseLevel(course.description.level)" class="imgDetails">
                                <p>{{ parseLevel(course.description.level) }}</p>
                            </div>
                            <div class="detailsItemContent">
                                <img src="../../assets/language.svg"  class="imgDetails">
                                <p>{{ course.description.language == 'ru' ? 'Русский' : 'Английский' }}</p>
                            </div>
                            <div class="detailsItemContent">
                                <img src="../../assets/Command.svg"  class="imgDetails">
                                <p>Начальные требования:</p>
                                <p v-for="skill in course.description.knowledges">{{ skill }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="second">
            <p class="stack">Чему ты научишься</p>
            <div class="stackBlock">
                <p v-for="item in course.skills_achieve">
                    <img style="margin-right: 10px;" src="../../assets/Check.svg">
                    {{ item }}
                </p>
            </div>
            <div class="blocksCount">
                <p class="stack">Содержание курса</p>
                <div class="block-wrapper">
                    <div v-for="block in course.blocks" class="block">
                        <div style="display: flex;">
                            <img v-if="block.length === null" src="../../assets/text.svg">
                            <img v-else src="../../assets/Play.svg">
                            {{ block.title }}
                        </div>
                        <p>{{ block.length }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Button from '../../../frontend-core/src/components/Button.vue';
import junior from '../../assets/junior.svg';
import middle from '../../assets/middle.svg';
import senior from '../../assets/senior.svg';
import { useUserStore } from '../../stores/UserStore';

const props = defineProps(['course']);

const starCount = props.course.rate.stars;
const userStore = useUserStore();

const inFeatured = computed(() => {
    let has = false;
    userStore.user.featured.forEach(featured => {
        if (featured.id == props.course.id) {
            has = true;
        }
    });
    return has;
})

function courseLevel(level) {    
    if (level == 'junior') return junior;
    if (level == 'middle') return middle;
    if (level == 'senior') return senior;
}
function parseLevel(level) {
    if (level == 'junior') return 'Начинающий';
    if (level == 'middle') return 'Средний';
    if (level == 'senior') return 'Продвинутый';
}

function addToFeatured(id) {
    userStore.addFeatured(id);
}
function removeFromFeatured(id) {
    userStore.removeFeatured(id);
}
function redirect(link) {
    window.open(link, '_blank')
}
</script>

<style scoped>
.first {
    height: 409px;
    background-color: #1c1c1c;
    display: flex;
    justify-content: space-between;
}

.hero {
    padding: 56px 80px;
    display: flex;
    flex-direction: column;
    gap: 64px;
}

.text {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.titleCourse {
    color: #F9F9F9;
    font-size: 40px;
}

.short {
    color: #E0E0E0;
    font-size: 20px;
}

.modules {
    color: #E0E0E0;
}

.shortDescr {
    display: flex;
    gap: 8px;
}

.stars {
    display: flex;
}

.stars div {
    display: flex;
}

.starsVal {
    color: #E0E0E0;
}

.modal {
    background-color: #FFFFFF;
    width: 373px;
    height: fit-content;
    border-radius: 10px;
    border: 1px solid #E0E0E0;
    margin-right: 110px;
    margin-top: 56px;
    display: flex;
    flex-direction: column;
    padding: 24px;
    align-items: center;
    gap: 24px;
}

.modal img {
    border-radius: 5px;
    width: 325px;
}

.buttons {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.full {
    width: 325px;
    border-top: 1px solid #E0E0E0;
    display: flex;
    gap: 16px;
    padding-top: 24px;
    flex-direction: column;
    flex-wrap: wrap;
}

.descriptionCourse {
    font-size: 20px;
}

.details {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.detailsText {
    font-size: 20px;
}

.detailsItem img {
    width: 20px;
}
.detailsItem{
    display: flex;
    flex-direction: column;
    gap: 16px;
}
.detailsItemContent{
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
}
.second{
    padding: 56px 80px;
}
.stack{
    font-size: 32px;
    margin-bottom: 20px;
}
.stackBlock{
    width: 843px;
    border: 1px solid #E0E0E0;
    border-radius: 15px;
    display: grid;
    grid-template-columns: [start] 397px [line2] 397px [end];
    padding: 24px 24px;
}
.stackBlock p{
    display: flex;
    align-items: center;
}
.wrapper {
    margin-top: 80px;
}
.blocksCount {
    margin: 30px 0;
}
.block-wrapper {
    width: 843px;
    border: 1px solid #E0E0E0;
    border-radius: 15px;
    padding: 24px 24px;
    line-height: 150%;
    font-size: 16px;
    color: #252525;
    display: flex;
    flex-direction: column;
    gap: 16px;
}
.block {
    display: flex;
    justify-content: space-between;
}
.block p {
    font-size: 14px;
    line-height: 155%;
    color: #7C7C7C;
}
.block img {
    width: 20px;
    margin-right: 20px;
}
</style>