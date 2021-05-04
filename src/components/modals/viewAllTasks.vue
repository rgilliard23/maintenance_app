<template>
  <div>
    <Sidebar
      v-bind:visible="visible"
      :baseZIndex="6"
      position="full"
      v-on:update:visible="$emit('closeViewTasks', $event)"
    >
      <h2>All Tasks</h2>
      <Tasks :tasks="tasks" />
    </Sidebar>
    <Toast />
  </div>
</template>

<script>
import Tasks from "../data-tables/tasks";

export default {
  components: { Tasks },
  props: {
    visible: {
      required: true,
      type: Boolean,
    },
    tasks: {
      required: true,
    },
  },
  setup(props, { emit }) {
    const close = () => {
      emit("close");
    };

    return {
      close,
    };
  },
};
</script>
