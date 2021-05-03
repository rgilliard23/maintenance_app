<template>
  <div>
    <Dialog
      v-bind:visible="visible"
      :style="{ width: '50vw' }"
      :closable="false"
      :modal="true"
    >
      <template #header>
        <div>
          <h3>Create Task</h3>
        </div>
      </template>
      <div class="p-fluid">
        <div class="p-field">
          <label for="firstname">Header</label>
          <InputText id="firstname" v-model="firstName" type="text" />
        </div>
        <div class="p-field">
          <label for="lastname">Description</label>
          <Textarea v-model="description" rows="5" cols="30" />
        </div>
        <label for="calendar">Due Date</label>
        <Calendar
          label="Due Date"
          :inline="true"
          v-model="dateDue"
          :showWeek="true"
        />
      </div>
      <template #footer>
        <Button
          label="Cancel"
          icon="pi pi-times"
          @click="close"
          class="p-button-text"
        />
        <Button
          label="Create Task"
          icon="pi pi-check"
          @click="createClient"
          autofocus
        />
      </template>
    </Dialog>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { ref } from "@vue/reactivity";

export default {
  props: {
    visible: {
      required: true,
      type: Boolean,
    },
  },
  setup(props, { emit }) {
    let store = useStore();
    let header = ref("");
    let description = ref("");
    let dateDue = ref(null);

    const close = () => {
      emit("close");
    };

    const createTask = () => {
      let task = {
        header: header.value,
        description: description.value,
        dateDue: dateDue.value,
      };
      store.dispatch("createTask", task);
      close();
    };

    return {
      close,
      header,
      description,
      dateDue,
      createTask,
    };
  },
};
</script>
