<template>
  <div class="item">
    <IconOpen @click="showSub = !showSub" :class="{'opened' : showSub, 'no-sub-folder' : !subFolders.length}"/>
    <h3 class="name">{{ item?.name }}</h3>
    <ul class="colors" v-if="item?.colors?.length">
      <li v-for="color in item?.colors"><span :style="{background:color}"></span></li>
    </ul>
    <h4 class="small-name" v-if="item?.subname">{{ item.subname }}</h4>
    <div class="icons">
      <IconEdit/>
      <IconDelete style="width: 19px; height: 21px;" @click="story.deleteFolder(item)"/>
      <IconMove style="width: 16px; height: 23px;" @mousedown.left="mouseDown"/>
    </div>
  </div>
  <Transition name="slide-fade">
    <ul class="sub-folders" v-if="subFolders.length" v-show="showSub">
      <li
        v-for="subItem in subFolders"
        :key="subItem.id"
        :draggable="+subItem?.id === +itemDragId"
        @dragstart="startDrag($event, subItem.id)"
        @dragend="endDrag($event, subItem.id)"
        @dragenter="enterDrag($event, subItem.id)"
        @dragleave="leaveDrag($event, subItem.id)"
        @dragover.prevent
        @drop="onDrop($event, subItem.id)"
        :class="{'start-drag' : story.startDrag === 'sub', 'dragging' : subItem?.dragging, 'dropping' : subItem?.dropping}"
      >
        <ItemListSubFolder
          :item="subItem"
          @mouseDownSub="mouseDownSub"

        />
      </li>
    </ul>
  </Transition>
</template>


<script setup>

import {computed, ref, watch} from "vue";
import IconEdit from "../../icon/IconEdit.vue";
import IconDelete from "../../icon/IconDelete.vue";
import IconMove from "../../icon/IconMove.vue";
import IconOpen from "../../icon/IconOpen.vue";
import ItemListSubFolder from "./ItemListSubFolder.vue";
import {useFoldersStore} from "../../../stores/folders";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['mouseDown'])

const story = useFoldersStore();

const subFolders = computed(() =>{
  return story.dinamicSubFolder.filter(s=>s.parentId === props.item.id);
})

const showSub = ref(false);

const itemDragId = ref(null);

const mouseDown = () => {
  emit('mouseDown', {'id': props.item.id, 'event' : 'main'});
}

watch(() => story.searchText, (n,o) =>{
  showSub.value = n !== '';
})

const mouseDownSub = (data) => {
  story.startDrag = data.event;
  itemDragId.value = data.id;
}

const startDrag = (e, itemId) => {
  if(story.startDrag !== 'sub'){
    return;
  }
  e.dataTransfer.dropEffect = 'move';
  e.dataTransfer.effectAllowed = 'move';
  setTimeout(()=>{
    story.setDraggingF2(itemId);
  },0)
}

const enterDrag = (e, itemId) => {
  setTimeout(()=>{
    let draggingItem = story.staticSubFolder.find(i=>i.dragging === true);
    if(itemId !== draggingItem?.id){
      story.setDroppingF2(itemId);
    }
  },0)
}

const leaveDrag = (e, itemId) => {
  story.removeDroppingF2();
}

const endDrag = (e, itemId) => {
  itemDragId.value = false;
  story.startDrag = '';
  setTimeout(()=>{
    story.removeDroppingF2();
    story.removeDraggingF2();
  },100)

}
const onDrop = (e, itemId) => {
  let targetDrag, targetDrop, indexTargetDrag, indexTargetDrop;
  itemDragId.value = false;

  targetDrop = story.staticSubFolder.find(i => i.id === itemId);

  if (story.startDrag === 'nocat') {
    targetDrag = story.staticOutFolder.find(i => i.dragging === true);
  } else {
    targetDrag = story.staticSubFolder.find(i => i.dragging === true);
  }

  story.removeDroppingF3();
  story.removeDraggingF3();
  story.removeDroppingF2();
  story.removeDraggingF2();

  targetDrag.parentId = targetDrop?.parentId;

  story.staticSubFolder.map((el, i) => {
    if (el.id === targetDrag.id) {
      indexTargetDrag = i;
    }
    if (el.id === itemId) {
      indexTargetDrop = i;
    }
  });

  if (story.startDrag === 'nocat') {
    story.staticOutFolder.map((el, i) => {
      if (el.id === targetDrag.id) {
        indexTargetDrag = i;
      }
    });
    story.staticOutFolder.splice(indexTargetDrag, 1);
    story.staticSubFolder.splice(indexTargetDrop, 0, targetDrag);
  } else {
    story.staticSubFolder.splice(indexTargetDrag, 1);
    story.staticSubFolder.splice(indexTargetDrop, 0, targetDrag);
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

.item {
  display: flex;
  align-items: center;
  border: 1px solid #DFE4EF;
  padding: 11px 14px;
  margin-top: -1px;
  box-sizing: border-box;
  background: #fff;

  &.dragging {
    box-shadow: 0px 3px 16px rgba(0, 102, 255, 0.7);
  }

  .name {
    font-size: 15px;
    font-weight: 500;
    color: #000;
    margin: 0;
    white-space: nowrap;
  }

  .colors {
    display: flex;
    align-items: center;
    gap:5px;
    margin-left: 16px;

    span {
      display: block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      &:hover {
        box-shadow: inset 0 0 0 1px #000, 0 4px 4px rgba(0, 0, 0, 0.25);
      }
    }
  }

  .small-name {
    font-size: 11px;
    font-weight: 400;
    color: #8E9CBB;
    margin: 2px 0 0 15px;
    white-space: nowrap;
    overflow: hidden;
  }
}

.icons {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
  background: #fff;
  padding-left: 10px;

  &:before {
    content: "";
    display: block;
    position: absolute;
    left: -20px;
    top: 0;
    bottom: 0;
    width: 20px;
    background: linear-gradient(90deg, transparent 0%, #fff 100%);
  }
}

.sub-folders {
  margin-left: 16px;
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
}
</style>