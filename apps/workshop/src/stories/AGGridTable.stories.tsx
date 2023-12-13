import { AGGridTable } from 'fusion-ui/AGGridTable';
import type { Meta, StoryObj } from '@storybook/react';

import {
  defaultRows,
  defaultColDefs,
  customCellColDefs
} from './constants/Table/defaultData';


//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof AGGridTable> = {
  component: AGGridTable,
};

export default meta;
type Story = StoryObj<typeof AGGridTable>;

export const Basic: Story = {
  args: {
    //👇 The args you need here will depend on your component
    rowData: defaultRows,
    colDefs: defaultColDefs
  },
};

export const DefaultColumnDefinitions: Story = {
  args: {

  }
};

export const CustomCellComponents: Story = {
  args: {
    rowData: defaultRows,
    colDefs: customCellColDefs
  }
};

function handleCellValueChanged(event: any) {
  console.log(`New Cell Value: ${event.value}`)
}

export const OnCellValueChanged: Story = {
  args: {
    rowData: defaultRows,
    colDefs: defaultColDefs,
    defaultColDef: {
      editable: true, // Enable editing on all cells
    },
    pagination: true,
    onCellValueChanged: handleCellValueChanged
  }
};