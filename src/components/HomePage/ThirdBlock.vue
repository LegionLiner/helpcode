<template>
    <div class="thirdBlock">
        <div class="left">
            <p class="about"><img src="../../assets/Line.svg" >О нас</p>
            <p class="textAbout">Мы хотим предоставлять образовательные услуги, которым не учат в школах, и развить будущую карьеру студентов.</p>
            <img src="../../assets/image1.png"  class="imageLeft">
        </div>
        <div class="right">
            <div class="imageRight">
                <img src="../../assets/image2.png" >
            </div>
            <div class="textRight">
                <div class="fText">
                    <p class="num">100k</p>
                    <p class="text">Студентов уже <br>регестрируются для его <br>использования.</p>
                </div>
                <div class="sText">
                    <p class="num">1K+</p>
                    <p class="text">Курсов доступно в <br>различных категориях.</p>
                </div>
                <div class="tText">
                    <p class="num">150</p>
                    <p class="text">Опытных авторов, которые <br> научат вас новому.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.thirdBlock{
    background-color: #1C1C1C;
    height: 672px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 128px;
    padding: 100px 124px;
}
.left{
    width: 522px;
    display: flex;
    flex-direction: column;
    gap: 43px;
}
.about{
    color: #32BCA3;
    font-size: 24px;
    display: flex;
    width: 106px;
    justify-content: space-between;
}
.textAbout{
    font-size: 20px;
    color: #E0E0E0;
}
.imageLeft{
    width: 504px;
    height: 247px;
}
.right{
    width: 670px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 64px;
}
.imageRight img{
    width: 322px;
    height: 450px;
}
.textRight{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.num{
    font-size: 32px;
    color: #E4E4E4;
}
.text{
    font-size: 16px;
    color: #E0E0E0;
}
</style>

<script>

</script>