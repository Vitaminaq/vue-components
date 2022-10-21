import { App } from "vue-demi";
import { Button } from './Button';
import { Card } from './Card';

export {
    Button,
    Card
}

export default {
    install(app: App): void {
      app.component(Button.name, Button);
      app.component(Card.name, Card);
    }
}
