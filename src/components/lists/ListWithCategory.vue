<template>
  <ul>
    <li
        v-for="item in story.dinamicFolder"
        :key="item.id"
        ref="itemLi"
        :draggable="+item?.id === +itemDragId"
        @dragstart="startDrag($event, item.id)"
        @dragend="endDrag($event, item.id)"
        @dragenter="enterDrag($event, item.id)"
        @dragover="overDrag($event, item.id)"
        :class="{'enter' : isEnter, 'dragged' : item?.dragged}"
    >
      {{ item?.dragged ? 'dragged' : '' }}
      <ItemList
          :item="item"
          @mouseDown="mouseDown"
      />
    </li>
  </ul>
</template>

<script setup>

  import ItemList from "./item/ItemList.vue";
  import {useFoldersStore} from "../../stores/folders";
  import {ref} from "vue";

  const itemDragId = ref(null);

  const story = useFoldersStore();
  const itemLi = ref(null);
  const isEnter = ref(false);

  const mouseDown = (id) => {
    itemDragId.value = id;
  }

  const startDrag = (e, itemId) => {
    console.log('startDrag', itemId);
    e.dataTransfer.dropEffect = 'move';
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('itemId', itemId);
    let fItem = story.getOneItem(itemId);
    fItem.dragged = true;

  }

  const endDrag = (e, itemId) => {
    console.log('endDrag', itemId);
    itemDragId.value = null;
    const id = e.dataTransfer.getData('itemId');

  }

  const enterDrag = (e, itemId) => {
    console.log('enterDrag', itemId);
    const id = e.dataTransfer.getData('itemId');
    if(+id === +itemId){
      return;
    }
    const itemD = story.dinamicFolder.find(i=>+i.id === +id);
    if(itemD !== undefined){
      console.log(itemD)
    }

  }

  const overDrag = (e, itemId) => {
    console.log('overDrag', itemId);
    const id = e.dataTransfer.getData('itemId');
    if(+id === +itemId){
      return;
    }
    const itemD = story.dinamicFolder.find(i=>+i.id === +id);
    if(itemD !== undefined){
      console.log(itemD)
    }
  }

</script>

<style scoped lang="scss">
  li {
    &.enter {
      border-bottom: 5px solid #ccc;
    }
    &.dragged {
      position: relative;
      &:before {
        content: "";
        display: block;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background:#DFE4EF;
        z-index: 1;
      }
    }
  }
</style>
