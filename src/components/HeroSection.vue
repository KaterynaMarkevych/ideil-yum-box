<template>
    <div class="container">
      <Carousel class="carousel" v-bind="carouselConfig">
        <Slide class="hero-carousel" v-for="slide in slides" :key="slide.id">
          <div class="box-slides">
            <div class="hero-content">
              <p class="text">YUM<br />BOX</p>
              <p class="desktop-text">YUMBOX</p>
              <img class="image" :src="slide.image" alt="Hero Image" />
              <div class="hero-text">
                <p class="text2">сет 21</p>
                <button class="hero-button">934 грн</button>
              </div>
            </div>
          </div>
        </Slide>
  
        <!-- Навігація та пагінація -->
        <template #addons>
          <Navigation >
            <template #prev>
                <svg class="custom-prev" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 21 21">
                    <g fill="none" fill-rule="evenodd" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" transform="translate(3 2)">
                        <circle cx="8.5" cy="8.5" r="8" />
                        <path d="m7.5 11.5l-3-3l3-3m5 3h-8" />
                    </g>
                </svg>
            </template>
            <template #next>
                <svg class="custom-next" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 21 21">
                    <g fill="none" fill-rule="evenodd" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" transform="translate(3 2)">
                        <circle cx="8.5" cy="8.5" r="8" />
                        <path d="m9.5 11.5l3-3l-3-3m3 3h-8" />
                    </g>
                </svg>
            </template>
          </Navigation>
          <Pagination class="custom-png" />
        </template>
      </Carousel>
      <p class="text3">Найчастіше замовляють</p>
    </div>
</template>

<script setup>
    import 'vue3-carousel/carousel.css';
    import { Carousel, Slide, Navigation, Pagination } from 'vue3-carousel';
    import { Icon } from "@iconify/vue";
    import heroImage from '../assets/images/Hero.png';

    // Налаштування для каруселі
    const carouselConfig = {
    itemsToShow: 1, // Скільки слайдів показувати одночасно
    wrapAround: false, // Зациклити слайди
    transition: 500, // Тривалість анімації переходу (мс)
    autoplay: false, // Автоматична прокрутка
    };

    const slides = [
    { id: 1, image: heroImage },
    { id: 2, image: heroImage },
    { id: 3, image: heroImage },
    ];
</script>
  
<style >
  .container {
    max-width: 100%;
    margin: 0 auto;
    padding: 0;
  }
  .carousel{
     margin: 0 auto;
  }
  .box-slides{
    width: 1276px;
    height: 503px;
    border-radius: 24.44px;
    background: rgb(34, 34, 34);
  }
  @media (max-width: 768px) {
    .carousel{
    width: 335px;
    height: 316px;
    }
    .container{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    }
 }
  @media (max-width: 768px) {
    .box-slides{
    width: 335px;
    height: 316px;}
  }
  
  :root {
  --vc-pgn-active-color: #fff;
  --vc-pgn-background-color: rgb(34, 34, 34);
  --vc-pgn-width: 9px;
  --vc-pgn-height: 9px;
  --vc-pgn-border-radius: 6px;
  --vc-png-margin: 0px 0px 6px 5px;
  }
  .image {
    position: absolute;
    top: 10%;
    left: 10%;
    z-index: 2;
    width: 300px;
    height: 280px;
  }
  @media (min-width: 768px) {
    .image {
      width: 700px;
      height: 650px;
      position: absolute;
      left:  310px;
      top: -50px;
      z-index: 1;
    }
  }
  .text {
    position: absolute;
    top: 15%;
    left: 50%;
    color: rgb(233, 229, 225);
    transform: translate(-50%, -50%);
    font-weight: 700;
    font-size: 100px;
    text-align: center;
    padding: 0;
  }
  @media (min-width: 769px) {
    .text {
      display: none;
    }
  }
  .desktop-text {
    position: absolute;
    color: rgb(233, 229, 225);
    font-weight: 700;
    font-size: 260px;
    left: 50%;
    bottom: -300px;
    width: 11124px;
    height: 320px;
    transform: translate(-50%, -50%);
    text-align: center;
  }
  @media (max-width: 768px) {
    .desktop-text {
      display: none;
    }
    
  }
  .hero-text {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    margin-top: 360px;
    padding-bottom: 10px;
  }
  .text2 {
    text-transform: uppercase;
    font-size: 30px;
    padding-right: 10px;
    color: rgb(252, 184, 82);
    font-weight: 600;
    z-index: 1;
  }
  .hero-button {
    background: none;
    border: 3px solid rgb(252, 184, 82);
    border-radius: 30px;
    cursor: pointer;
    text-transform: uppercase;
    font-size: 25px;
    padding: 5px 30px;
    color: rgb(252, 184, 82);
    margin-bottom: 25px;
    z-index: 1;
  }
  .text3 {
    color: rgb(255, 255, 255);
    font-size: 20px;
    font-weight: 500;
    line-height: 100%;
    letter-spacing: 0%;
    text-align: center;
    margin-top: 65px;
  }
  
.custom-png{
    position: absolute;
    transform: translateX(-50%);
    top: 102%;
}
@media (max-width: 768px) {
    .custom-png{
        top: 105%;
    }
    .custom-prev{
    position: absolute;
    top: 600%
    }
    .custom-next{
    position: absolute;
    top: 600%
    }
}
  </style>
  