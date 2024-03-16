import { GroupedVirtuoso } from 'react-virtuoso';
import { generateGroupedUsers, toggleBg } from './data';
import { VirtuosoWidgetCommonProps } from './interface';

export const GroupList = (props: VirtuosoWidgetCommonProps) => {
  const { onClickItem } = props;
  const { users, groups, groupCounts } = generateGroupedUsers(500);

  return (
    <GroupedVirtuoso
      groupCounts={groupCounts}
      style={{ height: 400 }}
      onClick={onClickItem}
      groupContent={(index) => {
        return (
          <div
            style={{
              backgroundColor: 'white',
              paddingTop: '1rem',
              borderBottom: '1px solid #ccc',
            }}
          >
            {groups[index]}
          </div>
        );
      }}
      itemContent={(index) => {
        return (
          <div style={{ backgroundColor: toggleBg(index) }}>
            {users[index].name}
          </div>
        );
      }}
    />
  );
};
