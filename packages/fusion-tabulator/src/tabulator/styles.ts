import styled from 'styled-components';
import { TableMode } from './interface';
import { ROW_HEIGHT } from './constants';

export const TabulatorContainer = styled.div<{
  tableMode: TableMode;
  headerStyleConfig: {
    headerTextSize?: string;
    headerTextColor?: string;
    headerBackground?: string;
    headerFontStyle?: string;
  };
}>`
  .tabulator-header {
    background-color: ${({ headerStyleConfig }) =>
      headerStyleConfig.headerBackground
        ? headerStyleConfig.headerBackground
        : undefined};
    color: ${({ headerStyleConfig }) =>
      headerStyleConfig.headerTextColor
        ? headerStyleConfig.headerTextColor
        : undefined};
    font-size: ${({ headerStyleConfig }) =>
      headerStyleConfig.headerTextSize
        ? headerStyleConfig.headerTextSize
        : undefined};
    font-weight: ${({ headerStyleConfig }) =>
      headerStyleConfig.headerFontStyle === 'bold'
        ? headerStyleConfig.headerFontStyle
        : undefined};
  }
  .tabulator-table {
    padding-bottom: ${({ tableMode }) =>
      tableMode === 'editable' ? '36px !important' : 0};
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
