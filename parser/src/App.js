import * as XLSX from "xlsx";

export default {
  data() {
    return {
      fileName: {},
      arr: [
        {
          fileName: "file-1",
          value: {
            codeColNum: 2,
            countColNum: 6,
            priceColNum: 7,
          },
        },
        {
          fileName: "file-2",
          value: {
            codeColNum: 0,
            countColNum: 1,
            priceColNum: 2,
          },
        },
        {
          fileName: "file-3",
          value: {
            codeColNum: 2,
            countColNum: 6,
            priceColNum: 7,
          },
        },
      ],
    };
  },

  methods: {
    onSelectionChanged(e) {
      console.log(e);
    },

    onFileChangeReadThree(reader) {
      let data = reader.result;
      const wb = XLSX.read(data, { type: "binary" }); // ??? тип
      //считываем 1 лист
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];

      let rows = XLSX.utils.sheet_to_json(ws, { header: 1 }); //  генерирует массив объектов
      let result = [];
      let codeColNum = data.value, // колонки таблицы
        countColNum = data.value,
        priceColNum = data.value;
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
    },

    onFileChangeThree(e) {
      let file = e.target.files[0];
      let reader = new FileReader();
      reader.readAsBinaryString(file);
      reader.onload = () => this.onFileChangeReadThree(reader);
    },

    onFileChangeReadTwo(reader) {
      let data = reader.result;
      const wb = XLSX.read(data, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];

      let rows = XLSX.utils.sheet_to_json(ws, { header: 1 });
      let result = [];

      // проверяем первую ячейку таблицы
      let header = rows[0][0]; // находим первую ячейку таблицы

      let codeColNum = 0,
        countColNum = 1;
      if (header === "GOODWILL ОСТАТКИ *") (codeColNum = 1), (countColNum = 7);

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
    },

    onFileChangeTwo(e) {
      let file = e.target.files[0];
      let reader = new FileReader();
      reader.readAsBinaryString(file);
      reader.onload = () => this.onFileChangeReadTwo(reader);
    },
  },

  watch: {
    fileName(val) {
      console.log(val);
    },
  },
};
