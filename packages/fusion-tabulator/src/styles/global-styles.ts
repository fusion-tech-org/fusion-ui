import styled from 'styled-components';

export const FilterContainer = styled.div`
  width: 100%;
`;

export const Footer = styled.div``;

export const ConfigsContainer = styled.div`
  width: 32px;
  height: 100%;
`;

export const Main = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const TableContainer = styled.div`
  flex: 1;
  width: 100%;
`;

export const Container = styled.div<{
  widgetId: string;
}>`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
`;
