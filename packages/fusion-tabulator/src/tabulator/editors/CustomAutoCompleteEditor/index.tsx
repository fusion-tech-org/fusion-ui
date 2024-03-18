import { useCallback, useEffect, useRef, useState } from 'react';
import { IconSearch } from '@arco-design/web-react/icon';
import { CellComponent } from 'tabulator-tables';
// import { createRoot } from 'react-dom/client';
import ReactDOM, { createPortal } from 'react-dom';

import { useAutoComplete } from './useAutoComplete';
import {
  AutoCompleteContainer,
  AutoInput,
  InputWrapper,
  SuggestionWrapper,
} from './styles';
import { SimpleList } from './SimpleList';
import { FlatList } from './FlatList';
import { GroupList } from './GroupList';
import { TableList } from './TableList';
import { GridList } from './GridList';
import { AutoCompleteProps, AutoItem } from './interface';
import { VirtuosoHandle } from 'react-virtuoso';

const AutoComplete: React.FC<AutoCompleteProps> = (props) => {
  const { editorParams, onSelectItem, rectStyle, initValue, mode } = props;

  const { values = [], placeholder = '' } = editorParams || {};
  const inputRef = useRef<HTMLInputElement>(null);
  const [inZone, setInZone] = useState(false);

  const virtuosoRef = useRef<VirtuosoHandle>(null);
  const [currentItemIndex, setCurrentItemIndex] = useState(-1);
  const listRef = useRef<HTMLElement | Window>(null);

  const {
    bindInput,
    bindOptions,
    isBusy,
    suggestions,
    selectedIndex,
    handleBlur,
  } = useAutoComplete({
    onChange: onSelectItem,
    onCancel: () => {
      // cancel();
    },
    inZone,
    listRef,
    source: (search) =>
      values.filter((option) =>
        new RegExp(`^${search}`, 'i').test(option.label)
      ),
  });

  const handleSelectItem = (value) => {
    onSelectItem(value);
    handleBlur(true)();
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const keyDownCallback = useCallback(
    (e) => {
      let nextIndex = null;

      if (e.code === 'ArrowUp') {
        nextIndex = Math.max(0, currentItemIndex - 1);
      } else if (e.code === 'ArrowDown') {
        nextIndex = Math.min(suggestions.length - 1, currentItemIndex + 1);
      } else if (e.code === 'Enter' && currentItemIndex >= 0) {
        setTimeout(() => {
          handleSelectItem(suggestions[currentItemIndex]);
        }, 20);
        return;
      }

      if (nextIndex !== null) {
        // setCurrentItemIndex(nextIndex);
        virtuosoRef.current.scrollIntoView({
          index: nextIndex,
          behavior: 'auto',
          done: () => {
            setCurrentItemIndex(nextIndex);
          },
        });

        e.preventDefault();
      }
    },
    [currentItemIndex, virtuosoRef, setCurrentItemIndex, suggestions.length]
  );

  const scrollerRef = useCallback(
    (element: HTMLElement) => {
      if (element && suggestions.length > 0) {
        element.addEventListener('keydown', keyDownCallback);
        listRef.current = element;
        setInZone(() => true);

        listRef.current.focus();
      } else {
        listRef.current.removeEventListener('keydown', keyDownCallback);
      }
    },
    [keyDownCallback, suggestions.length]
  );

  // const handleMount = () => {
  //   setInZone(true);
  // };

  const renderCompByMode = useCallback(() => {
    const modeMapComp = {
      simple: (
        <SimpleList
          onClickItem={handleSelectItem}
          selectedIndex={selectedIndex}
          data={suggestions}
        />
      ),
      list: (
        <FlatList
          onClickItem={handleSelectItem}
          ref={virtuosoRef}
          currentItemIndex={currentItemIndex}
          data={suggestions}
          // onMount={handleMount}
          scrollerRef={scrollerRef}
        />
      ),
      groupList: <GroupList onClickItem={handleSelectItem} />,
      grid: <GridList onClickItem={handleSelectItem} />,
      table: <TableList onClickItem={handleSelectItem} />,
    };
    return modeMapComp[mode] || null;
  }, [mode, currentItemIndex, virtuosoRef, scrollerRef]);

  const handleMouseLeaveTargetZone = () => {
    setInZone(false);

    if (document.activeElement !== inputRef.current) {
      handleBlur(true)();
    }
  };

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

      {suggestions.length > 0 &&
        createPortal(
          <SuggestionWrapper
            {...bindOptions}
            left={rectStyle.left}
            bottom={rectStyle.bottom}
            width={rectStyle.width}
            onMouseEnter={() => setInZone(true)}
            onMouseLeave={handleMouseLeaveTargetZone}
          >
            {renderCompByMode()}
          </SuggestionWrapper>,
          document.body
        )}
    </AutoCompleteContainer>
  );
};

export default function CustomAutoCompleteEditor(
  cell: CellComponent,
  onRendered: (fn: CallableFunction) => void,
  success: (value: any) => boolean,
  cancel: VoidFunction,
  editorParams: Record<string, any>
) {
  const { left, bottom, width } = cell.getElement().getBoundingClientRect();
  const defValue = cell.getValue();
  const {
    values = [],
    mode = 'simple', // simple, list, grid, groupList, table
  } = editorParams || {};

  const container = document.createElement('div');
  container.style.height = '100%';

  function handleSelectItem(item: AutoItem | Record<string, any>) {
    // const curCol = cell.getColumn();
    // const colDef = curCol.getDefinition();
    const res = success(item?.value || item);

    if (res) {
      // console.log(cell.getElement());
      cell.navigateRight();
    }
  }

  ReactDOM.render(
    <AutoComplete
      initValue={defValue}
      onRendered={onRendered}
      onSelectItem={handleSelectItem}
      cancel={cancel}
      mode={mode}
      editorParams={editorParams}
      rectStyle={{ left, bottom, width }}
    />,
    container
  );

  return container;
}
