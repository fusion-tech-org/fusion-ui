// import { s2DataConfig } from './constants';

// const s2Options = {
//   width: 600,
//   height: 480,
//   // 冻结行头
//   // frozenRowHeader: true
// };

export type S2ReactProps = {
  // dataCfg: S2DataConfig;
  // options: SheetComponentOptions
  widgetId?: string;
};

export const S2React = (props: S2ReactProps) => {
  console.log(props);
  return (
    <div>
      {/* <SheetComponent
        dataCfg={s2DataConfig}
        options={s2Options}
      /> */}
      分析表格(待开发...)
    </div>
  )
};