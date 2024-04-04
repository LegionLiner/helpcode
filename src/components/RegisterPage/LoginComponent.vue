<template>
    <div class="wrapper">
        <Teleport to="body">
            <Modal>
                <Form @submit="handleLogin" :error="error"></Form>
            </Modal>
        </Teleport>
    </div>
</template>

<script setup lang="ts">
import Modal from '../UI/Modal.vue';
import Form from './Form.vue';
import { useUserStore } from '../../stores/UserStore';

interface Form {
    email: string,
    password: string
}

const router = useRouter();
const userStore = useUserStore();

if (userStore.authorized) {
    router.push('/')
}

const error = ref(false);

function handleLogin(form: Form) {
    const res = userStore.login(form.email, form.password);
    if (res) {
        setTimeout(() => {
            router.push('/');
        }, 500);
    }
    error.value = !res;
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