<template>
  <header>
    <h2>Документы</h2>
    <div class="buttons">
      <span class="icon"></span>
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
      font-size: 18px;
      color: #333;
      margin: 0;
    }
  }
  .buttons {
    display: flex;
    align-items: center;
    gap:10px;

    button {
      background:#fff;
      border-radius: 20px;
      border:1px solid #ccc;
      color: #333;
      font-size: 15px;
      cursor: pointer;
      font-weight: 400;
      padding: 5px 10px;
    }
  }

</style>