<template>
  <div class="overview p-m-4">
    <div class="p-grid">
      <div class="p-col">
        <Card style="width: 20vw; margin-bottom: 2em">
          <template #title> Number Of Clients </template>
          <template #content>
            <h3>
              {{ clients.length }}
            </h3>
          </template>
        </Card>
      </div>
      <div class="p-col">
        <Card style="width: 20rem; margin-bottom: 2em">
          <template #title> Number Of Tasks</template>
          <template #content>
            <h3>
              {{ tasks.length }}
            </h3>
          </template>
        </Card>
      </div>
      <div class="p-col-12">
        <Card style="width: 50vw; margin-bottom: 2em">
          <template #title> New Features Coming Soon </template>
          <template #content>
            <p></p>
          </template>
        </Card>
      </div>
      <div class="p-col-12">
        <Card style="width: 50vw; margin-bottom: 2em">
          <template #title> Auto Complete </template>
          <template #content>
            <AutoComplete
              v-model="client"
              :suggestions="filteredClients"
              field="firstName"
              @complete="searchClient($event)"
            />
          </template>
        </Card>
      </div>
    </div>

    <Fab class="fab" />
  </div>
</template>

<script>
import { onMounted, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
import Fab from "../components/widgets/fab";
import { FilterService, FilterMatchMode } from "primevue/api";

export default {
  name: "Overview",
  components: {
    Fab,
  },
  setup() {
    const store = useStore();
    let client = ref();
    let clients = ref([]);
    let filteredClients = ref([]);
    let userProfile = ref({});
    let tasks = ref([]);
    onMounted(() => {
      clients.value = store.state.clients;
      userProfile.value = store.state.userProfile;
      tasks.value = store.state.tasks;
    });

    const searchClient = (event) => {
      setTimeout(() => {
        if (!event.query.trim().length) {
          filteredClients.value = [clients.value];
        } else {
          filteredClients.value = clients.value.filter((clientTemp) => {
            return clientTemp.firstName
              .toLowerCase()
              .startsWith(event.query.toLowerCase());
          });
        }
      }, 250);
    };

    return { clients, tasks, client, filteredClients, searchClient };
  },
};
</script>

<style scoped>
.overview {
  border-radius: 20px;
  margin: 6px 6px 6px 0;
}

.fab {
  position: fixed;
  right: 10%;
  bottom: 10%;
}
</style>
