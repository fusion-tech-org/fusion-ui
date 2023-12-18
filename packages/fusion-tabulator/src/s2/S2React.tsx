import { SheetComponent } from '@antv/s2-react';
import '@antv/s2-react/dist/style.min.css';
import { s2DataConfig } from './constants';

const s2Options = {
  width: 600,
  height: 480,
  // 冻结行头
  // frozenRowHeader: true
};

export const S2React = () => {
  return (
    <div>
      <SheetComponent
        dataCfg={s2DataConfig}
        options={s2Options}
      />
    </div>
  )
};