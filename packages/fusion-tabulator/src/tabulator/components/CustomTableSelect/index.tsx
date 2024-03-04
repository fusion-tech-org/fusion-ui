import { useState, useRef, useEffect, useMemo } from 'react';
import { Dropdown, Input, Message } from '@arco-design/web-react';
import { Container, DroplistWrapper, InputWrapper } from './styles';
import { IconPlus } from '@arco-design/web-react/icon';
import { TableSelect } from './TableSelect';
// import { useClickOutside } from 'hooks/useClickOutsite';
import { useKeyPress } from 'hooks/useKeyPress';
import { RowComponent, Tabulator } from 'tabulator-tables';
import { debounce, map, isArray, isEmpty } from 'lodash';
// import { ROW_HEIGHT } from 'src/tabulator/constants';

export const CustomTableSelect = (props) => {
  const { onSelectRowData, uniformProps } = props;
  const [popupVisible, setPopupVisble] = useState(false);
  const [cursor, setCursor] = useState<number>(-1);
  // const [tableData, setTableData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const tabulatorRef = useRef<Tabulator>(null);

  const { quickAddConfigs } = uniformProps || {};
  const {
    filters = [],
    uniqueKey = 'id',
    enableIndexedDBQuery = false,
    data,
  } = quickAddConfigs || {};
  // console.log('uniformProps >>>> ', uniformProps, quickAddConfigs);

  const handleVisibleChange = (visible: boolean) => {
    console.log('visible', visible);
  };

  const hideDroplist = () => {
    setPopupVisble(false);
    tabulatorRef.current = null;
    setCursor(-1);
    setSearchText('');
    inputRef.current?.blur();
  };

  const memoAllData = useMemo(() => {
    if (isArray(data) && data.length > 0) {
      return {
        total: data.length,
        data,
      };
    }

    if (!tabulatorRef.current || isEmpty(data))
      return {
        total: 0,
        data: [],
      };

    const curTableData = tabulatorRef.current.getData();

    const total = curTableData.length;

    return {
      total,
      data: curTableData,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enableIndexedDBQuery, data?.length, tabulatorRef.current]);

  const handleKeyPress = (e: KeyboardEvent) => {
    e.stopPropagation();
    if (!tabulatorRef.current || memoAllData.total === 0) return;

    if (e.key === 'ArrowDown') {
      setCursor((prev) => (prev + 1) % memoAllData.total);
      // tabulatorRef.current.selectRow([1]);
    }

    if (e.key === 'ArrowUp') {
      setCursor((prev) => {
        if (prev - 1 <= 0) return 0;

        return (prev - 1) % memoAllData.total;
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
  };

  useEffect(() => {
    if (!tabulatorRef.current) return;

    const uniqueKeys = map(memoAllData.data, uniqueKey);

    tabulatorRef.current.deselectRow();
    tabulatorRef.current.selectRow(uniqueKeys[cursor]);
    tabulatorRef.current.scrollToRow(uniqueKeys[cursor], 'center', false);
  }, [cursor]);

  // useClickOutside([dropdownRef, inputRef], hideDroplist);
  useKeyPress(handleKeyPress);

  const handleInputFocus = () => {
    const { data, columns } = quickAddConfigs || {};
    if (isEmpty(data) && isEmpty(columns) && !enableIndexedDBQuery) {
      Message.info('请配置下拉项数据');

      return;
    }

    setPopupVisble(true);
  };

  const handleSelectedRow = (e: UIEvent, row: RowComponent) => {
    e.stopPropagation();
    const rowData = row.getData();
    onSelectRowData?.(rowData);

    // setPopupVisble(false)
    // hideDroplist();
  };

  const debouncedOnChange = debounce((value) => {
    if (!tabulatorRef.current) return;

    if (!isArray(filters) || filters.length <= 0) return;

    const buildFilters = map(filters, (filter) => ({
      field: filter,
      type: 'like',
      value,
    }));
    console.log('buildFilters', buildFilters);
    tabulatorRef.current.setFilter([buildFilters]);
  }, 300);

  const handleValueChange = (value: string) => {
    setSearchText(value);

    debouncedOnChange(value);
  };

  const handleTabulator = (ref) => {
    tabulatorRef.current = ref;

    // tabulatorRef.current.on('rowSelected', handleSelectedRow);
    tabulatorRef.current.on('rowClick', handleSelectedRow);
    // tabulatorRef.current.on('rowDblClick', handleSelectedRow);
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      hideDroplist();
    }, 150);
  };

  return (
    <Container>
      <Dropdown
        popupVisible={popupVisible}
        trigger="focus"
        onVisibleChange={handleVisibleChange}
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
            height={36}
            onChange={handleValueChange}
            onBlur={handleInputBlur}
            prefix={<IconPlus />}
            allowClear
            value={searchText}
            placeholder="请输入..."
          />
        </InputWrapper>
      </Dropdown>
    </Container>
  );
};
