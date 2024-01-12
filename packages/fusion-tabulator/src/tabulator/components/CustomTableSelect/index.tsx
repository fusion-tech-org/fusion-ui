import React, { useState, useRef, useEffect, useContext, useCallback } from 'react';
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

export const CustomTableSelect = (props) => {
  const { onSelectRowData } = props
  const [popupVisible, setPopupVisble] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const tabulatorRef = useRef<Tabulator>(null);
  const handleVisibleChange = (visible: boolean) => {
    console.log('visible', visible);
  }

  const hideDroplist = useCallback(() => {

    setPopupVisble(false);
  }, [])

  const handleKeyPress = (e: KeyboardEvent) => {
    if (!tabulatorRef.current) return;

    if (e.key === 'ArrowDown') {
      tabulatorRef.current.selectRow([1]);
    }

    if (e.key === 'ArrowUp') {

    }

    if (e.key === 'Enter') {
      const selectedRow = tabulatorRef.current.getSelectedData()[0];
      onSelectRowData?.(selectedRow);
      hideDroplist();
    }
  }

  useClickOutside([dropdownRef, inputRef], hideDroplist);
  useKeyPress(handleKeyPress);

  const handleInputFocus = () => {
    setPopupVisble(true);
  }

  const handleSelectedRow = (row: RowComponent) => {
    const rowData = row.getData();
    onSelectRowData?.(rowData)

    setPopupVisble(false)
  }

  const handleValueChange = () => {

  }

  const handleTabulator = (ref) => {
    tabulatorRef.current = ref;

    tabulatorRef.current.on('rowSelected', handleSelectedRow);
  }


  return (
    <Container>
      <Dropdown
        popupVisible={popupVisible}
        trigger="focus"
        onVisibleChange={handleVisibleChange}
        droplist={
          <DroplistWrapper ref={dropdownRef}>
            <TableSelect onRef={handleTabulator} />
          </DroplistWrapper>
        }
      >
        <InputWrapper>
          <Input
            onFocus={handleInputFocus}
            ref={(ref) => (inputRef.current = ref?.dom)}
            onChange={handleValueChange}
            prefix={<IconPlus />}
            placeholder='请输入...'
          />
        </InputWrapper>
      </Dropdown>
    </Container>
  )
};
