import { createApp } from "vue";

import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";
import Tooltip from "primevue/tooltip";
import "primeicons/primeicons.css";

import "./style.css";
import App from "./App.vue";
import { VueQueryPlugin } from "@tanstack/vue-query";
import "@fontsource/rammetto-one";

const app = createApp(App);

app.use(VueQueryPlugin);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    darkModeSelector: "system",
  },
});
app.directive("tooltip", Tooltip);

app.mount("#app");
