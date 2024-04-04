<template>
    <div class="wrapper">
        <div class="filters">
            <Catrgories title="Категории" :items="categories" @set-selected="setQuery" :change="change"></Catrgories>
            <Catrgories title="Количество блоков" :items="blocksCount" @set-selected="setBlocks" :change="change"></Catrgories>
            <Catrgories title="Уровень" :items="level" @set-selected="setlevel" :change="change"></Catrgories>
            <div class="reset" @click="resetFilters">
                <img src="../../assets/ArrowClockwise.svg">
                Сбросить фильтры
            </div>
        </div>
        <div class="courses">
            <div class="header">
                <p>Найдено {{ courseStore.courses.length }} {{ parseLength(courseStore.courses.length) }}</p>
                <p @click="showSort = !showSort" ref="sortRef" style="cursor: pointer;">Сортировать по:
                    <b>{{ label }}</b>
                <div class="sort-by" v-if="showSort">
                    <div class="item" v-for="item in stars" @click="courseStore.filters.stars = item.value"
                        :class="{ 'active': courseStore.filters.stars == item.value }">
                        {{ item.title }}
                    </div>
                </div>
                </p>
            </div>
            <div class="courses-list">
                <div class="course" v-for="course in courseStore.courses.slice(
                    page > 1 ? 5 * (page - 1) : 0, 5 * page
                )">
                    <div style="display: flex; gap: 40px;">
                        <img src="../../assets/imageCourse.png" @click="$router.push(`/course/${course.id}`)"
                            style="cursor: pointer;">
                        <div class="info">
                            <div class="name" @click="$router.push(`/course/${course.id}`)" style="cursor: pointer;">
                                <b>{{ course.title }}</b>
                            </div>
                            <div class="stats">
                                <p>(<u @click="redirect(course.link)">Ссылка</u>)</p>
                                <img src="../../assets/circle.svg">
                                <div class="stars">
                                    <img src="../../assets/star.svg">
                                    {{ course.rate.stars }} ({{ course.rate.feedbacks }} отзывов)
                                </div>
                            </div>
                            <div class="description">
                                <img src="../../assets/stack.svg">
                                {{ course.description.blocks_count }} Модуль
                                <img src="../../assets/circle.svg">
                                <img :src="courseLevel(course.description.level)">
                                Уровень
                            </div>
                        </div>
                    </div>
                    <div class="description">
                        {{ course.description.short }}
                    </div>
                </div>
                <div v-if="courseStore.courses.length == 0" class="empty-courses">
                    Упс! Курсов по вашему запросу не найдено.
                </div>
            </div>
            <div style="display: flex; justify-content: end;">
                <Pagination
                :pages="pageCount"
                :active="1"
                @set-page="handlePage"
                ></Pagination>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Catrgories from '../../../frontend-core/src/components/Categories.vue';
import Pagination from '../../../frontend-core/src/components/Pagination.vue';
import { useCourseStore } from '../../stores/CoursesStore';
import junior from '../../assets/junior.svg';
import middle from '../../assets/middle.svg';
import senior from '../../assets/senior.svg';

const courseStore = useCourseStore();
const router = useRouter();

courseStore.resetFilters();
courseStore.filters.query = router.currentRoute.value.query.query;

const page = computed(() => {
    return router.currentRoute.value.query.page;
});
const pageCount = computed(() => {
    return Math.ceil(courseStore.courses.length / 5);
})
const categories = ref([
    {
        title: 'Front-End',
        value: 'front'
    },
    {
        title: 'Back-End',
        value: 'back'
    },
    {
        title: 'Full-Stack',
        value: 'fullstack'
    },
    {
        title: 'Разработчик игр',
        value: 'game'
    },
    {
        title: 'Разработчик под Android',
        value: 'android'
    },
    {
        title: 'Разработчик под iOS',
        value: 'ios'
    },
]);
const blocksCount = ref([
    {
        title: 'менее 3-х',
        value: '3'
    },
    {
        title: 'от 3-х до 5-ти',
        value: '5'
    },
    {
        title: 'от 5-х до 10-ти',
        value: '10'
    },
    {
        title: 'больше 10-ти',
        value: '10+'
    }
]);
const level = ref([
    {
        title: 'Junior',
        value: 'junior'
    },
    {
        title: 'Middle',
        value: 'middle'
    },
    {
        title: 'Senior',
        value: 'senior'
    }
]);
const stars = ref([
    {
        title: 'Как обычно',
        value: 'default'
    },
    {
        title: 'Больше звезд',
        value: 'more'
    },
    {
        title: 'Меньше звезд',
        value: 'less'
    },
]);
const label = computed(() => {
    return stars.value.find((item) => {
        return item.value == courseStore.filters.stars;
    }).title;
});
const change = ref(false);
const showSort = ref(false);
const sortRef = ref(null);

function redirect(link: string) {
    window.open(link, '_blank')
}
function handlePage(pageNum: number) {
    const newRoute = router.currentRoute.value.href.slice(0, -1)
    router.push(newRoute + pageNum)
}
function courseLevel(level: string) {    
    if (level == 'junior') return junior;
    if (level == 'middle') return middle;
    if (level == 'senior') return senior;
}
function parseLength(len: number) {
    if (len == 1) return 'курс';
    if (len < 5) return 'курса';
    return 'курсов';
}
function resetFilters() {
    courseStore.resetFilters();
    change.value = !change.value;
}

function setQuery(query: string[]) {
    courseStore.filters.name = query;
}
function setBlocks(blocks: string[]) {
    courseStore.filters.blocks = blocks;
}
function setlevel(level: string[]) {
    courseStore.filters.level = level;
}

document.addEventListener('click', (e: Event) => {
    let el = e.target as EventTarget;
    const nodes = [] as EventTarget[];
    nodes.push(el);

    while (el) {
        nodes.unshift(el.parentNode);
        el = el.parentNode;
    }

    const hasWrapper = nodes.reduce((res, element) => {
        return res || element === sortRef.value;
    }, false);

    if (!hasWrapper) {
        showSort.value = false;
    }
});


</script>

<style lang="scss" scoped>
.wrapper {
    padding: 124px;
    display: flex;
    gap: 50px;

    .filters {
        display: flex;
        flex-direction: column;
        gap: 20px;

        .reset {
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 10px;
            font-weight: bold;
        }
    }

    .courses {
        display: flex;
        flex-grow: 1;
        flex-direction: column;
        gap: 20px;

        .header {
            display: flex;
            justify-content: space-between;
            position: relative;

            .sort-by {
                position: absolute;
                right: 0px;
                background: white;
                box-shadow: 1px 1px 16px rgba(0, 0, 0, 0.25);
                padding: 8px 12px;
                border-radius: 8px;

                .item {
                    margin: 4px 0px;
                    padding: 4px 8px;
                    border-radius: 4px;
                    cursor: pointer;

                    &:hover {
                        background: rgba(0, 0, 0, 0.1);
                    }

                    &.active {
                        background: rgba(0, 0, 0, 0.1);
                    }
                }
            }
        }

        &-list {
            display: flex;
            flex-direction: column;
            gap: 20px;
            height: 755px;

            .empty-courses {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                height: 100%;
                font-size: 24px;
                font-weight: 600;
            }
        }

        .course {
            height: 135px;
            display: flex;
            border: 1px solid #E0E0E0;
            border-radius: 16px;
            padding: 16px;
            justify-content: space-between;

            img {
                border-radius: 8px;
            }

            .info {
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;

                .stats {
                    display: flex;
                    gap: 20px;
                    align-items: center;
                }

                .stars {
                    display: flex;
                    gap: 5px;
                    align-items: center;
                }
            }

            .description {
                display: flex;
                gap: 10px;
                align-items: center;
                width: 300px;
                overflow: hidden;
            }
        }
    }
}

u {
    cursor: pointer;
}
</style>