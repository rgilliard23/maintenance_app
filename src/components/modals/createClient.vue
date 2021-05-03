<template>
  <div>
    <Dialog v-bind:visible="modal" :style="{ width: '50vw' }" :closable="false">
      <template #header>
        <div>
          <h3>Create Client</h3>
        </div>
      </template>
      <div class="p-fluid">
        <div class="p-field">
          <label for="firstname">First Name</label>
          <InputText id="firstname" v-model="firstName" type="text" />
        </div>
        <div class="p-field">
          <label for="lastname">Last Name</label>
          <InputText id="lastname" v-model="lastName" type="text" />
        </div>
        <div class="p-field">
          <label for="email">Email</label>
          <InputText id="email" v-model="email" type="text" />
        </div>

        <div class="p-field">
          <label for="Phone">Phone</label>
          <InputMask
            mask="(999) 999-9999"
            v-model="phoneNumber"
            placeholder="(999) 999-9999"
          />
        </div>
        <div class="p-field">
          <label for="maintenancePlans">Select a Maintenance Plan</label>
          <Dropdown
            v-model="selectedMaintenancePlan"
            :options="maintenancePlans"
            optionLabel="name"
            placeholder="Select a Maintenance Plan"
          />
        </div>
      </div>
      <template #footer>
        <Button
          label="No"
          icon="pi pi-times"
          @click="close"
          class="p-button-text"
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          @click="createClient"
          autofocus
        />
      </template>
    </Dialog>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useStore } from "vuex";
import { ref } from "@vue/reactivity";
import { useToast } from "primevue/usetoast";

export default defineComponent({
  props: {
    modal: {
      required: true,
      type: Boolean,
    },
  },
  setup(props, { emit }) {
    const store = useStore();
    const toast = useToast();
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
    const close = () => {
      emit("close");
    };

    const createClient = () => {
      console.log("Ronald");

      let client = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        phoneNumber: phoneNumber.value,
        selectedMaintenancePlan: selectedMaintenancePlan.value,
        tasks: [],
      };

      store
        .dispatch("createClient", client)
        .then(() => {
          toast.add({
            severity: "success",
            summary: "Successfully Created Client",
            life: 3000,
          });
        })
        .catch((err) => {
          toast.add({
            severity: "warning",
            summary: "Cannot Create Client",
            detail: err,
            life: 3000,
          });
        });
      close();
    };

    return {
      close,
      maintenancePlans,
      createClient,
      selectedMaintenancePlan,
      email,
      firstName,
      lastName,
      phoneNumber,
    };
  },
});
</script>
