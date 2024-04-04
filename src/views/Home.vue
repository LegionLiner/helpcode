<template>
    <FirstBlock></FirstBlock>
    <SecondBlock></SecondBlock>
    <ThirdBlock></ThirdBlock>
    <FourthBlock class="fourthBlock"></FourthBlock>
    <FifthBlock></FifthBlock>
</template>

<script setup>
import FirstBlock from '../components/HomePage/FirstBlock.vue';
import SecondBlock from '../components/HomePage/SecondBlock.vue';
import ThirdBlock from '../components/HomePage/ThirdBlock.vue';
import FifthBlock from '../components/HomePage/FifthBlock.vue';
import FourthBlock from '../components/HomePage/FourthBlock.vue';


</script>

<style>
.fourthBlock {
    position: relative;
    z-index: 10;
}
</style>