import readXlsxFile, { readSheetNames } from 'read-excel-file/web-worker'

onmessage = function (event) {
  const { fileUrl, enableRemoteUrl, adapter } = event.data || {};

  if (fileUrl && enableRemoteUrl) {
    processFileViaRemoteUrl(fileUrl, adapter);
  }
  // readXlsxFile(event.data).then((rows) => {
  //   // `rows` is an array of rows
  //   // each row being an array of cells.
  //   postMessage(rows)
  // })
}

async function processFileViaRemoteUrl(url, adapter) {
  postMessage({
    type: 'PARSE_EXCEL',
    step: 1,
    message: 'start-fetch'
  });
  fetch(url, {
    headers: {
      mode: 'no-cors',
    }
  })
    .then(response => response.blob())
    .then(async blob => {
      postMessage({
        type: 'PARSE_EXCEL',
        step: 2,
        message: 'start-parse'
      });
      const sheets = await readSheetNames(blob);

      return {
        sheets,
        file: blob,
      }
    })
    .then(async ({ sheets, file }) => {
      console.log('sheets', sheets, file);
      const results = [];

      for (let i = 0; i < sheets.length; i++) {
        const sheetName = sheets[i];

        const rows = await readXlsxFile(file, {
          sheet: sheetName,
        });

        results.push({
          sheet: sheetName,
          rows,
        })

      }

      return {
        sheets,
        results,
      };
    })
    .then(data => {
      console.log('format data');
      const adapterMapFormatter = {
        univer: formatDataForUniver
      };

      return adapterMapFormatter[adapter](data);
    })
    .then((result) => {
      // `rows` is an array of rows
      // each row being an array of cells.
      postMessage({
        type: 'PARSE_EXCEL',
        code: 0,
        step: 3,
        data: result,
      });
    }).catch(err => {
      console.error(err);
      postMessage({
        type: 'PARSE_EXCEL',
        code: 1,
        message: err?.message
      });
    })
}

function formatDataForUniver(data) {
  const { sheets, results } = data || {};
  const formatSheets = {};

  for (let i = 0; i < results.length; i++) {
    const curSheet = results[i];
    const { sheet: sheetName, rows } = curSheet || {};
    const { columnCount, cellData } = rows2CellData(rows);

    formatSheets[`${sheetName}`] = {
      name: sheetName,
      id: sheetName,
      // rowData: rows
      cellData,
      // rowCount: rows.length + 5,
      columnCount,
    }
  }

  return {
    // id: 'workbook-01',
    // name: '匿名文件',
    sheetOrder: sheets,
    appVersion: '1.0.0',
    sheets: formatSheets,
  }
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
        v: curCell
      }

    }
  }

  return {
    cellData,
    columnCount,
  };
}