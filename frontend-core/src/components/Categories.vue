<template>
    <div class="categories-wrapper">
        <div @click="reset" class="header">
            <p>{{ title }}</p>
            <img src="../assets/category_line.svg">
        </div>
        <div class="body">
            <div v-for="item in items" class="category">
                <Checkbox
                :change="change"
                :label="item.title"
                @check="setSelected(item.value, $event)"
                ></Checkbox>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Checkbox from './Checkbox.vue';

interface CategoryItem { // тип входных обьектов 
    title: string,
    value: string | number,
}

export default defineComponent({
    components: {
        Checkbox
    },
    emits: ['set-selected'], // @set-selected будет отдавать масив value, которые выбраны
    props: {
        title: { // заголовок категории
            type: String as PropType<string>,
            required: true,
        },
        items: { // элементы в массиве типа CategoryItem
            type: Object as PropType<CategoryItem[]>,
            required: true,
        },
        change: {
            type: Boolean,
            required: false
        }
    },
    data() {
        return {
            categoriesSelected: [] as Array<string | number>,
        }
    },
    methods: {
        setSelected(item: string | number, value: boolean): void {
            value ? this.categoriesSelected.push(item) : this.categoriesSelected.splice(this.categoriesSelected.findIndex((_item) => item == _item), 1);
            this.$emit('set-selected', this.categoriesSelected)
        },
        reset() {
            this.items.forEach(item => {
                item.checked = false;
            });        
        }
    },
})
</script>

<style scoped lang="scss">
.categories-wrapper {
    min-width: 100px;
    max-width: 200px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 16px;
        color: #252525;
        color: #7C7C7C;
        font-family: Roboto;
        font-weight: 600;
        font-style: normal;
        line-height: 150%;
    }
    .body {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
}
</style>