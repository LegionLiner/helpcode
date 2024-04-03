<template>
    <div class="wrapper">
        <Header v-if="userStore.authorized" :transparent="false" @login="handleLogin" @register="handleRegistration">
        </Header>
        <UnregisteredHeader v-else :transparent="false" @login="handleLogin" @register="handleRegistration">
        </UnregisteredHeader>
        <img src="../../assets/Patern.svg"  class="patern">
        <div class="hero">
            <p class="heroHead">
                В поиске подходящего курса?
            </p>
            <p class="heroContent">
                Просматривайте обучающий контент, призванный помочь вашей учебе и <br> карьере. Вы можете учиться,
                выбрав курс, подходящий именно вам!
            </p>
        </div>
        <div class="searh">
            <div class="searhContent">
                <div class="searhInput">
                    <input type="text" placeholder="Название курса, автор или предмет" v-model="searchQuery" @keyup.enter="search">
                    <Button @click="search"><img src="../../assets/Search2.svg"></Button>
                </div>
                <div class="inputHero">
                    <p class="inputHero">Популярные: HTML, C++, Python, Java, JavaScript</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import UnregisteredHeader from '../UI/UnregisteredHeader.vue';
import Header from '../UI/Header.vue';
import { useUserStore } from '../../stores/UserStore.ts';
import { useCourseStore } from '../../stores/CoursesStore';
import Button from '../../../frontend-core/src/components/Button.vue';

const userStore = useUserStore();
const courseStore = useCourseStore();
const router = useRouter();

const searchQuery = ref(router.currentRoute.value.query.query);

function search() {
    if (!searchQuery.value) {
        router.push(`/courses?page=1`);
        courseStore.filters.query = '';
    };

    router.push(`/courses?query=${searchQuery.value}&page=1`);
    courseStore.filters.query = searchQuery.value;
}
function handleLogin() {
    router.push('/login');
};
function handleRegistration() {
    router.push('/register');
};
</script>

<style scoped>
.wrapper {
    background-color: #1c1c1c;
    height: 720px;
    margin-top: 80px;
}

.Header {
    z-index: 10;
}

.patern {
    z-index: 1;
    width: 100%;
    position: absolute;
}

.hero {
    position: relative;
    z-index: 100;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    justify-content: center;
    padding: 130px;
    z-index: 2;
}

.heroHead {
    position: relative;
    z-index: 100;
    font-size: 72px;
    color: #f9f9f9;
}

.heroContent {
    position: relative;
    z-index: 100;
    font-size: 20px;
    color: #e0e0e0;
}

.searh {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.searhContent {
    position: relative;
    z-index: 100;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.searhInput {
    position: relative;
    z-index: 100;
    width: 1156px;
    height: 65px;
    background-color: #ffffff;
    border-radius: 30px;
    display: flex;
    justify-content: space-between;
}

.searhInput Button {
    padding: 18px;
    display: flex;
    align-items: center;
    margin: 9px;
}

.searhInput input {
    margin-left: 24px;
    margin-top: 24px;
    border: 0;
    height: 24px;
    width: 1020px;
    color: #a8a8a8;
    font-size: 16px;
    outline: none;
}

.inputHero {
    font-size: 16px;
    color: #e0e0e0;

}
</style>