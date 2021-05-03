<template>
  <div class="dashboard">
    <Sidebar />

    <div v-if="loading" class="loading">
      <ProgressSpinner />
    </div>

    <div class="content">
      <keep-alive v-if="!loading">
        <component v-bind:is="currentComponent"></component>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import Sidebar from "../components/sidebar";
import Overview from "../components/overview";
import Clients from "../views/Clients.vue";

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
  },
  setup() {
    const store = useStore();
    const loading = ref(true);

    onMounted(() => {
      store.dispatch("getClients");
      loading.value = false;
    });

    const currentComponent = computed(() => {
      if (store.state.currentComponent == "Home") {
        return Overview;
      }
      if (store.state.currentComponent == "Clients") {
        return Clients;
      }
    });

    return { currentComponent, loading };
  },
};
</script>

<style scoped>
.dashboard {
  display: grid;
  grid-template-columns: 1fr 5fr;
  background-color: #00e0f0;
  height: 100vh;
  width: 100vw;
}
.content {
  background-color: white;
  border-radius: 20px;
}

.loading {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: white;
}
</style>
