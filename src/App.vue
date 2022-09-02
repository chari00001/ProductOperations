<template>

  <div>
    <app-header></app-header>
    <!-- Fade animation occurs on every route transition -->
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
    <app-footer></app-footer>
  </div>

</template>

<script>

import HeaderVue from './components/shared/Header.vue';
import FooterVue from './components/shared/Footer.vue';

// Importing header and footer to be used
export default {
  components: {
    appHeader: HeaderVue,
    appFooter: FooterVue,

  },
  // Everytime main component is created, initApp and getTradeResult actions are called
  created(){
    this.$store.dispatch("getTradeResult");
    this.$store.dispatch("initApp");
  }
}
</script>

<style>

body{
  background-color: rgba(167, 160, 187, 0.361);
}

/****** Router view transition animations ******/
.fade-enter{
  opacity: 0;
}

.fade-enter-active{
  transition: opacity 0.2s ease-out;
}

/* .fade-leave{
  
} */

.fade-leave-active{
  transition: opacity 0.2s ease-out;
  opacity: 0;
}
</style>
