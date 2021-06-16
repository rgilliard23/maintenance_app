//
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
          <h3>View Task</h3>
          <h3 v-if="edit">Edit Task</h3>
        </div>
      </template>

      <div class="p-fluid">
        <div class="p-field">
          <label class="my-4" for="firstname">Header</label>
          <InputText id="firstname" v-model="newTask.header" type="text" />
        </div>
        <div class="p-field">
          <label class="my-4" for="lastname">Description</label>
          <Textarea v-model="newTask.description" rows="5" cols="30" />
        </div>

        <div class="p-field">
          <label class="my-4" for="calendar">Date Created</label>
          <Calendar
            label="Date Created"
            :showTime="true"
            hourFormat="12"
            v-model="dateCreated"
            yearNavigator="true"
            monthNavigator="true"
            :showWeek="true"
          />
        </div>
        <div class="p-field">
          <label class="my-4" for="calendar">Due Date</label>
          <Calendar
            label="Due Date"
            :showTime="true"
            hourFormat="12"
            v-model="dueDate"
            yearNavigator="true"
            monthNavigator="true"
            :showWeek="true"
          />
        </div>
        <div class="my-4 p-field">
          <label for="timeEstimated">Time To Complete</label>
          <InputNumber
            suffix="min"
            v-model="newTask.timeToComplete"
            showButtons
            name="timeToComplete"
            step="15"
            id="timeToComplete"
          />
        </div>
        <Dropdown
          :options="statuses"
          v-model="newTask.status"
          optionLabel="status"
          optionValue="status"
          placeholder="Set Status"
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
          label="Update Task"
          icon="pi pi-check"
          @click="updateTask"
          autofocus
        />
      </template>
    </Dialog>
    <Toast />
  </div>
</template>

<script>
import { ref, computed } from "@vue/reactivity";
import { useStore } from "vuex";
import { useToast } from "primevue/usetoast";
// import moment from "moment";
export default {
  props: {
    visible: {
      required: true,
    },
    client: {
      required: true,
    },
    task: {
      required: true,
    },
  },
  setup(props, { emit }) {
    const store = useStore();
    const toast = useToast();

    let newTask = computed(() => props.task);
    let dateCreated = computed(() => {
      return new Date(props.task.dateCreated.seconds * 1000);
    });
    let dueDate = computed(() => {
      return new Date(props.task.dateDue.seconds * 1000);
    });
    let edit = ref(false);

    const close = () => {
      emit("close");
    };
    const editTask = () => {
      edit.value = true;
    };

    const statuses = [
      { status: "Open" },
      { status: "In Progress" },
      { status: "Completed" },
    ];

    const updateTask = () => {
      let updatedTask = {
        client: newTask.value.client,
        dateCompleted: newTask.value.dateCompleted,
        dateDue: newTask.value.dateDue,
        dateCreated: newTask.value.dateCreated,
        description: newTask.value.description,
        header: newTask.value.header,
        status: newTask.value.status,
        timeToComplete: newTask.value.timeToComplete,
        id: newTask.value.id,
      };

      let obj = {
        status: updatedTask.status,
        to_email: props.client.email,
        task: updatedTask,
      };

      store.dispatch("updateTask", obj).then(() => {
        toast.add({
          severity: "success",
          summary: "Successfully Updated Task",
          life: 3000,
        });
      });
    };

    return {
      edit,
      newTask,
      close,
      editTask,
      dateCreated,
      dueDate,
      statuses,
      updateTask,
    };
  },
};
</script>
