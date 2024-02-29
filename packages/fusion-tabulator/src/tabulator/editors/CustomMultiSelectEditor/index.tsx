import { useEffect, useState } from 'react';
import { CellComponent } from 'tabulator-tables';
// import { createRoot } from 'react-dom/client';
import ReactDOM from 'react-dom';
import { Select } from '@arco-design/web-react';

import { MultiSelectContainer } from './styles';
import { isString } from 'lodash';

interface MultiSelectProps {
  initValue?: string[];
  editorParams?: Record<string, any>;
  onRendered?: (fn: CallableFunction) => void;
  // success: (value: any) => void;
  onSelectItem: (item: any) => void;
  cancel: VoidFunction;
}

const MultiSelect: React.FC<MultiSelectProps> = (props) => {
  const { editorParams, onSelectItem, initValue = [] } = props;
  const {
    values = [],
    placeholder = '',
    maxTagCount = 4,
    mode = 'multiple',
  } = editorParams || {};
  const [selectedItem, setSelectedItem] = useState<string[]>(initValue);

  const forceInnerInput = () => {
    const innerInputEle: HTMLInputElement = document.querySelector(
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

  const handleMultiSelect = (value, _option) => {
    console.log('handleMultiSelect', value, _option);
    setSelectedItem((prev) => [...prev, value]);
  };

  const handleDeselect = (value) => {
    setSelectedItem((prev) => [...prev.filter((item) => item !== value)]);
  };

  const handleBlur = () => {
    if (selectedItem.length > 0) {
      onSelectItem(selectedItem.join(','));
      return;
    }
    onSelectItem('');
  };

  const handleChange = (value, _option) => {
    if (mode === 'multiple') return;
    console.log('handleChange', value, _option);
    // onSelectItem(value);
  };

  return (
    <MultiSelectContainer id="custom-select-editor-container">
      <Select
        defaultValue={initValue}
        maxTagCount={maxTagCount}
        mode={mode}
        placeholder={placeholder}
        style={{ width: '100%', height: '100%' }}
        onSelect={handleMultiSelect}
        onDeselect={handleDeselect}
        onBlur={handleBlur}
        trigger="focus"
        // defaultPopupVisible
        // labelInValue
        onChange={handleChange}
        bordered={false}
        options={values}
      />
    </MultiSelectContainer>
  );
};

export default function CustomMultiSelectEditor(
  cell: CellComponent,
  onRendered: (fn: CallableFunction) => void,
  success: (value: any) => void,
  cancel: VoidFunction,
  editorParams: Record<string, any>
) {
  const curValue = cell.getValue();
  // const { values = [] } = editorParams || {};
  const convert2SelectDefaultValue =
    isString(curValue) && !!curValue ? curValue.split(',') : undefined;

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
  function handleSelectItem(item: string) {
    // const curCol = cell.getColumn();
    // const colDef = curCol.getDefinition();
    success(item);
    cell.navigateNext();
  }
  console.log('curValue', curValue, convert2SelectDefaultValue);
  ReactDOM.render(
    <MultiSelect
      initValue={convert2SelectDefaultValue}
      onRendered={onRendered}
      onSelectItem={handleSelectItem}
      cancel={cancel}
      editorParams={editorParams}
    />,
    container
  );

  return container;
}
