/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState, useEffect } from 'react';
import * as ReactDOM from 'react-dom';
import { pickHTMLProps } from 'pick-react-known-prop';
import { propsToOptions } from 'utils/ConfigUtils';
import zhCNLang from 'langs/zh-cn.json';
import 'styles/index.css';

import { TabulatorFull as Tabulator, ColumnDefinition, Options, OptionsColumns, EventCallBackMethods } from 'tabulator-tables';
import { isEmpty } from 'lodash';

export interface TabulatorTableData {
  tuid: string | number;
  [key: string]: any;
}

export interface ReactTabulatorProps {
  columns?: ColumnDefinition[];
  options?: Options;
  eventMaps?: Record<string, <K extends keyof EventCallBackMethods>(event: K, callback?: EventCallBackMethods[K]) => void>;
  onRef?: (ref: any) => void;
  classNames?: string;
  data: TabulatorTableData[];
  layout?: OptionsColumns['layout']
}

export const TabulatorReact = (props: ReactTabulatorProps) => {
  const { layout = 'fitColumns', classNames, eventMaps, data } = props;
  console.log(props);
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

    const initTabulatorOptions = {
      height: '100%',
      locale: true,
      pagination: true,
      langs: {
        'zh': zhCNLang
      },
      ...propOptions,
      layout, // fit columns to width of table (optional)
      ...options // props.options are passed to Tabulator's options.
    };

    if (isEmpty(columns)) {
      initTabulatorOptions.autoColumns = true;

      // initTabulatorOptions.autoColumnsDefinitions = function (definitions: ColumnDefinition[]) {
      //   //definitions - array of column definition objects

      //   definitions.forEach(column => {
      //     column.headerFilter = true;
      //   })

      //   return definitions;

      // }
      /**
      * NOTE: support array or object
      */
      initTabulatorOptions.autoColumnsDefinitions = [
        { field: "name", editor: "input" }, //add input editor to the name column
        { field: "age", headerFilter: true }, //add header filters to the age column
      ];

      //   initTabulatorOptions.autoColumnsDefinitions = {
      //     name: {editor:"input"}, //add input editor to the name column
      //     age: {headerFilter:true}, //add header filters to the age column
      // };
    } else {
      initTabulatorOptions.columns = columns;
    }

    instanceRef.current = new Tabulator(domEle, initTabulatorOptions);

    instanceRef.current.setLocale?.('zh');

    console.log(instanceRef.current.getLang?.());

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
  }, [JSON.stringify(data)]);

  return <div ref={wrapperRef} data-instance={mainId} {...htmlProps} className={classNames} />;
};
