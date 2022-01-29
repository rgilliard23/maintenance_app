<template>
  <div class="sidebar">
    <h3 class="title">Ronalds 426 Project</h3>
    <div class="menu-items">
      <div class="p-d-flex p-jc-center">
        <i class="pi pi-sun p-mr-2"></i> {{ temperature }}
      </div>
      <router-link
        to="/"
        @click="showComponent('Home')"
        active-class="active"
        tag="button"
        class="side-btn"
      >
        <div class="link-container">Home</div>
      </router-link>
      <router-link
        to="/"
        @click="showComponent('Clients')"
        active-class="active"
        tag="button"
        class="side-btn"
      >
        <div class="link-container">Clients</div>
      </router-link>
      <router-link
        to="/"
        @click="showComponent('Workspaces')"
        active-class="active"
        tag="button"
        class="side-btn"
      >
        <div class="link-container">Workspaces</div>
      </router-link>
      <router-link
        to="/"
        @click="showComponent('Profile')"
        active-class="active"
        tag="button"
        class="side-btn"
      >
        <div class="link-container">Profile</div>
      </router-link>
      <InputSwitch class="p-mx-auto" v-model="darkMode" />

      <div v-if="quote">"{{ quote.text }}"</div>
      <div class="side-btn" v-on:click="Logout">
        <div class="link-container">Logout</div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import { useStore } from "vuex";
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import axios from "axios";

export default {
  setup() {
    const store = useStore();
    let darkMode = ref(true);
    let temperature = ref();
    const Logout = () => {
      firebase
        .auth()
        .signOut()
        .then((res) => console.log(res))
        .catch((err) => alert(err));
    };
    const quote = ref();

    // watch(darkMode, async () => {
    //   if (darkMode.value) {
    //     await import("primevue/resources/themes/md-dark-indigo/theme.css");
    //     delete require.cache[
    //       require.resolve("primevue/resources/themes/md-light-indigo/theme.css")
    //     ];
    //   } else {
    //     await import("primevue/resources/themes/md-light-indigo/theme.css");
    //     delete require.cache[
    //       require.resolve("primevue/resources/themes/md-dark-indigo/theme.css")
    //     ];
    //   }
    // });

    onMounted(async () => {
      // const url =
      //   "api.openweathermap.org/data/2.5/weather?q=chapelhill,uk&appid={API key}";

      await axios
        .get(
          "http://api.openweathermap.org/data/2.5/weather?id=4460162&units=imperial&appid=d82afbee767f9b4274603ec0cc3ca7bd"
        )
        .then(async (res) => {
          let data = await res.data;
          temperature.value = data.main.temp;
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });

      await axios.get("https://type.fit/api/quotes").then((res) => {
        quote.value = res.data[Math.floor(Math.random() * res.data.length - 1)];
      });
    });

    const showComponent = (currentComponent) => {
      store.commit("setCurrentComponent", currentComponent);
    };
    return { Logout, showComponent, darkMode, temperature, quote };
  },
};
</script>

<style scoped>
.title {
  color: white;
  font-size: 24px;
  margin-top: 10px;
}

.menu-items {
  display: flex;
  flex-direction: column;
  margin: 0 30px;
}

.menu-items > * {
  margin-top: 60px;
}

.side-btn {
  text-decoration: none;
  border: none;
  padding: 20px 0;
  cursor: pointer;
  font-size: 16px;
}

.side-btn.active {
  background-color: white;
  color: #8e8e8e;
  border-bottom-right-radius: 40px;
  border-top-left-radius: 40px;
}
.side-btn:focus {
  outline: none;
}
</style>
