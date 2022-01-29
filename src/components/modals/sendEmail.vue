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
          <!-- <Chips v-model="emailRecipient" /> -->
          <InputText
            v-model="emailRecipient"
            type="text"
            placeholder="email@email.com"
          />
        </div>
        <div class="p-inputgroup p-md-4">
          <span class="p-inputgroup-addon">Email Template</span>
          <Dropdown
            v-model="templateID"
            :options="userProfile.emailTemplateIds"
            optionLabel="name"
          />
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
            <Textarea
              placeholder="Subject"
              v-model="message"
              rows="5"
              cols="30"
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
      <Toast />
    </Dialog>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { defineComponent, computed } from "vue";
import { useToast } from "primevue/usetoast";

export default defineComponent({
  props: {
    visible: {
      required: true,
    },
  },

  setup(props, { emit }) {
    const store = useStore();
    const toast = useToast();
    let userProfile = computed(() => store.getters.userProfile);
    let templateID = ref();
    let emailRecipient = ref();
    let subject = ref();
    let message = ref();

    const close = () => {
      emit("close");
    };

    const sendEmail = () => {
      console.log(emailRecipient.value);

      // let template = templateID.value;

      let email = {
        to_email: emailRecipient.value,
        subject: subject.value,
        message: message.value,
      };

      store
        .dispatch("sendEmail", email)
        .then(() => {
          toast.add({
            severity: "success",
            summary: "Successfully Sent Email",
            life: 3000,
          });
        })
        .catch((err) => {
          toast.add({
            severity: "error",
            summary: "There Was A Problem Sending Email",
            detail: err,
            life: 3000,
          });
        });

      close();
    };

    return {
      close,
      sendEmail,
      subject,
      emailRecipient,
      message,
      userProfile,
      templateID,
    };
  },
});
</script>
