import { useEffect, useRef, useState } from 'react';
import { CellComponent } from 'tabulator-tables';
// import { createRoot } from 'react-dom/client';
import ReactDOM from 'react-dom';
import { Select } from '@arco-design/web-react';

import { MultiSelectContainer } from './styles';
import { isString, isFunction } from 'lodash';

interface MultiSelectProps {
  initValue?: string[];
  editorParams?: Record<string, any>;
  onRendered?: (fn: CallableFunction) => void;
  // success: (value: any) => void;
  onSelectItem: (item: any) => void;
  cancel: VoidFunction;
  rowData?: Record<string, any>;
}

const MultiSelect: React.FC<MultiSelectProps> = (props) => {
  const { editorParams, onSelectItem, initValue = [], rowData } = props;
  const {
    values = [],
    placeholder = '',
    maxTagCount = 4,
    mode,
  } = editorParams || {};
  const finalValues = isFunction(values) ? values(rowData) : values;
  const selectedListRef = useRef<string[]>(initValue);
  const isMultiMode = mode === 'multiple';

  const forceInnerInput = () => {
    const innerInputEle: HTMLInputElement =
      document.querySelector(
        '#custom-select-editor-container .arco-select-view-input'
      ) ||
      document.querySelector(
        '#custom-select-editor-container .arco-input-tag-input'
      );

    if (innerInputEle) {
      innerInputEle.focus();
    }
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      forceInnerInput();
    }, 20);

    return () => {
      timerId && clearTimeout(timerId);
    };
  }, []);

  // const handleMultiSelect = (value, _option) => {
  //   selectedListRef.current.push(value);
  //   // setSelectedItem((prev) => [...prev, value]);
  // };

  const handleChange = (value, _option) => {
    selectedListRef.current = isMultiMode ? [...value] : value;
    // setSelectedItem((prev) => [...prev, value]);
  };

  // const handleDeselect = (value) => {
  //   selectedListRef.current = selectedListRef.current.filter(
  //     (item) => item !== value
  //   );
  //   // setSelectedItem((prev) => [...prev.filter((item) => item !== value)]);
  // };

  const handleBlur = () => {
    if (isMultiMode && selectedListRef.current.length > 0) {
      onSelectItem(selectedListRef.current.join(','));
      return;
    }

    onSelectItem(selectedListRef.current);
  };

  return (
    <MultiSelectContainer id="custom-select-editor-container">
      <Select
        defaultValue={initValue}
        maxTagCount={maxTagCount}
        mode={mode}
        placeholder={placeholder}
        style={{ width: '100%', height: '100%' }}
        // onSelect={handleMultiSelect} // this api available only version 2.52.0+, however, the main app's version is 2.49.0
        // onDeselect={handleDeselect}
        onBlur={handleBlur}
        trigger="focus"
        allowClear
        showSearch
        filterOption={(inputValue, option) =>
          option.props.value.toLowerCase().indexOf(inputValue.toLowerCase()) >=
            0 ||
          option.props.children
            .toLowerCase()
            .indexOf(inputValue.toLowerCase()) >= 0
        }
        onChange={handleChange}
        bordered={false}
        options={finalValues}
      />
    </MultiSelectContainer>
  );
};

export default function CustomMultiSelectEditor(
  cell: CellComponent,
  onRendered: (fn: CallableFunction) => void,
  success: (value: any) => boolean,
  cancel: VoidFunction,
  editorParams: Record<string, any>
) {
  const curValue = cell.getValue();
  const rowData = cell.getRow().getData();

  const { mode } = editorParams || {};
  const convert2SelectDefaultValue =
    isString(curValue) && !!curValue ? curValue.split(',') : undefined;

  const initValue = mode === 'multiple' ? convert2SelectDefaultValue : curValue;

  const container = document.createElement('div');
  container.style.height = '100%';

  function handleSelectItem(item: string) {
    // const curCol = cell.getColumn();
    // const colDef = curCol.getDefinition();
    const res = success(item);
    console.log('handleSelectItem', item, res);
    // if (res) {
    //   cell.navigateNext();
    // }
  }

  ReactDOM.render(
    <MultiSelect
      initValue={initValue}
      onRendered={onRendered}
      onSelectItem={handleSelectItem}
      cancel={cancel}
      rowData={rowData}
      editorParams={editorParams}
    />,
    container
  );

  return container;
}
