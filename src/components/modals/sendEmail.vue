<template>
  <div>
    <Dialog
      :visible="visible"
      :breakpoints="{ '960px': '75vw' }"
      :style="{ width: '80vw' }"
    >
      <template #header>
        <div>
          <h3>Send Email</h3>
        </div>
      </template>

      <div class="p-fluid">
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">To:</span>
          <Chips v-model="emailRecipient" />
        </div>
        <div class="p-col-12 p-md-4">
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">Subject:</span>
            <InputText v-model="subject" type="text" />
          </div>
        </div>
        <div class="p-col-12 p-md-4">
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">Message:</span>
            <TextArea
              placeholder="Subject"
              v-model="subject"
              rows="5"
              columns="30"
            />
          </div>
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
          label="Send Email"
          icon="pi pi-check"
          @click="sendEmail"
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
    let emailRecipient = ref();
    let subject = ref();
    let message = ref();

    const close = () => {
      emit("close");
    };

    const sendEmail = () => {};

    return { close, sendEmail, subject, emailRecipient, message };
  },
};
</script>
