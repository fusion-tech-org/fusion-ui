import styled from 'styled-components';

export const AutoCompleteContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const AutoInput = styled.input`
  flex-grow: 1;
  padding: 0 4px;
  outline: none;
  font-size: 1rem;
`;

export const SuggestionList = styled.ul<{
  left: number;
  bottom: number;
  width: number;
}>`
  position: absolute;
  top: 0;
  left: 0;
  transform: ${({ left, bottom }) => `translate(${left}px, ${bottom}px)`};
  margin: 0;
  padding: 0;
  max-height: 300px;
  overflow: hidden auto;
  width: ${({ width }) => `${width}px`};
  scroll-behavior: smooth;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 999;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
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
  margin-left: 0.25rem;
`;
