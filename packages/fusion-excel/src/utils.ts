export function isValidURL(url: string): boolean {
  try {
    new URL(url);
    return true;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return false;
  }
}

export const adapterMapFormatter = {
  univer: formatDataForUniver,
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
