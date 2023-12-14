import type { Meta, StoryObj } from '@storybook/react';
import { Tabulator } from 'fusion-ui/Tabulator';

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof Tabulator> = {
  component: Tabulator,
};

export default meta;

type Story = StoryObj<typeof Tabulator>;

export const Basic: Story = {
  args: {}
};