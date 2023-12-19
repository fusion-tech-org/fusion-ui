type Props = {
  text: string;
  count: number;
  onClick: () => void;
};

const CounterButtong = ({ text, count, onClick }: Props) => {
  return (
    <>
      <button onClick={onClick}>
        {text} {count}
      </button>
    </>
  )
}

export default CounterButtong;
