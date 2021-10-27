import { FC, ChangeEvent } from 'react';
import { SearchBarWrap, Input } from './SearchBar.style';

type SearchBarType = {
  onUpdateSearchWords: (text: string) => void;
};

const SearchBar: FC<SearchBarType> = ({ onUpdateSearchWords }): JSX.Element => {
  return (
    <SearchBarWrap>
      <Input
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const { value } = e.target;
          onUpdateSearchWords(value);
        }}
      />
    </SearchBarWrap>
  );
};

export default SearchBar;
