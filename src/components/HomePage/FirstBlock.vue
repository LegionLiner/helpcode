<template>
    <div class="homePageBaggin">
        <Header v-if="userStore.authorized" :transparent="false" @login="handleLogin" @register="handleRegistration">
        </Header>
        <UnregisteredHeader v-else :transparent="false" @login="handleLogin" @register="handleRegistration">
        </UnregisteredHeader>
        <img src="../../assets/Patern.svg"  class="patern">
        <img src="../../assets/Image.png" alt="хуй сосите" class="homePageImage">
        <div class="content">
            <p class="heroText">Основные языки программирования для начинающих</p>
            <p class="heroContext">Мы предоставляем вам доступ к лучшим курсам по изучению программирования, позволяя
                вам изучить бесчисленное множество практических уроков по целому ряду тем.</p>
            <div class="searchDiv">
                <div class="searchInputDiv">
                    <input class="searchInput" type="text" placeholder="Название курса, автор или предмет" v-model="searchQuery" @keyup.enter="search">
                    <button class="searchButt" @click="search"><img src="../../assets/Search2.svg"></button>
                </div>
                <p class="heroSearch">Популярные : HTML, C++, Python, Java, JavaScript</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import UnregisteredHeader from '../UI/UnregisteredHeader.vue';
import Header from '../UI/Header.vue';
import Button from '../../../frontend-core/src/components/Button.vue';
import { useUserStore } from '../../stores/UserStore.ts';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();

const searchQuery = ref('');

function search() {
    if (!searchQuery.value) return;

    router.push(`/courses?query=${searchQuery.value}&page=1`);
}

function handleLogin() {
    router.push('/login');
};
function handleRegistration() {
    router.push('/register');
};

</script>

<style scoped>
.homePageBaggin {
    display: flex;
    background-color: #1C1C1C;
    width: 100%;
    height: 732px;
    flex-wrap: wrap;
    margin-top: 80px;
}

.homePageImage {
    width: 600px;
    height: 732px;
    position: absolute;
    right: 0;
    z-index: 1;
}

.patern {
    position: absolute;
    width: 100%;
    z-index: 1;
}

.content {
    width: 716px;
    height: 471px;
    margin-top: 64px;
    margin-left: 135px;
    z-index: 2;
}

.heroText {
    font-size: 70px;
    color: #F9F9F9;
}

.heroContext {
    color: #E0E0E0;
    font-size: 20px;
    margin-top: 14px;
}

.searchInputDiv {
    background-color: #FFFFFF;
    width: 716px;
    border-radius: 30px;
    margin-top: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 8px 8px 24px;
    margin-bottom: 5px;
}

.searchInput {
    height: 24px;
    width: 598px;
    color: #A8A8A8;
    font-size: 16px;
    border: 0;
    outline: none;
}

.heroSearch {
    font-size: 16px;
    color: #E0E0E0;
    margin-left: 10px;
}

.searchButt {
    background-color: #32BCA3;
    width: 38px;
    height: 38px;
    border: 0;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}
</style>