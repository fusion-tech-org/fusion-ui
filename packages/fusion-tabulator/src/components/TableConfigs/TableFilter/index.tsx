/* eslint-disable react-refresh/only-export-components */
import React, { CSSProperties } from 'react';
import RGL, { WidthProvider } from 'react-grid-layout';
import _, { get, isArray } from 'lodash';
import { Button, Form, Space } from '@arco-design/web-react';
import { FilterOperation } from '../styles';
import { TableFilterProps, TableFilterState } from './interface';
import { renderItemByType } from './constants';
import { IconEdit } from '@arco-design/web-react/icon';

const FormItem = Form.Item;

const GridLayout = WidthProvider(RGL);

const WrapperStyles: CSSProperties = {
  border: '1px dashed #e8e8e8',
  borderRadius: 4
}

export class TableFilter extends React.PureComponent<TableFilterProps, TableFilterState> {
  static defaultProps: TableFilterProps = {
    onLayoutChange: _.noop,
    className: 'layout',
    filterDefinitions: {
      items: [],
      rowHeight: 32,
      cols: 24,
    },
    appMode: 'PUBLISHED',
  };

  constructor(props) {
    super(props);
    const { savedLayout } = props;
    const layout = isArray(savedLayout) && savedLayout.length > 0 ? savedLayout : this.genLayout();

    console.log(layout, '<<<<');
    this.state = { layout, enableEdit: false };
  }

  genDOM() {
    const { items } = this.props.filterDefinitions;

    return _.map(items, (item) => {
      const { field, type, label, extraProps = {} } = item;

      switch (type) {
        case 'button':
          return (
            <div key={field} style={{ backgroundColor: '#f6f9f9' }}>
              {renderItemByType(type, label, extraProps)}
            </div>
          );
        case 'input':
        case 'select':
        case 'date':
        case 'checkbox':
        case 'radio':
          return (
            <FormItem
              key={field}
              field={field}
              label={label}>
              {renderItemByType(type, label, extraProps)}
            </FormItem>
          )
        default:
          break;
      }
    });
  }

  genLayout() {
    const { items } = this.props.filterDefinitions;
    console.log(items);
    return _.map(items, function (item, i) {
      const y = get(item, 'y', 1);

      return {
        x: (i * item.wGrid) % 12,
        y: y,
        w: item.wGrid,
        h: 1,
        i: item.field
      };
    });
  }

  onLayoutChange = (layout) => {
    this.props.onLayoutChange(layout);
  }

  render() {
    const { layout, enableEdit } = this.state;
    const { appMode, filterDefinitions } = this.props;
    const { rowHeight } = filterDefinitions;

    return (
      <div style={appMode === 'EDIT' ? WrapperStyles : {}}>
        <Form>
          <GridLayout
            layout={layout}
            onLayoutChange={this.onLayoutChange}
            useCSSTransforms={true}
            isDraggable={enableEdit}
            isResizable={enableEdit}
            allowOverlap={false}
            rowHeight={rowHeight}
            verticalCompact
          // {...this.props}
          >
            {this.genDOM()}
          </GridLayout>
        </Form>
        {
          appMode === 'EDIT' && (
            <FilterOperation>
              {enableEdit
                ?
                <Space>
                  <Button type="primary" size='mini' onClick={this.handleSaveLayout}>保存</Button>
                  <Button size='mini' onClick={this.handleCancelEdit}>取消</Button>

                </Space>
                : <Button type="outline" size='mini' onClick={this.handleStartEdit}>编排<IconEdit style={{ marginLeft: 4 }} /></Button>
              }
            </FilterOperation>
          )
        }
      </div>
    )
  }

  handleStartEdit = () => {
    this.setState({ enableEdit: true });
  }

  handleCancelEdit = () => {
    this.setState({ enableEdit: false });
  }

  handleSaveLayout = () => {
    this.props.onLayoutSave?.(this.state.layout);
    this.setState({ enableEdit: false });
  }
}
