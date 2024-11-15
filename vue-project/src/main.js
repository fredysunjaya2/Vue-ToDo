import "./assets/main.css";
import "@mdi/font/css/materialdesignicons.css"; // Ensure you are using css-loader
import { createApp } from "vue";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import colors from "vuetify/util/colors";

import { aliases, mdi } from "vuetify/iconsets/mdi-svg";
import { mdiClose, mdiPlus, mdiPencil } from "@mdi/js";

// Components
import App from "./App.vue";
import { createPinia } from "pinia";

const app = createApp(App);

const vuetify = createVuetify({
  icons: {
    defaultSet: "mdi",
    aliases: {
      ...aliases,
      mdiClose: mdiClose,
      mdiPlus: mdiPlus,
      mdiPencil: mdiPencil,
    },
    sets: {
      mdi,
    },
  },
  components,
  directives,
});

const pinia = createPinia();

app.use(vuetify);
app.use(pinia);

app.mount("#app");
