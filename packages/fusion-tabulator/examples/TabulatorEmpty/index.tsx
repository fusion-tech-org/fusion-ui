import TabulatorWithRecoil from '../../src';

export const TabulatorEmpty = () => {
  return (
    <div style={{ display: 'flex', padding: '32px' }}>
      <TabulatorWithRecoil appMode="EDIT" widgetId='empty' tableType="tabulator" />
    </div>
  )
};