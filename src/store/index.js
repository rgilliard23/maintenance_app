import { createStore } from 'vuex'
import firebase from "firebase/app"

export default createStore({
  state: {
    /** @type {firebase.User} */
    user: null,
    /** @type {firebase.app.App} */
    firebaseApp: null,
    notifications: [],
    currentComponent: "Home",
    clients: [],
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

    createClient(context, payload) {

      let db = context.state.firebaseApp.firestore()
      let clientCollection = db.collection("clients")
      return clientCollection.add(payload).then(docRef => {
        return docRef.get()
      }).then(doc => {
        return { id: doc.id, ...doc.data() }
      }).catch(err => {
        console.error("Error createDocument: ", err);
        return { err };
      })
    },
    editClient(context, payload) {
      console.log(payload);

      let db = context.state.firebaseApp.firestore()
      let clientCollection = db.collection("clients")
      return clientCollection.add(payload)
    },
    async getClients(context,) {
      let db = context.state.firebaseApp.firestore()
      let clientCollection = db.collection("clients")
      const snapshot = await clientCollection.get()

      context.commit('setClients', snapshot.docs.map(elm => elm.data()))
    }

  },
  getters: {
    user(state) {
      return state.user
    },
    clients(state) {
      return state.clients
    }
  },
  modules: {
  }
})

