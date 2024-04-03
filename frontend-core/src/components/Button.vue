<template>
    <button @click="clickEvent" :class="{ 'fill': fill, 'disabled': disabled }" :style="{ 'border-color': border || '#32BCA3' }">
        <slot></slot>
    </button>
</template>

<script>
export default {
    emits: ['click'],
    props: {
        fill: {
            type: Boolean,
            default: true
        },
        border: {
            type: String,
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        clickEvent() {
            if (!this.disabled) {
                this.$emit('click');
            }
        }
    }
}
</script>

<style scoped lang="scss">
    button {
        outline: none;
        border: 1px solid #32BCA3;
        padding: 12px 32px;
        border-radius: 30px;
        cursor: pointer;
        color: #32BCA3;
        background: transparent;

        &.fill {
            color: white;
            background-color: #32BCA3;
        }
    }
</style>