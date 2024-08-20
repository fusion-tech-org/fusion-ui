import { useCallback, useEffect, useRef, useState } from 'react';
import { IWorkbookData } from '@univerjs/core';

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
  console.log(data, readonly);
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
    const ParseFileWorker = new Worker(workerUrl, { type: 'module' });

    workerRef.current = ParseFileWorker;

    if (!workerRef.current) return;

    workerRef.current.onmessage = function (event) {
      // `event.data` is an array of rows
      // each row being an array of cells.
      // console.log(event.data);
      const { data: parsedData } = event.data || {};

      // univerDatRef.current = parsedData;
      setUniverData(parsedData);
    };

    workerRef.current.onerror = function (event) {
      console.error(event.message);
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
