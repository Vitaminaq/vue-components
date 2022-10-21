import { App } from 'vue-demi'
import Card from './Card.vue';

export {
  Card
}

export default {
    install(app: App): void {
      app.component(Card.name, Card)
    }
  }
  
