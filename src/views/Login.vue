<template>
  <div class="login">
    <h1 class="title">Login</h1>
    <Card>
      <template #content>
        <form @submit.prevent="Login">
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
          <Button label="Login" type="submit" />
          <p>
            Need An Account?
            <router-link to="/register">Register Here</router-link>
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
    const email = ref("");
    const password = ref("");
    const store = useStore();
    const Login = () => {
      store.dispatch("signInAction", {
        email: email.value,
        password: password.value,
      });
    };

    return { Login, email, password };
  },
};
</script>

<style scoped>
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #00e0f0;
}
.title {
  color: white;
}

.input {
  margin: 0 50px;
}
.card {
  display: flex;
  flex-direction: column;
  /* position: fixed; */
  /* top: 50%;
  left: 50%;
  /* bring your own prefixes */
  /* transform: translate(-50%, -50%); */
  height: 500px;
  width: 500px;
  background-color: whitesmoke;
}

.row {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

h1 {
  color: red;
}
</style>
