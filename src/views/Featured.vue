<template>
    <Header v-if="userStore.authorized"></Header>
    <UnregisteredHeader v-else @login="handleLogin" @register="handleRegister"></UnregisteredHeader>
    <HasFeatured v-if="userStore.user.featured.length"></HasFeatured>
    <HasntFeatured v-else></HasntFeatured>
</template>

<script setup>
import Header from '../components/UI/Header.vue';
import UnregisteredHeader from '../components/UI/UnregisteredHeader.vue';
import { useUserStore } from '../stores/UserStore.ts';
import HasntFeatured from '../components/FeaturedPage/HasntFeatured.vue'
import HasFeatured from '../components/FeaturedPage/HasFeatured.vue'

const userStore = useUserStore();
</script>