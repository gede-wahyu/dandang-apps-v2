import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

import PrimeVue from "primevue/config";
import RadioButton from "primevue/radiobutton";

import "./assets/styles.scss";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(PrimeVue);

app.component("RadioButton", RadioButton);

app.mount("#app");
