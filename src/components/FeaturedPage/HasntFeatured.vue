<template>
<div class="wrapper">
    <div class="content">
        <p class="hero">Избранные курсы</p>
        <img src="../../assets/ImageFeatured.png">
        <p class="imgHero">
            Добавьте курсы в избранные, чтобы они всегда были под рукой. <br>
            <span v-if="!userStore.authorized">Для этого нужно сначала <u @click="$router.push('/register')">зарегестрироваться</u></span>
        </p>
    </div>
</div>
</template>

<script setup>
import { useUserStore } from '../../stores/UserStore';

const userStore = useUserStore();
</script>

<style scoped>
.content{
    display: flex;
    flex-direction: column;
    gap: 40px;
    justify-content: center;
    align-items: center;
    padding-top: 30px;
}
.hero{
    font-size: 40px;
    color: #3E3E3E;
}
.imgHero{
    font-size: 20px;
    color: #3E3E3E;
}
u {
    cursor: pointer;
}
.content img{
    width: 540px;
}
</style>