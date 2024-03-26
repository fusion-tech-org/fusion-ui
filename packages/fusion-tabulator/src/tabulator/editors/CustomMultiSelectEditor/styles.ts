import styled from 'styled-components';

export const MultiSelectContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;

  /* .arco-select-focused {
    margin-top: 2px;
  } */

  .arco-select-view-value {
    margin-top: 8px;
  }

  .arco-select-view {
    height: 100% !important;

    .arco-input-tag-view,
    .arco-input-tag-inner {
      height: 100%;
    }
  }
`;
