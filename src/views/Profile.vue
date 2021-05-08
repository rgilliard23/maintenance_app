<template>
  <div class="p-grid">
    <div class="p-col">
      <h2>Personal Information</h2>
      <div>
        <h5>First Name:</h5>
        <InputText
          v-if="userProfile.firstName"
          v-model="userProfile.firstName"
        />
      </div>
      <div>
        <h5>Last Name:</h5>
        <InputText v-model="userProfile.lastName" />
      </div>
      <div>
        <h5>Email:</h5>
        <InputText v-model="userProfile.email" />
      </div>
      <h2>Email Js</h2>
      <div>
        <h5>User ID:</h5>
        <InputText v-model="userProfile.emailUserID" />
      </div>
      <div>
        <h5>Service ID:</h5>
        <InputText v-model="userProfile.emailServiceId" />
      </div>
      <div>
        <h5>Template ID's:</h5>
        <Listbox
          v-model="templateID"
          :options="userProfile.emailTemplateIds"
          optionLabel="name"
        />
        <Button @click="showAddTemplateID" label="Add Template ID" />
      </div>
      <div class="p-mx-auto p-mt-4">
        <h3>Save Changes</h3>
        <Button @click="saveChanges" label="Save Changes" class="p-button-lg" />
      </div>
    </div>
    <AddTemplateID
      :visible="visible"
      v-on:close="closeAddTemplateID"
      v-on:addTemplateID="addTemplate"
    />

    <Toast />
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed, ref } from "@vue/runtime-core";
import { defineComponent } from "vue";
import { useToast } from "primevue/usetoast";
//* Components
import AddTemplateID from "../components/modals/addTemplateID";
export default defineComponent({
  components: {
    AddTemplateID,
  },
  setup() {
    const store = useStore();
    const toast = useToast();
    let visible = ref(false);
    let userProfile = computed(() => store.getters.userProfile);
    let templateID = ref();

    const showAddTemplateID = () => {
      visible.value = true;
    };

    const closeAddTemplateID = () => {
      visible.value = false;
    };

    const saveChanges = () => {
      store.dispatch("updateUserProfile", userProfile.value).then(() => {
        toast.add({
          severity: "success",
          summary: "Successfully Saved Changes",
          life: 3000,
        });
      });
    };

    const addTemplate = (template) => {
      userProfile.value.emailTemplateIds.push(template);
    };

    return {
      userProfile,
      visible,
      showAddTemplateID,
      closeAddTemplateID,
      saveChanges,
      addTemplate,
      templateID,
    };
  },
});
</script>
