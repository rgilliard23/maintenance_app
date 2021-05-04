<template>
  <div>
    <Dialog v-bind:visible="visible" :style="{ width: '50vw' }">
      <template #header>
        <div class="p-d-flex p-jc-between">
          <h3>View Task</h3>
          <div>
            <h2>Edit</h2>
            <InputSwitch v-model="edit" />
          </div>
        </div>
      </template>
      <div class="p-fluid">
        <div class="p-field">
          <label for="firstname">Task Title</label>
          <InputText
            v-if="edit"
            id="firstname"
            v-model="newTask.header"
            type="text"
          />
          <h3 v-if="!edit">newTask.header</h3>
        </div>
        <div class="p-field">
          <label for="lastname">Task Description</label>
          <!-- <TextArea
            v-if="edit"
            v-model="newTask.description"
            autoResize="true"
            rows="5"
            cols="30"
          /> -->
          <p v-if="!edit">task.description</p>
        </div>
        <div class="p-field">
          <label for="dateCreated">Date Created</label>
          <!-- <Calendar :value="moment(new Date(newTask.dateDue.seconds * 1000))" /> -->
          <!-- <h2>{{ moment(new Date(newTask.dateCreated.seconds * 1000)) }}</h2> -->
        </div>
        <div class="p-field">
          <label for="dateCreated">Date Due</label>
          <!-- <Calendar :value="moment(new Date(newTask.dateDue.seconds * 1000))" /> -->
          <!-- <h2>{{ moment(new Date(newTask.dateDue.seconds * 1000)) }}</h2> -->
        </div>
      </div>
      <template #footer>
        <Button
          label="No"
          icon="pi pi-times"
          @click="close"
          class="p-button-text"
        />
        <Button label="Yes" icon="pi pi-check" @click="editTask" autofocus />
      </template>
    </Dialog>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import moment from "moment";
export default {
  props: {
    visible: {
      required: true,
    },
    task: {
      required: true,
    },
  },
  setup(props) {
    let edit = ref(false);
    let newTask = ref(props.task);
    const editTask = () => {};
    const close = () => {};
    return { newTask, editTask, close, moment, edit };
  },
};
</script>

<style scoped></style>
