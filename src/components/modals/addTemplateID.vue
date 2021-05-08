<template>
  <div class="p-field-flex p-flex-column p-ai-center">
    <Dialog
      v-bind:visible="visible"
      :style="{ width: '50vw' }"
      :closable="false"
      :modal="true"
    >
      <template #header>
        <h2>Add Template ID</h2>
      </template>
      <div>
        <h5>Name of Template</h5>
        <InputText v-model="templateName" />
      </div>
      <div>
        <h5>Template ID</h5>
        <InputText v-model="templateID" />
      </div>
      <template #footer>
        <Button
          label="Cancel"
          icon="pi pi-times"
          @click="close"
          class="p-button-text"
        />
        <Button
          label="Add Template"
          icon="pi pi-check"
          @click="addTemplateID"
          autofocus
        />
      </template>
    </Dialog>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
export default {
  props: {
    visible: {
      required: true,
    },
  },
  setup(props, { emit }) {
    let templateID = ref("");
    let templateName = ref("");
    const addTemplateID = () => {
      let template = {
        name: templateName.value,
        templateID: templateID.value,
      };
      emit("addTemplateID", template);
    };
    const close = () => {
      emit("close");
    };

    return {
      templateID,
      templateName,
      addTemplateID,
      close,
    };
  },
};
</script>
