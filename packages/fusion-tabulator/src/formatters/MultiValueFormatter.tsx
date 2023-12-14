import * as React from 'react';
import { render } from 'react-dom';

const createCellEl = () => {
  const el = document.createElement('div');
  el.style.height = '100%';
  return el;
};

// example: { title: 'Pets', field: 'pets', formatter: MultiValueFormatter, formatterParams: { style: 'PILL' } }
// default style: comma separated plain text
// other styles: PILL
//export default function MultiValueFormatter (cell: any, formatterParams: any, onRendered: (fn: any) => void) {
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function MultiValueFormatter(cell: any, formatterParams: any) {
  const style = formatterParams.style || ''; // comma separated plain text

  const arr = cell.getValue() || [];
  let content = arr && arr.length > 0 && typeof arr[0] === 'string' ? <span>{arr.join(', ')}</span> : <span />;

  if (style === 'PILL') {
    // TODO: use React.Fragment here to remove unnecessary div. (but will break React 15 example in Codesandbox)
    content = (
      <div>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {arr.map((item: any) => {
          return typeof item === 'string' ? <span key={item}>{item}</span> : <span key={item.name}>{item.name}</span>;
        })}
      </div>
    );
  }

  const el = createCellEl();
  el.className = 'multi-value-formatter-content';
  el.title = arr && arr.length > 0 && typeof arr[0] === 'string' ? arr.join(', ') : '';
  render(content, el);
  return el;
}
