<template>
    <div class="modal-wrapper">
        <div class="modal">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped lang="scss">
.modal-wrapper {
    display: flex;
    width: 100%;
    height: 100dvh;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    .modal {
        background: black;
        border-radius: 10px;
        background: #F4F4F4;
    }
}
</style>