<template>
  <ListWithCategory/>
  <ListNoCategory/>
  <h3 v-if="story.dinamicFolder.length === 0 && story.dinamicOutFolder.length === 0">Ничего не найдено</h3>
</template>

<script setup>
  import ListNoCategory from "./ListNoCategory.vue"
  import  ListWithCategory from "./ListWithCategory.vue"
  import {useFoldersStore} from "../../stores/folders";
  const story = useFoldersStore();
</script>

<style scoped>

</style>