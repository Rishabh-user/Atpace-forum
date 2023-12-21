import { createApp } from "vue";
import App from "./App.vue";
import "../src/assets/css/style.css";
import router from "./router";
import axios from "axios";
import store from "./store";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { quillEditor } from "vue3-quill";
// import VueCountryCode from "vue-country-code-select";

// import VueConfirmPlugin from 'v3confirm'

axios.defaults.baseURL = "https://growatpace.com/";
// axios.defaults.baseURL = "http://127.0.0.1:8000/"
// axios.defaults.baseURL = "http://dev.growatpace.com/"
// axios.defaults.baseURL = "http://192.168.29.48:9000/"


library.add(fas);
library.add(far);
createApp(App)
  .use(router)
  .use(Toast, {
    transition: "Vue-Toastification__bounce",
    maxToasts: 20,
    newestOnTop: true,
  })
  .use(store)
  .use(quillEditor)
  // .use(VueCountryCode)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
