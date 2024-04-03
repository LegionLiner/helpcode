<template>
    <div class="form">
        <div class="nav-buttons">
            <div class="button" :class="{ 'active': currentRoute == 'login' }" @click="$router.replace('/login')">
                Вход
            </div>
            <div class="button" :class="{ 'active': currentRoute == 'register' }" @click="$router.replace('/register')">
                Регистрация
            </div>
        </div>
        <div class="form-fields">
            <input placeholder="Имя и фамилия" v-model="form.name" ref=nameRef v-if="currentRoute == 'register'">
            <input placeholder="E-mail" v-model="form.email" ref="emailRef">
            <input type="password" placeholder="Пароль" v-model="form.password" ref="passwordRef">
            <p v-if="error">Неверный пароль</p>
        </div>
        <div class="submit">
            <Button @click="validateForm"> {{ currentRoute == 'login' ? 'Войти' : 'Зарегистрироваться' }}</Button>
        </div>
    </div>
</template>

<script setup lang="ts">
import Button from '../../../frontend-core/src/components/Button.vue';

const emits = defineEmits(['submit']);
const props = defineProps<{
    error: boolean
}>();

const router = useRouter();

const currentRoute = computed(() => {
    return router.currentRoute.value.name;
})

const nameRef = ref(null);
const emailRef = ref(null);
const passwordRef = ref(null);
const form = reactive({
    name: '',
    email: '',
    password: ''
});

function validateForm() {
    let valid = true;
    if (form.name.length < 3 && currentRoute == 'register') {
        valid = false;
        nameRef?.value?.classList?.add('invalid');
    }
    if ((form.email.length < 3) || !form.email.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/)) {
        valid = false;
        emailRef.value.classList.add('invalid');
    }
    if (form.password.length < 8) {
        valid = false;
        passwordRef.value.classList.add('invalid');
    }
    if (!valid) return;

    emits('submit', form);
}

watch(() => form.name, () => {
    nameRef?.value?.classList?.remove('invalid');
});
watch(() => form.email, () => {
    emailRef.value.classList.remove('invalid');
});
watch(() => form.password, () => {
    passwordRef.value.classList.remove('invalid');
});
</script>

<style scoped lang="scss">
.form {
    width: 100%;
    height: 100%;
    padding: 30px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    .nav-buttons {
        width: 100%;
        gap: 20px;
        display: flex;
        justify-content: start;
        padding: 0 130px 20px 30px;
        margin-bottom: 20px;
        border-bottom: 1px solid #9E9E9E;

        .button {
            color: #1C1C1C;
            line-height: 135%;
            font-size: 22px;
            cursor: pointer;

            &.active {
                color: #32BCA3;
            }
        }
    }

    .form-fields {
        display: flex;
        width: 100%;
        flex-direction: column;
        gap: 20px;
        padding: 0 30px 20px 30px;

        input {
            background: rgba(0, 0, 0, 0.08);
            border-radius: 5px;
            border: 1px solid transparent;
            outline: none;
            padding: 12px;
            width: 100%;
            color: black;

            input::placeholder {
                color: #6C6C6C;
            }

            &.invalid {
                border-color: #FF6550;
            }
        }

        p {
            color: #FF6550;
            font-size: 14px;
            padding-left: 5px;
        }

    }
}
</style>