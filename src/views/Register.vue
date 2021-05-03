<template>
  <div class="register">
    <h1 class="title">Register</h1>
    <div class="card">
      <label for="dynamic-label-input">Enter some text</label>
      <form @submit.prevent="Register">
        <input type="text" placeholder="Username" v-model="email" />
        <input type="text" placeholder="Password" v-model="password" />
        <input type="submit" value="register" />
        <p>
          Already Have An Account?
          <router-link to="/login">Login Here</router-link>
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
    const store = useStore();
    const email = ref("");
    const password = ref("");

    const Register = () => {
      store.dispatch("signUpAction", {
        email: email.value,
        password: password.value,
      });
    };

    return { Register, email, password };
  },
};
</script>

<style scoped>
.register {
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
