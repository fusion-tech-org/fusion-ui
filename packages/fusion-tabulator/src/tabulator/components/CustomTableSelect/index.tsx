import React, { useState, useRef, useEffect } from 'react';
import { Dropdown, Input } from '@arco-design/web-react';
import {
  Container,
  DroplistWrapper,
  InputWrapper,
} from './styles';
import { IconPlus } from '@arco-design/web-react/icon';
import { TableSelect } from './TableSelect';
import { useClickOutside } from 'hooks/useClickOutsite';
import { useKeyPress } from 'hooks/useKeyPress';
import { RowComponent, Tabulator } from 'tabulator-tables';
import { debounce, map, isArray } from 'lodash';

export const CustomTableSelect = (props) => {
  const { onSelectRowData, uniformProps } = props
  const [popupVisible, setPopupVisble] = useState(false);
  const [cursor, setCursor] = useState<number>(-1);
  // const [tableData, setTableData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const tabulatorRef = useRef<Tabulator>(null);

  const { quickAddConfigs } = uniformProps || {};
  const { filters = [], uniqueKey = 'id' } = quickAddConfigs || {};
  // console.log('uniformProps >>>> ', uniformProps, quickAddConfigs);


  const handleVisibleChange = (visible: boolean) => {
    console.log('visible', visible);
  }

  const hideDroplist = () => {
    setPopupVisble(false);
    tabulatorRef.current = null;
    setCursor(-1);
    setSearchText('');
    inputRef.current?.blur();
  }

  const calcFilterDataLen = () => {
    const curTableData = tabulatorRef.current.getData('visible');

    const len = curTableData.length;

    return len;
  }

  const handleKeyPress = (e: KeyboardEvent) => {
    if (!tabulatorRef.current) return;

    if (e.key === 'ArrowDown') {
      const len = calcFilterDataLen();
      setCursor((prev) => (prev + 1) % len);
      // tabulatorRef.current.selectRow([1]);
    }

    if (e.key === 'ArrowUp') {
      const len = calcFilterDataLen();

      setCursor((prev) => {

        if (prev - 1 <= 0) return 0;

        return (prev - 1) % len
      });
    }

    if (e.key === 'Enter') {
      const selectedRow = tabulatorRef.current.getSelectedData()[0];
      onSelectRowData?.(selectedRow);
      hideDroplist();
    }

    if (e.key === 'Escape') {
      hideDroplist();
    }
  }

  useEffect(() => {
    if (!tabulatorRef.current) return;

    const curTableData = tabulatorRef.current.getData('visible');

    const uniqueKeys = map(curTableData, uniqueKey);

    tabulatorRef.current.deselectRow();
    tabulatorRef.current.selectRow(uniqueKeys[cursor]);
    tabulatorRef.current.scrollToRow(uniqueKeys[cursor], "center", false);
  }, [cursor]);

  useClickOutside([dropdownRef, inputRef], hideDroplist);
  useKeyPress(handleKeyPress);

  const handleInputFocus = () => {
    setPopupVisble(true);
  }

  const handleSelectedRow = (_event: UIEvent, row: RowComponent) => {
    const rowData = row.getData();
    onSelectRowData?.(rowData)

    // setPopupVisble(false)
    hideDroplist();
  }

  const debouncedOnChange =
    debounce((value) => {
      if (!tabulatorRef.current) return;

      if (!isArray(filters) || filters.length <= 0) return;

      const buildFilters = map(filters, (filter) => ({ field: filter, type: 'like', value }))
      console.log('buildFilters', buildFilters);
      tabulatorRef.current.setFilter([buildFilters]);
    }, 300)
    ;

  const handleValueChange = (value: string) => {
    setSearchText(value);

    debouncedOnChange(value);
  }

  const handleTabulator = (ref) => {
    tabulatorRef.current = ref;

    // tabulatorRef.current.on('rowSelected', handleSelectedRow);
    tabulatorRef.current.on('rowDblClick', handleSelectedRow);
  }

  useEffect(() => {

  }, []);

  return (
    <Container>
      <Dropdown
        popupVisible={popupVisible}
        trigger="focus"
        onVisibleChange={handleVisibleChange}
        unmountOnExit
        droplist={
          <DroplistWrapper ref={dropdownRef}>
            <TableSelect onRef={handleTabulator} uniformProps={uniformProps} />
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