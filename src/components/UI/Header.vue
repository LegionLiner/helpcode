<template>
    <div class="header" :class="{ 'transparent': transparent }">
        <div class="logo" @click="$router.push('/')">
            <img src="../../assets/logo.svg" >
        </div>
        <div class="menu">
            <div class="catalog" @click="$router.push('/courses?page=1')">
                <p :class="{
        'active': router.currentRoute.value.name == 'courses'
    }">Каталог курсов</p>
            </div>
            <div class="favourites" @click="$router.push('/profile/featured')">
                <p :class="{
        'active': router.currentRoute.value.name == 'featured'
    }">Избранное</p>
            </div>
        </div>
        <div class="buttons">
            <div class="search" :class="{ 'active': searchActive }" @click="handleSearch">
                <img ref="searchRef" src="../../assets/Search2.svg">
                <input ref="inputRef" type="text" v-model="query" @keyup.enter="handleSearch">
            </div>
            <div class="user-icon">
                <img :src="userStore.avatar" class="ava">
                <img src="../../assets/CaretDown.svg" @click="isProfile = !isProfile" ref="caretRef">
                <div class="settings-list" v-if="isProfile" ref="profileRef">
                    <p class="list-item" @click="$router.push('/profile')">Профиль</p>
                    <p class="list-item" @click="userStore.logout()">Выход</p>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
import { useUserStore } from '../../stores/UserStore';

defineProps({
    transparent: Boolean
});

const router = useRouter();
const userStore = useUserStore();

const profileRef = ref(null);
const caretRef = ref(null);
const inputRef = ref(null);
const searchRef = ref(null);
const isProfile = ref(false);
const searchActive = ref(false);
const query = ref('');

function handleSearch() {
    if (searchActive.value && query.value) {
        router.push(`/courses?query=${query.value}&page=1`)
    }

    searchActive.value = true;
}

document.addEventListener('click', (e) => {
    if (!(e.target == inputRef.value || e.target == searchRef.value)) {
        searchActive.value = false;
    }
    if (e.target == caretRef.value) return;
    if (e.target !== profileRef.value) {
        isProfile.value = false;
    }
})
</script>

<style scoped lang="scss">
.settings-list {
    position: absolute;
    top: 72px;
    right: -25px;
    background: #1C1C1C;
    color: #BBBBBB;
    border-radius: 10px;
    box-shadow: 1px 1px 16px 1px rgba(0, 0, 0, 0.25);
    padding: 20px 40px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    justify-content: end;
    z-index: 1000;

    .list-item {
        text-align: end;
    }
}

.active {
    color: #32BCA3;
}

.header {
    width: 100%;
    height: 80px;
    background-color: #1C1C1C;
    display: flex;
    justify-content: space-around;
    z-index: 100;
    border-bottom: 1px solid #515151;
    position: fixed;
    top: 0;
    z-index: 10000;
}

.transparent {
    background: transparent;
}

.logo {
    cursor: pointer;
}

.catalog {
    color: #F9F9F9;
    display: flex;
    gap: 10px;
    align-items: center;
    margin-right: 40px;
    cursor: pointer;
}

.menu {
    width: 45%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 20px;
}

.schedule {
    color: #F9F9F9;
    cursor: pointer;
}

.favourites {
    color: #F9F9F9;
    cursor: pointer;
}

.buttons {
    display: flex;
    gap: 16px;
    align-items: center;
    justify-content: end;
    width: 354px;
}

.search {
    width: 50px;
    height: 50px;
    overflow: hidden;
    box-sizing: border-box;
    background: transparent;
    border: 0;
    background-color: #252525;
    border-radius: 30px;
    padding: 18px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 15px;
    transition: width 0.3s ease-in-out;

    input {
        height: 30px;
        background: rgba(0, 0, 0, 0.25);
        border: none;
        outline: none;
        border: 1px solid #32BCA3;
        border-radius: 10px;
        padding: 10px;
        color: white;
        margin-left: 10px;
    }

    &.active {
        width: 250px;
    }
}

.profileListButt {
    background: transparent;
    border: 0;

}

.user-icon {
    position: relative;
    display: flex;
    align-items: center;
    gap: 16px;
    cursor: pointer;

    .ava {
        width: 56px;
        height: 56px;
        border-radius: 100%;
    }
}
</style>