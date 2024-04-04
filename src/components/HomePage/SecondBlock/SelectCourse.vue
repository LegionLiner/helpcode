<template>
    <div class="select">
        <div class="item" v-for="item in items" :class="{ selected: item.value === selected }" @click="changeSelected(item)">
            {{ item.title }}
        </div>
    </div>
</template>

<script setup>
const emit = defineEmits(['changeSelected']);

const items = ref([
    {
        title: 'Все',
        value: 'all'
    },
    {
        title: 'Front-End',
        value: 'front'
    },
    {
        title: 'Back-End',
        value: 'back'
    },
    {
        title: 'Full-Stack',
        value: 'fullstack'
    },
    {
        title: 'Разработчик игр',
        value: 'game'
    },
    {
        title: 'Разработчик под Android',
        value: 'android'
    },
    {
        title: 'Разработчик под iOS',
        value: 'ios'
    },
]);
const selected = ref('all');

function changeSelected(item) {
    selected.value = item.value;
    emit('changeSelected', item.value);
}
</script>

<style lang="scss" scoped>
.select {
    width: 100%;
    border-bottom: 2px solid #E0E0E0;
    display: flex;
    justify-content: space-around;
    user-select: none;

    .item {
        text-align: center;
        width: 100%;
        padding: 0px 20px 8px 20px;
        margin: 0 24px;
        white-space: nowrap;
        margin-bottom: -2px;
        cursor: pointer;

        font-size: 15px;
        color: #A8A8A8;

        &.selected {
            border-bottom: 4px solid #32BCA3;
            font-weight: 500;
        }
    }
}
</style>