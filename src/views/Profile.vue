<template>
    <Header v-if="userStore.authorized"></Header>
    <UnregisteredHeader v-else></UnregisteredHeader>
    <ProfileComponent></ProfileComponent>
</template>

<style scoped>

</style>

<script setup>
import Header from '../components/UI/Header.vue';
import ProfileComponent from '../components/ProfilePage/ProfileComponent.vue';
import UnregisteredHeader from '../components/UI/UnregisteredHeader.vue';
import { useUserStore } from '../stores/UserStore.ts';

const userStore = useUserStore();

</script>