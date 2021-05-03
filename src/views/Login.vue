<template>
  <div class="login">
    <h1 class="title">Login</h1>
    <div class="card">
      <label for="dynamic-label-input">Enter some text</label>
      <form @submit.prevent="Login">
        <input type="text" placeholder="Username" v-model="email" />
        <input type="text" placeholder="Password" v-model="password" />
        <input type="submit" value="Login" />
        <p>
          Need An Account?
          <router-link to="/register">Register Here</router-link>
        </p>
      </form>
    </div>
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
}
.title {
  color: #838383;
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
