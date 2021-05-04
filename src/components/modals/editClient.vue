<template>
  <div>
    <Dialog v-bind:visible="modal" :style="{ width: '50vw' }">
      <template #header>
        <div>
          <h3>Edit Client</h3>
        </div>
      </template>
      <div class="p-fluid">
        <div class="p-field">
          <label for="firstname">First Name</label>
          <InputText id="firstname" v-model="newClient.firstName" type="text" />
        </div>
        <div class="p-field">
          <label for="lastname">Last Name</label>
          <InputText id="lastname" v-model="newClient.lastName" type="text" />
        </div>
        <div class="p-field">
          <label for="email">Email</label>
          <InputText id="email" v-model="newClient.email" type="text" />
        </div>

        <div class="p-field">
          <label for="Phone">Phone</label>
          <InputMask
            mask="(999) 999-9999"
            v-model="newClient.phoneNumber"
            placeholder="(999) 999-9999"
          />
        </div>
        <div class="p-field">
          <label for="maintenancePlans">Select a Maintenance Plan</label>
          <Dropdown
            v-model="newClient.selectedMaintenancePlan"
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
        <Button label="Yes" icon="pi pi-check" @click="editClient" autofocus />
      </template>
    </Dialog>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";

export default {
  props: {
    modal: {
      required: true,
      type: Boolean,
    },
    client: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    let newClient = ref({ ...props.client });
    console.log(newClient.value);
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

    const editClient = () => {
      console.log("edit");
    };

    return { close, maintenancePlans, editClient, newClient };
  },
};
</script>
