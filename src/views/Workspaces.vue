<template>
  <div class="p-d-flex p-flex-column p-ai-center p-my-4">
    <!-- <div v-if="loading">
      <LoadingSpinner />
    </div> -->

    <h1>WorkSpaces</h1>

    <div>
      <h2>Please Create A Workspace Or Join A Workspace</h2>
      <div class="p-d-flex p-jc-between">
        <Button class="p-mx-2" label="Create Workspace" />
        <Button class="p-mx-2" label="Join Workspace" />
      </div>
    </div>

    <ul class="list">
      <li class="listItem" v-for="workspace in workspaces" :key="workspace.ID">
        <div class="p-d-flex p-jc-around">
          <div><Avatar :label="firstLetter(workspace.Name)" /></div>

          <div @click="showWorkspace" class="workspaceName">
            {{ workspace.Name }}
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { onBeforeMount, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
// import LoadingSpinner from "../components/widgets/loadingpsinner.vue";

export default {
  components: {
    // LoadingSpinner,
  },
  setup() {
    let workspaces = ref([]);
    let store = useStore();
    let loading = ref(true);
    let userData = ref({});
    let showWorkspace = ref(false);

    onBeforeMount(() => {
      userData.value = store.getters.userProfile;
      workspaces.value = userData.value.workspaces;
    });

    const firstLetter = (val) => {
      return val.charAt(0);
    };

    const showWorkspaceView = () => {
      showWorkspace.value = !showWorkspaceView;
    };

    return { workspaces, loading, userData, firstLetter, showWorkspaceView };
  },
};
</script>

<style scoped>
.list {
  list-style-type: none;
  width: 75%;
}

.listItem {
  border-top: 1px solid white;
  border-bottom: 1px solid white;

  padding: 5px 0;
}

.workspaceName:hover {
  text-decoration: underline;
  cursor: pointer;
}
</style>
