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
import { useEffect, useState } from 'react';

import DesignZhCN from '@univerjs/design/locale/zh-CN';
import UIZhCN from '@univerjs/ui/locale/zh-CN';
import SheetsZhCN from '@univerjs/sheets/locale/zh-CN';
import SheetsUIZhCN from '@univerjs/sheets-ui/locale/zh-CN';
import SheetsFormulaZhCN from '@univerjs/sheets-formula/locale/zh-CN';

export const UniverSheetAdapter = () => {
  const [loading, setLoading] = useState(false);
  const [loadingTips, setLoadingTips] = useState('数据正在请求中');
  let univer: Univer | null = null;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let univerAPI: FUniver | null = null;

  const initUniver = () => {
    if (univer) return;

    univer = new Univer({
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

    univerAPI = FUniver.newAPI(univer);
    univer.createUnit(UniverInstanceType.UNIVER_SHEET, {});
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const loadData = async () => {
    if (!univer) return;

    try {
      const data: IWorkbookData = {
        id: '1',
        name: 'file',
        appVersion: '1.0',
        locale: LocaleType.ZH_CN,
        sheetOrder: [],
        styles: {},
        sheets: {},
      };
      const workbook = univer.createUnit(UniverInstanceType.UNIVER_SHEET, data);

      console.log(data, workbook);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    initUniver();
  }, []);

  return (
    <div className="w-full h-full relative">
      <div id="univer_app" className="w-full h-full"></div>
      {loading && (
        <div className="absoult top-0 bottom-0 right-0 left-0">
          <Spin
            tip="This may take a while..."
            loading={loading}
            className="w-full h-full"
          />
        </div>
      )}
    </div>
  );
};
