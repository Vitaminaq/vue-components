import { createApp, version } from 'vue-demi'
import App from './App.vue'

console.log('当前vue版本：', version);

createApp(App).mount('#app')
