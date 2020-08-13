<template>
  <div id="app">
    <div id="columns">
      <h4>2 колонки</h4>
      <input type="file" @change="onFileChangeTwo" />

      <h4>3 колонки</h4>

      <select v-model="fileName" @change="isDisabled">
        <option disabled value=""> Выберете файл</option>
        <option v-for="(item, index) in arr" :value="item.value" :key="index">
          {{ item.fileName }}</option
        >
      </select>

      <input
        type="file"
        @change="onFileChangeThree"
        v-if="fName"
        class="threeCol"
      />
    </div>
  </div>
</template>

<script src="./App.js"></script>

<style>
.threeCol {
  display: block;
  margin-top: 25px;
}
</style>
