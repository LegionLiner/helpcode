// @ts-ignore
import { User, Featured } from "@core/src/Interfaces/User";
import ava from '../assets/avatar.png';

let openDB;

if (!import.meta.env.TEST) {
  openDB = indexedDB.open("logo", 1);
  openDB.onupgradeneeded = () => {
    let db = openDB.result;
    db.createObjectStore("Images", { keyPath: "id" });
  };
}

let globalUser = {};
if (localStorage.getItem("user-info-helpcode")) {
  globalUser = JSON.parse(localStorage.getItem("user-info-helpcode") as string);
}

let loggedIn = false;
if (localStorage.getItem("user-authorised-helpcode")) {
  loggedIn = JSON.parse(
    localStorage.getItem("user-authorised-helpcode") as string
  ) as boolean;
}

export const useUserStore = defineStore("userStore", () => {
  const user = ref<User>({
    name: null,
    email: null,
    phone: null,
    website: null,
    about: null,
    password: null,
    preferences: [],
    featured: [] as Featured[],
    created_at: null,
    active: false,
  });
  const avatar = ref(ava);
  const small = ref(null);
  const authorized = ref(false);

  function createUser({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) {
    user.value.created_at = new Date();
    user.value.name = name;
    user.value.email = email;
    user.value.password = password;
    user.value.active = true;

    authorized.value = true;
    localStorage.setItem("user-info-helpcode", JSON.stringify(user.value));
    localStorage.setItem("user-authorised-helpcode", "true");
  }
  function editUserData(key: string, data: any) {
    if (key === "password") {
      throw new Error("Нельзя изменить пароль этим методом");
    }
    user.value[key] = data;

    localStorage.setItem("user-info-helpcode", JSON.stringify(user.value));
    return "Данные успешно изменены";
  }
  function editUser(newUser: User) {
    if (
      user.value.email == newUser.email &&
      user.value.password == newUser.password
    ) {
      user.value = newUser;
    }
  }
  function changePassword(password: string, confirmation: string) {
    if (user.value.password === confirmation) {
      user.value.password = password;

      localStorage.setItem("user-info-helpcode", JSON.stringify(user.value));
      return "Пароль успешно изменен";
    }
    throw new Error("Пароли не совпадают");
  }
  function addFeatured(id: number) {
    let inFeatured = false;
    user.value.featured.forEach((featured: { id: number, progress: number }) => {
      if (featured.id == id) {
        inFeatured = true;
      }
    });
    if (inFeatured) return;

    user.value.featured.push({
      id,
      progress: 0
    });
    localStorage.setItem("user-info-helpcode", JSON.stringify(user.value));
  }
  function removeFeatured(id: number) {
    let inFeatured = false;
    let index = -1;
    user.value.featured.forEach((featured: { id: number, progress: number }, i: number) => {
      if (featured.id == id) {
        index = i;
        inFeatured = true;
      }
    });
    if (!inFeatured) return;

    user.value.featured.splice(index, 1);
    localStorage.setItem("user-info-helpcode", JSON.stringify(user.value));
  }
  function changeProgress(id: number, progress: number) {
    console.log(id, progress);
    
    user.value.featured.forEach((featured: { id: number, progress: number }) => {
      if (featured.id == id) {
        featured.progress = progress;
      }
    });
    localStorage.setItem("user-info-helpcode", JSON.stringify(user.value));
  }
  function deleteUser(password: string) {
    if (!(user.value.password == password)) return "Неверный пароль";
    user.value = {
      name: null,
      email: null,
      phone: null,
      website: null,
      about: null,
      password: null,
      preferences: [],
      featured: {},
      created_at: null,
      active: false,
    };

    localStorage.removeItem("user-info-helpcode");
    authorized.value = false;
    return "Пользователь успешно удален";
  }
  function login(email: string, password: string): boolean {
    let localUser = localStorage.getItem("user-info-helpcode") as User | string;
    if (localUser) {
      localUser = JSON.parse(localUser);
      const sameEmail = localUser.email == email;
      const samePassword = localUser.password == password;

      if (sameEmail && samePassword) {
        user.value = localUser;
        authorized.value = true;
        localStorage.setItem("user-authorised-helpcode", "true");
        return true;
      }
    }
    return false;
  }
  function logout() {
    authorized.value = false;
    user.value = {
      name: null,
      email: null,
      phone: null,
      website: null,
      about: null,
      password: null,
      preferences: [],
      featured: {},
      created_at: null,
      active: false,
    };

    localStorage.setItem("user-authorised-helpcode", "false");
  }
  async function onloaded() {
    if (globalUser && loggedIn) {
      authorized.value = true;
      user.value = globalUser as User;

      openDB.onsuccess = () => {
        let db = openDB.result;
        let request = db
          .transaction("Images")
          .objectStore("Images")
          .get("avatar");
        request.onsuccess = async () => {
          await blobToImage(request.result.content);
        };
      };
    }
  }
  async function setAvatar(avatar: Blob) {
    let db = openDB.result;
    let store = db.transaction("Images", "readwrite").objectStore("Images");
    store.put({ id: "avatar", content: avatar });
    await blobToImage(avatar)
  }
  async function blobToImage(blob: Blob) { 
    return new Promise((resolve) => {
      const url = URL.createObjectURL(blob);
      let img = new Image();
      img.onload = () => {
        URL.revokeObjectURL(url);
        resolve(img);
      };
      avatar.value = url;
    });
  }

  return {
    user,
    authorized,
    avatar,
    small,

    createUser,
    editUserData,
    editUser,
    changePassword,
    addFeatured,
    removeFeatured,
    changeProgress,
    deleteUser,
    login,
    logout,
    onloaded,
    setAvatar,
  };
});
