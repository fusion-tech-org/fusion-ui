import { MouseEvent, forwardRef } from 'react';
import { Virtuoso, VirtuosoHandle } from 'react-virtuoso';

import { VirtuosoWidgetCommonProps } from './interface';
import { FlatListItemWrapper } from './styles';

const ITEM_HEIGHT = 40;

export const FlatList = forwardRef<VirtuosoHandle, VirtuosoWidgetCommonProps>(
  (props, ref) => {
    const { onClickItem, scrollerRef, currentItemIndex, data = [] } = props;
    const total = data.length;

    const handleClickItem =
      (index: number) => (_e: MouseEvent<HTMLDivElement>) => {
        onClickItem(index);
      };
    console.log(total * ITEM_HEIGHT);
    return (
      <Virtuoso
        ref={ref}
        style={{ height: total * ITEM_HEIGHT }}
        totalCount={total}
        scrollerRef={scrollerRef}
        itemContent={(index) => {
          const item = data[index];

          return (
            <FlatListItemWrapper onClick={handleClickItem(index)}>
              <div
                className={
                  currentItemIndex === index
                    ? 'virtuoso-flat-item virtuoso-flat-item-active'
                    : 'virtuoso-flat-item'
                }
              >
                {item['label'] || item['value'] || item}
              </div>
            </FlatListItemWrapper>
          );
        }}
      />
    );
  }
);
