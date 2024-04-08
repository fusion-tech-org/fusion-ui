import { useCallback, useEffect, useRef } from 'react';
import { CellComponent } from 'tabulator-tables';
import styled from 'styled-components';
// import { createRoot } from 'react-dom/client';
import ReactDOM from 'react-dom';
import { DatePicker } from '@arco-design/web-react';
import dayjs from 'dayjs';

const { MonthPicker, YearPicker } = DatePicker;

interface CustomDatePickerProps {
  initValue?: string;
  editorParams?: Record<string, any>;
  onRendered?: (fn: CallableFunction) => void;
  // success: (value: any) => void;
  onSelect: (item: any) => void;
  cancel: VoidFunction;
}

type DateMode = 'date' | 'month' | 'year';

const DEFAULT_FORMAT = 'YYYY-MM-DD hh:mm:ss';

const CustomDatePicker: React.FC<CustomDatePickerProps> = (props) => {
  const { editorParams, onSelect, initValue, cancel } = props;
  const {
    showTime = false,
    mode = 'date',
    format = DEFAULT_FORMAT,
  } = editorParams || {};
  // const datePickerRef = useRef<string>(initValue);
  const defaultValue =
    initValue && dayjs(initValue).isValid() ? initValue : undefined;

  const forceInnerInput = () => {
    const innerInputEle: HTMLInputElement = document.querySelector(
      '#custom-date-picker-container .arco-picker-start-time'
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

  const handleVisibleChange = (visible) => {
    if (!visible) {
      cancel();
    }
  };

  const renderDatePickerByMode = useCallback(() => {
    switch (mode) {
      case 'date':
      default:
        return (
          <DatePicker
            showTime={showTime}
            style={{
              width: '100%',
              border: 'none',
              height: '100%',
              backgroundColor: 'transparent',
            }}
            defaultValue={defaultValue}
            onVisibleChange={handleVisibleChange}
            onSelect={onSelect}
            triggerProps={{
              trigger: 'focus',
              blurToHide: false,
            }}
            format={format}
          />
        );
      case 'month':
        return <MonthPicker onSelect={onSelect} />;

      case 'year':
        return <YearPicker onSelect={onSelect} />;
    }
  }, [mode, defaultValue, format]);

  return (
    <DatePickerContainer id="custom-date-picker-container">
      {renderDatePickerByMode()}
    </DatePickerContainer>
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

  const container = document.createElement('div');
  container.style.height = '100%';

  function handleSelect(dateString: string) {
    const res = success(dateString);

    if (res) {
      cell.navigateRight();
    }
  }

  ReactDOM.render(
    <CustomDatePicker
      initValue={curValue}
      onRendered={onRendered}
      onSelect={handleSelect}
      cancel={cancel}
      editorParams={editorParams}
    />,
    container
  );

  return container;
}

const DatePickerContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
`;
