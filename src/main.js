import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

import PrimeVue from "primevue/config";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import RadioButton from "primevue/radiobutton";
import Button from "./components/reusable/Button.vue";
import Checkbox from "primevue/checkbox";
import ToastService from "primevue/toastservice";
import Toast from "primevue/toast";
import Dialog from "primevue/dialog";
import DataTable from "primevue/datatable";
import DataView from "primevue/dataview";
import Column from "primevue/column";
import Paginator from "primevue/paginator";

import "./assets/styles.scss";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(PrimeVue);
app.use(ToastService);

app.component("RadioButton", RadioButton);
app.component("InputText", InputText);
app.component("InputNumber", InputNumber);
app.component("Button", Button);
app.component("CheckBox", Checkbox);
app.component("Toast", Toast);
app.component("Dialog", Dialog);
app.component("DataTable", DataTable);
app.component("DataView", DataView);
app.component("Column", Column);
app.component("Paginator", Paginator);

app.mount("#app");
