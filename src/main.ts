import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/css/main.css";
import { createPinia } from "pinia";
import "ant-design-vue/dist/antd.css";
import Antd from "ant-design-vue";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(Antd);
app.use(router);
app.mount("#app");
