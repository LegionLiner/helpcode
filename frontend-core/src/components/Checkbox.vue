<template>
    <div class="checkbox-wrapper" :class="{ 'active': value }">
        <div class="checkbox" :class="{ 'disabled': disabled }" @click="setValue()">
            <svg v-if="value" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <g clip-path="url(#clip0_3_843)">
                    <path d="M3.33334 7.99996L6.66668 11.3333L13.3333 4.66663" stroke="white" stroke-width="1.5"
                        stroke-linecap="round" stroke-linejoin="round" />
                </g>
                <defs>
                    <clipPath id="clip0_3_843">
                        <rect width="16" height="16" fill="white" />
                    </clipPath>
                </defs>
            </svg>
        </div>
        <span class="label">{{ label }}</span>
    </div>
</template>

<script lang="ts">
export default defineComponent({
    emits: ['check'], // @check будет отдавать значение true/false
    props: {
        checked: { // состояние (нажат или не нажат)
            type: Boolean as PropType<boolean>,
            required: false,
            default: false
        },
        label: { // текст рядом с чекбоксом
            type: String as PropType<string>,
            required: false,
            default: ''
        },
        disabled: { // включен или выключен (кликабелен ли)
            type: Boolean as PropType<boolean>,
            required: false,
            default: false
        },
        change: {
            type: Boolean,
            required: false
        },
    },
    data() {
        return {
            value: this.checked,
            tick: 0,
        }
    },
    methods: {
        setValue() {
            if (this.disabled) return;
            this.value = !this.value;
            this.$emit('check', this.value)
        }
    },
    watch: {
        checked() {
            this.value = this.checked;
        },
        change() {
            if (this.tick > 0) {
                this.value = false;
            }
            this.tick++
        }
    }
})
</script>

<style scoped lang="scss">
.checkbox-wrapper {
    display: flex;
    gap: 8px;

    .checkbox {
        user-select: none;
        width: 20px;
        height: 20px;
        border-radius: 6.5px;
        border: 2px solid var(--Neutral-40, #E0E0E0);
        background: white;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;

        &.disabled {
            opacity: 0.7;
            cursor: not-allowed;
        }
    }

    .label {
        color: #7C7C7C;
        font-family: Roboto;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 150%;
    }

    &.active .label {
        font-family: Roboto;
        font-weight: 600;
    }

    &.active .checkbox {
        background: #32BCA3;
    }
}
</style>