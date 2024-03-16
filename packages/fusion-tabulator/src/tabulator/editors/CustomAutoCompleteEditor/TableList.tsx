import { TableVirtuoso } from 'react-virtuoso';

import { generateUsers } from './data';
import { VirtuosoWidgetCommonProps } from './interface';

export const TableList = (props: VirtuosoWidgetCommonProps) => {
  const { onClickItem } = props;
  return (
    <TableVirtuoso
      style={{ height: 400 }}
      data={generateUsers(1000)}
      onClick={onClickItem}
      itemContent={(index, user) => (
        <>
          <td style={{ width: 150 }}>{user.name}</td>
          <td>{user.description}</td>
        </>
      )}
    />
  );
};
