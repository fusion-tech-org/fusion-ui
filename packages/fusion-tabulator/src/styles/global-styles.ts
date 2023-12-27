import styled from 'styled-components';

export const FilterContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 4px;
`;

export const Footer = styled.div``;

export const ConfigsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 18px;
`;

export const Main = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  min-height: 500px;
`;

export const TableContainer = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
`;

export const Container = styled.div<{
  'widget-id': string;
}>`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  padding: 12px;
  background-color: #fff;
`;
