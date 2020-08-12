<template>
  <div id="app">
    <div id="columns">
      <h4>2 колонки</h4>
      <input type="file" @change="onFileChangeTwo" />

      <h4>3 колонки</h4>
      <input type="file" @change="onFileChangeThree" />

      <select v-model="fileName" @change="onSelectionChanged($event)">
        <option disabled value=""> Выберете файл</option>
        <option v-for="(item, index) in arr" :value="item.value" :key="index">
          {{ item.fileName }}</option
        >
      </select>
    </div>
  </div>
</template>

<script src="./App.js"></script>

<style></style>
