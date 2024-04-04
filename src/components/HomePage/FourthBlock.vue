<template>
    <div class="fourthBlock">
        <div class="left">
            <div class="fLeft">
                <img src="../../assets/Chats.svg" >
                <p class="big">Поддержка 24/7</p>
                <p class="small">Сообщество всегда рядом с вами, если у вас возникнут трудности в <br> работе с платформой.</p>
            </div>
            <div class="sLeft">
                <img src="../../assets/Calendar.svg" >
                <p class="big">Календарь активности</p>
                <p class="small">На календаре будут отмечены дни активности ученика и его <br> продвижение.</p>
            </div>
            <div class="tLeft">
                <img src="../../assets/Document.svg" >
                <p class="big">Занимайтесь бесплатно</p>
                <p class="small">Наша команда подобрала для Вас категорию бесплатных курсов, <br> связанных с программированием, что сильно облегчит Вам поиск <br> нужного.</p>
            </div>
        </div>
        <div class="right">
            <div class="about">
                <img src="../../assets/Line 33.svg" > <p>Почему мы</p>
            </div>
            <div class="bigText">
                <p>Наши специальные <br> функции, которые мы <br> создаем для Вас</p>
            </div>
            <div class="smallText">
                <p>help CODE - это платформа, которая помогает студентам <br> продвигаться по карьерной лестнице, предоставляя решения для <br> простого и гибкого онлайн-обучения, позволяющие вам учиться <br> в любом месте и в любое время абсолютно бесплатно.</p>
            </div>
            <div class="rightImage">
                <img src="../../assets/Frame 14623.png" >
            </div>
        </div>
    </div>
</template>

<style scoped>
.fourthBlock{
    background-color: #FFFFFF;
    height: 797px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 64px;
    padding: 100px 124px;
}
.left{
    width: 548px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.left img{
    padding-bottom: 16px;
}
.sLeft{
    border-top: 1px solid #c0bbbb;
    border-bottom: 1px solid #c0bbbb;
    padding-top: 32px;
    padding-bottom: 32px;
    /* display: flex;
    flex-direction: column;
    justify-content: space-between; */
}
.big{
    font-size: 32px;
    color: #252525;
    padding-bottom: 10px;
}
.small{
    font-size: 16px;
    color: #7C7C7C;
}
.right{
    width: 580px;
    display: flex;
    flex-direction: column;
}
.about{
    color: #32BCA3;
    display: flex;
    flex-direction: row;
    font-size: 24px;
    width: 182px;
    justify-content: space-between;
    padding-bottom: 8px;
}
.bigText{
    font-size: 52px;
    color: #252525;
    padding-bottom: 16px;
}
.smallText{
    font-size: 18px;
    color: #7C7C7C;
    padding-bottom: 25px;
}
.rightImage img{
    width: 580px;
    height: 279px;
    border-radius: 20px;
}
</style>

<script>

</script>