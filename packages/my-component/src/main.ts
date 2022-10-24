import { createApp, version } from 'vue-demi'
import App from './App.vue'

const styles = import.meta.glob('./**/*.scss');

Object.keys(styles).forEach((k) => {
    console.log('注入css：', k);
    styles[k]()
})

console.log('当前vue版本：', version);

createApp(App).mount('#app')
