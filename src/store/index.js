import { createStore } from 'vuex'
import firebase from "firebase/app"
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'


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
    doc: "",
  },
  mutations: {
    //* user mutations
    setUser(state, payload) {
      state.user = payload
    },

    removeUser(state) {
      state.user = null
    },

    //* firebase mutations
    setFirebaseApp(state, payload) {
      state.firebaseApp = payload
    },

    removeFirebaseApp(state) {
      state.firebaseApp = null
    },

    setCurrentComponent(state, payload) {
      state.currentComponent = payload
    },
    setClients(state, payload) {
      state.clients = payload
    },
    setTasks(state, payload) {
      state.tasks = payload
    },

    setDoc(state, payload) {
      state.doc = payload
    },

    setClient(state, payload) {
      state.client = payload
    }

  },
  actions: {

    signInAction({ commit }, payload) {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password).then(res => {
        commit('setUser', res.user)
      }).catch(err => alert(err))

    },

    signUpAction({ commit }, payload) {
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password).then(res => {
        commit('setUser', res.user)
      }).catch(err => alert(err))
    },

    signOutAction({ commit },) {
      firebase.auth().signOut().then(() => {
        commit('removeUser')
        commit('removeFirebaseApp')
      }).catch(err => alert(err))
    },

    checkUserStatus({ commit },) {
      return new Promise((resolve, reject) => {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            commit('setUser', user);
            resolve(user);
          } else {
            reject('User is not logged in.');
          }
        });
      });
    },

    createClient(context, payload) {
      let db = context.state.firebaseApp.firestore()
      let clientCollection = db.collection("clients")

      return new Promise((resolve, reject) => {
        clientCollection.add(payload).then(docRef => {
          docRef.update({ "id": docRef.id }).then(res => resolve(res))
        }).catch(err => {
          console.error("Error createDocument: ", err);
          reject(err);
        })
      })
    },
    editClient(context, payload) {
      console.log(payload);

      let db = context.state.firebaseApp.firestore()
      let clientCollection = db.collection("clients")
      return clientCollection.doc(context.state.doc).set(payload)
    },
    async getClients(context,) {
      let db = context.state.firebaseApp.firestore()
      let clientCollection = db.collection("clients")
      const clients = await clientCollection.where('user', '==', context.state.user.uid).get();
      context.commit('setClients', clients.docs.map(elm => elm.data()))
    },
    createTask(context, payload,) {

      const { increment } = firebase.firestore.FieldValue

      let db = context.state.firebaseApp.firestore()
      let taskCollection = db.collection("tasks")
      let clientCollection = db.collection("clients")
      return new Promise((resolve, reject) => {
        taskCollection.add(payload).then(() => {
        }).then(() => {
          resolve(clientCollection.doc(payload.client).update({ openTasks: increment(1) }))
        }).catch(err => {
          console.error("Error Creating Task: ", err);
          reject(err);
        })
      })
    },

    async getTasks(context,) {
      let db = context.state.firebaseApp.firestore()
      let taskCollection = db.collection("tasks")
      const tasks = await taskCollection.where('user', '==', context.state.user.uid).get()
      if (!tasks.empty) {
        context.commit('setTasks', tasks.docs.map(task => task.data()))
      }

    }

  },
  getters: {
    user(state) {
      return state.user
    },
    client(state) {
      return state.client
    },
    clients(state) {
      return state.clients
    },
    tasks(state) {
      return state.tasks
    }
  },
  modules: {
  },
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
      getState: (key) => Cookies.getJSON(key),
      setState: (key, state) => Cookies.set(key, state, { expires: 3, secure: true }),

    })
  ]
})

