import type { ExcelWidgetProps } from './interface';
import { UniverSheetAdapter } from './UniverSheetAdapter';

export const ExcelWidget: React.FC<ExcelWidgetProps> = (props) => {
  const { adapter = 'univer' } = props;

  const renderExcel = () => {
    const excelMapViaAdapter = {
      univer: <UniverSheetAdapter />,
    };
    return excelMapViaAdapter[adapter];
  };

  return <div className="w-full h-full">{renderExcel()}</div>;
};
