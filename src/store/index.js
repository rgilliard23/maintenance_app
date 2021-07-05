import { createStore } from "vuex";
import firebase from "firebase/app";
import createPersistedState from "vuex-persistedstate";
import * as Cookies from "js-cookie";

import * as emailjs from "emailjs-com";

export default createStore({
  state: {
    /** @type {firebase.User} */
    user: null,
    /** @type {firebase.app.App} */
    firebaseApp: null,
    notifications: [],
    currentComponent: "Home",
    clients: [],
    client: {},
    tasks: [],
    userProfile: null,
    doc: "",
  },
  mutations: {
    //* user mutations
    setUser(state, payload) {
      state.user = payload;
    },

    removeUser(state) {
      state.user = null;
    },

    setUserProfile(state, payload) {
      state.userProfile = payload;
    },
    removeUserProfile(state) {
      state.userProfile = null;
    },

    setFirebaseApp(state, payload) {
      state.firebaseApp = payload;
    },

    removeFirebaseApp(state) {
      state.firebaseApp = null;
    },

    setCurrentComponent(state, payload) {
      state.currentComponent = payload;
    },
    setClients(state, payload) {
      state.clients = payload;
    },
    setTasks(state, payload) {
      state.tasks = payload;
    },

    setDoc(state, payload) {
      state.doc = payload;
    },

    setClient(state, payload) {
      state.client = payload;
    },
  },
  actions: {
    signInAction({ commit, state }, payload) {
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then((res) => {
          commit("setUser", res.user);
        })
        .then(async () => {
          let db = state.firebaseApp.firestore();
          let userCollection = db.collection("users");
          let userRef = userCollection.doc(state.user.uid);
          let userProfile = await userRef
            .get()
            .then((doc) => doc.data())
            .catch((err) => {
              alert(err);
            });
          commit("setUserProfile", userProfile);
          if (userProfile.emailUserID !== null) {
            console.log("howdy");
            emailjs.init("user_rC1Q9sVoIa3G5xCq6L6OR");
          }
        })
        .catch((err) => alert(err));
    },

    signUpAction({ commit, state }, payload) {
      let userProfile = {
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        emailServiceId: null,
        emailTemplateIds: [],
        emailUserID: null,
        showIntro: true,
      };

      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then((res) => {
          commit("setUser", res.user);
          state.firebaseApp
            .firestore()
            .collection("users")
            .doc(state.user.uid)
            .set({
              firstName: payload.firstName,
              lastName: payload.lastName,
              email: payload.email,
              emailServiceId: null,
              emailTemplateIds: [],
              emailUserID: null,
              showIntro: true,
              darkMode: false,
            });

          commit("setUserProfile", userProfile);
        })
        .catch((err) => alert(err));
    },

    signOutAction({ commit }) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          commit("removeUser");
          commit("removeFirebaseApp");
        })
        .catch((err) => alert(err));
    },

    checkUserStatus({ commit }) {
      return new Promise((resolve, reject) => {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            commit("setUser", user);
            resolve(user);
          } else {
            reject("User is not logged in.");
          }
        });
      });
    },

    createClient(context, payload) {
      let db = context.state.firebaseApp.firestore();
      let clientCollection = db.collection("clients");

      return new Promise((resolve, reject) => {
        clientCollection
          .add(payload)
          .then((docRef) => {
            docRef.update({ id: docRef.id }).then((res) => resolve(res));
          })
          .catch((err) => {
            console.error("Error createDocument: ", err);
            reject(err);
          });
      });
    },
    editClient(context, payload) {
      console.log(payload);

      let db = context.state.firebaseApp.firestore();
      let clientCollection = db.collection("clients");
      return clientCollection.doc(context.state.doc).set(payload);
    },
    async getClients(context) {
      let db = context.state.firebaseApp.firestore();
      let clientCollection = db.collection("clients");
      const clients = await clientCollection
        .where("user", "==", context.state.user.uid)
        .get();
      context.commit(
        "setClients",
        clients.docs.map((elm) => elm.data())
      );
    },
    createTask(context, payload) {
      const { increment } = firebase.firestore.FieldValue;

      let db = context.state.firebaseApp.firestore();
      let taskCollection = db.collection("tasks");
      let clientCollection = db.collection("clients");

      return new Promise((resolve, reject) => {
        taskCollection
          .add(payload)
          .then((doc) => {
            doc.update({ id: doc.id });
          })
          .then(() => {
            resolve(
              clientCollection
                .doc(payload.client)
                .update({ openTasks: increment(1) })
            );
          })
          .catch((err) => {
            console.error("Error Creating Task: ", err);
            reject(err);
          });
      });
    },

    async getTasks(context) {
      let db = context.state.firebaseApp.firestore();
      let taskCollection = db.collection("tasks");
      const tasks = await taskCollection
        .where("user", "==", context.state.user.uid)
        .get();
      if (!tasks.empty) {
        context.commit(
          "setTasks",
          tasks.docs.map((task) => task.data())
        );
      }
    },

    getTasksFromClient({ state }, payload) {
      let db = state.firebaseApp.firestore();
      let tasksCollection = db.collection("tasks");

      return new Promise((resolve, reject) => {
        tasksCollection
          .where("id", "==", payload.clientID)
          .get()
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    async deleteClient(context, payload) {
      let db = context.state.firebaseApp.firestore();
      let clientCollection = db.collection("clients");
      let taskQuery = db.collection("tasks").where("client", "==", payload);

      return new Promise((resolve, reject) => {
        clientCollection
          .doc(payload)
          .delete()
          .then(() => {})
          .then(() => {
            taskQuery
              .get()
              .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  doc.ref.delete();
                });
              })
              .finally((res) => {
                resolve(res);
              });
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    updateUserProfile({ state, commit }, payload) {
      let db = state.firebaseApp.firestore();
      let userCollection = db.collection("users");
      return new Promise((resolve, reject) => {
        console.log(payload);
        userCollection
          .doc(state.user.uid)
          .set(payload)
          .then((doc) => {
            commit("setUserProfile", payload);
            resolve(doc);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    sendEmail({ state }, payload) {
      return new Promise((resolve, reject) => {
        const sendEmailCallable = state.firebaseApp
          .functions()
          .httpsCallable("sendEmail");
        sendEmailCallable(payload)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    updateTask({ state }, payload) {
      let db = state.firebaseApp.firestore();
      let tasksCollection = db.collection("tasks");
      let task = payload.task;
      return new Promise((resolve, reject) => {
        tasksCollection
          .doc(task.id)
          .update(task)
          .then(() => {
            const sendUpdateTaskEmail = state.firebaseApp
              .functions()
              .httpsCallable("sendTaskUpdateEmail");
            sendUpdateTaskEmail(payload).then((res) => {
              resolve(res);
            });
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
    client(state) {
      return state.client;
    },
    clients(state) {
      return state.clients;
    },
    tasks(state) {
      return state.tasks;
    },
    userProfile(state) {
      return state.userProfile;
    },
  },
  modules: {},
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
      getState: (key) => Cookies.getJSON(key),
      setState: (key, state) =>
        Cookies.set(key, state, { expires: 3, secure: true }),
    }),
  ],
});
