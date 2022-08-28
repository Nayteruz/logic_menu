<template>
  <div class="item-sub-folder" draggable="true">
    <h3 class="name">{{ item?.name }}</h3>
    <h4 class="small-name" v-if="item?.subname" >{{ item.subname }}</h4>
    <div class="icons">
      <IconEdit/>
      <IconDelete style="width: 19px; height: 21px;" @click="story.deleteSubFolder(item, parentItem)"/>
      <IconMove style="width: 16px; height: 23px;"/>
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
  parentItem: {
    type:Object,
    required: true,
  }
});

const story = useFoldersStore();

</script>

<style scoped lang="scss">
.item-sub-folder {
  display: flex;
  align-items: center;
  border:1px solid #DFE4EF;
  padding:5px 16px;
  margin-top: -1px;
  margin-left: 16px;

  .name {
    font-size: 13px;
    font-weight: 400;
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