import React from 'react';

export default class IndexClass extends React.Component<{}, any> {
  state = {};
  handleClick2?: VoidFunction;

  static number = 1;
  static number2: number;

  handleClick = () => {
    console.log(1111);
  }

  componentDidMount(): void {
    //
  }

  render(): React.ReactNode {
    return (
      <div>
        <button onClick={this.handleClick}>click one</button>
        <button onClick={this.handleClick2}>click two</button>
      </div>
    )
  }
}

IndexClass.number2 = 2;

IndexClass.prototype.handleClick2 = () => {
  console.log(2222);
}

