<template>
    <div class="wrapper">
        <img src="../../assets/Patern.svg" class="patern">
        <div class="title">
            <div class="big-text">
                Готовы начать свои курсы и развивать карьеру?
            </div>
            <div class="small-text">
                Доступ к бесплатным курсам научит вас всему, не выходя из вашего собственного дома. Улучшите свою
                карьеру уже сегодня, записавшись на отличные курсы.
            </div>
        </div>
        <div class="start">
            <Button class="big" @click="router.push('/courses?page=1')">Начать</Button>
        </div>
        <div class="footer">
            <div class="logo">
                <img src="../../assets/logo.svg" class="logo-img">
                <p>help CODE - это глобальная платформа онлайн-обучения, которая предлагает любому желающему доступ к
                    онлайн-курсам в любом месте совершенно бесплатно!</p>
            </div>
            <div class="nav">
                <p><b>Страницы</b></p>
                <p @click="router.push('/')">Главная</p>
                <p @click="router.push('/courses?page=1')">Курсы</p>
                <p>О нас</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import Button from '../../../frontend-core/src/components/Button.vue';

const router = useRouter();


</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Gabriela&display=swap');

.patern {
    position: absolute;
    top: -50px;
    width: 100%;
    z-index: 1;
}

.wrapper {
    background: #1C1C1C;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 64px;
    position: relative;

    .title {
        padding: 80px 124px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 190px;
        max-width: 1400px;
        position: relative;
        z-index: 100;

        .big-text {
            font-family: Gabriela;
            font-size: 72px;
            line-height: 110%;
        }

        .small-text {
            font-size: 20px;
            color: #E0E0E0;
        }
    }

    .start {
        .big {
            transform: scale(1.2);
            cursor: pointer;
            position: relative;
            z-index: 10;
        }
    }

    .footer {
        padding: 30px 124px 100px;
        width: 100%;
        border-top: 1px solid #7C7C7C;
        display: flex;
        justify-content: space-between;
        font-size: 15px;
        color: #E0E0E0;

        .logo {
            display: flex;
            flex-direction: column;
            gap: 32px;
            max-width: 420px;

            .logo-img {
                width: 160px;
            }
        }

        .nav {
            margin-right: 100px;
            display: flex;
            flex-direction: column;
            gap: 16px;

            p {
                cursor: pointer;
            }
        }
    }
}
</style>