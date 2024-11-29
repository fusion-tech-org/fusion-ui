/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
function createWorker(f: VoidFunction) {
  const blob = new Blob([`(${f.toString()})(${JSON.stringify(extra)})`], {
    type: 'application/javascript',
  });

  const url = URL.createObjectURL(blob);

  const worker = new Worker(url);

  // URL.revokeObjectURL(url);

  return worker;
}

export const genParseFileWorker = (extra) =>
  createWorker(function (params) {
    console.log('extra', typeof params, params);

    const platform_scripts = [
      'https://staging.fusiontech.cn/read-excel-file/read-excel-file-webworker.min.js',
      'https://staging.fusiontech.cn/read-excel-file/read-excel-sheet-names.min.js',
      'https://staging.fusiontech.cn/read-excel-file/dexie.min.js',
    ];
    const deploy_scripts = [
      '/static/read-excel-file-webworker.min.js',
      '/static/read-excel-sheet-names.min.js',
      '/static/dexie.min.js',
    ];
    const externalScripts =
      params.appMode === 'INSTALL' ? deploy_scripts : platform_scripts;

    importScripts(...externalScripts);

    const db = new Dexie('FileDatabase');

    // DB with single table "friends" with primary key "id" and
    // indexes on properties "name" and "age"
    db.version(1).stores({
      [`${params.widgetId}`]: `
        id,
        name`,
    });

    // const adapterMapFormatter = {
    //   univer: formatDataForUniver,
    // };

    self.onmessage = function (event) {
      const { fileUrl, enableRemoteUrl, adapter = 'univer' } = event.data || {};

      if (fileUrl && enableRemoteUrl) {
        processFileViaRemoteUrl(fileUrl, adapter);
      }
    };

    async function processFileViaRemoteUrl(url, adapter) {
      console.log('adapter', adapter);
      postMessage({
        type: 'PARSE_FILE',
        step: 1,
        message: 'start-fetch',
      });
      fetch(url, {
        headers: {
          mode: 'no-cors',
        },
      })
        .then((response) => response.blob())
        .then(async (blob) => {
          postMessage({
            type: 'PARSE_FILE',
            step: 2,
            message: 'start-parse',
          });
          const sheets = await readSheetNames(blob);

          return {
            sheets,
            file: blob,
          };
        })
        .then(async ({ sheets, file }) => {
          // const results = [];

          try {
            for (let i = 0; i < sheets.length; i++) {
              const sheetName = sheets[i];

              const rows = await readXlsxFile(file, {
                sheet: sheetName,
              });

              const { columnCount, cellData } = rows2CellData(rows);

              const sheetData = {
                name: sheetName,
                id: sheetName,
                // rowData: rows
                cellData,
                // rowCount: rows.length + 5,
                columnCount,
              };
              console.log(sheetName, sheetData);
              await db[`${params.widgetId}`].bulkPut([sheetData]);
            }
          } catch (e) {
            throw new Error(e);
          }
        })
        // .then((data) => {
        //   const adapterMapFormatter = {
        //     univer: formatDataForUniver,
        //   };

        //   return adapterMapFormatter[adapter](data);
        // })
        .then(() => {
          // each row being an array of cells.
          postMessage({
            type: 'PARSE_FILE',
            code: 0,
            step: 3,
          });
        })
        .catch((err) => {
          console.error(err);
          postMessage({
            type: 'PARSE_FILE',
            code: 1,
            message: err?.message,
          });
        });
    }

    // function formatDataForUniver(data) {
    //   const { sheets, results } = data || {};
    //   const formatSheets = {};

    //   for (let i = 0; i < results.length; i++) {
    //     const curSheet = results[i];
    //     const { sheet: sheetName, rows } = curSheet || {};
    //     const { columnCount, cellData } = rows2CellData(rows);

    //     formatSheets[`${sheetName}`] = {
    //       name: sheetName,
    //       id: sheetName,
    //       // rowData: rows
    //       cellData,
    //       // rowCount: rows.length + 5,
    //       columnCount,
    //     };
    //   }

    //   return {
    //     // id: 'workbook-01',
    //     // name: '匿名文件',
    //     sheetOrder: sheets,
    //     appVersion: '1.0.0',
    //     sheets: formatSheets,
    //   };
    // }

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
  }, extra);
