<template>
  <ul
    @drop="onDrop($event, 'itemId')"
    @dragenter.prevent
    @dragover.prevent
  >
    <li
      v-for="item in story.foldersCategory"
      :key="item.id"
      draggable="true"
      @dragstart="startDrag($event, item)"
    >
      <ItemList :item="item" />
    </li>
  </ul>
</template>

<script setup>

  import ItemList from "./item/ItemList.vue";
  import {useFoldersStore} from "../../stores/folders";

  const story = useFoldersStore();

  const startDrag = (event, item) => {
    console.log(item);
    event.dataTransfer.dropEffect = 'move';
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('itemId', item.id);
  }

  const onDrop = (event, list) => {
    const itemId = event.dataTransfer.getData('itemId');
    console.log(itemId, list)
    //const item = list.filter(i=>i.id === itemId);

    //item.list = list;

  }

</script>
