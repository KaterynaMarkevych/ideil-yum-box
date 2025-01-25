import { createApp } from 'vue';
import './style.css';
import './global.css';
import App from './App.vue';
import BasketProvider from '../src/components/BasketProvider';

const app = createApp(App);

// Надаємо BasketProvider через provide
app.provide('basketState', BasketProvider.basketState);
app.provide('addToBasket', BasketProvider.addToBasket);
app.provide('removeFromBasket', BasketProvider.removeFromBasket);

app.mount('#app');
