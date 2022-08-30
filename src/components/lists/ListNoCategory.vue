<template>
  <Transition name="slide-fade">
  <ul class="no-folders">
    <li
      v-for="item in story.dinamicOutFolder"
      :key="item.id"
      :draggable="+item?.id === +itemDragId"
      @dragstart="startDrag($event, item.id)"
      @dragend="endDrag($event, item.id)"
      @dragenter="enterDrag($event, item.id)"
      @dragleave="leaveDrag($event, item.id)"
      @dragover.prevent
      @drop="onDrop($event, item.id)"
      :class="{'start-drag' : story.startDrag === 'nocat', 'dragging' : item?.dragging, 'dropping' : item?.dropping}"
    >
      <ItemListNo
        :item="item"
        @mouseDownNo="mouseDownNo"
      />
    </li>
  </ul>
  </Transition>
</template>

<script setup>
  import ItemListNo from "./item/ItemListNo.vue";
  import {useFoldersStore} from "../../stores/folders";
  import {ref} from "vue";
  const story = useFoldersStore();

  const itemDragId = ref(null);

  const mouseDownNo = (data) => {
    story.startDrag = data.event;
    itemDragId.value = data.id;
  }

  const startDrag = (e, itemId) => {
    if(story.startDrag !== 'nocat'){
      return;
    }
    e.dataTransfer.dropEffect = 'move';
    e.dataTransfer.effectAllowed = 'move';
    setTimeout(()=>{
      story.setDraggingF3(itemId);
    },0)
  }

  const enterDrag = (e, itemId) => {
    setTimeout(()=>{
      let draggingItem = story.staticOutFolder.find(i=>i.dragging === true);
      if(itemId !== draggingItem?.id){
        story.setDroppingF3(itemId);
      }
    },0)
  }

  const leaveDrag = (e, itemId) => {
    story.removeDroppingF3();
  }

  const endDrag = (e, itemId) => {
    itemDragId.value = false;
    story.startDrag = '';
    setTimeout(()=>{
      story.removeDroppingF3();
      story.removeDraggingF3();
    },100)

  }
  const onDrop = (e, itemId) => {

    let targetDrag, targetDrop, indexTargetDrag, indexTargetDrop;
    itemDragId.value = false;

    targetDrop = story.staticOutFolder.find(i => i.id === itemId);

    if (story.startDrag === 'sub') {
      targetDrag = story.staticSubFolder.find(i => i.dragging === true);
    } else {
      targetDrag = story.staticOutFolder.find(i => i.dragging === true);
    }

    story.removeDroppingF3();
    story.removeDraggingF3();
    story.removeDroppingF2();
    story.removeDraggingF2();

    targetDrag.parentId = targetDrop?.parentId;

    story.staticOutFolder.map((el, i) => {
      if (el.id === targetDrag.id) {
        indexTargetDrag = i;
      }
      if (el.id === itemId) {
        indexTargetDrop = i;
      }
    });

    if (story.startDrag === 'sub') {
      story.staticSubFolder.map((el, i) => {
        if (el.id === targetDrag.id) {
          indexTargetDrag = i;
        }
      });
      story.staticSubFolder.splice(indexTargetDrag, 1);
      story.staticOutFolder.splice(indexTargetDrop, 0, targetDrag);
    } else {
      story.staticOutFolder.splice(indexTargetDrag, 1);
      story.staticOutFolder.splice(indexTargetDrop, 0, targetDrag);
    }
    story.startDrag = '';
  }

</script>

<style scoped lang="scss">
  .slide-fade-enter-active {
    transition: all 0.3s ease-out;
  }

  .slide-fade-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
  }

  .slide-fade-enter-from,
  .slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
  }

  ul.no-folders {
    margin-top: 14px;
    li {
      position: relative;
      transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
      &.dragging {
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
  }

</style>