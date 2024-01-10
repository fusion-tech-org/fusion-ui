import {
  IconApps,
  // IconCommand, IconFilter, IconFindReplace, IconLoop, IconMindMapping, IconSettings, IconSkin, IconSort, IconStorage,
} from '@arco-design/web-react/icon';
import { GeneralConfiguration } from './GeneralConfiguration';

// import { DataLoadConfiguration } from './DataLoadConfiguration';
// import { ColumnConfiguration } from './ColumnConfiguration';
// import { AdvanceConfiguration } from './AdvanceConfiguration';
// import { CellConfiguration } from './CellConfiguration';
// import { EventConfiguration } from './EventConfiguration';
// import { KeyBindingConfiguration } from './KeyBindingConfiguration';
// import { RowConfiguration } from './RowConfiguration';
// import { StyleConfiguration } from './StyleConfiguration';


export const paneStyle = {
  width: '100%',
  height: '100%',
  padding: '24px 0',
  color: '#939aa3',
};

const iconStyles = {
  marginRight: '4px',
};

export const tabItems = [
  {
    title: <div><IconApps style={iconStyles} />通用配置</div>,
    key: 'general',
    content: (props) => <GeneralConfiguration {...props} />,
    style: paneStyle,
  },
  // {
  //   title: <div><IconStorage style={iconStyles} />数据加载配置</div>,
  //   key: 'data-loaded',
  //   content: (props) => <DataLoadConfiguration {...props} />,
  //   style: paneStyle,
  // },
  // {
  //   title: <div><IconFilter style={iconStyles} />列配置</div>,
  //   key: 'column',
  //   content: (props) => <ColumnConfiguration {...props} />,
  //   style: paneStyle,
  // },
  // {
  //   title: <div><IconMindMapping style={iconStyles} />行配置</div>,
  //   key: 'row',
  //   content: (props) => <RowConfiguration {...props} />,
  //   style: paneStyle,
  // },
  // {
  //   title: <div><IconFindReplace style={iconStyles} />单元格配置</div>,
  //   key: 'cell',
  //   content: (props) => <CellConfiguration {...props} />,
  //   style: paneStyle,
  // },
  // {
  //   title: <div><IconCommand style={iconStyles} />快捷键绑定</div>,
  //   key: 'key-binding',
  //   content: (props) => <KeyBindingConfiguration {...props} />,
  //   style: paneStyle,
  // },
  // {
  //   title: <div><IconLoop style={iconStyles} />事件配置</div>,
  //   key: 'event',
  //   content: (props) => <EventConfiguration {...props} />,
  //   style: paneStyle,
  // },
  // {
  //   title: <div><IconSkin style={iconStyles} />样式配置</div>,
  //   key: 'style',
  //   content: (props) => <StyleConfiguration {...props} />,
  //   style: paneStyle,
  // },
  // {
  //   title: <div><IconSettings style={iconStyles} />高级配置</div>,
  //   key: 'advanced',
  //   content: (props) => <AdvanceConfiguration {...props} />,
  //   style: paneStyle,
  // },
]