import React, { useState, useRef, useEffect } from 'react';
import { Dropdown, Input, Message } from '@arco-design/web-react';
import {
  Container,
  DroplistWrapper,
  InputWrapper,
} from './styles';
import { IconPlus } from '@arco-design/web-react/icon';
// import { TableSelect } from './TableSelect';
import { useClickOutside } from 'hooks/useClickOutsite';
import { useKeyPress } from 'hooks/useKeyPress';
// import { RowComponent, Tabulator } from 'tabulator-tables';
import { debounce, map, isArray, isEmpty } from 'lodash';
import { genTabulatorUUID } from 'utils/index';
import { useTabulator } from 'src/tabulator/useTabulator';
import { TableTypeFlag } from 'src/interface';

export const CustomTableSelect = (props) => {
  const { onSelectRowData, quickAddDropdownDefinitions, uniformProps } = props
  const [popupVisible, setPopupVisble] = useState(false);
  const [cursor, setCursor] = useState<number>(-1);
  // const [tableData, setTableData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  // const tabulatorRef = useRef<Tabulator>(null);
  const [mainId] = useState(genTabulatorUUID());
  const tableRef = useRef<HTMLDivElement | null>(null);

  const { tabulatorRef, initTable } = useTabulator({
    ref: tableRef,
    eventCallback: handleEventCallback,
    props: {
      ...props,
      uniformProps: {
        ...uniformProps,
        commonOptions: {
          layout: 'fitDataStretch',
          height: '320px',
          selectable: 1,
          rowHeight: 32,
        },
        tableTypeFlag: TableTypeFlag.customTableSelect
      }
    }
  });

  const { quickAddConfigs, enableIndexedDBQuery = false } = uniformProps || {};
  const { filters = [], uniqueKey = 'id' } = quickAddConfigs || {};
  console.log('uniformProps ++++', uniformProps, quickAddConfigs);


  const handleVisibleChange = (visible: boolean) => {
    console.log('visible', visible);
  }

  const hideDroplist = () => {
    setPopupVisble(false);
    // tabulatorRef = null;
    setCursor(-1);
    setSearchText('');
    inputRef.current?.blur();
  }

  const calcFilterDataLen = () => {
    const curTableData = tabulatorRef.getData('visible');

    const len = curTableData.length;

    return len;
  }

  const handleKeyPress = (e: KeyboardEvent) => {
    if (!tabulatorRef) return;

    if (e.key === 'ArrowDown') {
      const len = calcFilterDataLen();
      setCursor((prev) => (prev + 1) % len);
      // tabulatorRef.selectRow([1]);
    }

    if (e.key === 'ArrowUp') {
      const len = calcFilterDataLen();

      setCursor((prev) => {

        if (prev - 1 <= 0) return 0;

        return (prev - 1) % len
      });
    }

    if (e.key === 'Enter') {
      const selectedRow = tabulatorRef.getSelectedData()[0];
      if (!selectedRow) return;

      onSelectRowData?.(selectedRow);
      hideDroplist();
    }

    if (e.key === 'Escape') {
      hideDroplist();
    }
  }

  useClickOutside([dropdownRef, inputRef], hideDroplist);

  useKeyPress(handleKeyPress);

  useEffect(() => {
    if (!tabulatorRef) return;

    const curTableData = tabulatorRef.getData('visible');

    const uniqueKeys = map(curTableData, uniqueKey);

    tabulatorRef.deselectRow();
    tabulatorRef.selectRow(uniqueKeys[cursor]);
    tabulatorRef.scrollToRow(uniqueKeys[cursor], "center", false);
  }, [cursor]);

  // useEffect(() => {
  //   if (tableRef) {
  //     initTable();
  //   }
  // }, [tableRef]);

  const handleInputFocus = () => {
    const { data, columns } = quickAddDropdownDefinitions || {};
    if (isEmpty(data) && isEmpty(columns) && !enableIndexedDBQuery) {
      Message.info('下拉项表格数据未定义');

      return;
    }
    setPopupVisble(true);

    setTimeout(() => {
      initTable();
    }, 20)
  }

  const handleSelectedRow = (rowData: any) => {
    // const rowData = row.getData();
    onSelectRowData?.(rowData)

    // setPopupVisble(false)
    hideDroplist();
  }

  const debouncedOnChange =
    debounce((value) => {
      if (!tabulatorRef) return;

      if (!isArray(filters) || filters.length <= 0) return;

      const buildFilters = map(filters, (filter) => ({ field: filter, type: 'like', value }))
      console.log('buildFilters', buildFilters);
      tabulatorRef.setFilter(buildFilters);
    }, 500)
    ;

  const handleValueChange = (value: string) => {
    setSearchText(value);

    debouncedOnChange(value);
  }

  function handleEventCallback(eventName: string, data?: Record<string, any>) {
    console.log('eventName', eventName, data, '<<<<<<<<');
    switch (eventName) {
      case 'rowDbClick':
        handleSelectedRow(data);
        break;
      default:
        break;
    }
  }

  return (
    <Container>
      <Dropdown
        popupVisible={popupVisible}
        trigger="focus"
        onVisibleChange={handleVisibleChange}
        unmountOnExit
        droplist={
          <DroplistWrapper ref={dropdownRef}>
            <div ref={tableRef}
              style={{
                height: '100%',
              }}
              id={mainId}
              data-instance={mainId}
            />
          </DroplistWrapper>
        }
      >
        <InputWrapper>
          <Input
            onFocus={handleInputFocus}
            ref={(ref) => (inputRef.current = ref?.dom)}
            onChange={handleValueChange}
            prefix={<IconPlus />}
            allowClear
            value={searchText}
            placeholder='请输入...'
          />
        </InputWrapper>
      </Dropdown>
    </Container>
  )
};
