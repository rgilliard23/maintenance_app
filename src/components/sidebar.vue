<template>
  <div class="sidebar">
    <h3 class="title">Simple Sidebar</h3>
    <div class="menu-items">
      <router-link
        to="/"
        @click="showComponent('Home')"
        active-class="active"
        tag="button"
        class="side-btn"
      >
        <div class="link-container">Home</div>
      </router-link>
      <router-link
        to="/"
        @click="showComponent('Clients')"
        active-class="active"
        tag="button"
        class="side-btn"
      >
        <div class="link-container">Clients</div>
      </router-link>
      <router-link
        to="/"
        @click="showComponent('Profile')"
        active-class="active"
        tag="button"
        class="side-btn"
      >
        <div class="link-container">Profile</div>
      </router-link>
      <div class="side-btn" v-on:click="Logout">
        <div class="link-container">Logout</div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();

    const Logout = () => {
      firebase
        .auth()
        .signOut()
        .then((res) => console.log(res))
        .catch((err) => alert(err));
    };

    const showComponent = (currentComponent) => {
      store.commit("setCurrentComponent", currentComponent);
    };
    return { Logout, showComponent };
  },
};
</script>

<style scoped>
.title {
  color: white;
  font-size: 24px;
  margin-top: 10px;
}

.menu-items {
  display: flex;
  flex-direction: column;
  margin: 0 30px;
}

.menu-items > * {
  margin-top: 60px;
}

.side-btn {
  text-decoration: none;
  border: none;
  padding: 20px 0;
  cursor: pointer;
  font-size: 16px;
}

.side-btn.active {
  background-color: white;
  color: #8e8e8e;
  border-bottom-right-radius: 40px;
  border-top-left-radius: 40px;
}
.side-btn:focus {
  outline: none;
}
</style>
