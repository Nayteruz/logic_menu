<template>
  <ul>
    <li
        v-for="item in story.dinamicFolder"
        :key="item.id"
        :draggable="+item?.id === +itemDragId"
        @dragstart="startDrag($event, item.id)"
        @dragend.prevent="endDrag($event, item.id)"
        @dragenter="enterDrag($event, item.id)"
        @dragleave="leaveDrag($event, item.id)"
        @dragover.prevent
        @drop="onDrop($event, item.id)"
        :class="{'dragging' : item?.dragging, 'start-drag' : story.startDrag === 'main', 'dropping' : item?.dropping}"
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

  const itemDragId = ref(null);

  const story = useFoldersStore();

  const mouseDown = (data) => {
    story.startDrag = data.event;
    itemDragId.value = data.id;
  }

  const startDrag = (e, itemId) => {
    if(story.startDrag !== 'main'){
      return;
    }
    e.dataTransfer.dropEffect = 'move';
    e.dataTransfer.effectAllowed = 'move';
    setTimeout(()=>{
      story.setDraggingF1(itemId);
    },0)
  }

  const enterDrag = (e, itemId) => {
    if(story.startDrag !== 'main'){
      return;
    }
    setTimeout(()=>{
      let draggingItem = story.dinamicFolder.find(i=>i.dragging === true);
      if(itemId !== draggingItem?.id){
        story.setDroppingF1(itemId);
      }
    },0)
  }

  const leaveDrag = (e, itemId) => {
    if(story.startDrag !== 'main'){
      return;
    }
    story.removeDroppingF1();
  }

  const endDrag = (e, itemId) => {
    if(story.startDrag !== 'main'){
      return;
    }
    itemDragId.value = false;
    story.startDrag = '';
    setTimeout(()=>{
      story.removeDroppingF1();
      story.removeDraggingF1();
    },100)

  }
  const onDrop = (e, itemId) => {
    if(story.startDrag !== 'main'){
      return;
    }
    itemDragId.value = false;
    let {id} = story.dinamicFolder.find(i=>i.dragging === true);
    story.removeDroppingF1();
    story.removeDraggingF1();
    let targetDrag = story.dinamicFolder.find(i=>i.id === id);
    let indexTargetDrag, indexTargetDrop;
    story.dinamicFolder.map((el, i)=>{
      if(el.id === id){
        indexTargetDrag = i;
      }
      if(el.id === itemId){
        indexTargetDrop = i;
      }
    });
    story.dinamicFolder.splice(indexTargetDrag, 1);
    story.dinamicFolder.splice(indexTargetDrop, 0, targetDrag);

    story.startDrag = '';
  }

</script>
<style scoped lang="scss">
  li {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
    &.dragging {
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
    &.dropping{
      border-bottom: 5px solid #0066FF;
    }
    &.start-drag {
      position: relative;
      &:after {
        content: "";
        display: block;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 999;
      }
    }
  }
</style>
