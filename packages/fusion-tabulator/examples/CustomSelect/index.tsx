import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  useCallback,
} from 'react';
import {
  Button,
  Table,
  Dropdown,
  Input,
  Select,
  Form,
  FormInstance,
} from '@arco-design/web-react';

const FormItem = Form.Item;
const EditableContext = React.createContext<{ getForm?: () => FormInstance }>(
  {}
);

export const CustomSelect = (props) => {
  const { onSelectRowData } = props;
  const [popupVisible, setPopupVisble] = useState(false);
  const handleVisibleChange = (_visible: boolean) => {
    //
  };

  const handleInputFocus = () => {
    setPopupVisble(true);
  };

  const handleSelectedRow = (record) => {
    onSelectRowData?.(record);
    setPopupVisble(false);
  };

  return (
    <div>
      <Dropdown
        popupVisible={popupVisible}
        trigger="focus"
        onVisibleChange={handleVisibleChange}
        droplist={
          <div>
            <EditableTable onSelectedRow={handleSelectedRow} />
          </div>
        }
      >
        <Input onFocus={handleInputFocus} />
      </Dropdown>
    </div>
  );
};

function EditableRow(props) {
  const { children, record, className, ...rest } = props;
  const refForm = useRef(null);

  const getForm = () => refForm.current;

  return (
    <EditableContext.Provider
      value={{
        getForm,
      }}
    >
      <Form
        style={{ display: 'table-row' }}
        children={children}
        ref={refForm}
        wrapper="tr"
        wrapperProps={rest}
        className={`${className} editable-row`}
      />
    </EditableContext.Provider>
  );
}

function EditableCell(props) {
  const { children, className, rowData, column, onHandleSave } = props;
  const ref = useRef(null);
  const refInput = useRef(null);
  const { getForm } = useContext(EditableContext);
  const [editing, setEditing] = useState(false);
  const handleClick = useCallback(
    (e) => {
      if (
        editing &&
        column.editable &&
        ref.current &&
        !ref.current.contains(e.target) &&
        !e.target.classList.contains('js-demo-select-option')
      ) {
        cellValueChangeHandler(rowData[column.dataIndex]);
      }
    },
    [editing, rowData, column]
  );
  useEffect(() => {
    editing && refInput.current && refInput.current.focus();
  }, [editing]);

  useEffect(() => {
    document.addEventListener('click', handleClick, true);
    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, [handleClick]);

  const cellValueChangeHandler = (value) => {
    if (column.dataIndex === 'salary') {
      const values = {
        [column.dataIndex]: value,
      };
      onHandleSave && onHandleSave({ ...rowData, ...values });
      setTimeout(() => setEditing(!editing), 300);
    } else {
      const form = getForm();
      form.validate([column.dataIndex], (errors, values) => {
        if (!errors || !errors[column.dataIndex]) {
          setEditing(!editing);
          onHandleSave && onHandleSave({ ...rowData, ...values });
        }
      });
    }
  };

  if (editing) {
    return (
      <div ref={ref}>
        {column.dataIndex === 'salary' ? (
          <Select
            onChange={cellValueChangeHandler}
            defaultValue={rowData[column.dataIndex]}
            options={[2000, 5000, 10000, 20000]}
          />
        ) : (
          <FormItem
            style={{ marginBottom: 0 }}
            labelCol={{ span: 0 }}
            wrapperCol={{ span: 24 }}
            initialValue={rowData[column.dataIndex]}
            field={column.dataIndex}
            rules={[{ required: true }]}
          >
            <Input ref={refInput} onPressEnter={cellValueChangeHandler} />
          </FormItem>
        )}
      </div>
    );
  }

  return (
    <div
      className={column.editable ? `editable-cell ${className}` : className}
      onClick={() => column.editable && setEditing(!editing)}
    >
      {children}
    </div>
  );
}

function EditableTable(props) {
  const { onSelectedRow } = props;
  const [count, setCount] = useState(5);
  const [data, setData] = useState([
    {
      key: '1',
      name: 'Jane Doe',
      age: 23000,
      gender: '32 Park Road, London',
      height: 'jane.doe@example.com',
    },
    {
      key: '2',
      name: 'Alisa Ross',
      age: 25000,
      gender: '35 Park Road, London',
      height: 'alisa.ross@example.com',
    },
    {
      key: '3',
      name: 'Kevin Sandra',
      age: 22000,
      gender: '31 Park Road, London',
      height: 'kevin.sandra@example.com',
    },
    {
      key: '4',
      name: 'Ed Hellen',
      age: 17000,
      gender: '42 Park Road, London',
      height: 'ed.hellen@example.com',
    },
    {
      key: '5',
      name: 'William Smith',
      age: 27000,
      gender: '62 Park Road, London',
      height: 'william.smith@example.com',
    },
  ]);
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      editable: true,
    },
    {
      title: '年龄',
      dataIndex: 'age',
      editable: true,
    },
    {
      title: '性别',
      dataIndex: 'gender',
    },
    {
      title: '身高',
      dataIndex: 'height',
    },
    {
      title: 'Operation',
      dataIndex: 'op',
      render: (_, record) => (
        <Button
          onClick={() => removeRow(record.key)}
          type="primary"
          status="danger"
        >
          Delete
        </Button>
      ),
    },
  ];

  function handleSave(row) {
    const newData = [...data];
    const index = newData.findIndex((item) => row.key === item.key);
    newData.splice(index, 1, { ...newData[index], ...row });
    setData(newData);
  }

  function removeRow(key) {
    setData(data.filter((item) => item.key !== key));
  }

  function addRow() {
    setCount(count + 1);
    setData(
      data.concat({
        key: `${count + 1}`,
        name: 'Tom',
        age: 10000,
        gender: '33 Park Road, London',
        height: 'tom@example.com',
      })
    );
  }

  function handleRowEvent(record, _index) {
    return {
      onClick: () => {
        onSelectedRow?.(record);
      },
    };
  }

  return (
    <Table
      data={data}
      components={{
        body: {
          row: EditableRow,
          cell: EditableCell,
        },
      }}
      onRow={handleRowEvent}
      columns={columns.map((column) =>
        column.editable
          ? {
              ...column,
              onCell: () => ({
                onHandleSave: handleSave,
              }),
            }
          : column
      )}
      className="table-demo-editable-cell"
    />
  );
}
