<template>
  <slot></slot>
</template>

<script>
import { reactive, provide } from 'vue';

export default {
  name: 'BasketProvider',
  setup() {
    // Реактивний стан для кошика
    const basketState = reactive({
      basketItems: [],
      totalPrice: 0,
      basketCount: 0,
    });

    // Додавання товару в кошик
    const addToBasket = (item) => {
      const existingIndex = basketState.basketItems.findIndex(
        (basketItem) => basketItem.id === item.id
      );
      if (existingIndex !== -1) {
        basketState.basketItems[existingIndex].quantity += 1;
      } else {
        basketState.basketItems.push({ ...item, quantity: 1 });
      }
      basketState.basketCount += 1;
      basketState.totalPrice += parseInt(item.price);
    };

    // Видалення товару з кошика
    const removeItemFromBasket = (itemId) => {
      const itemToRemove = basketState.basketItems.find(
        (item) => item.id === itemId
      );
      if (itemToRemove) {
        basketState.totalPrice -=
          parseInt(itemToRemove.price) * itemToRemove.quantity;
        basketState.basketItems = basketState.basketItems.filter(
          (item) => item.id !== itemId
        );
        basketState.basketCount -= itemToRemove.quantity;
      }
    };

    // Оновлення кількості товару в кошику
    const updateQuantity = (itemId, newQuantity) => {
      const item = basketState.basketItems.find((item) => item.id === itemId);
      if (item) {
        const oldTotal = parseInt(item.price) * item.quantity;
        item.quantity = newQuantity;
        const newTotal = parseInt(item.price) * newQuantity;
        basketState.totalPrice += newTotal - oldTotal;
      }
    };

    // Функція для розрахунку знижки
    const calculateDiscountedPrice = (price) => {
      if (price >= 1000) {
        return price * 0.9;
      }
      return price;
    };

    // Передача стану та функцій через provide
    provide('basketState', basketState);
    provide('addToBasket', addToBasket);
    provide('removeItemFromBasket', removeItemFromBasket);
    provide('updateQuantity', updateQuantity);
    provide('calculateDiscountedPrice', calculateDiscountedPrice);

    return {};
  },
};
</script>
