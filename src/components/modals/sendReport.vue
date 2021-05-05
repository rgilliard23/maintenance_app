<template>
  <div>
    <Dialog
      v-bind:visible="visible"
      :style="{ width: '60vw' }"
      :closable="false"
      :modal="true"
    >
      <template #header>
        <div>
          <h3>Send Report</h3>
        </div>
      </template>
      <ckeditor
        :editor="editor"
        v-model="editorData"
        :config="editorConfig"
      ></ckeditor>
      <template #footer>
        <Button
          label="Cancel"
          icon="pi pi-times"
          @click="close"
          class="p-button-text"
        />
        <Button
          label="Create Report"
          icon="pi pi-check"
          @click="createReport"
          autofocus
        />
      </template>
    </Dialog>
  </div>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ref } from "@vue/reactivity";
export default {
  props: {
    visible: {
      required: true,
    },
  },
  setup(props, { emit }) {
    let editorData = ref();
    let editorConfig = ref({});
    let editor = ClassicEditor;

    const close = () => {
      emit("close");
    };
    const createReport = () => {};
    return { editorData, editorConfig, editor, close, createReport };
  },
};
</script>
