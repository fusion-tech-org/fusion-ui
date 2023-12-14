import { AgGridReact } from 'ag-grid-react';
import { CellValueChangedEvent } from 'ag-grid-community'; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme

import { PropsWithChildren, ReactNode } from 'react';

export interface AGGridTableProps {
  rowData: Record<string, any>[],
  colDefs: Array<{
    field: string;
    [key: string]: any;
  }>
  defaultColDef?: Record<string, any>;
  pagination?: boolean;
  onCellValueChanged?: <T>(event: CellValueChangedEvent<T>) => void;
}

export const AGGridTable = (props: AGGridTableProps): JSX.Element => {
  const { rowData, colDefs,
    defaultColDef,
    pagination = false,
    onCellValueChanged,
  } = props;
  return (
    // Container with theme & dimensions
    <div className="ag-theme-quartz" style={{ height: 300 }}>
      {/* The AG Grid component */}
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs as any}
        defaultColDef={defaultColDef}
        pagination={pagination}
        onCellValueChanged={onCellValueChanged} />
    </div>
  )
};