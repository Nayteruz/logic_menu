<template>
  <span class="toggle-folder">
    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="5" viewBox="0 0 8 5" fill="none">
      <path d="M3.53976 4.4727C3.28126 4.21408 3.28126 3.79476 3.53976 3.53614L6.87001 0.204315C7.12851 -0.0543084 7.54762 -0.054308 7.80612 0.204315C8.06462 0.462938 8.06462 0.88225 7.80612 1.14087L4.47587 4.4727C4.21737 4.73132 3.79826 4.73132 3.53976 4.4727Z" fill="#0066FF"/>
      <path d="M4.47058 4.4727C4.72908 4.21408 4.72908 3.79476 4.47058 3.53614L1.12999 0.193967C0.871489 -0.064656 0.452377 -0.0646556 0.193876 0.193968C-0.0646252 0.452591 -0.0646252 0.871902 0.193876 1.13053L3.53447 4.4727C3.79297 4.73132 4.21208 4.73132 4.47058 4.4727Z" fill="#0066FF"/>
    </svg>
  </span>
</template>

<style scoped lang="scss">
  .toggle-folder {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex:0 0 22px;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    box-sizing: border-box;
    border:1px solid #D3D8DF;
    margin-right: 14px;
    cursor: pointer;

    &.opened {
      svg {
        transform: rotate(180deg);
      }
    }
    &.no-sub-folder {
      opacity: 0.5;
      pointer-events: none;
      svg {
        transform: rotate(0);
      }
    }
  }
</style>