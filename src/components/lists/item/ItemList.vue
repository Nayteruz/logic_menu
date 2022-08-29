<template>
  <div className="item">
    <IconOpen @click="showSub = !showSub" :class="{'opened' : showSub, 'no-sub-folder' : !item?.children.length}"/>
    <h3 className="name">{{ item?.name }}</h3>
    <h4 className="small-name" v-if="item?.subname">{{ item.subname }}</h4>
    <div className="icons">
      <IconEdit/>
      <IconDelete style="width: 19px; height: 21px;" @click="story.deleteFolder(item)"/>
      <IconMove ref="moveEl" style="width: 16px; height: 23px;" @mousedown.left="mouseDown"/>
    </div>
  </div>
  <Transition name="slide-fade">
    <ul className="sub-folders" v-if="item?.children" v-show="showSub">
      <li v-for="subItem in item?.children" draggable="true">
        <ItemListSubFolder :item="subItem" :parentItem="item"/>
      </li>
    </ul>
  </Transition>
</template>


<script setup>

import {ref} from "vue";
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

const emit = defineEmits(['mouseDown', 'mouseUp'])

const moveEl = ref(null);

const story = useFoldersStore();

const showSub = ref(false);

const mouseDown = (e) => {


  /*let bwidth = itemEl.value.offsetWidth;
  let bheight = itemEl.value.offsetHeight;

  itemShadow.value.style.width = bwidth + 'px';
  itemShadow.value.style.height = bheight + 'px';
  shadowShow.value = true;

  itemEl.value.style.width = bwidth + 'px';
  itemEl.value.classList.add('dragging');

  let coords = getCoords(itemEl.value);
  let shiftX = e.pageX - coords.left;
  let shiftY = e.pageY - coords.top;

  itemEl.value.style.position = 'absolute';
  itemEl.value.style.zIndex = 9999;

  const moveAt = (e) => {
    itemEl.value.style.left = e.pageX - shiftX + 'px';
    itemEl.value.style.top = e.pageY - shiftY + 'px';
  }

  document.onmousemove = function(e) {
    moveAt(e);
  }

  document.onmouseup = function (e){
    document.onmousemove = null;
    moveEl.value.onmouseup = null;
    itemEl.value.style = '';
    itemShadow.value.style = ''
    shadowShow.value = true;
    itemEl.value.classList.remove('dragging');
  }

  moveEl.value.ondragstart = function() {
    return false;
  };
  */

  emit('mouseDown', props.item.id);
}


// const getCoords = (el) => {
//   let box = el.getBoundingClientRect();
//   return {
//     top: box.top + pageYOffset,
//     left: box.left + pageXOffset
//   };
// }


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
    box-shadow: 3px 5px 7px #000;
  }

  .name {
    font-size: 15px;
    font-weight: 500;
    color: #000;
    margin: 0;
    white-space: nowrap;
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
</style>