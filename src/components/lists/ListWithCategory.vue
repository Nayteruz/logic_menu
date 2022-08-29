<template>
  <ul>
    <li
        v-for="item in story.foldersCategory"
        :key="item.id"
        ref="itemLi"
        :draggable="+item?.id === +isDrag"
        @dragstart="startDrag($event, item)"
        @dragend="endDrag($event, item)"
        @dragenter="enterDrag($event, item)"
        :class="{'enter' : item?.isEnter}"
    >
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

const isDrag = ref(null);

const story = useFoldersStore();
const itemLi = ref(null);

const mouseDown = (id) => {
  isDrag.value = id;
}

const startDrag = (e, item) => {
  e.dataTransfer.dropEffect = 'move';
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('itemId', item.id);
}

const endDrag = (e, item) => {
  isDrag.value = false;
  console.log(item);
}

const enterDrag = (e, item) => {
  console.log(item);
  const itemId = e.dataTransfer.getData('itemId');
  const itemD = story.foldersCategory.find(i=>i.id === itemId);
  if(itemD !== undefined){
    console.log(itemD)
  }

}



const overDrag = (e, item) => {
  console.log(item);
}

</script>
