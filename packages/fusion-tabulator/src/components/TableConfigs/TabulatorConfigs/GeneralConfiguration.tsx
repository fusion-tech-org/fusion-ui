import { Button, Form, Space, Switch } from "@arco-design/web-react";
import type { TabulatorConfigsProps } from "./index";

const FormItem = Form.Item;

export const GeneralConfiguration = (props: TabulatorConfigsProps) => {
  const { onUpdateWidgetProperty } = props;
  const [form] = Form.useForm();

  const handleConfig = async () => {
    try {
      await form.validate();

      const formValues = form.getFieldsValue();

      onUpdateWidgetProperty?.(formValues);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRestoreDefault = () => { };

  return (
    <div>
      <Form form={form}>
        <FormItem>分页配置</FormItem>
        <FormItem field="pagination" label="启用分页" initialValue>
          <Switch />
        </FormItem>

        <FormItem>
          <Space>
            <Button type="primary" onClick={handleConfig}>确认</Button>
            <Button onClick={handleRestoreDefault}>恢复默认</Button>
          </Space>
        </FormItem>
      </Form>
    </div>
  )
};
