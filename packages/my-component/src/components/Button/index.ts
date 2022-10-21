import { App } from "vue-demi";
import Button from "./Button.vue";

export { Button };

export default {
  install(app: App): void {
    app.component(Button.name, Button);
  },
};
