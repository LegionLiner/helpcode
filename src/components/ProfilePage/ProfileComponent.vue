<template>
    <div class="profile">
        <div class="profileContent">
            <div class="name">
                <img src="../../assets/Cover.png">
                <img :src="userStore.avatar" class="avatar">
                <img src="../../assets/Pencil.svg" class="change" @click="inputRef.click()">
                <input type="file" ref="inputRef" @change="changeAvatar">
                <div class="heroUser">
                    <div class="heroTextUser">
                        <p class="nameUser" v-if="!globalEdit.name">{{ userStore.user.name }}</p>
                        <input class="nameUser" v-else v-model="editedName">
                    </div>
                    <Button :fill = 'false' @click="editName">{{ 
                        globalEdit.name ? 'Сохранить' : 'Редактировать'
                    }}</Button>
                </div>
            </div>
            <div class="aboutMe">
                <div class="about-header">
                    <p>Обо мне</p>
                    <Button :fill = 'false'>
                        <img src="../../assets/Pencil.svg" @click="editAbout">
                    </Button>
                </div>
                <div v-if="!globalEdit.about" class="about-content">
                    {{ userStore.user.about || 'Расскажите о себе!' }}
                </div>
                <div v-else class="about-content" @keyup.enter="setAbout">
                    <textarea v-model="editedAbout"></textarea>
                </div>
            </div>
            <div class="preferences">
                <div class="about-header">
                    <p>Предпочтения</p>
                    <div class="buttPrefer">
                        <Button :fill = 'false'>
                            <img src="../../assets/Plus.svg" @click="addPreference">
                        </Button>
                        <Button :fill = 'false' :border="globalEdit.preferences ? '#FF6550' : ''">
                            <img src="../../assets/Pencil.svg" @click="globalEdit.preferences = !globalEdit.preferences">
                        </Button>
                    </div>
                </div>
                <div class="about-content">
                    <div class="preference" v-for="pref in userStore.user.preferences">
                        {{ pref }}
                        <img v-if="globalEdit.preferences" @click="deletePreference(pref)" src="../../assets/Trash.svg">
                    </div>
                    <div class="preference" v-if="newPreference.active">
                        <input ref="preferenceInput" v-model="newPreference.content" @keydown.enter="setPreference">
                    </div>
                </div>
            </div>
        </div>
        <div class="contacts">
            <div class="contactsText">
                <p>Контакты</p>
                <button class="editButt" @click="editInfo"><img src="../../assets/Pencil.svg"></button>
            </div>
            <div class="contactsHero">
                <div class="email">
                    <img src="../../assets/EnvelopeSimple.svg">
                    <div>
                        <p class="hero">Email</p>
                        <p v-if="!globalEdit.contacts" class="heroContent">{{ userStore.user.email }}</p>
                        <input v-else v-model="editedInfo.email">
                    </div>
                </div>
                <div class="phone">
                    <img src="../../assets/DeviceMobile.svg">
                    <div>
                        <p class="hero">Phone</p>
                        <p v-if="!globalEdit.contacts" class="heroContent">{{ userStore.user.phone || '+7(999)-99-99-999' }}</p>
                        <input v-else v-model="editedInfo.phone" placeholder="+7(999)-99-99-999">
                    </div>
                </div>
                <div class="website">
                    <img src="../../assets/Globe.svg">
                    <div>
                        <p class="hero">Website</p>
                        <p v-if="!globalEdit.contacts" class="heroContent">{{ userStore.user.website || 'yourwebsite@gmail.com' }}</p>
                        <input v-else v-model="editedInfo.website" placeholder="yourwebsite@gmail.com">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Button from '../../../frontend-core/src/components/Button.vue';
import { useUserStore } from '../../stores/UserStore';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();

if (!userStore.authorized) {
    router.push('/');
}
const preferenceInput = ref(null);
const globalEdit = reactive({
    preferences: false,
    name: false,
    about: false,
    contacts: false
});
const newPreference = ref({
    active: false,
    content: ''
});
const editedAbout = ref('');
const editedName = ref('');
const editedInfo = reactive({
    website: '',
    phone: '',
    email: '',
});
const inputRef = ref(null);

async function addPreference() {
    newPreference.value.active = true;
    await nextTick();
    preferenceInput.value.focus();
}
function setPreference() {
    userStore.user.preferences.push(newPreference.value.content);
    newPreference.value.active = false;
    newPreference.value.content = '';
    userStore.editUserData('preferences', userStore.user.preferences);
}
function deletePreference(pref) {
    const index = userStore.user.preferences.indexOf(pref);
    if (index > -1) {
        userStore.user.preferences.splice(index, 1);
    }
    userStore.editUserData('preferences', userStore.user.preferences);
}
function editAbout() {
    globalEdit.about = !globalEdit.about
    editedAbout.value = userStore.user.about;
}
function setAbout() {
    if (editedAbout.value) {
        userStore.editUserData('about', editedAbout.value);
    }
    globalEdit.about = false;
}
function editName() {
    globalEdit.name = !globalEdit.name;
    if (globalEdit.name) {
        editedName.value = userStore.user.name;
        return;
    }
    if (editedName.value.length > 5) {
        userStore.editUserData('name', editedName.value);
    }
}
function editInfo() {
    globalEdit.contacts = !globalEdit.contacts;

    if (!globalEdit.contacts) {
        if (editedInfo.website) {
            userStore.editUserData('website', editedInfo.website);
        }
        if (editedInfo.phone) {
            userStore.editUserData('phone', editedInfo.phone);
        }
        if (editedInfo.email) { 
            userStore.editUserData('email', editedInfo.email);
        }
    }

    editedInfo.website = userStore.user.website;
    editedInfo.phone = userStore.user.phone;
    editedInfo.email = userStore.user.email;
}
async function changeAvatar(file) {
    file.target.files[0].arrayBuffer().then((arrayBuffer) => {
        const blob = new Blob([new Uint8Array(arrayBuffer)], { type: file.target.files[0].type });
        userStore.setAvatar(blob);
    });
}
</script>


<style scoped>
.about-header {
    display: flex;
    justify-content: space-between;
}
.about-content {
    display: flex;
    gap: 10px;
    flex-flow: row;
}
.about-content textarea {
    width: 100%;
    height: 100px;
    border: 1px solid #E0E0E0;
    resize: vertical;
    outline: none;
    padding: 15px 10px;
}
.about-content .preference {
    padding: 4px 12px;
    border: 1px solid #E0E0E0;
    border-radius: 20px;
    display: flex;
    gap: 4px;
}
.preference input {
    border: none;
    outline: none;
}
.preference img {
    cursor: pointer;
}

.profile{
    display: flex;
    gap: 32px;
    padding: 56px;
    justify-content: center;
    margin-top: 80px;
}
.profileContent{
    width: 843px;
    display: flex;
    flex-direction: column;
    gap: 32px;
}
.contacts{
    width: 405px;
    height: 296px;
    border: 0;
    border-radius: 10px;
    box-shadow: 0px 4px 4px 0 rgba(0, 0, 0, 0.25);
    padding: 24px;
}
.contactsText{
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 32px;
}
.editButt{
    border: 1px solid #32BCA3;
    padding: 18px;
    border-radius: 30px;
    background: transparent;
}
.contactsHero{
    display: flex;
    flex-direction: column;
}
.hero{
    font-size: 18px;
}
.heroContent{
    font-size: 16px;
    color: #32BCA3;
}
.contactsHero{
    gap: 16px;

}
.email, .phone, .website{
    display: flex;
    align-items: start;
    gap: 16px;
}
.name{
    width: 843px;
    height: 396px;
    border: 0;
    border-radius: 10px;
    box-shadow: 0px 4px 4px 0 rgba(0, 0, 0, 0.25);
    position: relative;
}
.heroUser{
    display: flex;
    flex-direction: row;
    gap: 80px;
    justify-content: space-between;
    margin-right: 24px;
    margin-top: -32px;
    padding-left: 160px;
}
.contactsHero input {
    border: none;
    outline: none;
    border-bottom: 1px solid #32BCA3;
    padding: 2px;
    font-size: 16px;
    color: #32BCA3;
}
.heroTextUser input {
    border: none;
    outline: none;
    border-bottom: 2px solid #32BCA3;
    padding: 2px;
}
.nameUser{
    font-size: 32px;
}
.profi{
    font-size: 18px;
    color: #7C7C7C;
}
.aboutMe{
    display: flex;
    flex-direction: column;
    width: 843px;
    border: 0;
    border-radius: 10px;
    box-shadow: 0px 4px 4px 0 rgba(0, 0, 0, 0.25);
    padding: 24px 24px;
    gap: 20px;
}
.aboutMe p{
    font-size: 32px;
}
.aboutMe Button{
    padding: 9px 9px;
    border-radius: 100%;
}
.preferences{
    display: flex;
    flex-direction: column;
    width: 843px;
    border: 0;
    border-radius: 10px;
    box-shadow: 0px 4px 4px 0 rgba(0, 0, 0, 0.25);
    padding: 24px 24px;
    gap: 20px;
}
.preferences p{
    font-size: 32px;
}
.preferences Button{
    padding: 9px 9px;
    border-radius: 100%;
}
.buttPrefer{
    display: flex;
    gap: 20px;
}
.avatar{
    z-index: 10;
    width: 135px;
    height: 135px;
    margin-left: 20px;
    margin-top: -60px;
    border-radius: 100%;
}
.change {
    position: absolute;
    border: 1px solid #32BCA3;
    background: white;
    padding: 5px;
    border-radius: 100%;
    left: 110px;
    top: 300px;
    cursor: pointer;
}
input[type="file"] {
    display: none;
}
</style>
