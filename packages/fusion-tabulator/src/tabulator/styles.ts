import styled from 'styled-components';
import { TableMode } from './interface';

export const TabulatorContainer = styled.div<{
  tableMode: TableMode;
}>`
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  overflow: hidden;

  .tabulator-header {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    overflow: hidden;
  }

  .tabulator-table {
    padding-bottom: ${({ tableMode }) =>
      tableMode === 'editable' ? '36px !important' : 0};
  }

  .tabulator-footer {
    border-bottom-left-radius: 80px;
    border-bottom-right-radius: 80px;
    overflow: hidden;
  }
`;

export const ExternalInputContainer = styled.div<{
  left?: number;
  bottom?: number;
  width?: number;
}>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  /* width: ${({ width }) => (width ? `${width}px` : '100%')}; */
  height: 36px;
  min-height: 36px;
  background-color: #fff;
  /* background-color: #f66; */
`;
