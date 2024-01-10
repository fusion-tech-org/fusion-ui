import styled from 'styled-components';

export const ExternalInputContainer = styled.div<{
  top: number;
}>`
  position: absolute;
  left: 0;
  top: ${({ top }) => top}px;
  width: 100%;
  height: 42px;
  min-height: 42px;
  background-color: #fff;
  /* background-color: #f66; */
`;
