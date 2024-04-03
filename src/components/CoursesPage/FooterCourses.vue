<template>
    <div class="wrapper">
        <img src="../../assets/Patern.svg"  class="paternImg">
        <div class="hero">
            <p>Готовы начать свои курсы <br> и развивать карьеру?</p>
        </div>
        <div class="textHero">
            <p>Доступ к бесплатным курсам научит вас всему, не выходя из вашего собственного дома. Улучшите <br> свою
                карьеру уже сегодня, записавшись на отличные курсы.</p>
            <Button @click="$router.push('/courses?page=1')">Начать</Button>
        </div>
        <div class="footer">
            <div class="footerContent">
                <div class="iconAndText">
                    <img src="../../assets/logo.svg" >
                    <p>help CODE - это глобальная платформа онлайн- <br>обучения, которая предлагает любому желающему
                        <br>доступ к онлайн-курсам в любом месте совершенно <br>бесплатно!</p>
                </div>
                <div class="lists">
                    <p><b>Страницы</b></p>
                    <p @click="$router.push('/')">Главная</p>
                    <p @click="$router.push('/courses?page=1')">Курсы</p>
                    <p>О нас</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Button from '../../../frontend-core/src/components/Button.vue';
</script>

<style scoped>
.wrapper {
    background-color: #1c1c1c;
    height: 1106px;
}

.paternImg {
    width: 100%;
    position: absolute;
    z-index: 1;
}

.hero p {
    font-size: 72px;
    font-family: Gabriela;
    color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding-top: 200px;
}

.textHero {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 50px;
    padding-top: 190px;
}

.textHero p {
    text-align: center;
    color: #e0e0e0;
    font-size: 20px;
}

.textHero Button {
    padding: 20px;
    width: 236px;
    color: #1c1c1c;
    font-size: 18px;
    font-weight: 600;
    position: relative;
    z-index: 10;
}

.footer {
    border-top: 1px solid #e0e0e0;
    margin-top: 80px;

}

.footerContent {
    padding: 32px 180px;
    display: flex;
    justify-content: space-between;
}

.iconAndText {
    margin-left: 100px;
    color: #e0e0e0;
    display: flex;
    flex-direction: column;
    gap: 32px;
}

.iconAndText img {
    width: 192px;
}

.lists {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.lists p {
    color: #e0e0e0;
    cursor: pointer;
}

.lists b {
    color: #ffffff;
    font-size: 18px;
}
</style>