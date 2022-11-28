import { App } from "vue-demi";
import Button from "./button.vue";

const FlyButton = Button;

FlyButton.install = function(app: App) {
  app.component(FlyButton.name, FlyButton);
}

export { FlyButton };
