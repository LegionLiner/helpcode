<template>
    <div class="header" :class="{ 'transparent': transparent }">
        <div class="logo" @click="$router.push('/')">
            <img src="../../assets/logo.svg">
        </div>
        <div class="catalog">
            <div class="catalogCurs" @click="$router.push('/courses?page=1')">
                <p :class="{
        'active': router.currentRoute.value.name == 'courses'
    }">Каталог курсов</p>
            </div>
            <p class="selectedWorks" @click="$router.push('/profile/featured')" :class="{
        'active': router.currentRoute.value.name == 'featured'
    }">Избранное</p>
        </div>
        <div class="buttons">
            <button class="search" :class="{ 'active': searchActive }" @click="handleSearch">
                <img ref="searchRef" src="../../assets/Search2.svg">
                <input ref="inputRef" type="text" v-model="query" @keyup.enter="handleSearch">
            </button>
            <Button :fill="false" @click="handleLogin" class="login">Вход</Button>
            <Button :fill="true" @click="handleRegistration" class="register">Регистрация</Button>
        </div>
    </div>
</template>

<script setup>
import Button from '../../../frontend-core/src/components/Button.vue';
defineProps({
    transparent: Boolean
});

const router = useRouter();

const inputRef = ref(null);
const searchRef = ref(null);
const searchActive = ref(false);
const query = ref('');

function handleLogin() {
    router.push('/login');
};
function handleRegistration() {
    router.push('/register');
};

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
})
</script>

<style scoped>
.header {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 80px;
    padding: 6px;
    justify-content: space-around;
    z-index: 2;
    background: #1C1C1C;
    border-bottom: 1px solid #515151;
    position: fixed;
    top: 0;
    z-index: 10000;
}

.transparent {
    background: transparent;
}

.catalog {
    display: flex;
    justify-content: space-around;
    height: 26px;
    align-items: center;
    margin-left: 300px;
    cursor: pointer;
}

.catalogCurs {
    color: #F9F9F9;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    cursor: pointer;
}

.catalogCurs p {
    height: 24px;
}

.selectedWorks {
    background: transparent;
    color: #F9F9F9;
    border: 0;
    width: 88px;
    height: 24px;
    margin: 50px;
}

.listButton {
    background: transparent;
    color: #F9F9F9;
    border: 0;
    cursor: pointer;
    cursor: pointer;
}

.buttons {
    z-index: 4;
    display: flex;
    align-items: center;
    justify-content: end;
    height: 40px;
    margin-right: -40px;
    gap: 18px;
    width: 534px;
}

/* .search {
    outline: none;
    border: 0;
    background: transparent;
    cursor: pointer;
    padding: 18px;
    cursor: pointer;
} */

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

.login {
    outline: none;
    border: 1px solid #32BCA3;
    color: #32BCA3;
    border-radius: 20px;
    height: 40px;
    width: 102px;
    background: transparent;
    cursor: pointer;
    cursor: pointer;
}

.signin {
    outline: none;
    color: #FFFFFF;
    border: 1px solid #32BCA3;
    width: 164px;
    height: 40px;
    border-radius: 20px;
    background-color: #32BCA3;
    cursor: pointer;
    margin-left: 18px;
    cursor: pointer;
}

.logo {
    cursor: pointer;
}

.active {
    color: #32BCA3;
}
</style>