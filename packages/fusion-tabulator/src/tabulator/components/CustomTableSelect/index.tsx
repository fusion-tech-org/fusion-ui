import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { Dropdown, Input, Message } from '@arco-design/web-react';
import { Container, DroplistWrapper, InputWrapper } from './styles';
import { IconPlus } from '@arco-design/web-react/icon';
import { TableSelect } from './TableSelect';
import { useKeyPress } from 'hooks/useKeyPress';
import { Filter, RowComponent, Tabulator } from 'tabulator-tables';
import { debounce, map, isArray, isEmpty, isFunction } from 'lodash';

const DEFAULT_EXTRA_INPUT_PLACEHOLD = '请输入...';

export const CustomTableSelect = (props) => {
  const { onSelectRowData, uniformProps, onCreated, onExtraInputValueChanged } =
    props;
  const [popupVisible, setPopupVisble] = useState(false);
  const [cursor, setCursor] = useState<number>(-1);
  const [searchText, setSearchText] = useState('');
  const [inZone, setInZone] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const tabulatorRef = useRef<Tabulator>(null);
  const [filteredData, setFilteredData] = useState([]);

  const { quickAddConfigs } = uniformProps || {};

  const {
    filters = [],
    uniqueKey = 'id',
    data,
    disableQuickInput = false,
    quickDropdownPlaceholder = DEFAULT_EXTRA_INPUT_PLACEHOLD,
  } = quickAddConfigs || {};

  const hideDroplist = () => {
    setPopupVisble(false);
    setCursor(-1);
    setSearchText('');
    inputRef.current?.blur();

    if (tabulatorRef.current) {
      tabulatorRef.current.deselectRow();
      tabulatorRef.current.clearFilter(true);
    }
  };

  const memoAllData = useMemo(() => {
    if (!tabulatorRef.current || isEmpty(data))
      return {
        total: 0,
        data: [],
        uniqueKeys: [],
      };

    const curTableData = tabulatorRef.current.getData();
    const finalData = filteredData.length > 0 ? filteredData : curTableData;
    const uniqueKeys = map(finalData, (item) => item[uniqueKey]).filter(
      Boolean
    );

    if (filteredData.length > 0) {
      return {
        total: filteredData.length,
        data: filteredData,
        uniqueKeys,
      };
    }

    if (isArray(data) && data.length > 0) {
      return {
        total: data.length,
        data,
        uniqueKeys,
      };
    }

    return {
      total: finalData.length,
      data: finalData,
      uniqueKeys,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.length, tabulatorRef.current, filteredData, uniqueKey]);

  useEffect(() => {
    onCreated();

    return () => {
      tabulatorRef.current = null;
      dropdownRef.current = null;
      inputRef.current = null;
    };
  }, []);

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      e.stopPropagation();
      let nextIndex = null;

      const uniqueKeys = memoAllData.uniqueKeys || [];
      if (!tabulatorRef.current || memoAllData.total === 0) {
        setCursor(-1);
        return;
      }

      if (e.key === 'ArrowDown') {
        nextIndex = Math.min(memoAllData.total - 1, cursor + 1);
      }

      if (e.key === 'ArrowUp') {
        nextIndex = Math.max(0, cursor - 1);
      }

      if (nextIndex !== null && tabulatorRef.current) {
        if (uniqueKeys.length === 0) {
          Message.info('请正确设置唯一的表格索引字段');
          return;
        }
        tabulatorRef.current.deselectRow();
        tabulatorRef.current.selectRow(uniqueKeys[nextIndex]);

        if (memoAllData.total > 7) {
          tabulatorRef.current.scrollToRow(
            uniqueKeys[nextIndex],
            'center',
            false
          );
        }

        setCursor(nextIndex);
        e.preventDefault();
      }

      if (e.key === 'Enter') {
        const selectedRow = tabulatorRef.current.getSelectedData()[0];
        onSelectRowData?.(selectedRow);
        hideDroplist();
      }

      if (e.key === 'Escape') {
        hideDroplist();
      }
    },
    [cursor, memoAllData, setCursor, tabulatorRef.current, filteredData]
  );

  useKeyPress(handleKeyPress);

  const handleInputFocus = () => {
    const { data, columns } = quickAddConfigs || {};

    if (isEmpty(data) && isEmpty(columns)) {
      Message.info('请配置下拉项数据');

      return;
    }

    setPopupVisble(true);
  };

  const handleSelectedRow = (_e, row: RowComponent) => {
    const rowData = row.getData();

    if (tabulatorRef.current) {
      tabulatorRef.current.deselectRow();
    }

    onSelectRowData?.(rowData);

    hideDroplist();
  };

  const debouncedOnChange = debounce((value) => {
    if (!value) {
      setCursor(-1);
      tabulatorRef.current?.deselectRow();
    }

    if (isFunction(onExtraInputValueChanged)) {
      onExtraInputValueChanged(value);
      return;
    }

    if (!tabulatorRef.current) return;

    if (!isArray(filters) || filters.length <= 0) return;

    const buildFilters = map(filters, (filter) => ({
      field: filter,
      type: 'like',
      value,
    }));

    tabulatorRef.current.setFilter([buildFilters]);
  }, 300);

  const handleValueChange = (value: string) => {
    setSearchText(value);

    debouncedOnChange(value);
  };

  const handelDataFiltered = (_filters: Filter[], rows: RowComponent[]) => {
    const rowData = rows.map((row) => row.getData());
    const firstItemKey = rowData[0][uniqueKey];

    setFilteredData(rowData);

    setCursor(0);

    if (firstItemKey) {
      tabulatorRef.current.deselectRow();
      tabulatorRef.current.selectRow(firstItemKey);
    }
  };

  const handleTabulator = (ref) => {
    tabulatorRef.current = ref;

    tabulatorRef.current.on('rowClick', handleSelectedRow);
    tabulatorRef.current.on('dataFiltered', handelDataFiltered);
  };

  const handleInputBlur = () => {
    if (inZone || cursor >= 0) return;

    hideDroplist();
  };

  const handleMouseLeaveDropdown = () => {
    setInZone(false);

    if (document.activeElement !== inputRef.current) {
      hideDroplist();
    }
  };

  return (
    <Container>
      <Dropdown
        popupVisible={popupVisible}
        trigger="focus"
        unmountOnExit={false}
        triggerProps={{
          blurToHide: false,
        }}
        droplist={
          <DroplistWrapper
            ref={dropdownRef}
            onMouseEnter={() => setInZone(true)}
            onMouseLeave={handleMouseLeaveDropdown}
          >
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
            disabled={disableQuickInput}
            onBlur={handleInputBlur}
            prefix={<IconPlus />}
            allowClear
            value={searchText}
            placeholder={quickDropdownPlaceholder}
          />
        </InputWrapper>
      </Dropdown>
    </Container>
  );
};
