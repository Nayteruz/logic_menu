<template>
  <header>
    <h2>Документы</h2>
    <div class="buttons">
      <span class="icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="15" viewBox="0 0 12 15" fill="none">
          <path d="M11 13.8571L6 10.2857L1 13.8571V2.42857C1 2.04969 1.15051 1.68633 1.41842 1.41842C1.68633 1.15051 2.04969 1 2.42857 1H9.57143C9.95031 1 10.3137 1.15051 10.5816 1.41842C10.8495 1.68633 11 2.04969 11 2.42857V13.8571Z" stroke="#8E9CBB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>
      <button class="new-type">Новый тип</button>
      <button class="new-doc">Новый документ</button>
    </div>
  </header>
</template>

<script setup>

</script>

<style scoped lang="scss">
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap:20px;
    margin-bottom: 20px;

    h2 {
      font-size: 22px;
      font-weight: 500;
      color: #000;
      margin: 0;
    }
  }
  .buttons {
    display: flex;
    align-items: center;
    gap:10px;

    .icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
      border:1px solid #D3D8DF;
      box-sizing: border-box;
      border-radius: 50%;
      cursor: pointer;

      svg {
        width: 10px;
        height: 12px;
      }
    }

    button {
      display: inline-flex;
      align-items: center;
      height: 30px;
      box-sizing: border-box;
      border-radius: 50px;
      border:1px solid #D3D8DF;
      color: #000;
      font-size: 12px;
      cursor: pointer;
      font-weight: 500;
      padding: 3px 18px 3px 35px;
      background:url('../assets/plus.svg') 10px 50% no-repeat #fff;
      background-size: 14px;
      line-height: 1;
      font-family: inherit;
    }
  }

</style>