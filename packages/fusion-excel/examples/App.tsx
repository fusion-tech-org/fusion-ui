import { Button, Form, Input, Switch } from '@arco-design/web-react';
import { useState } from 'react';
import '@arco-design/web-react/dist/css/arco.css';

import { FusionExcel } from '../src';

function App() {
  const [form] = Form.useForm();
  const [excelParams, setExcelParams] = useState({
    enableRemoteUrl: false,
    fileUrl: '',
  });
  const handleConfirm = async () => {
    const values = form.getFieldsValue();

    setExcelParams({
      enableRemoteUrl: values.enableRemoteUrl,
      fileUrl: values.fileUrl,
    });
  };
  return (
    <div className="w-screen h-screen overflow-hidden flex flex-col">
      <div className="h-48">
        <Form form={form}>
          <Form.Item field="fileUrl" label="URL">
            <Input />
          </Form.Item>
          <Form.Item field="enableRemoteUrl" label="启用在线URL">
            <Switch />
          </Form.Item>
          <Form.Item>
            <Button onClick={handleConfirm}>确认</Button>
          </Form.Item>
        </Form>
      </div>
      <div className="flex-1">
        <FusionExcel
          enableRemoteUrl={excelParams.enableRemoteUrl}
          fileUrl={excelParams.fileUrl}
          readonly={false}
        />
      </div>
    </div>
  );
}

export default App;
