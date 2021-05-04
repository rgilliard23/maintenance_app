<template>
  <div class="container">
    <DataTable
      :value="clients"
      v-model:filters="filters1"
      responsiveLayout="scroll"
      filterDisplay="menu"
    >
      <template #header>
        <div class="p-d-flex p-jc-between">
          <div class="p-d-flex p-ai-center">
            <Button
              icon="pi pi-refresh"
              @click="refresh"
              class="p-button-outlined p-button-rounded p-mx-2"
            />
            <Button
              type="button"
              icon="pi pi-filter-slash"
              label="Clear"
              class="p-button-outlined"
              @click="clearFilter1()"
            />
          </div>

          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText
              v-model="filters1['global'].value"
              placeholder="Keyword Search"
            />
          </span>
        </div>
      </template>
      <Column field="firstName" header="First Name">
        <template #body="{ data }">
          {{ data.firstName }}
        </template>
        <template #filter="{ filterModel }">
          <InputText
            type="text"
            v-model="filterModel.value"
            class="p-column-filter"
            placeholder="Search by first name"
          />
        </template>
      </Column>
      <Column field="lastName" header="Last Name">
        <template #body="{ data }">
          {{ data.lastName }}
        </template>
        <template #filter="{ filterModel }">
          <InputText
            type="text"
            v-model="filterModel.value"
            class="p-column-filter"
            placeholder="Search by last name"
          /> </template
      ></Column>
      <Column field="email" header="Email">
        <template #body="{ data }">
          {{ data.email }}
        </template>
        <template #filter="{ filterModel }">
          <InputText
            type="text"
            v-model="filterModel.value"
            class="p-column-filter"
            placeholder="Search by email"
          /> </template
      ></Column>
      <Column :exportable="false">
        <template #body="slotProps">
          <Button
            icon="pi pi-eye"
            class="p-button-rounded p-button-success p-mr-2"
            @click="showViewClient(slotProps.data)"
          />
          <Button
            icon="pi pi-trash"
            class="p-button-rounded p-button-warning"
            @click="confirmDeleteProduct(slotProps.data)"
          />
        </template>
      </Column>
      <template #empty> No Clients Found. </template>
    </DataTable>
    <view-client
      :visible="viewClient"
      :client="client"
      v-on:closeViewClient="closeEdit"
    />
  </div>
</template>

<script>
import { ref, onBeforeMount } from "vue";
import { useStore } from "vuex";
import ViewClient from "../components/modals/viewClient.vue";
import { FilterMatchMode, FilterOperator } from "primevue/api";
export default {
  components: { ViewClient },
  setup() {
    const store = useStore();
    let client = ref(store.getters.client);
    let viewClient = ref(false);
    let clients = ref([]);
    let cols = ref([
      { field: "firstName", header: "First Name" },
      { field: "lastName", header: "Last Name" },
      { field: "email", header: "Email" },
    ]);
    const loading = ref(true);

    onBeforeMount(() => {
      clients.value = store.state.clients;
      loading.value = false;
    });

    const showViewClient = (data) => {
      viewClient.value = true;
      client.value = data;
      store.commit("setClient", data);
    };

    const refresh = async () => {
      await store.dispatch("getClients");
      clients.value = store.getters.clients;
    };
    const closeEdit = () => {
      viewClient.value = false;
    };

    const clearFilter1 = () => {
      filters1.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        firstName: {
          operator: FilterOperator.AND,
          constraints: [
            { value: null, matchMode: FilterMatchMode.STARTS_WITH },
          ],
        },
        lastName: {
          operator: FilterOperator.AND,
          constraints: [
            { value: null, matchMode: FilterMatchMode.STARTS_WITH },
          ],
        },
        email: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
        },
      };
    };

    const filters1 = ref({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      firstName: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      lastName: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      email: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
      },
    });

    return {
      clients,
      loading,
      cols,
      showViewClient,
      client,
      viewClient,
      closeEdit,
      filters1,
      clearFilter1,
      refresh,
    };
  },
};
</script>
*/ //
<style scoped></style>
*/
