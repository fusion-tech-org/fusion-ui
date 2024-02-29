import styled from 'styled-components';
import { TableMode } from './interface';
import { ROW_HEIGHT } from './constants';

export const TabulatorContainer = styled.div<{
  tableMode: TableMode;
}>`
  .tabulator-table {
    padding-bottom: ${({ tableMode }) =>
      tableMode === 'editable' ? '46px !important' : 0};
  }
`;

export const ExternalInputContainer = styled.div<{
  left: number;
  bottom: number;
  width?: number;
}>`
  position: absolute;
  top: 0;
  left: 0;
  transform: ${({ left, bottom }) =>
    `translate(${left}px, ${bottom - ROW_HEIGHT - 11}px)`};
  width: ${({ width }) => (width ? `${width}px` : '100%')};
  height: 46px;
  min-height: 46px;
  background-color: #fff;
  /* background-color: #f66; */
`;
