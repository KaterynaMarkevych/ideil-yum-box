<template>
    <div class="added-item">
      <img :src="item.image" :alt="item.name" class="item-image" />
      <div class="item-details">
        <p class="item-name">{{ item.name }}{{ item.number }}</p>
        <p class="item-mass">{{ item.mass }}</p>
        <div class="item-actions">
          <button @click="removeItem(item.id)" class="removeItem">Видалити</button>
        </div>
      <div class="control-container"> 
        <p class="prise">{{ item.quantity }} x {{ item.price }} ₴ </p>
        <div class="quantity">
            <button class="minus-button" @click="updateQuantity(item.id, item.quantity - 1)"> - </button>
            <p>{basketItems.find(basketItem => basketItem.id === item.id).quantity}</p>
            <button class="plus-button" @click="updateQuantity(item.id, item.quantity + 1)"> + </button>
        </div>
      </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AddedItem',
    props: {
      item: Object,
      updateQuantity: Function,
    },
    methods: {
      removeItem(id) {
        // Логіка для видалення товару з корзини
        this.$emit('removeItem', id);
      },
    },
    
  };
  </script>
  
  <style scoped>
  .added-item {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
  width: 411px;
  height: 151px;
  margin-left: 15px;
  border-radius: 12px;
  background: rgb(34, 34, 34);
  margin-left: 35px;
  margin-top: 0;
 
  } @media (min-width: 768px){
    .added-item{
        margin-left: 20px;
    }
  }
  
  .item-image {
     width: 40px;
  margin: 10px;
  padding: 10px;
  margin-left: 20px;
  background: rgb(48, 48, 48);
  }
  
  .item-details {
    margin-left: 10px;
  }
  .item-name {
    font-size: 18px;
    font-weight: 600;
    line-height: 100%;
    letter-spacing: 0%;
    text-align: left;
    margin: 0;
  }
  .item-mass {
    color: rgb(140, 138, 138);
    font-size: 13px;
    font-weight: 500;
    line-height: 100%;
    letter-spacing: 0%;
    text-align: left;
    margin: 5px;
  }
  .removeItem {
    background: none;
    border: none;
    color:rgb(252, 184, 82);
    margin-top: -15px;
    margin-left: 130px;
    cursor: pointer;
  }
  .control-container {
    display: flex;
    align-items: center;
  }
  .prise{
    display: flex;
    align-items: center;
    margin-left: 20px;
  }
  .quantity {
    display: flex;
    align-items: center;
    border: 1px solid rgb(255, 255, 255);
    border-radius: 21px;
    padding: 0 10px;
    max-width: 117px;
    height: 27px;
    margin-left: 250px;
  }
  .minus-button {
    margin-right: 9px;
    font-weight: 600;
    font-size: 15px;
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    align-items: center;
  }
  .plus-button {
    margin-left: 9px;
    font-weight: 600;
    font-size: 15px;
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    align-items: center;
  }
  .item-actions button {
    margin-right: 10px;
  }
  .basket-container {
  max-height: 80vh; /* Максимальна висота для контейнера корзини */
  overflow-y: auto; /* Дозволяє вертикальну прокрутку */
}
  </style>
  