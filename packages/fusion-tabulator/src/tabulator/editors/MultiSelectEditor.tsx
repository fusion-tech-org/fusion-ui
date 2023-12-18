/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { render, findDOMNode } from 'react-dom';
import { clone } from 'utils/index';
// import { parse, format } from 'date-fns';
import { ReactTags } from 'react-tag-autocomplete';
// const ReactTags = require('react-tag-autocomplete');

// const DEFAULT_DATE_INPUT_FORMAT = 'yyyy-MM-dd';

// const inputCss = {
//   width: '100%',
//   height: '100%',
//   fontSize: '1em',
//   fontFamily: 'inherit'
// };

interface IProps {
  cell: any;
  onRendered: (fn: any) => void;
  success: (value: any) => void;
  cancel: () => void;
  editorParams?: any;
}

type EditorState = {
  value: string;
  values: Array<{
    id: string;
    name: string;
  }>;
  autofocus: boolean;
};

class Editor extends React.Component<IProps, EditorState> {
  state: EditorState = { value: '', values: [], autofocus: false };
  ref: any = null;
  tags: any[] = [];

  componentDidMount() {
    this.props.onRendered(() => {
      const el: any = findDOMNode(this.ref);
      el.style.zIndex = 1;
      el.parentElement.parentElement.parentElement.style.overflow = 'inherit';

      el.querySelector('input').focus();
      const values = (this.props.cell.getValue() || []).map((item: any) => {
        return typeof item === 'string' ? { id: item, name: item } : item;
      });
      this.setState({ values });
    });
  }

  setValueOnSuccess = (values = this.state.values) => {
    const { success } = this.props;
    // console.log('setValueOnSuccess: ', values);
    success(values);
    // cancel();
  };

  handleDelete = (i: number) => {
    // console.log('- handleDelete ', i);
    const { values } = this.state;
    const newValues = values.filter((_, index) => index !== i);
    this.setState({ values: newValues }, () => {
      this.setValueOnSuccess(newValues);
    });
  };

  handleAddition = (item: any) => {
    const { values } = this.state;
    if (item.name) {
      // console.log('- handleAddition: ', item);
      values.push({ id: item.name, name: item.name });
      this.setState({ values }, () => {
        this.setValueOnSuccess(values);
      });
    }
  };

  // order: handleBlur => sucess() => grid's cellEdited => grid's dataChanged => handleAddition
  handleBlur = () => {
    const { cancel } = this.props;
    const newValue = this.ref.input.input.value;
    if (newValue) {
      // console.log(111, newValue, this.ref);
      const values = clone(this.state.values);
      values.push({ id: newValue, name: newValue });
      // console.log('- handleBlur ', values);
      this.setValueOnSuccess(values);
    } else {
      cancel();
    }

    const el: any = findDOMNode(this.ref);
    if (el && el.parentElement.parentElement.parentElement) {
      el.parentElement.parentElement.parentElement.style.overflow = 'hidden';
    }
    // console.log('- handleBlur END');
  };

  render() {
    const { editorParams } = this.props;
    const suggestions = editorParams.values;

    return (
      <div>
        <ReactTags
          // ref={(ref: any) => (this.ref = ref)}
          // placeholder="Select or Type"
          // tags={values}
          // suggestions={suggestions}
          // allowNew={true}
          // autoresize={true}
          // autofocus={this.state.autofocus}
          // handleAddition={this.handleAddition}
          // handleDelete={this.handleDelete}
          // handleBlur={this.handleBlur}
          // minQueryLength={0}
          labelText="Select countries"
          selected={this.tags}
          suggestions={suggestions}
          onAdd={this.handleBlur}
          onDelete={this.handleDelete}
          noOptionsText="No matching countries"
        />
      </div>
    );
  }
}

export default function MultiSelectEditor(
  cell: any,
  onRendered: (fn: any) => void,
  success: (value: any) => void,
  cancel: () => void,
  editorParams?: any
) {
  const container = document.createElement('div');
  container.style.height = '100%';
  render(
    <Editor cell={cell} onRendered={onRendered} success={success} cancel={cancel} editorParams={editorParams} />,
    container
  );
  return container;
}
