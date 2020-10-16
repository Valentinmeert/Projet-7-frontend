
<template>
  <div id="app">
    <Nav />
    
    <router-view />
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue';

export default {
  name: 'App',
  components: {
    Nav,
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
