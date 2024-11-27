import { TableMode } from 'src/tabulator/interface';
import styled from 'styled-components';

export const FilterContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 4px;
`;

export const Footer = styled.div``;

export const ConfigsContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 32px;
  min-width: 32px;
`;

export const Main = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  min-height: 200px;
`;

export const TableContainer = styled.div<{
  tableMode: TableMode;
}>`
  position: relative;
  width: 100%;
  ${(props) =>
    props.tableMode === 'normal' ? 'flex: 1; height: 100%;' : 'height: 100%;'}
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  background-color: #fff;
`;

export const Container = styled.div<{
  tableMode: TableMode;
}>`
  position: relative;
  width: 100%;
  ${(props) =>
    props.tableMode === 'normal' ? 'height: 100%;flex: 1;' : 'height: 100%;'}
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  background-color: #fff;
`;
