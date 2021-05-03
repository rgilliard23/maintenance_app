<template>
  <div>
    <Sidebar
      v-bind:visible="visible"
      :baseZIndex="5"
      position="full"
      v-on:update:visible="$emit('closeViewClient', $event)"
    >
      <div>
        <h2 class="center">Client Information</h2>
        <div class="p-grid">
          <div class="p-col">
            <div class="p-d-flex p-flex-column p-ai-center">
              <Avatar icon="pi pi-user" size="xlarge" />
              <h2 class="p-my-4">
                {{ client.firstName + " " + client.lastName }}
              </h2>
              <div class="p-mb-4">
                <Chip :label="client.selectedMaintenancePlan.name" />
              </div>
              <div class="p-d-flex p-flex-md-row">
                <Button
                  label="Send Email"
                  class="p-button-raised p-button-rounded p-mr-2"
                />
                <Button
                  label="Send Report "
                  class="p-button-raised p-button-rounded p-ml-2"
                />
              </div>
            </div>
          </div>
          <div class="p-col">
            <div class="p-d-flex p-flex-row p-ai-center p-mr-2">
              <h4>Open Tasks: {{ client.tasks.length }}</h4>
              <Button
                label="Create Task"
                @click="showCreateTask"
                class="p-button-raised p-button-rounded p-mx-4 p-my-4"
              />
              <Button
                label="View All Tasks"
                class="p-button-raised p-button-rounded p-mx-4 p-my-4"
              />
            </div>
            <hr />
            <h4>Personal Info</h4>
            <div class="p-d-flex p-flex-row p-jc-start">
              <h4>Email: {{ client.email }}</h4>
              <h4 class="p-ml-4">Phone Number: {{ client.phoneNumber }}</h4>
            </div>
          </div>
        </div>

        <hr />
        <h4>Tasks</h4>
        <create-task :visible="createTask" v-on:close="closeCreateTask" />
      </div>
    </Sidebar>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import CreateTask from "../modals/createTask";

export default {
  components: {
    CreateTask,
  },
  props: {
    visible: {
      required: true,
    },
    client: {
      required: true,
    },
  },
  setup() {
    let createTask = ref(false);

    const showCreateTask = () => {
      createTask.value = true;
    };

    const closeCreateTask = () => {
      createTask.value = false;
    };

    return { createTask, showCreateTask, closeCreateTask };
  },
};
</script>

<style scoped>
.center {
  margin: 0 auto;
}
</style>
