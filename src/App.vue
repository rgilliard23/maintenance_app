<template>
  <div>
    <router-view />
  </div>
</template>

<script>
import { onBeforeMount } from "vue";
import { useRouter, useRoute } from "vue-router";
import firebase from "firebase/app";
import { useStore } from "vuex";

export default {
  setup() {
    // const path =
    //   "../node_modules/primevue/resources/themes/md-dark-indigo/theme.css";
    // import(path).then((module) => {
    //   console.log(module);
    // });

    const router = useRouter();
    const route = useRoute();
    const store = useStore();

    onBeforeMount(() => {
      firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
          router.replace("/login");
        } else if (route.path === "/login" || route.path == "/register") {
          console.log(user);
          store.commit("setUser", user);
          router.replace("/");
          // JZ9MORRDpjlikz3Tzp81sTSmMNkpTaII
        }
      });
    });
  },
};
</script>

<style>
body {
  margin: 0;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: var(--surface-b);
  font-family: var(--font-family);
  font-weight: 400;
  color: var(--text-color);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}
</style>
