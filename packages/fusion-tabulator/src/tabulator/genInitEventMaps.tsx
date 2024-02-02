import { throttle } from 'lodash';
import { PlatformAppMode } from 'src/interface';
import {
  CellComponent,
  ColumnComponent,
  EventCallBackMethods,
  RowComponent,
  Tabulator,
} from 'tabulator-tables';

export function genInitEventMaps({
  appMode,
  tabulatorRef,
  onUpdateWidgetMetaProperty,
  onEvents,
}: {
  appMode: PlatformAppMode;
  tabulatorRef: Tabulator;
  onUpdateWidgetMetaProperty: (params: Record<string, unknown>) => void;
  onEvents: (
    eventName: string,
    data?: Record<string, any>,
    extra?: Record<'action' | 'tableData', any>
  ) => void;
}): Partial<
  Record<
    keyof EventCallBackMethods,
    EventCallBackMethods[keyof EventCallBackMethods]
  >
> {
  function handleDataLoaded() {
    const curTableData = tabulatorRef?.getData();
    console.log('data loaded', curTableData);
  }

  function handleTableDestroyed() {
    console.log('table destroyed');
  }

  function handleDataProcessed() {
    // console.log('data processed');
    // if (appMode === 'EDIT') {
    //   Message.info('表格数据渲染完成');
    // }
    const curTableData = tabulatorRef?.getData();
    // console.log('data processed: ', curTableData);
    onEvents?.('dataProcessed', curTableData);
    onUpdateWidgetMetaProperty?.({
      curTableData,
    });
  }

  function handleLoadError(error: Error) {
    console.log(error);
  }

  function handleDataChanged(data: any[]) {
    console.log('data changed: ', data);
    onEvents?.('dataChanged', data);
    onUpdateWidgetMetaProperty?.({
      updatingRows: data,
    });
  }

  function handleColumnMoved(column, columns) {
    // column - column component of the moved column
    // columns- array of columns in new order
    console.log(column, columns);
  }

  function handleColumnResized(column: ColumnComponent) {
    //column - column component of the resized column
    console.log(column);
  }

  function handleColumnTitleChanged(column) {
    //column - column component
    console.log(column);
  }

  function handleColumnVisibilityChanged(column, visible) {
    //column - column component
    //visible - is column visible (true = visible, false = hidden)
    console.log(column, visible);
  }

  function handleCellEditing(cell: CellComponent) {
    //cell - cell component
    console.log(cell);
  }

  function handleCellEdited(cell: CellComponent) {
    const cellField = cell.getField();
    const cellValue = cell.getValue();

    onUpdateWidgetMetaProperty?.({
      editingCell: {
        [cellField]: cellValue,
      },
    });
  }

  function handleRowClick(_event: UIEvent, row: RowComponent) {
    const rowData = row.getData();

    // @ts-ignore
    const { action } = _event.srcElement?.dataset || {};

    if (action === 'del-row-icon') {
      row
        .delete()
        .then(() => {
          const curTable = row.getTable();
          const tableData = curTable.getData();

          onEvents?.('rowClick', rowData, {
            action: 'delete-row',
            tableData,
          });
        })
        .catch((e) => {
          console.log('Deleting row failed: ', e);
        });

      return;
    }

    onEvents?.('rowClick', rowData);
  }

  function handleRowDoubleClick(_event: UIEvent, row: RowComponent) {
    const rowData = row.getData();
    onEvents?.('rowDbClick', rowData);
  }

  function handleRowSelected(_event: UIEvent, _row: RowComponent) {
    const rowData = tabulatorRef?.getSelectedData() || [];

    onEvents?.('rowSelected', rowData);
  }

  function handleHeaderClick(_event: UIEvent, column: ColumnComponent) {
    const colField = column.getField();
    onEvents?.('headerClick', {
      field: colField,
    });
  }

  function handleHeaderDblClick(_event: UIEvent, column: ColumnComponent) {
    const colField = column.getField();
    onEvents?.('headerDbClick', {
      field: colField,
    });
  }

  function handleCellClick(_event: UIEvent, cell: CellComponent) {
    const cellField = cell.getField();
    const cellValue = cell.getValue();

    if (!cellField || !cellValue) return;

    onEvents?.('cellClick', {
      [cellField]: cellValue,
    });
  }

  function handleCellDblClick(_event: UIEvent, cell: CellComponent) {
    const cellData = cell.getData();

    onEvents?.('cellDbClick', cellData);
  }

  // function handleRowSelectionChanged(data, _rows) {
  //   console.log('>>>>>>>>>', data, _rows);
  //   onEvents?.('rowSelectionChanged', data);
  // }

  const throttledHandleRowSelected = throttle(handleRowSelected, 500, {
    trailing: true,
    leading: false,
  });

  return {
    // data events
    tableDestroyed: handleTableDestroyed,
    dataLoaded: handleDataLoaded,
    dataProcessed: handleDataProcessed,
    dataChanged: handleDataChanged,
    dataLoadError: handleLoadError,
    // row events
    rowClick: handleRowClick,
    rowDblClick: handleRowDoubleClick,
    rowSelected: throttledHandleRowSelected,
    rowDeselected: throttledHandleRowSelected,
    // rowSelectionChanged: handleRowSelectionChanged,

    // column events
    headerClick: handleHeaderClick,
    headerDblClick: handleHeaderDblClick,
    columnMoved: handleColumnMoved,
    columnResized: handleColumnResized,
    columnTitleChanged: handleColumnTitleChanged,
    columnVisibilityChanged: handleColumnVisibilityChanged,
    // cell events
    cellEditing: handleCellEditing,
    cellEdited: handleCellEdited,
    cellClick: handleCellClick,
    cellDblClick: handleCellDblClick,
  };
}
