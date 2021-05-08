import { createApp, } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from "firebase";

// * PrimeVUe
import PrimeVue from "primevue/config";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Dialog from "primevue/dialog"
import Dropdown from 'primevue/dropdown';
import InputMask from 'primevue/inputmask';
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import "primevue/resources/themes/md-dark-indigo/theme.css"
import "primevue/resources/themes/md-light-indigo/theme.css";
import "primevue/resources/primevue.min.css";
import 'primeicons/primeicons.css'
import Sidebar from 'primevue/sidebar';
import 'primeflex/primeflex.css';
import Avatar from 'primevue/avatar';
import Chip from 'primevue/chip';
import Textarea from 'primevue/textarea';
import Calendar from 'primevue/calendar'
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import InputNumber from 'primevue/inputnumber';
import InputSwitch from 'primevue/inputswitch';
import Badge from 'primevue/badge';
import FullCalendar from 'primevue/fullcalendar';
import Chips from 'primevue/chips';
import ConfirmationService from 'primevue/confirmationservice';
import ConfirmDialog from 'primevue/confirmdialog';
import Password from 'primevue/password';
import Card from 'primevue/card';
import Listbox from 'primevue/listbox';


//* Text Editor Import
import CKEditor from '@ckeditor/ckeditor5-vue';

//* Email JS




var firebaseConfig = {
    apiKey: "AIzaSyD-Gwtg2AwgA9Wh6-Z0vGtZeHHpmzXiSOU",
    authDomain: "maintenance-app-503fd.firebaseapp.com",
    projectId: "maintenance-app-503fd",
    storageBucket: "maintenance-app-503fd.appspot.com",
    messagingSenderId: "300290861676",
    appId: "1:300290861676:web:37e60f9fa4ddec53968649",
    measurementId: "G-9VY1BQK8Y6",
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

store.commit("setFirebaseApp", firebaseApp);

const app = createApp(App);

app.use(store);
app.use(router);
app.use(PrimeVue);
app.use(ToastService);
app.use(CKEditor)
app.use(ConfirmationService)


app.component("InputText", InputText);
app.component("Button", Button);
app.component('Dialog', Dialog)
app.component('Dropdown', Dropdown)
app.component('InputMask', InputMask)
app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('Sidebar', Sidebar)
app.component('Avatar', Avatar)
app.component('Chip', Chip)
app.component('Textarea', Textarea)
app.component('Calendar', Calendar)
app.component('Toast', Toast)
app.component('InputNumber', InputNumber)
app.component('InputSwitch', InputSwitch)
app.component('Badge', Badge)
app.component('FullCalendar', FullCalendar)
app.component('Chips', Chips)
app.component('ConfirmDialog', ConfirmDialog)
app.component('Password', Password)
app.component('Card', Card)
app.component('Listbox', Listbox)

app.mount("#app");

