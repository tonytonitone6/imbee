import { FC, useState, ChangeEvent } from 'react';
import debounce from 'lodash.debounce';

import { useStore, updateSearchWords } from '@contexts/GlobalContext';
import { SearchBarWrap, Input, SearchBtn } from './SearchBar.style';

const DELAY_SECONDS = 200;

const SearchBar: FC = (): JSX.Element => {
  const [searchWords, setSearchWords] = useState<string>('');
  const { dispatch } = useStore();

  // it will avoid high frequency to call api
  const updateSearchText = debounce((text: string) => {
    if (text !== undefined) {
      setSearchWords(text);
      updateSearchWords(dispatch, text);
    }
  }, DELAY_SECONDS);

  // About this func, if user type any key on keyboard will trigger tag and it will upgrade to latest results
  // maybe we don't need it.
  const handleSearchSubmit = () => updateSearchWords(dispatch, searchWords);

  return (
    <SearchBarWrap>
      <Input
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const { value } = e.target;
          updateSearchText(value);
        }}
      />
      <SearchBtn onClick={handleSearchSubmit}>Search</SearchBtn>
    </SearchBarWrap>
  );
};

export default SearchBar;
