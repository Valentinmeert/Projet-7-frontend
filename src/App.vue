
<template>
  <div id="app">
    <Nav />
    <!-- <NavUserDisconnected v-else/> -->
    <router-view />
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue';
import NavUserDisconnected from '@/components/NavUserDisconnected.vue';

export default {
  name: 'App',
  components: {
    Nav,
    NavUserDisconnected,
  },
  data(){
    return{
    test : localStorage.getItem("jwt"),
    
  }
  }
};
</script>

<style>
h1:first-letter,
h2:first-letter {
  text-transform: uppercase;
}
</style>
