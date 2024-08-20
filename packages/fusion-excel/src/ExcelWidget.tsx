import ParseFileWorker from './parseFile.worker?worker';

import type { ExcelWidgetProps } from './interface';
import { UniverSheetAdapter } from './UniverSheetAdapter';
import { useCallback, useEffect, useRef, useState } from 'react';
import { isValidURL } from './utils';
import { IWorkbookData } from '@univerjs/core';

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

    workerRef.current = new ParseFileWorker();

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
