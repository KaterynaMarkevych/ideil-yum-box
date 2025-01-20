<template>
    <div class="container">
      
        <div class="mobile-orders-container">
            <div v-for="(item, index) in setContent" :key="item.id" class="order-card">
            <img :src="item.image" :alt="`Image of ${item.title}`" class="order-image" />
            <div class="order-details">
                <p class="order-title">{{ item.title }}<br />{{ item.number }}</p>
                <p class="order-mass">{{ item.mass }}</p>
                <button class="order-button">{{ item.price }} грн</button>
            </div>
            </div>
        </div>
       
       <div class="dekstop-orders-container">
            <div v-for="(item, index) in setContent" :key="item.id" class="order-card">
            <img :src="item.image" :alt="`Image of ${item.title}`" class="order-image" />
            <div class="order-details">
                <p class="order-title">{{ item.title }}<br />{{ item.number }}</p>
                <p class="order-mass">{{ item.mass }}</p>
                <button class="order-button">{{ item.price }} грн</button>
            </div>
            </div>
        </div>
    </div>
  </template>
  
  <script>
  import { ref } from "vue";
  import ordersImage from "../assets/images/OrderSet.svg";
  
  
  export default {
    name: "Orders",
    setup() {
  
      const setContent = ref([
        { id: 1, title: "YumBox", number: "21 сет", mass: "1500 гр", price: "799", quantity: "1", image: ordersImage },
        { id: 2, title: "YumBox", number: "21 сет", mass: "1500 гр", price: "799", quantity: "1", image: ordersImage },
        { id: 3, title: "YumBox", number: "21 сет", mass: "1500 гр", price: "799", quantity: "1", image: ordersImage },
        { id: 4, title: "YumBox", number: "21 сет", mass: "1500 гр", price: "799", quantity: "1", image: ordersImage },
        { id: 5, title: "YumBox", number: "21 сет", mass: "1500 гр", price: "799", quantity: "1", image: ordersImage },
        { id: 6, title: "YumBox", number: "21 сет", mass: "1500 гр", price: "799", quantity: "1", image: ordersImage },
        { id: 7, title: "YumBox", number: "21 сет", mass: "1500 гр", price: "799", quantity: "1", image: ordersImage },
        { id: 8, title: "YumBox", number: "21 сет", mass: "1500 гр", price: "799", quantity: "1", image: ordersImage },
      ]);
  
      return {
        setContent
      };
    },
  };
  </script>
  
  <style scoped>
  .container {
    display: flex;
    flex-direction: column;
  }
  @media (max-width: 768px) {
    .container{
        position: absolute;
        top: 2700px;
        width: 100vw;
        background-color: black;
    }
  }
  
  .mobile-orders-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0;
    padding: 0;
  }
  @media (min-width: 768px) {
    .mobile-orders-container {
      display: none;
    }
  }
  .order-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    width: 375px;
    height: 528px;
  }
  
  .order-title {
    color: rgb(255, 255, 255);
    font-size: 24px;
    font-weight: 600;
    line-height: 100%;
    text-align: center;
    margin-top: 30px;
  }
  
  .order-mass {
    color: rgb(140, 138, 138);
    font-size: 13px;
    font-weight: 500;
    text-align: center;
    margin: 20px 0;
  }
  
  .order-button {
    background: none;
    border: none;
    cursor: pointer;
    color: white;
    font-size: 18px;
    font-weight: 600;
    position: relative;
    margin: 20px 0 50px;
  }
  
  .order-button::before {
    content: attr(data-price) ;
    background-color: black;
  }
  .order-button:hover::before {
    opacity: 0;
  }
  
  .order-button::after {
    content: "Добавити в кошик";
    position: absolute;
    font-weight: 500;
    font-size: 16px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: opacity 0.3s ease;
    padding: 20px 40px;
    border: 1px solid white;
    border-radius: 63px;
    white-space: nowrap;
    background-color: black;
  }
  
  .order-button:hover::after {
    opacity: 1;
  }
  
  .dekstop-orders-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0px;
    justify-content: center;
  }
  
  @media (max-width: 768px) {
    .dekstop-orders-container {
      display: none;
    }
  }
  </style>
  