<template>
  <div id="app">
    <div id="columns">
      <h4>2 колонки</h4>
      <input type="file" @change="onFileChangeTwo" />

      <ul v-if="showTwoColumns">
        <li v-for="(item, i) in twoColumnsParsedData" :key="i">
          {{item.productCode}}
        </li>
      </ul>

      <h4>3 колонки</h4>

      <label>
        <select v-model="selectedFileType" @change="isDisabled">
          <option disabled value=""> Выберете файл</option>
          <option v-for="(item, index) in arr" :value="item.value" :key="index">
            {{ item.selectedFileType }}</option
          >
        </select>
      </label>

      <input
        type="file"
        @change="onFileChangeThree"
        v-if="showButton"
        class="threeCol"
      />

      <ul v-if="showTreeColumns">
        <template v-for="(item, i) in selectedFileType" >
        <li :key="i">
          {{item.productCode}} - {{item.productCount}} -  {{item.price}}
        </li>
         </template>
      </ul>
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
