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
import DataView from "primevue/dataview";
import Paginator from "primevue/paginator";
import Password from "primevue/password";
import Skeleton from "primevue/skeleton";
import OverlayPanel from "primevue/overlaypanel";
import Dropdown from "primevue/dropdown";
import Calendar from "primevue/calendar";
import InputSwitch from "primevue/inputswitch";
import Knob from "primevue/knob";
import Chart from "primevue/chart";

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
app.component("DataView", DataView);
app.component("Paginator", Paginator);
app.component("Password", Password);
app.component("Skeleton", Skeleton);
app.component("OverlayPanel", OverlayPanel);
app.component("Dropdown", Dropdown);
app.component("Calendar", Calendar);
app.component("InputSwitch", InputSwitch);
app.component("Knob", Knob);
app.component("Chart", Chart);

app.mount("#app");
