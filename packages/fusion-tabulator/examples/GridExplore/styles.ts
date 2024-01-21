import styled from 'styled-components';

export const GridContainer = styled.div`
  display: grid;
  height: 300px;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: 5rem 1fr;
  gap: 16px;
`;

export const GridItem = styled.div`
  &:nth-child(2n) {
    background-color: antiquewhite;
  }

  &:nth-child(2n + 1) {
    background-color: azure;
  }
`;
