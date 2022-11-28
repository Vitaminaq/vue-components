import { App } from "vue-demi";
import Input from "./input.vue";

const FlyInput = Input;

FlyInput.install = function(app: App) {
  app.component(FlyInput.name, FlyInput);
}

export { FlyInput };
