import { createApp, version, Vue2, isVue3 } from 'vue-demi'
import App from './App.vue'

const styles = import.meta.glob('./**/*.scss');

Object.keys(styles).forEach((k) => {
    console.log('注入css：', k);
    styles[k]()
})

console.log('当前vue版本：', version);

if (isVue3) {
    createApp(App).mount('#app')
} else {
    new Vue2({
        render: h => h(App as any)
    }).$mount("#app")
}
