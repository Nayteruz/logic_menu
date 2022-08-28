<template>
  <div class="list-document">
    <HeaderComponent/>
    <SearchComponent/>
    <ListWrap/>
  </div>

</template>

<script setup>
import HeaderComponent from "./components/HeaderComponent.vue";
import SearchComponent from "./components/SearchComponent.vue";
import ListWrap from "./components/lists/ListWrap.vue"
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Fira+Sans:wght@400;500;600;700&display=swap');

body {
  min-height: 100vh;
  color: #333;
  background: #fff;
  line-height: 1.6;
  font-family: 'Fira Sans', sans-serif;
  font-size: 15px;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 20px;
  margin: 0;
}
body * {
  outline: none;
}

ul {
  padding: 0;
  margin: 0;
  list-style:none;
}

.list-document {
  max-width: 600px;
}

</style>
