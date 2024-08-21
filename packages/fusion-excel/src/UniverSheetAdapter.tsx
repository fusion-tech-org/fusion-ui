import '@univerjs/design/lib/index.css';
import '@univerjs/ui/lib/index.css';
import '@univerjs/sheets-ui/lib/index.css';
import '@univerjs/sheets-formula/lib/index.css';

import { Spin } from '@arco-design/web-react';
import {
  LocaleType,
  Tools,
  Univer,
  UniverInstanceType,
  IWorkbookData,
  UnitModel,
} from '@univerjs/core';
import { defaultTheme } from '@univerjs/design';
import { UniverDocsPlugin } from '@univerjs/docs';
import { UniverDocsUIPlugin } from '@univerjs/docs-ui';
import { FUniver } from '@univerjs/facade';

import { UniverFormulaEnginePlugin } from '@univerjs/engine-formula';
import { UniverRenderEnginePlugin } from '@univerjs/engine-render';

import { UniverUIPlugin } from '@univerjs/ui';

import { UniverSheetsPlugin } from '@univerjs/sheets';
import { UniverSheetsFormulaPlugin } from '@univerjs/sheets-formula';
import { UniverSheetsUIPlugin } from '@univerjs/sheets-ui';
import { useEffect, useRef } from 'react';

import DesignZhCN from '@univerjs/design/locale/zh-CN';
import UIZhCN from '@univerjs/ui/locale/zh-CN';
import SheetsZhCN from '@univerjs/sheets/locale/zh-CN';
import SheetsUIZhCN from '@univerjs/sheets-ui/locale/zh-CN';
import SheetsFormulaZhCN from '@univerjs/sheets-formula/locale/zh-CN';

interface UniverSheetAdapterProps {
  data: IWorkbookData;
  readonly?: boolean;
  loading?: boolean;
}

export const UniverSheetAdapter: React.FC<UniverSheetAdapterProps> = (
  props
) => {
  const { data, readonly = false, loading } = props;
  console.log('loading', loading);
  // const [loading] = useState(false);
  // const [loadingTips, setLoadingTips] = useState('数据正在请求中');

  const univerRef = useRef<Univer | null>(null);
  const workbookRef = useRef<UnitModel | null>(null);
  const univerAPIRef = useRef<FUniver | null>(null);
  const containerRef = useRef(null);

  const initUniver = () => {
    if (univerRef.current) return;

    const univer = new Univer({
      theme: defaultTheme,
      locale: LocaleType.ZH_CN,

      locales: {
        [LocaleType.ZH_CN]: Tools.deepMerge(
          SheetsZhCN,
          SheetsUIZhCN,
          SheetsFormulaZhCN,
          UIZhCN,
          DesignZhCN
        ),
      },
    });

    univerRef.current = univer;

    univer.registerPlugin(UniverRenderEnginePlugin);
    univer.registerPlugin(UniverFormulaEnginePlugin);
    univer.registerPlugin(UniverDocsPlugin, {
      hasScroll: false,
    });
    univer.registerPlugin(UniverDocsUIPlugin);

    univer.registerPlugin(UniverUIPlugin, {
      container: 'univer_app',
    });

    univer.registerPlugin(UniverSheetsPlugin);
    univer.registerPlugin(UniverSheetsUIPlugin);
    univer.registerPlugin(UniverSheetsFormulaPlugin);

    univerAPIRef.current = FUniver.newAPI(univer);
    workbookRef.current = univer.createUnit(
      UniverInstanceType.UNIVER_SHEET,
      {}
    );
  };

  /**
   * Destroy univer instance and workbook instance
   */
  const destroyUniver = () => {
    // univerRef.current?.dispose();
    univerRef.current = null;
    workbookRef.current = null;
  };

  const loadData = async () => {
    if (!univerAPIRef.current || !univerRef.current) return;

    const unitId = workbookRef.current?.getUnitId();

    if (unitId) {
      univerAPIRef.current.disposeUnit(unitId);
      workbookRef.current = null;
    }

    workbookRef.current = univerRef.current.createUnit(
      UniverInstanceType.UNIVER_SHEET,
      data
    );

    // const activeWorkbook = univerAPIRef.current.getActiveWorkbook();

    // if (activeWorkbook) {
    //   const sheets = activeWorkbook.getSnapshot().sheets;
    //   const sheetIds = Object.keys(sheets);

    //   for (let i = 0; i < sheetIds.length; i++) {
    //     const sheetId = sheetIds[i];

    //     await univerAPIRef.current.executeCommand(
    //       'sheet.command.remove-sheet',
    //       { subUnitId: sheetId }
    //     );
    //   }
    // }
  };

  useEffect(() => {
    // 1. init
    initUniver();

    return () => {
      // destroy when unmount
      destroyUniver();
    };
  }, []);

  useEffect(() => {
    if (!data || !Object.keys(data).length) return;

    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (univerAPIRef.current) {
      univerAPIRef.current.getActiveWorkbook()?.setEditable(!readonly);
    }
  }, [readonly]);

  return (
    <div className="w-full h-full relative">
      <div id="univer_app" ref={containerRef} className="w-full h-full"></div>
      {loading && (
        <div
          className="absolute top-0 bottom-0 right-0 left-0 z-10"
          style={{
            background: 'rgba(0, 0, 0, 0.02)',
          }}
        >
          <div className="w-full h-full flex justify-center items-center">
            <Spin tip="文件加载和数据解析中..." loading={loading} size={48} />
          </div>
        </div>
      )}
    </div>
  );
};
