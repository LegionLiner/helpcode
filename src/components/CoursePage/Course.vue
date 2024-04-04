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
                    <Button v-if="!inFeatured && userStore.authorized" :fill='false' @click="addToFeatured(course.id)">Добавить в избранное</Button>
                    <Button v-else-if="userStore.authorized" :fill='false' @click="removeFromFeatured(course.id)">Удалить из избранного</Button>
                    <Button v-else :fill='false' @click="$router.push('/register')">Для добавления зарегестрируйтесь</Button>
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
            <div class="feedbacks">
                <p class="stack">Отзывы</p>
                <div class="feedback-filed" v-if="!hasFeedbackByUser && userStore.authorized">
                    <textarea placeholder="Написать..." v-model="feedback" cols="30" rows="10"></textarea>
                    <div style="display: flex; align-items: end; justify-content: space-between;">
                        <div class="stars">
                            <img src="../../assets/StarFild.svg" v-for="item in currentRate" @click="setRate(item)">
                            <div v-if="currentRate != 5">
                                <img src="../../assets/star.svg" v-for="item in (5 - currentRate)" @click="setRate(item + currentRate)">
                            </div>
                        </div>
                        <Button :fill="feedbackValid" @click="addFeedback">Оставить отзыв</Button>
                    </div>
                </div>
                <div class="feedback-filed" v-else-if="!userStore.authorized">
                    Чтобы оставить отзыв, зарегестрируйтесь.
                </div>
                <div class="feedbacks-course">
                    <div class="feedback" v-for="item in feedBacks">
                        <div class="feedback-header">
                            <p>{{ item.feedback_by }}</p>
                            <img src="../../assets/Quote.svg">
                        </div>
                        <div class="feedback-text">
                            {{ item.text }}
                        </div>
                        <div class="stars">
                            <img src="../../assets/StarFild.svg" v-for="i in item.rate">
                            <div v-if="item.rate != 5">
                                <img src="../../assets/star.svg" v-for="i in 5 - item.rate">
                            </div>
                        </div>
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
import { useFeedbackStore } from '../../stores/FeedbackStore';

const props = defineProps(['course']);

const starCount = props.course.rate.stars;
const userStore = useUserStore();
const feedbackStore = useFeedbackStore();

const currentRate = ref(0);
const feedback = ref('');
const inFeatured = computed(() => {
    let has = false;
    userStore?.user?.featured?.forEach(featured => {
        if (featured.id == props.course.id) {
            has = true;
        }
    });
    return has;
});
const feedbackValid = computed(() => {
    return (currentRate.value) > 0 && (feedback.value.length > 10)
});
const feedBacks = computed(() => {
    return feedbackStore.getFeedback(props.course.id)
});
const hasFeedbackByUser = computed(() => {
    return feedbackStore.getFeedback(props.course.id).filter((feedback) => {
        return feedback.feedback_by == userStore?.user?.name;
    }).length > 0
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
function setRate(rate) {
    currentRate.value = rate;
}
function addFeedback() {
    if (feedback.value && currentRate.value) {
        feedbackStore.addFeedback({
            course_id: props.course.id,
            text: feedback.value,
            rate: currentRate.value,
            feedback_by: userStore.user.name,
        })
    }
}
</script>

<style scoped>
.feedback-filed {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 8px;
    padding: 16px;
    border-radius: 16px;
    background: white;
    margin-bottom: 24px;
    border: 1px solid #E0E0E0;
}
.feedback-filed textarea {
    border: none;
    outline: none;
    font-size: 16px;
}
.feedback-filed Button {
    width: 254px;
}
.wrapper {
    background: #F9F9F9;
}
.feedback {
    background: white;
    padding: 24px;
    border-radius: 16px;
    border: 1px solid #E0E0E0;
    width: 400px;
    display: flex;
    flex-direction: column;
    gap: 16px;
}
.feedbacks {
    width: 843px;
}
.feedback-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.feedback-rate {
    display: flex;
    align-items: center;
}

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
.stars img {
    cursor: pointer;
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
    background: white;
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
    background: white;
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