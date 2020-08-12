<template>
  <div id="reading"></div>
</template>

<script>
import * as XLSX from "xlsx";
export default {
  name: "reading",
  data() {
    return {};
  },

  methods: {
    onFileChangeThree(e) {
      let file = e.target.files[0];
      let reader = new FileReader(); // читает данные из файла

      reader.onload = () => {
        let data = reader.result;
        const wb = XLSX.read(data, { type: "binary" });
        //считываем 1 лист
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];

        let rows = XLSX.utils.sheet_to_json(ws, { header: 1 }); //  генерирует массив объектов
        let result = [];
        let header = rows[0][0]; // находим первую ячейку таблицы
        let codeColNum = 1, // колонки таблицы
          countColNum = 8,
          priceColNum = 4;
        // проверяем первую ячейку таблицы
        if (header === "GOODWILL ОСТАТКИ *")
          // Цикл по строкам
          for (let i = 0; i < rows.length; i++) {
            let currentRow = rows[i];
            let productCount = parseInt(currentRow[countColNum]); //принимает строку в качестве аргумента и возвращает целое число
            if (!isNaN(productCount))
              // определяет является ли литерал или переменная нечисловым значением

              result.push({
                // добавляем значения в массив
                productCode: currentRow[codeColNum],
                productCount: productCount,
                price: currentRow[priceColNum],
              });
          }

        console.log(result);
      };
      reader.readAsBinaryString(file);
    },

    onFileChangeTwo(e) {
      let file = e.target.files[0];
      let reader = new FileReader();

      reader.onload = () => {
        let data = reader.result;
        const wb = XLSX.read(data, { type: "binary" });
        //считываем 1 лист
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];

        let rows = XLSX.utils.sheet_to_json(ws, { header: 1 });
        let result = [];

        let codeColNum = 0,
          countColNum = 1;

        for (let i = 0; i < rows.length; i++) {
          let currentRow = rows[i];
          let productCount = parseInt(currentRow[countColNum]);
          if (!isNaN(productCount))
            result.push({
              productCode: currentRow[codeColNum],
              productCount: productCount,
            });
        }

        console.log(result);
      };
      reader.readAsBinaryString(file);
    },
  },
};
</script>
