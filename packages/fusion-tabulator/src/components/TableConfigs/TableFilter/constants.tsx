import { Input, Button } from "@arco-design/web-react";

const renderCompMap = {
  input: (props) => <Input {...props} />,
  button: (props, label) => <Button {...props}>{label}</Button>,
}

export const renderItemByType = (compType: string, lable?: string, extraProps = {}) => {
  return renderCompMap[compType](extraProps, lable);
};

