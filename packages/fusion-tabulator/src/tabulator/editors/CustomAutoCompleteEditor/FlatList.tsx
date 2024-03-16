import { MouseEvent, forwardRef } from 'react';
import { Virtuoso, VirtuosoHandle } from 'react-virtuoso';

import { VirtuosoWidgetCommonProps } from './interface';
import { FlatListItemWrapper } from './styles';

export const FlatList = forwardRef<VirtuosoHandle, VirtuosoWidgetCommonProps>(
  (props, ref) => {
    const { onClickItem, scrollerRef, currentItemIndex } = props;

    const handleClickItem =
      (index: number) => (_e: MouseEvent<HTMLDivElement>) => {
        onClickItem(index);
      };

    return (
      <Virtuoso
        ref={ref}
        style={{ height: 200 }}
        totalCount={200}
        scrollerRef={scrollerRef}
        itemContent={(index) => (
          <FlatListItemWrapper onClick={handleClickItem(index)}>
            <div
              className={
                currentItemIndex === index
                  ? 'virtuoso-flat-item virtuoso-flat-item-active'
                  : 'virtuoso-flat-item'
              }
            >
              Item {index}
            </div>
          </FlatListItemWrapper>
        )}
      />
    );
  }
);
