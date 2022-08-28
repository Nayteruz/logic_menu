<template>
  <span class="icon-wrap">
    <slot></slot>
  </span>
</template>

<style lang="scss">
  .icon-wrap {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    box-sizing: border-box;
    padding: 4px;
    cursor: pointer;

    svg {
      width: 100%;
      height: 100%;
    }
  }
</style>