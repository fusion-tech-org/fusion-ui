import { PropsWithChildren, forwardRef } from 'react';
import { VirtuosoGrid, GridComponents, GridItemProps } from 'react-virtuoso';
import { VirtuosoWidgetCommonProps } from './interface';

// Ensure that this stays out of the component,
// Otherwise the grid will remount with each render due to new component instances.
const gridComponents: GridComponents = {
  List: forwardRef(({ style, children, ...props }, ref) => (
    <div
      ref={ref}
      {...props}
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        ...style,
      }}
    >
      {children}
    </div>
  )),
  Item: ({ children, ...props }: PropsWithChildren<GridItemProps>) => (
    <div
      {...props}
      style={{
        padding: '0.5rem',
        width: '33%',
        display: 'flex',
        flex: 'none',
        alignContent: 'stretch',
        boxSizing: 'border-box',
      }}
    >
      {children}
    </div>
  ),
};

const ItemWrapper = ({ children, ...props }) => (
  <div
    {...props}
    style={{
      display: 'flex',
      flex: 1,
      textAlign: 'center',
      padding: '1rem 1rem',
      border: '1px solid gray',
      whiteSpace: 'nowrap',
    }}
  >
    {children}
  </div>
);

export const GridList = (props: VirtuosoWidgetCommonProps) => {
  const { onClickItem } = props;
  return (
    <>
      <VirtuosoGrid
        style={{ height: 500 }}
        totalCount={1000}
        components={gridComponents}
        itemContent={(index) => (
          <ItemWrapper onClick={(index) => onClickItem(index)}>
            Item {index}
          </ItemWrapper>
        )}
      />
      <style>{`html, body, #root { margin: 0; padding: 0 }`}</style>
    </>
  );
};
