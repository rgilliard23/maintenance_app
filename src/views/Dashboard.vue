<template>
  <div class="p-grid p-m-0">
    <Sidebar class="p-col-3 sidebar p-shadow-4" />

    <div v-if="loading" class="loading">
      <ProgressSpinner />
    </div>

    <div class="p-col-9">
      <component v-bind:is="currentComponent"></component>
    </div>
  </div>
</template>

<script>
import Sidebar from "../components/sidebar";
import Overview from "../components/overview";
import Clients from "../views/Clients.vue";
import Profile from "../views/Profile";
import Workspaces from "../views/Workspaces.vue";

import { useStore } from "vuex";
import { computed, onMounted, ref } from "@vue/runtime-core";

import ProgressSpinner from "primevue/progressspinner";

// secret: "JZ9MORRDpjlikz3Tzp81sTSmMNkpTaII",

export default {
  name: "Dashboard",
  components: {
    Sidebar,
    ProgressSpinner,
    Overview,
    Clients,
    Workspaces,
  },
  setup() {
    const store = useStore();
    const loading = ref(true);

    onMounted(() => {
      store.dispatch("getClients");
      store.dispatch("getTasks");
      loading.value = false;
    });

    const currentComponent = computed(() => {
      if (store.state.currentComponent == "Home") {
        return Overview;
      }
      if (store.state.currentComponent == "Clients") {
        return Clients;
      }
      if (store.state.currentComponent == "Profile") {
        return Profile;
      }
      if (store.state.currentComponent == "Workspaces") {
        return Workspaces;
      }
    });

    return { currentComponent, loading };
  },
};
</script>

<style lang="scss">
/* .dashboard {
  display: grid;
  grid-template-columns: 1fr 5fr;
  background-color: #00e0f0;
  height: 100vh;
  width: 100vw;
} */

.sidebar {
  background-color: var(--primary-color);
  height: 100vh;
}

.loading {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
