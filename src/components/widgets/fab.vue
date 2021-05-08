<template>
  <!-- Add Tool Tip -->
  <div>
    <create-client :modal="modal" v-on:close="showModal" />
    <Button
      icon="pi pi-plus"
      v-on:click="showModal"
      size="xl"
      class="p-button-rounded p-button-secondary"
    />
    <!-- <div class="fab"></div> -->
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
import CreateClient from "../modals/createClient.vue";

export default {
  components: { CreateClient },

  setup() {
    let store = useStore();

    let modal = ref(false);
    let selectedMaintenancePlan = ref({});
    let email = ref("");
    let phoneNumber = ref("");
    let firstName = ref("");
    let lastName = ref("");
    let maintenancePlans = [
      { name: "Maintenance Basic", hoursLeft: 120 * 60 },
      { name: "Maintenance Elite", hoursLeft: 180 * 60 },
      { name: "Maintenance Business", hoursLeft: 300 * 60 },
      {
        name: "Maintenance Enterprise",
        hoursLeft: 600 * 60,
      },
    ];

    const showModal = () => {
      modal.value = !modal.value;
    };

    const createClient = () => {
      let customer = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        phoneNumber: phoneNumber.value,
        selectedMaintenancePlan: selectedMaintenancePlan.value,
        tasks: [],
      };

      store.dispatch("createClient", customer);

      showModal();
    };

    return {
      modal,
      showModal,
      maintenancePlans,
      selectedMaintenancePlan,
      email,
      firstName,
      phoneNumber,
      lastName,
      createClient,
    };
  },
};
</script>

<style scoped></style>
