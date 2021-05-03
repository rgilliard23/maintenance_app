<template>
  <div>
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <h2>Create Client</h2>
          </div>
          <!-- <form> -->
          <form action="" @submit="createClient">
            <div class="modal-body">
              <input type="text" placeholder="First Name" v-model="firstName" />
              <input type="text" placeholder="Last Name" v-model="lastName" />
              <input type="text" placeholder="Email" v-model="email" />
              <input
                type="text"
                placeholder="Phone Number"
                v-model="phoneNumber"
              />
              <select
                name="maintenanceSelect"
                id="maintenanceSelect"
                v-model="maintenancePlan"
              >
                <option value="basic">Maintenance Basic</option>
                <option value="elite">Maintenance Elite</option>
                <option value="business">Maintenance Business</option>
                <option value="enterprise">Maintenance Enterprise</option>
              </select>
              <input
                type="number"
                id="maintenanceHours"
                name="maintenanceHours"
                min="1"
                max="5"
                value="2"
                step="1"
              />
            </div>

            <div class="modal-footer">
              <input
                type="submit"
                v-on:click="createClient"
                value="Create Client"
              />
              <button v-on:click="closeModal">Close</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";

export default {
  name: "CreateClient",
  setup(props, { emit }) {
    // access to the vuex store
    const store = useStore();

    //field vars
    const firstName = ref("");
    const lastName = ref("");
    const email = ref("rgilliard7@gmail.com");
    const phoneNumber = ref("");
    const maintenancePlan = ref("");

    //methods manipulating dom
    const closeModal = () => {
      emit("close");
    };

    //form submission
    const createClient = (event) => {
      console.log("Ronald");

      let customer = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        phoneNumber: phoneNumber.value,
      };

      console.log(customer);
      store.dispatch("createClient", customer);
      event.preventDefault();
    };

    return {
      closeModal,
      createClient,
      firstName,
      lastName,
      email,
      phoneNumber,
      maintenancePlan,
    };
  },
};
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
