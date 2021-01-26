import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import installElementPlus from './plugins/element'
import '@/svg'
import { directive } from '@/api/directive/svgDrop/svgDrop'

const app = createApp(App)
installElementPlus(app)
app.directive('svg-drop', directive)
app.use(store)
  .mount('#app')
