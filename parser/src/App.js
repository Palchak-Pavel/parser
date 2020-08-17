import * as XLSX from "xlsx";

export default {
  data() {
    return {
      showButton: (this.selectedFileType = false),

      selectedFileType: {},
      arr: [
        {
          selectedFileType: "file-1",
          value: {
            codeColNum: 3,
            countColNum: 7,
            priceColNum: 8,
          },
        },
        {
          selectedFileType: "file-2",
          value: {
            codeColNum: 0,
            countColNum: 1,
            priceColNum: 2,
          },
        },
        {
          selectedFileType: "file-3",
          value: {
            codeColNum: 7,
            countColNum: 20,
            priceColNum: 23,
          },
        },
      ],
    };
  },
  methods: {
    isDisabled() {

      if (this.selectedFileType) this.showButton = true;
    },

    onFileChangeThree(e) {
      let file = e.target.files[0];
      let reader = new FileReader(); // начинает чтение файла, но не ожидает получения данных
      reader.readAsBinaryString(file);
      reader.onload = () => this.onFileChangeReadThree(reader);
    },

    globalVariables(reader){
      let data = reader.result;
      const wb = XLSX.read(data, { type: "binary" }); // ??? тип
      //считываем 1 лист
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];

      return XLSX.utils.sheet_to_json(ws, { header: 1 }); //  генерирует массив объектов
    },

    onFileChangeReadThree(reader) {

      let codeColNum = this.selectedFileType.codeColNum, // колонки таблицы
        countColNum = this.selectedFileType.countColNum,
        priceColNum = this.selectedFileType.priceColNum;

      let rows= this.globalVariables(reader);
      let result = [];
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

    ////////////////////////////////////////////
    onFileChangeReadTwo(reader) {
      let rows= this.globalVariables(reader);
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
