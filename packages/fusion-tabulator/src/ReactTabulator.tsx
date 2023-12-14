/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { pickHTMLProps } from 'pick-react-known-prop';
import { propsToOptions } from 'utils/ConfigUtils';
import 'styles/index.css';

/* tslint:disable-next-line */
import { TabulatorFull as Tabulator, ColumnDefinition } from 'tabulator-tables';

export interface ReactTabulatorProps {
  columns?: ColumnDefinition[];
  options?: any;
  events?: any;
  onRef?: (ref: any) => void
  [k: string]: any;
}

const ReactTabulator = (props: ReactTabulatorProps) => {
  const ref = React.useRef();
  const instanceRef = React.useRef<Tabulator>();
  const [mainId, _setMainId] = React.useState(`tabulator-${+new Date()}-${Math.floor(Math.random() * 9999999)}`);

  const htmlProps = pickHTMLProps(props); // pick valid html props
  delete htmlProps['data']; // don't render data & columns as attributes
  delete htmlProps['columns'];

  const initTabulator = async () => {
    const domEle: any = ReactDOM.findDOMNode(ref.current); // mounted DOM element
    const { columns, data, options } = props;
    const propOptions = await propsToOptions(props);
    if (data) {
      propOptions.data = data;
    }

    instanceRef.current = new Tabulator(domEle, {
      columns,
      ...propOptions,
      layout: props.layout ?? 'fitColumns', // fit columns to width of table (optional)
      ...options // props.options are passed to Tabulator's options.
    });

    if (props.events) {
      Object.keys(props.events).forEach((eventName: string) => {
        const handler = props.events[eventName];
        (instanceRef.current as any).on(eventName, handler);
      });
    }
    props.onRef && props.onRef(instanceRef);
  };

  React.useEffect(() => {
    // console.log('useEffect - onmount');
    initTabulator();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    // console.log('useEffect - props.data changed');
    if (instanceRef && instanceRef.current) {
      initTabulator(); // re-init table
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.data]);

  return <div ref={ref} data-instance={mainId} {...htmlProps} className={props.className} />;
};

export default ReactTabulator;