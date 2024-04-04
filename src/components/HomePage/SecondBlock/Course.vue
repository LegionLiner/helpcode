<template>
    <div class="course">
        <div class="image">
            <img src="../../../assets/course.png">
        </div>
        <div class="decription">
            <div class="name">
                {{ course.title }}
            </div>
            <div class="stats">
                <p class="redirect" @click="redirect">(Ссылка)</p>
                <div class="stars">
                    <img src="../../../assets/star.svg">
                    {{ course.rate.stars }} ({{ course.rate.feedbacks }} отзывов)
                </div>
            </div>
            <div class="horisontal"></div>
            <div class="info">
                <div class="length">
                    <img src="../../../assets/clock.svg">
                    {{ course.length }} Минут
                </div>
                <img src="../../../assets/circle.svg">
                <div class="module">
                    <img src="../../../assets/stack.svg">
                    {{ course.description.blocks_count }} Модуль
                </div>
                <img src="../../../assets/circle.svg">
                <div class="level">
                    <img :src="courseLevel(course.description.level)">
                    Уровень
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import junior from '../../../assets/junior.svg';
import middle from '../../../assets/middle.svg';
import senior from '../../../assets/senior.svg';

const props = defineProps({
    course: Object
});

function courseLevel(level) {    
    if (level == 'junior') return junior;
    if (level == 'middle') return middle;
    if (level == 'senior') return senior;
}
function redirect() {
    window.open(props.course.link, '_blank')
}
</script>

<style lang="scss" scoped>
.course {
    width: 376px;
    display: flex;
    flex-direction: column;
    border-radius: 16px;
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    user-select: none;
    cursor: pointer;

    .decription {
        display: flex;
        flex-direction: column;
        gap: 20px;
        padding: 24px;

        .name {
            font-size: 20px;
            font-weight: 500;
            color: #252525;
        }
        .stats {
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: #7C7C7C;

            .redirect {
                text-decoration: underline;
            }

            .stars {
                display: flex;
                gap: 4px;
                align-items: center;
            }
        }
        .info {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .length, .module, .level {
                display: flex;
                align-items: center;
                gap: 4px;
            }
        }
        .horisontal {
            width: 100%;
            height: 1.5px;
            background: #E0E0E0;
        }
    }

    .image img {
        border-top-left-radius: 16px;
        border-top-right-radius: 16px;
    }
}
</style>