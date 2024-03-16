import {
  SuggestionItem,
  SuggestionItemWrapper,
  SuggestionList,
} from './styles';

export const SimpleList = (props) => {
  const { data = [], selectedIndex, onClickItem } = props;

  return (
    <SuggestionList>
      {data.map((item, index) => (
        <SuggestionItemWrapper
          key={index}
          style={{
            backgroundColor:
              selectedIndex === index ? '#E8F7FF' : 'transparent',
          }}
        >
          <SuggestionItem onClick={() => onClickItem(item)}>
            {/* <IconSubscribe /> */}
            <div>{data[index].label}</div>
          </SuggestionItem>
        </SuggestionItemWrapper>
      ))}
    </SuggestionList>
  );
};
