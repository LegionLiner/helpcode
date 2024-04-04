<template>
    <div class="pagination-wrapper">
        <div class="button-left">
            <svg @click="changePage(activePage - 1)" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.7423 3.17188C12.6268 3.12685 12.501 3.11542 12.3793 3.13893C12.2577 3.16243 12.1452 3.2199 12.0548 3.30469L5.80479 9.55469C5.68742 9.67318 5.62158 9.83322 5.62158 10C5.62158 10.1668 5.68742 10.3268 5.80479 10.4453L12.0548 16.6953C12.1748 16.81 12.3341 16.8743 12.5001 16.875C12.583 16.8746 12.6652 16.8587 12.7423 16.8281C12.856 16.7803 12.9531 16.6999 13.0212 16.597C13.0893 16.4941 13.1255 16.3734 13.1251 16.25V3.75C13.1255 3.62661 13.0893 3.50587 13.0212 3.40298C12.9531 3.3001 12.856 3.21969 12.7423 3.17188Z" :fill="activePage == 1 ? '#A8A8A8' : '#32BCA3'"/>
            </svg>
        </div>
        <div class="button-pages">
            <div v-for="page in pagesCount" @click="changePage(page)" class="page">
                {{ page }}
                <svg v-if="page == activePage" width="16" height="4" viewBox="0 0 16 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line y1="2" x2="16" y2="2" stroke="#32BCA3" stroke-width="4"/>
                </svg>
            </div>
        </div>
        <div class="button-right">
            <svg @click="changePage(activePage + 1)" width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.19532 6.55469L1.94532 0.304688C1.85495 0.219901 1.74242 0.162431 1.62076 0.138927C1.49909 0.115424 1.37326 0.126847 1.25782 0.171875C1.14406 0.219689 1.04701 0.300103 0.978888 0.402985C0.910764 0.505866 0.874617 0.62661 0.875003 0.75V13.25C0.874617 13.3734 0.910764 13.4941 0.978888 13.597C1.04701 13.6999 1.14406 13.7803 1.25782 13.8281C1.33491 13.8587 1.41705 13.8746 1.5 13.875C1.66597 13.8743 1.82534 13.81 1.94532 13.6953L8.19532 7.44531C8.31268 7.32682 8.37852 7.16678 8.37852 7C8.37852 6.83322 8.31268 6.67318 8.19532 6.55469V6.55469Z" :fill="activePage == pagesCount ? '#A8A8A8' : '#32BCA3'"/>
            </svg>
        </div>
    </div>
</template>

<script lang="ts">
export default defineComponent({
    emits: ['set-page'], // @set-page будет отдавать активную страницу
    props: {
        pages: { // количество страниц
            type: Number as PropType<number>,
            required: true,
        },
        active: { // активная страница 
            type: Number as PropType<number>,
            required: true,
            default: 0
        },
    },
    data() {
        return {
            pagesCount: this.pages,
            activePage: this.active
        }
    },
    methods: {
        changePage(to: number): void {
            if ((0 < to) && (to <= this.pagesCount)) {
                this.activePage = to;
                this.$emit('set-page', this.activePage)
            }
        }
    },
    watch: {
        pages() {
            this.pagesCount = this.pages;
            this.activePage = 1;
        }
    }
})
</script>

<style scoped lang="scss">
.pagination-wrapper {
    min-width: 200px;
    max-width: 450px;
    display: flex;
    align-items: center;
    gap: 20px;
    color: #252525;
    font-family: "Plus Jakarta Sans";
    user-select: none;

    svg {
        cursor: pointer;
    }
    .button-left, .button-right {
        box-sizing: border-box;
        width: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .button-pages {
        display: flex;
        gap: 20px;
        .page {
            padding-top: 10px;
            width: 15px;
            display: flex;
            flex-direction: column;
            gap: 10px;
            align-items: center;
            cursor: pointer;
        }
    }
}
</style>