// src/parseFile.worker.ts
import * as Comlink from 'comlink';
import readXlsxFile, { readSheetNames } from 'read-excel-file/web-worker';

const adapterMapFormatter = {
  univer: formatDataForUniver,
};

const workerMethods = {
  async parseFile({
    fileUrl,
    enableRemoteUrl = false,
    adapter = 'univer',
  }: {
    fileUrl: string;
    enableRemoteUrl?: boolean;
    adapter: 'univer';
  }) {
    console.log(enableRemoteUrl);
    try {
      const fileRes = await fetch(fileUrl, {
        headers: {
          mode: 'no-cors',
        },
      });

      const fileBlob = await fileRes.blob();

      const sheets = await readSheetNames(fileBlob);

      console.log('sheets', sheets);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const results: any[] = [];

      for (let i = 0; i < sheets.length; i++) {
        const sheetName = sheets[i];

        const rows = await readXlsxFile(fileBlob, {
          sheet: sheetName,
        });

        results.push({
          sheet: sheetName,
          rows,
        });
      }

      return adapterMapFormatter[adapter](results, sheets);
    } catch (e) {
      console.log(e);
    }
  },
};

function formatDataForUniver(data, sheets) {
  const formatSheets = {};

  for (let i = 0; i < data.length; i++) {
    const curSheet = data[i];
    const { sheet: sheetName, rows } = curSheet || {};
    const { columnCount, cellData } = rows2CellData(rows);

    formatSheets[`${sheetName}`] = {
      name: sheetName,
      id: sheetName,
      // rowData: rows
      cellData,
      // rowCount: rows.length + 5,
      columnCount,
    };
  }

  return {
    // id: 'workbook-01',
    // name: '匿名文件',
    sheetOrder: sheets,
    appVersion: '1.0.0',
    sheets: formatSheets,
  };
}

function rows2CellData(rows) {
  const cellData = {};
  let columnCount = 26;

  for (let i = 0; i < rows.length; i++) {
    const curRow = rows[i];

    cellData[`${i}`] = {};

    if (curRow && curRow.length > columnCount) {
      columnCount = curRow.length;
    }

    for (let j = 0; j < curRow.length; j++) {
      const curCell = curRow[j];

      cellData[`${i}`][`${j}`] = {
        s: '',
        v: curCell,
      };
    }
  }

  return {
    cellData,
    columnCount,
  };
}

// const parseFile = (fileName: string) => {
//   // Your parsing logic here
//   return `Parsed file: ${fileName}`;
// };

Comlink.expose(workerMethods);
