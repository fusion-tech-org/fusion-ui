import { useEffect, useRef, useState } from 'react';
import { IconSearch, IconSubscribe } from '@arco-design/web-react/icon';
import { CellComponent, EmptyCallback } from 'tabulator-tables';
// import { createRoot } from 'react-dom/client';
import ReactDOM, { createPortal } from 'react-dom';

import { AutoItem, useAutoComplete } from './useAutoComplete';
import {
  AutoCompleteContainer,
  AutoInput,
  InputWrapper,
  SuggestionItem,
  SuggestionItemWrapper,
  SuggestionList,
} from './styles';
import { reduce } from 'lodash';

interface AutoCompleteProps {
  initValue?: string;
  editorParams?: Record<string, any>;
  onRendered?: (fn: CallableFunction) => void;
  // success: (value: any) => void;
  onSelectItem: (item: AutoItem) => void;
  cancel: VoidFunction;
  rectStyle: {
    left: number;
    bottom: number;
    width: number;
  };
}

const AutoComplete: React.FC<AutoCompleteProps> = (props) => {
  const { editorParams, cancel, onSelectItem, rectStyle, initValue } = props;

  const { values = [], placeholder = '' } = editorParams || {};
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    bindInput,
    bindOptions,
    bindOption,
    isBusy,
    suggestions,
    selectedIndex,
  } = useAutoComplete({
    onChange: onSelectItem,
    onCancel: () => {
      cancel();
    },
    source: (search) =>
      values.filter((option) =>
        new RegExp(`^${search}`, 'i').test(option.label)
      ),
  });

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <AutoCompleteContainer>
      <InputWrapper>
        <IconSearch />
        <AutoInput
          defaultValue={initValue}
          ref={inputRef}
          placeholder={placeholder}
          {...bindInput}
        />
        {isBusy && (
          <div className="w-4 h-4 border-2 border-dashed rounded-full border-slate-500 animate-spin"></div>
        )}
      </InputWrapper>

      {suggestions?.length > 0 &&
        createPortal(
          <SuggestionList
            {...bindOptions}
            left={rectStyle.left}
            bottom={rectStyle.bottom}
            width={rectStyle.width}
          >
            {suggestions.map((_, index) => (
              <SuggestionItemWrapper
                key={index}
                style={{
                  backgroundColor:
                    selectedIndex === index ? '#f6f9f9' : 'transparent',
                }}
                {...bindOption}
              >
                <SuggestionItem>
                  <IconSubscribe />
                  <div>{suggestions[index].label}</div>
                </SuggestionItem>
              </SuggestionItemWrapper>
            ))}
          </SuggestionList>,
          document.body
        )}
    </AutoCompleteContainer>
  );
};

export default function CustomAutoCompleteEditor(
  cell: CellComponent,
  onRendered: (fn: CallableFunction) => void,
  success: (value: any) => void,
  cancel: VoidFunction,
  editorParams: Record<string, any>
) {
  const { left, bottom, width } = cell.getElement().getBoundingClientRect();
  const defValue = cell.getValue();
  // const { values = [] } = editorParams || {};

  const container = document.createElement('div');
  container.style.height = '100%';
  // createRoot(container).render(
  //   <AutoComplete
  //     // cell={cell}
  //     onRendered={onRendered}
  //     success={success}
  //     cancel={cancel}
  //     editorParams={editorParams}
  //   />
  // );
  function handleSelectItem(item: AutoItem) {
    // const curCol = cell.getColumn();
    // const colDef = curCol.getDefinition();

    success(item.value);
    cell.navigateRight();

    // if (!colDef.formatter && !colDef.formatterParams) {
    //   const convertedParams = reduce(
    //     values,
    //     (res, { label, value }) => {
    //       res[value] = label;

    //       return res;
    //     },
    //     {}
    //   );
    //   console.log('convertedParams', convertedParams);

    //   colDef.formatter = 'lookup';
    //   colDef.formatterParams = convertedParams || {};
    // curCol
    //   .updateDefinition({
    //     title: colDef.title,
    //     formatter: 'lookup',
    //     formatterParams: convertedParams || {},
    //   })
    //   .then(() => {
    //   });
    // }
  }

  ReactDOM.render(
    <AutoComplete
      initValue={defValue}
      onRendered={onRendered}
      onSelectItem={handleSelectItem}
      cancel={cancel}
      editorParams={editorParams}
      rectStyle={{ left, bottom, width }}
    />,
    container
  );

  return container;
}
