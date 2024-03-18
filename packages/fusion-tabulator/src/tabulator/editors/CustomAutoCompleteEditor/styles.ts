import styled from 'styled-components';

export const AutoCompleteContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0 8px;
  width: 100%;
  height: 100%;
  padding: 0 6px;
`;

export const AutoInput = styled.input`
  flex-grow: 1;
  padding: 0 4px;
  outline: none;
  font-size: 1rem;
`;

export const FlatListItemWrapper = styled.div`
  .virtuoso-flat-item {
    position: relative;
    padding: 6px 12px;
    margin-top: 4px;
    transition: transform 0.3s;
  }

  .virtuoso-flat-item-active {
    background-color: #f6f9f9;

    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 4px;
      transform: translateY(-50%);
      height: 60%;
      width: 2px;
      border-radius: 1px;
      background-color: rgb(var(--primary-6));
    }
  }
`;

export const SuggestionWrapper = styled.div<{
  left: number;
  bottom: number;
  width: number;
}>`
  position: absolute;
  top: 0;
  left: 0;
  transform: ${({ left, bottom }) => `translate(${left}px, ${bottom}px)`};
  width: ${({ width }) => `${width}px`};
  background-color: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

export const SuggestionList = styled.ul`
  margin: 0;
  padding: 0;
  max-height: 300px;
  width: 100%;
  overflow: hidden auto;
  scroll-behavior: smooth;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 999;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

export const SuggestionItemWrapper = styled.li`
  display: flex;
  align-items: center;
  height: 40px;
  padding: 4px;

  &:hover {
    background-color: #f6f9f9;
  }
`;

export const SuggestionItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0 4px;
  margin-left: 0.25rem;
`;
