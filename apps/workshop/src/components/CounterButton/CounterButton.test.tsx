import { render } from '@testing-library/react';
import '@testing-library/jest-dom'
import { userEvent } from '@testing-library/user-event';

import CounterButton from '.';

describe('CounterButton component', () => {
  it('renders without crashing', () => {
    render(<CounterButton count={2} onClick={() => { }} text='Count is: ' />);
  });

  it('call onClick when the button is pressed', async () => {
    const onClickSpy = jest.fn();

    const { getByRole } = render(<CounterButton text='Count is: ' count={2} onClick={onClickSpy} />);

    const btn = getByRole('button');

    await userEvent.click(btn);

    expect(onClickSpy).toHaveBeenCalled();
  });
});