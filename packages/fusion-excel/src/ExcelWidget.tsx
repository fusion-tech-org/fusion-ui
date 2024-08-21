import { useCallback, useEffect, useState } from 'react';
import { IWorkbookData } from '@univerjs/core';

// import ParseFileWorker from './parseFile.worker?worker';

import { UniverSheetAdapter } from './UniverSheetAdapter';
import { adapterMapFormatter, isValidURL } from './utils';
import type { ExcelWidgetProps } from './interface';
import readXlsxFile, { readSheetNames } from 'read-excel-file/web-worker';
// import parseExcelFile from './parseExcelFile';

export const ExcelWidget: React.FC<ExcelWidgetProps> = (props) => {
  // const workerRef = useRef<Worker | null>(null);
  const {
    adapter = 'univer',
    enableRemoteUrl,
    fileUrl,
    data,
    readonly,
  } = props;
  console.log('excel widget', data, props);
  const [loading, setLoading] = useState(false);
  const [univerData, setUniverData] = useState<IWorkbookData | object>({});

  // const getData = async () => {
  //   console.log('getData ->', !enableRemoteUrl || !isValidURL(fileUrl));
  //   if (!enableRemoteUrl || !isValidURL(fileUrl)) return;

  //   const data = await parseExcelFile({
  //     enableRemoteUrl,
  //     fileUrl,
  //   });

  //   console.log(data);
  // };
  const queryDataSync = useCallback(
    async (fileUrl: string, enableRemoteUrl: boolean) => {
      if (!enableRemoteUrl || !isValidURL(fileUrl)) return;
      setLoading(true);
      try {
        const fileRes = await fetch(fileUrl, {
          headers: {
            mode: 'no-cors',
          },
        });

        const fileBlob = await fileRes.blob();

        const sheets = await readSheetNames(fileBlob);

        console.log('sheets', sheets);

        const results = [];

        for (let i = 0; i < sheets.length; i++) {
          const sheetName = sheets[i];

          const rows = await readXlsxFile(fileBlob, {
            sheet: sheetName,
          });

          results.push({
            sheet: sheetName,
            rows,
          });
        }

        const data = adapterMapFormatter[adapter](results, sheets);

        setUniverData(data);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    // getData();
    queryDataSync(fileUrl, enableRemoteUrl);
  }, [fileUrl, enableRemoteUrl, queryDataSync]);

  const renderExcel = () => {
    const excelMapViaAdapter = {
      univer: (
        <UniverSheetAdapter
          data={univerData as IWorkbookData}
          readonly={readonly}
          loading={loading}
        />
      ),
    };
    return excelMapViaAdapter[adapter];
  };

  // const initWorkder = useCallback(async () => {
  //   if (
  //     !enableRemoteUrl ||
  //     !fileUrl ||
  //     !isValidURL(fileUrl) ||
  //     !!workerRef.current
  //   )
  //     return;

  //   const workerUrl = new URL('./parseFile.worker', import.meta.url);

  //   const ParseFileWorker = new Worker(workerUrl, {
  //     type: 'module',
  //     name: 'parseExcel',
  //   });

  //   workerRef.current = ParseFileWorker;

  //   console.log('workerRef.current', workerRef.current, workerUrl);
  //   if (!workerRef.current) return;
  //   // workerRef.current = new ParseFileWorker();

  //   workerRef.current.onmessage = function (event) {
  //     // `event.data` is an array of rows
  //     // each row being an array of cells.
  //     console.log('excel onMessage', event.data);
  //     const { data: parsedData } = event.data || {};

  //     // univerDatRef.current = parsedData;
  //     setUniverData(parsedData);
  //   };

  //   workerRef.current.onerror = function (event) {
  //     console.error(event);
  //   };

  //   workerRef.current.postMessage({
  //     enableRemoteUrl,
  //     fileUrl,
  //     adapter,
  //   });
  // }, [enableRemoteUrl, fileUrl, adapter]);

  // useEffect(() => {
  //   initWorkder();
  // }, [initWorkder]);

  return <div className="w-full h-full">{renderExcel()}</div>;
};
