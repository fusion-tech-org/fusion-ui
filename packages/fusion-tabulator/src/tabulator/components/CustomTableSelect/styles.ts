import styled from 'styled-components';

export const Container = styled.div``;

export const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DroplistWrapper = styled.div<{
  maxWidth: number;
}>`
  position: relative;
  min-height: 150px;
  max-height: 360px;
  max-width: ${({ maxWidth }) => `${maxWidth}px`};
  border: 1px solid #f5f5f5;
  border-radius: 12px;

  * {
    scrollbar-width: auto !important;
  }

  &::after {
    content: '';
    position: absolute;
    z-index: -1;
    left: -12px;
    top: 0;
    right: -32px;
    bottom: -32px;
  }
  /* pointer-events: none; */
`;
