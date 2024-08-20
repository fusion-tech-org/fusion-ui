import readXlsxFile, { readSheetNames } from 'read-excel-file/web-worker';

const adapterMapFormatter = {
  univer: formatDataForUniver,
};

export const loadFileAndParseData = async ({
  fileUrl,
  adapter = 'univer',
}: {
  fileUrl: string;
  adapter?: 'univer';
}) => {
  try {
    const fileData = await fetch(fileUrl, {
      headers: {
        mode: 'no-cors',
      },
    });
    const toBlob = await fileData.blob();

    const querySheets = await readSheetNames(toBlob);

    console.log('querySheets', querySheets);

    const results = [];

    for (let i = 0; i < querySheets.length; i++) {
      const sheetName = querySheets[i];

      const rows = await readXlsxFile(toBlob, {
        sheet: sheetName,
      });

      results.push({
        sheet: sheetName,
        rows,
      });
    }

    return adapterMapFormatter[adapter](results);
  } catch (e) {
    console.error(e);
  }
};

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
