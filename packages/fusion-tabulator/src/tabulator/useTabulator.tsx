
import React, { useRef } from 'react';
import * as ReactDOM from 'react-dom';
import {
  TabulatorFull as Tabulator,
  EventCallBackMethods,
} from 'tabulator-tables';
import { forIn } from 'lodash';

import ExtendTabulator from './ExtendTabulator';
import { useIntersectionObserver } from 'hooks/useIntersectionObserver';
import { genInitEventMaps } from './genInitEventMaps';
import { genInitOptions } from './genInitOptions';


export const useTabulator = ({
  ref,
  props,
  eventCallback,
}: {
  ref: React.RefObject<HTMLElement>;
  props: any;
  eventCallback?: (eventName: string, data?: Record<string, any>, tableTypeFlag?: string) => void;
}) => {
  const {
    eventMaps = {},
    appMode,
    onUpdateWidgetMetaProperty,
    onEvents,
  } = props;
  const instanceRef = useRef<Tabulator>();
  const [rectBound] = useIntersectionObserver(ref);

  // const handleTableEvents = (eventName: string, data?: Record<string, any>, tableTypeFlag?: string) => {
  //   console.log('handleTableEvents', eventName, data, tableTypeFlag);
  //   eventCallback?.(eventName, data, tableTypeFlag);

  //   // onEvents?.(eventName, data);
  // }

  const initTabulator = (callback?: VoidFunction) => {
    if (instanceRef.current) {
      // debugger;
      instanceRef.current.destroy();
      instanceRef.current = null;
    }

    // mounted DOM element
    const domEle = ReactDOM.findDOMNode(ref.current) as HTMLElement;

    // generates initial options
    const initOptions = genInitOptions(props)

    console.log('initTabulatorOptions', initOptions);
    // init tabulator
    instanceRef.current = new ExtendTabulator(domEle, initOptions);

    // if (tableMode === 'editable' && !isEmpty(tableData)) {
    //   const reCalcTop = headerVisible ? (tableData.length * ROW_HEIGHT) + HEADER_HEIGHT : tableData.length * ROW_HEIGHT;

    //   setInputTop(reCalcTop);
    // }

    // localization
    instanceRef.current.setLocale?.('zh');

    /**
    * NOTE: Binding events
    */
    const defaultEvents = genInitEventMaps({
      appMode,
      tabulatorRef: instanceRef.current,
      onUpdateWidgetMetaProperty,
      onEvents,
    });
    const mergeEvents = {
      ...defaultEvents,
      ...eventMaps,
    };

    forIn(mergeEvents, (handler, eventName: keyof EventCallBackMethods) => {
      instanceRef.current.on(eventName, handler);
    })

    // props.onRef && props.onRef(instanceRef);
    // onUpdateWidgetMetaProperty?.({
    //   tabulatorRef: instanceRef.current,
    // });

    callback?.();
  }

  const destroyTable = () => {
    if (instanceRef.current) {
      instanceRef.current.destroy();
      instanceRef.current = null;
    }
  }

  return {
    tableHeight: rectBound?.height,
    tabulatorRef: instanceRef.current,
    initTable: initTabulator,
    destroyTable,
  }
}