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
          <label class="my-4" for="firstname">Header</label>
          <InputText id="firstname" v-model="header" type="text" />
        </div>
        <div class="p-field">
          <label class="my-4" for="lastname">Description</label>
          <Textarea v-model="description" rows="5" cols="30" />
        </div>
        <div class="p-field">
          <label class="my-4" for="calendar">Due Date</label>
          <Calendar
            label="Due Date"
            :showTime="true"
            hourFormat="12"
            v-model="dateDue"
            yearNavigator="true"
            monthNavigator="true"
            :showWeek="true"
          />
        </div>

        <div class="my-4 p-field">
          <label for="timeEstimated">Time To Complete</label>
          <InputNumber
            suffix="min"
            v-model="timeToComplete"
            showButtons
            name="timeToComplete"
            step="15"
            id="timeToComplete"
          />
        </div>
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
          @click="createTask"
          autofocus
        />
      </template>
    </Dialog>
    <Toast :baseZIndex="50" />
  </div>
</template>

<script>
import { useStore } from "vuex";
import { ref } from "@vue/reactivity";
import firebase from "firebase/app";
import { useToast } from "primevue/usetoast";

export default {
  props: {
    visible: {
      required: true,
      type: Boolean,
    },
    client: {
      required: true,
      type: Boolean,
    },
  },
  setup(props, { emit }) {
    let store = useStore();
    let header = ref("");
    let description = ref("");
    let dateDue = ref(null);
    let timeToComplete = ref(0);
    const toast = useToast();

    const close = () => {
      emit("close");
    };

    const createTask = () => {
      let task = {
        header: header.value,
        description: description.value,
        dateDue: dateDue.value,
        dateCreated: firebase.firestore.Timestamp.now(),
        dateCompleted: null,
        timeToComplete: timeToComplete.value,
        status: "open",
        user: store.getters.user.uid,
        client: props.client.id,
      };

      store
        .dispatch("createTask", task)
        .then(() => {
          toast.add({
            severity: "success",
            summary: "Successfully Created Task",
            life: 3000,
          });
          emit("createdTask");
        })
        .catch((err) => {
          toast.add({
            severity: "warning",
            summary: "Cannot Create Task",
            detail: err,
            life: 3000,
          });
        });
      close();
    };

    return {
      close,
      header,
      description,
      dateDue,
      createTask,
      timeToComplete,
    };
  },
};
</script>
