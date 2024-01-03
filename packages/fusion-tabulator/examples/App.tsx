// import { TabulatorExample } from './TabulatorExample';
// import { TabulatorExamples } from './tabulator';
// import { TabulatorFull } from './TabulatorFull';
import "@arco-design/web-react/dist/css/arco.css";

import { useState } from 'react';
import { Layout, Menu } from '@arco-design/web-react';
import { IconHome, IconCalendar } from '@arco-design/web-react/icon';

import { TabulatorExamples } from './tabulator/index';
import { TabulatorFull } from './TabulatorFull/index';
import { MonacoEditor } from './MonacoEditor/index';

const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;
const Sider = Layout.Sider;
const Content = Layout.Content;
const collapsedWidth = 60;
const normalWidth = 220;

type MenuItemKeys = 'monaco-editor' | 'tabulator-full' | 'tabulator';

const menuKeyMapComp = {
  'monaco-editor': <MonacoEditor />,
  'tabulator-full': <TabulatorFull />,
  tabulator: <TabulatorExamples />,
}

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [siderWidth, setSiderWidth] = useState(normalWidth);
  const [activeMenuKey, setActiveMenuKey] = useState<MenuItemKeys>('monaco-editor');

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
    setSiderWidth(collapsed ? collapsedWidth : normalWidth);
  };

  const handleMoving = (_, { width }) => {
    if (width > collapsedWidth) {
      setSiderWidth(width);
      setCollapsed(!(width > collapsedWidth + 20));
    } else {
      setSiderWidth(collapsedWidth);
      setCollapsed(true);
    }
  };

  function handleClickMenuItem(key: MenuItemKeys) {
    // const currentRoute = flattenRoutes.find((r) => r.key === key);
    // const component = currentRoute.component;
    // const preload = component.preload();
    // NProgress.start();
    // preload.then(() => {
    // history.push(currentRoute.path ? currentRoute.path : `/${key}`);
    // NProgress.done();
    // });
    setActiveMenuKey(key);
  }

  return (
    <section style={{
      height: '100vh',
      overflow: 'hidden'
    }}>
      <Layout style={{ height: '100%' }}>
        <Sider
          collapsible
          theme='dark'
          onCollapse={onCollapse}
          collapsed={collapsed}
          width={siderWidth}
          resizeBoxProps={{
            directions: ['right'],
            onMoving: handleMoving,
          }}
        >
          <Menu theme='dark' autoOpen style={{ width: '100%' }} onClickMenuItem={handleClickMenuItem}>
            <MenuItem key='monaco-editor'>
              <IconCalendar />
              Monaco Editor示例
            </MenuItem>
            <MenuItem key='tabulator'>
              <IconHome />
              Tabulator 简单示例
            </MenuItem>
            <MenuItem key='tabulator-full'>
              <IconCalendar />
              Tabulator 完整实例
            </MenuItem>
            <SubMenu
              key='layout'
              title={
                <span>
                  <IconCalendar /> 布局组件
                </span>
              }
            >
              <MenuItem key='11'>栅格</MenuItem>
              <MenuItem key='12'>分隔符</MenuItem>
              <MenuItem key='13'>布局</MenuItem>
            </SubMenu>
          </Menu>
        </Sider>
        <Content style={{ padding: '30px' }}>
          <div style={{ width: '100%', height: '100%' }}>
            {menuKeyMapComp[activeMenuKey]}
          </div>
        </Content>
      </Layout>
    </section>
  );
}

export default App;
