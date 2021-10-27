import { FC, Fragment, useState, useEffect } from 'react';
import debounce from 'lodash.debounce';

import useIntersectionObserver from '@hooks/useIntersectionObserver';
import { GETv1Tags, GETv1Questions } from '@utils/apis';
import {
  ActionsType,
  useStore,
  updateLoadingStatus,
  updateTagList,
  updateQuestionListByTag,
  updateQuestionListByPage,
  fetchMoreData
} from '@contexts/GlobalContext';
import SearchBar from '@components/SearchBar/SearchBar';
import TradingTag from '@components/TrendingTag/TradingTag';
import QuestionList from '@components/QuestionList/QuestionList';
import {
  SearchBarSection,
  TradingTagSection,
  QuestionSection,
  FooterSection
} from './Lobby.style';

const DELAY_SECONDS = 200;

export type TagType = {
  name: string;
};

const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5
};

const Lobby: FC = () => {
  const [ref, isInView] = useIntersectionObserver(options);
  const { state, dispatch } = useStore();
  const [searchWords, setSearchWords] = useState<string>('');
  const { selectedTag, questions, tags } = state;

  const getQuestions = async (func: Function) => {
    const { page, pageSize } = questions;

    try {
      updateLoadingStatus(dispatch, ActionsType.SET_LOADING, 'questions');

      const res = await GETv1Questions({
        page,
        pageSize,
        tag: selectedTag
      });

      const {
        data: { items: questionList = [], has_more },
        status
      } = res;

      if (status === 200) {
        func(dispatch, questionList, has_more);
      }
    } catch (error) {}
  };

  // init tags
  useEffect(() => {
    const getTags = async () => {
      const { page, pageSize } = tags;
      try {
        updateLoadingStatus(dispatch, ActionsType.SET_LOADING, 'tags');

        const res = await GETv1Tags({
          page,
          pageSize,
          text: searchWords
        });
        const { data: { items: tagList } = [], status } = res;

        if (status === 200) {
          updateTagList(dispatch, tagList);
        }
      } catch (error) {}
    };

    getTags();
  }, [searchWords]);

  useEffect(() => {
    if (selectedTag) {
      getQuestions(updateQuestionListByTag);
    }
  }, [selectedTag]);

  useEffect(() => {
    getQuestions(updateQuestionListByPage);
  }, [questions.page]);

  useEffect(() => {
    const { hasMore, data } = questions;
    const isInitData = data.length > 0;

    if (isInView && hasMore && isInitData) {
      fetchMoreData(dispatch);
    }
  }, [isInView]);

  // it will avoid high frequency to call api
  const updateSearchWords = debounce((text: string) => {
    setSearchWords(text);
  }, DELAY_SECONDS);

  console.log(state, 'state');

  return (
    <Fragment>
      <SearchBarSection>
        <SearchBar onUpdateSearchWords={updateSearchWords} />
      </SearchBarSection>
      <TradingTagSection>
        <TradingTag />
      </TradingTagSection>
      <QuestionSection>
        <QuestionList />
      </QuestionSection>
      <FooterSection ref={ref} />
    </Fragment>
  );
};

export default Lobby;
