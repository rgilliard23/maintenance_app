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
        <div class="p-field">
          <label class="my-4" for="calendar">Due Date</label>
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
          @click="createTask"
          autofocus
        />
      </template>
    </Dialog>
  </div>
</template>

<script>
import { ref, computed } from "@vue/reactivity";
// import moment from "moment";
export default {
  props: {
    visible: {
      required: true,
    },
    task: {
      required: true,
    },
  },
  setup(props, { emit }) {
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

    return {
      edit,
      newTask,
      close,
      editTask,
      dateCreated,
      dueDate,
    };
  },
};
</script>
