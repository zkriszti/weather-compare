import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/aura-light-green/theme.css'
import Tooltip from 'primevue/tooltip';
import './style.css'
import App from './App.vue'
import { VueQueryPlugin } from '@tanstack/vue-query'

const app = createApp(App)

app.use(VueQueryPlugin)
app.use(PrimeVue)
app.directive('tooltip', Tooltip);

app.mount('#app')
