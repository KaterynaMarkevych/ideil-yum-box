
<template>
    <div>
      <header class="header-container">
        <img :src="logo"  alt="YumBox" class="logo" />
        <!-- Бургер-меню -->
        <div @click="toggleMenu" class="burger-menu">
            <span>Меню</span>
            <div v-if="menuOpen" class="icon close-icon">
                <!-- Іконка "close" -->
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path fill="#fff" d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z" />
            </svg>
            </div>
            <div v-else class="icon bars-icon">
                <!-- Іконка "bars" -->
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path
                    fill="#fff"
                    d="M3 8h18a1 1 0 0 0 0-2H3a1 1 0 0 0 0 2m18 8H3a1 1 0 0 0 0 2h18a1 1 0 0 0 0-2m0-5H3a1 1 0 0 0 0 2h18a1 1 0 0 0 0-2"
                />
                </svg>
            </div>
        </div>

        <!-- Мобільна навігація -->
        <div v-if="menuOpen" class="mobile">
            <div @click="toggleBasket" class="info-basket">
            <span class="basket-counter">{{ basketState.basketCount }}</span>
            {{ basketState.totalPrice }} грн
            </div>

            <nav class="mobile-navigation">
            <ul>
                <li><a href="/catalog">Каталог</a></li>
                <li><a href="/catering">Кейтеринг</a></li>
                <li><a href="/about">Про нас</a></li>
                <li><a href="/contact">Контакти</a></li>
            </ul>
            </nav>

            <div class="info">
                <ul class="info-list">
                    <li><a href="mailto:yumbox.lutsk@gmail.com" class="email">yumbox.lutsk@gmail.com</a></li>
                    <li><a href="tel:+380938239293" class="phone">+380 93 823 92 93</a></li>
                </ul>
            

            <div class="social-media">
                <font-awesome-icon icon="linkedin" />
                <font-awesome-icon icon="instagram" />
                <font-awesome-icon icon="facebook-f" />
            </div>
            </div>
        </div>

        <!-- Десктопна навігація -->
        <nav v-if="!menuOpen" class="navigation">
            <ul>
            <li><a href="/catalog">Каталог</a></li>
            <li><a href="/catering">Кейтеринг</a></li>
            <li><a href="/about">Про нас</a></li>
            <li><a href="/contact">Контакти</a></li>
            </ul>
        </nav>
  
        <button @click="toggleBasket" class="basket">
          <span class="basket-counter">{{ basketState.basketCount }} </span>
           {{ basketState.totalPrice }} грн
        </button>
      </header>
  
        <!-- Корзина -->
      <div v-if="basketOpen">
        <!-- Фон, що закриває корзину при кліку -->
        <Backdrop @click="toggleBasket" />
        
        <div class="basket-container">
          <!-- Якщо є елементи в корзині -->
          <div v-if="basketState.basketItems.length > 0">
            <button @click="toggleBasket" class="close-basket">
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24">
                <path fill="#fff" d="m6.4 18.308l-.708-.708l5.6-5.6l-5.6-5.6l.708-.708l5.6 5.6l5.6-5.6l.708.708l-5.6 5.6l5.6 5.6l-.708.708l-5.6-5.6z" />
              </svg>
            </button>
            <h2>Корзина</h2>
            <!-- Відображення кожного доданого елемента -->
            <AddedItem
        v-for="item in basketItems"
        :key="item.id"
        :item="item"
        @removeItem="handleRemoveItem"
        @updateQuantity="handleUpdateQuantity"
      />
            <div class="order">
              <span class="delivery">Доставка</span>
              <span class="delivery-price">50 ₴</span>
              <button class="order-button">
                Оформити за {{ totalPriceWithDelivery }} ₴
              </button>
            </div>
          </div>

          <!-- Якщо корзина порожня -->
          <div v-else>
            <button @click="toggleBasket" class="close-basket">          
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24">
                <path fill="#fff" d="m6.4 18.308l-.708-.708l5.6-5.6l-5.6-5.6l.708-.708l5.6 5.6l5.6-5.6l.708.708l-5.6 5.6l5.6 5.6l-.708.708l-5.6-5.6z" />
              </svg>
            </button>
            <h2>Корзина</h2>
            <p>У вашій корзині поки порожньо.</p>
            <p>Оберіть страву з нашого меню:)</p>
          </div>
        </div>
      </div>
  </div>
</template>
  
<script>
  import logo from '../assets/images/logo.png';
  import { Icon } from "@iconify/vue";
  import { inject, computed, ref } from 'vue';
  //import Backdrop from './Backdrop.vue'; 
  import AddedItem from './AddedItem.vue'; 
  import Orders from './Orders.vue';

  export default {
    name: 'Header',
    data() {
    return {
        logo,
        menuOpen: false,
        basketOpen: false,
        basketItems: [],
        };
    },
    setup() {
      const basketState = inject('basketState'); // Стан корзини
      const addToBasket = inject('addToBasket'); // Функція додавання в корзину

      // Обчислюване значення для загальної вартості з урахуванням знижки
      const discountedPrice = computed(() => {
        const discountThreshold = 1000; // Поріг для знижки
        const discountRate = 0.1; // 10% знижка
        return basketState.totalPrice >= discountThreshold
          ? basketState.totalPrice * (1 - discountRate)
          : basketState.totalPrice;
      });

      // Обчислюване значення для загальної вартості з доставкою
      const totalPriceWithDelivery = computed(() => {
        const deliveryPrice = 50; // Фіксована ціна доставки
        return discountedPrice.value + deliveryPrice;
      });

      return {
        basketState,
        addToBasket,
        discountedPrice,
        totalPriceWithDelivery,
      };
    },
    methods: {
      toggleMenu() {
        this.menuOpen = !this.menuOpen; // Відкриття/закриття меню
      },
      toggleBasket() {
        this.basketOpen = !this.basketOpen; // Відкриття/закриття корзини
      },
      updateQuantity(itemId, quantity) {
        // Метод для оновлення кількості товарів у корзині
        const item = this.basketState.basketItems.find((i) => i.id === itemId);
        if (item) {
          item.quantity = quantity;
        }
        // Перерахунок загальної вартості
        this.basketState.totalPrice = this.basketState.basketItems.reduce(
          (sum, i) => sum + i.price * i.quantity,
          0
        );
      },
      handleAddToBasket(item) {
      // Перевірка, чи товар уже в корзині
      const existingItem = this.basketItems.find((basketItem) => basketItem.id === item.id);
      if (existingItem) {
        // Якщо товар уже є, збільшуємо його кількість
        existingItem.quantity += item.quantity;
      } else {
        // Якщо товару немає, додаємо його
        this.basketItems.push(item);
      }
    },
    handleRemoveItem(id) {
      this.basketItems = this.basketItems.filter((item) => item.id !== id);
    },
    handleUpdateQuantity(id, newQuantity) {
      const item = this.basketItems.find((basketItem) => basketItem.id === id);
      if (item && newQuantity > 0) {
        item.quantity = newQuantity;
      } else {
        // Видаляємо товар, якщо кількість стає 0
        this.handleRemoveItem(id);
      }
    },
    },
    components: { Orders, AddedItem },

  }
</script>
  
  <style scoped>
.header-container {
  display: flex;
  text-align: center;
  justify-content: space-between;
  padding: 30px;
  color: #fff;
  z-index: 4;
  top: 0;
  right: 0;
  min-width: 375px;
  max-width: 100vw;
  margin: 0 auto;
}
@media (max-width: 768px){
    .header-container {
        position: absolute;
        max-width: 375px;
        margin: 0 auto;        
    }
}

.logo {
  z-index: 3;
  width: 75px;
  height: 49px;
  margin-left: 40px;
}

@media (min-width: 768px) {
  .logo {
    width: 114px;
    height: 73px;
    margin-top: -20px;
  }
}

.navigation ul {
  list-style-type: none;
  margin-top: -20px;
  padding: 0;
}
.navigation li {
  display: inline-block; 
  margin-right: 20px;
}
.navigation a {
  text-decoration: none; 
  color: white; 
  font-weight: bold; 
  transition: color 0.3s ease;
}

@media (min-width: 768px) {
  .navigation {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.basket {
  background: none;
  color: #fff;
  box-sizing: border-box;
  border: 1px solid white;
  border-radius: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  min-width: 90px;
  max-width: 127px;
  height: 27px;
}

@media (max-width: 768px) {
  .basket {
    background: black;
    margin-left: 65%;
    z-index: 1;
    margin-bottom: 20px;
    position: fixed;
    bottom: 30px;
    max-width: none;
  }
}

.basket-counter {
  margin-left: 5px;
  padding: 2px 6px;
  border-radius: 10px;
  background-color: #f00;
  color: #fff;
  font-size: 12px;
}

.mobile-navigation {
  display: flex;
  flex-direction: column;
  padding-right: 66px;
  margin-bottom: 20px;
  margin-top: 30%;
  flex-grow: 1;
  justify-content: flex-start;
  margin-left: 64px;
}
.mobile {
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: black;
  z-index: 2;
  margin-top: 80px;
  overflow: hidden;
  max-width: 375px;
  margin: 0 auto;
}
.mobile-navigation ul {
  list-style: none;
  padding: 0;
}
.mobile-navigation ul li {
  margin: 10px 0;
  font-size: 24px;
  letter-spacing: 0%;
  letter-spacing: 0%;
  margin-left: 64px;
  text-align: left;
}

.mobile-navigation ul li a {
  color: white;
  text-decoration: none;
}

.social-media {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}


.burger-menu {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 18px;
  color: white;
}
@media (min-width: 768px) {
  .burger-menu {
    display: none; /* Ховаємо бургер-меню для десктопів */
  }
  .navigation {
    display: block; /* Показуємо навігацію */
  }
  .mobile {
    display: none; /* Ховаємо мобільну навігацію */
  }
}
.info {
  list-style-type: none;
  padding-bottom: 290px;
  text-align: center;
}

.info-list {
  padding-bottom: 10px;
  margin: 0;
}

.email,
.phone {
  text-decoration: none;
  font-size: 18px;
  font-weight: 600;
  text-align: left;
  margin-left: 64px;
  display: block;
}

.info-list .email {
  color: rgb(243, 186, 79) !important;
}


.social-media {
  display: flex;
  gap: 44px;
  margin-top: 75px;
  margin-left: 25px;
}

.info-basket {
  background: none;
  color: #fff;
  box-sizing: border-box;
  border: 1px solid white;
  border-radius: 21px;
  cursor: pointer;
  display: flex;
  align-items: center;
  position: fixed;
  padding: 0 10px;
  left: 64px;
  top: 127px;
  bottom: 19px;
  max-width: 127px;
  height: 27px;
}

@media (min-width: 768px) {
  .info-basket {
    display: none;
  }
}

.basket-container {
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  right: 0;
  width: 470px;
  height: 100%;
  background: black;
  overflow-y: auto;
}

@media (max-width: 768px) {
  .basket-container {
    width: 100%;
    left: 0;
  }
}

.basket-title {
  text-align: left;
  font-size: 36px;
  width: 279px;
  height: 72px;
  padding: 20px;
}

.close-basket {
  background: none;
  border: none;
  margin-top: 28px;
  margin-right: -18px;
}

.text {
  text-align: center;
  font-size: 20px;
  margin: 0;
}

.order {
  border-radius: 31px 31px 0px 0px;
  background: rgb(34, 34, 34);
  margin-top: auto;
}

.order-button {
  border-radius: 63px;
  background: rgb(252, 184, 82);
  width: 410px;
  height: 65px;
  padding: 0 10px;
  color: white;
  cursor: pointer;
  margin-bottom: 20px;
  color: rgb(0, 0, 0);
  font-size: 18px;
  font-weight: 600;
  text-align: center;
}

.delivery {
  font-size: 18px;
  font-weight: 600;
  text-align: left;
  margin-left: 40px;
  margin-top: 20px;
}

.delivery-price {
  font-size: 18px;
  font-weight: 600;
  text-align: right;
  margin-right: 40px;
  margin-top: -35px;
}

/* Бургер-меню */
.burger-menu {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 18px;
  color: white;
  z-index: 15;
}

/* Мобільна навігація */
.mobile {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: #000000;
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.mobile-navigation ul {
  list-style: none;
  padding: 0;
}

.mobile-navigation ul li {
  margin: 10px 0;
}

.mobile-navigation ul li a {
  color: white;
  text-decoration: none;
  font-size: 18px;
  text-align: left;
  margin-left: 40px;
  padding: 0;
}

/* Контактна інформація */
.info ul {
  list-style: none;
  padding: 0;
  margin: 10px 0;
  margin-left: 44px;
}

.info ul li a {
  color: white;
  text-decoration: none;
  font-size: 16px;
}

.social-media {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

/* Десктопна навігація */
.navigation {
  display: none; /* Ховаємо десктопну навігацію для мобільної версії */
}

/* Десктопна версія */
@media (min-width: 768px) {
  .burger-menu {
    display: none; /* Ховаємо бургер-меню для десктопів */
  }

  .navigation {
    display: flex;
    align-items: center;
  }

  .navigation ul {
    list-style: none;
    display: flex;
    gap: 20px;
  }

  .navigation ul li a {
    color: white;
    text-decoration: none;
    font-size: 18px;
  }

  .mobile {
    display: none; /* Ховаємо мобільну навігацію */
  }
}
.icon {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
}

</style>