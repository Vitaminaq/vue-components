import { App } from "vue-demi";
import Card from "./card.vue";

const FlyCard = Card;

FlyCard.install = function(app: App) {
  app.component(FlyCard.name, FlyCard);
}

export { FlyCard };

