<template>
  <div>
    <Sidebar
      v-bind:visible="visible"
      :baseZIndex="6"
      position="full"
      v-on:update:visible="$emit('closeViewTasks', $event)"
    >
      <h2>All Tasks</h2>
      <Tasks :tasks="tasks" :loading="loading" />
    </Sidebar>
    <Toast />
  </div>
</template>

<script>
import { onMounted, ref } from "@vue/runtime-core";
import Tasks from "../data-tables/tasks";
import { useStore } from "vuex";

export default {
  components: { Tasks },

  props: {
    visible: {
      required: true,
      type: Boolean,
    },
    client: {
      required: true,
    },
  },

  setup(props, { emit }) {
    let loading = ref(true);
    let store = useStore();
    let tasks = ref([]);
    onMounted(async () => {
      tasks.value = await store.dispatch("getTasksFromClient", {
        clientID: props.client.id,
      });
      console.log(tasks.value);
      loading.value = false;

      alert(tasks.value);
    });

    const close = () => {
      emit("close");
    };

    return {
      close,
      tasks,
    };
  },
};
</script>
