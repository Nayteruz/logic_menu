<template>
  <div class="item-sub-folder">
    <h3 class="name">{{ item?.name }}</h3>
    <ul class="colors" v-if="item?.colors?.length">
      <li v-for="color in item?.colors"><span :style="{background:color}"></span></li>
    </ul>
    <span class="label" v-if="item?.label">{{ item?.label }}</span>
    <h4 class="small-name" v-if="item?.subname" >{{ item.subname }}</h4>
    <div class="icons">
      <IconEdit/>
      <IconDelete style="width: 19px; height: 21px;" @click="story.deleteSubFolder(item)"/>
      <IconMove style="width: 16px; height: 23px;" @mousedown.left="mouseDownSub"/>
    </div>
  </div>
</template>

<script setup>

import IconEdit from "../../icon/IconEdit.vue";
import IconDelete from "../../icon/IconDelete.vue";
import IconMove from "../../icon/IconMove.vue";
import {useFoldersStore} from "../../../stores/folders";

const props = defineProps({
  item: {
    type:Object,
    required: true,
  },
});

const emit = defineEmits(['mouseDownSub'])

const story = useFoldersStore();

const mouseDownSub = () => {
  emit('mouseDownSub', {'id': props.item.id, 'event' : 'sub'});
}

</script>

<style scoped lang="scss">
.item-sub-folder {
  display: flex;
  align-items: center;
  border:1px solid #DFE4EF;
  padding:5px 14px 5px 16px;
  margin-top: -1px;

  * {
    line-height: 1.2;
  }

  .name {
    font-size: 13px;
    font-weight: 400;
    color: #000;
    margin: 0;
    white-space: nowrap;
  }

  .colors {
    display: flex;
    align-items: center;
    gap:5px;
    margin-left: 20px;

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

  span.label {
    display: block;
    color: #FF238D;
    font-size: 11px;
    margin-left: 15px;
  }

  .small-name {
    font-size: 11px;
    font-weight: 400;
    color: #8E9CBB;
    margin:0 0 0 15px;
    white-space: nowrap;
    overflow: hidden;
  }

}

.icons {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap:10px;
  position: relative;
  background:#fff;
  padding-left: 10px;

  &:before {
    content: "";
    display: block;
    position: absolute;
    left: -20px;
    top: 0;
    bottom: 0;
    width: 20px;
    background:linear-gradient(90deg, transparent 0%, #fff 100%);
  }
}
</style>