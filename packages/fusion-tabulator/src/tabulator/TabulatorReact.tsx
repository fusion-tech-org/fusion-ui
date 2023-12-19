/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState, useEffect } from 'react';
import * as ReactDOM from 'react-dom';
import { pickHTMLProps } from 'pick-react-known-prop';
import { propsToOptions } from 'utils/ConfigUtils';
import 'styles/index.css';

import { TabulatorFull as Tabulator, ColumnDefinition, Options, OptionsColumns, EventCallBackMethods } from 'tabulator-tables';

export interface TabulatorTableData {
  tuid: string | number;
  [key: string]: any;
}

export interface ReactTabulatorProps {
  columns: ColumnDefinition[];
  options?: Options;
  eventMaps?: Record<string, <K extends keyof EventCallBackMethods>(event: K, callback?: EventCallBackMethods[K]) => void>;
  onRef?: (ref: any) => void;
  classNames?: string;
  data: TabulatorTableData[];
  layout?: OptionsColumns['layout']
}

export const TabulatorReact = (props: ReactTabulatorProps) => {
  const { layout = 'fitColumns', classNames, data = [], eventMaps } = props;
  const wrapperRef = useRef();
  const instanceRef = useRef<Tabulator>();
  const [mainId] = useState(`tabulator-${+new Date()}-${Math.floor(Math.random() * 9999999)}`);

  const htmlProps = pickHTMLProps(props); // pick valid html props
  delete htmlProps['data']; // don't render data & columns as attributes
  delete htmlProps['columns'];

  const initTabulator = async () => {
    const domEle = ReactDOM.findDOMNode(wrapperRef.current) as HTMLElement; // mounted DOM element
    const { columns, data, options } = props;

    const propOptions = await propsToOptions(props);

    if (data) {
      propOptions.data = data;
    }

    instanceRef.current = new Tabulator(domEle, {
      height: '100%',
      columns,
      ...propOptions,
      layout, // fit columns to width of table (optional)
      ...options // props.options are passed to Tabulator's options.
    });

    if (eventMaps) {
      Object.keys(eventMaps).forEach((eventName: keyof EventCallBackMethods) => {
        const handler = eventMaps[eventName];

        instanceRef.current.on(eventName, handler);
      });
    }

    props.onRef && props.onRef(instanceRef);
  };

  useEffect(() => {
    initTabulator();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (instanceRef && instanceRef.current) {
      initTabulator(); // re-init table
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return <div ref={wrapperRef} data-instance={mainId} {...htmlProps} className={classNames} />;
};
