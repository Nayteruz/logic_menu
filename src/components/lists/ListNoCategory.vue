<template>
  <ul class="no-folders">
    <li v-for="item in story.dinamicOutFolder" :key="item.id">
      <ItemListNo :item="item"/>
    </li>
  </ul>
</template>

<script setup>
  import ItemListNo from "./item/ItemListNo.vue";
  import {useFoldersStore} from "../../stores/folders";
  const story = useFoldersStore();
</script>

<style scoped lang="scss">
  ul.no-folders {
    margin-top: 14px;
  }
</style>