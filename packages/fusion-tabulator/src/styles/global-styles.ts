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

export const TableContainer = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
`;

export const Container = styled.div<{
  'widget-id': string;
  appMode: string;
}>`
  position: relative;
  width: 100%;
  overflow-y: auto;
  /* height: 100%; */
  /* padding-right: ${({ appMode }) => (appMode === 'EDIT' ? '40px' : 0)}; */
  background-color: #fff;
`;
