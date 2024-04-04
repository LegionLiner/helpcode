<template>
    <div class="wrapper">
        <Teleport to="body">
            <Modal>
                <Form @submit="handleRegister"></Form>
            </Modal>
        </Teleport>
    </div>
</template>

<script setup lang="ts">
import Modal from '../UI/Modal.vue';
import Form from './Form.vue';
import { useUserStore } from '../../stores/UserStore';
import { useRouter } from 'vue-router';

interface Form {
    name: string,
    email: string,
    password: string
}

const router = useRouter();
const userStore = useUserStore();

if (userStore.authorized) {
    router.push('/')
}

function handleRegister(form: Form) {
    userStore.createUser(form);
    setTimeout(() => {
        router.push('/');
    }, 500);
}
</script>

<style scoped lang="scss">
.wrapper {
    width: 100%;
    height: 100dvh;
    background: #1C1C1C;
    background-image: url('../../assets/Patern.svg');
    background-repeat: no-repeat;
    background-size: contain;
}
</style>