<template>
  <div class="p-d-flex p-flex-column p-jc-center" style="height: 100vh">
    <h2 class="title">Register</h2>
    <Card class="p-shadow-4">
      <template #content>
        <form @submit.prevent="register">
          <div class="p-field">
            <div class="p-d-flex p-px-4">
              <div class="p-mx-2">
                <h5>Email</h5>
                <InputText v-model="email" placeholder="Email" />
              </div>
              <div class="p-mx-2">
                <h5>Password</h5>
                <Password
                  v-model="password"
                  placeholder="Password"
                  toggleMask
                />
              </div>
            </div>
          </div>

          <div class="p-field">
            <div class="p-d-flex p-px-4">
              <div class="p-mx-2 p-field">
                <h5>First Name</h5>
                <InputText v-model="firstName" placeholder="John" />
              </div>
              <div class="p-mx-2">
                <h5 for="email">Last Name</h5>
                <InputText v-model="lastName" placeholder="Doe" />
              </div>
            </div>
          </div>
          <Button label="Register" type="submit" />
          <p>
            Already Have An Account?
            <router-link to="/login">Login Here</router-link>
          </p>
        </form>
      </template>
    </Card>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const email = ref("");
    const password = ref("");
    let firstName = ref("");
    let lastName = ref("");

    const register = () => {
      store.dispatch("signUpAction", {
        email: email.value,
        password: password.value,
        firstName: firstName.value,
        lastName: lastName.value,
      });
    };

    return { register, email, password, firstName, lastName };
  },
};
</script>
