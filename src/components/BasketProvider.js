// BasketProvider.js
import { reactive } from 'vue';

const basketState = reactive({
  basketItems: [],
  basketCount: 0,
  totalPrice: 0,
});

function addToBasket(item) {
  const existingItem = basketState.basketItems.find((basketItem) => basketItem.id === item.id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    basketState.basketItems.push({ ...item, quantity: 1 });
  }
  basketState.basketCount += 1;
  basketState.totalPrice += parseInt(item.price);
}

function removeFromBasket(item) {
  const existingItem = basketState.basketItems.find((basketItem) => basketItem.id === item.id);
  if (existingItem) {
    basketState.basketCount -= existingItem.quantity;
    basketState.totalPrice -= existingItem.quantity * existingItem.price;
    basketState.basketItems = basketState.basketItems.filter((basketItem) => basketItem.id !== item.id);
  }
}

export default {
  basketState,
  addToBasket,
  removeFromBasket,
};
