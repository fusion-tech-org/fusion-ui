import { useCallback, useEffect, useRef, useState } from 'react';
import { IWorkbookData } from '@univerjs/core';

// import ParseFileWorker from './parseFile.worker.js?worker&inline';
import { UniverSheetAdapter } from './UniverSheetAdapter';
import { isValidURL } from './utils';
import type { ExcelWidgetProps } from './interface';

export const ExcelWidget: React.FC<ExcelWidgetProps> = (props) => {
  const workerRef = useRef<Worker | null>(null);
  const {
    adapter = 'univer',
    enableRemoteUrl,
    fileUrl,
    data,
    readonly,
  } = props;
  console.log('excel widget', data, props);
  const [univerData, setUniverData] = useState<IWorkbookData | object>({});

  const renderExcel = () => {
    const excelMapViaAdapter = {
      univer: (
        <UniverSheetAdapter
          data={univerData as IWorkbookData}
          readonly={readonly}
        />
      ),
    };
    return excelMapViaAdapter[adapter];
  };

  const initWorkder = useCallback(async () => {
    if (
      !enableRemoteUrl ||
      !fileUrl ||
      !isValidURL(fileUrl) ||
      !!workerRef.current
    )
      return;

    const workerUrl = new URL('./parseFile.worker.js', import.meta.url);
    console.log('workerUrl', workerUrl);
    const ParseFileWorker = new Worker(workerUrl, { type: 'module' });

    workerRef.current = ParseFileWorker;

    console.log('workerRef.current', workerRef.current);
    if (!workerRef.current) return;
    // workerRef.current = new ParseFileWorker();

    workerRef.current.onmessage = function (event) {
      // `event.data` is an array of rows
      // each row being an array of cells.
      // console.log(event.data);
      console.log('excel onMessage', event.data);
      const { data: parsedData } = event.data || {};

      // univerDatRef.current = parsedData;
      setUniverData(parsedData);
    };

    workerRef.current.onerror = function (event) {
      console.error(event);
    };

    workerRef.current.postMessage({
      enableRemoteUrl,
      fileUrl,
      adapter,
    });
  }, [enableRemoteUrl, fileUrl, adapter]);

  useEffect(() => {
    initWorkder();
  }, [initWorkder]);

  return <div className="w-full h-full">{renderExcel()}</div>;
};
