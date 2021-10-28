import { FC } from 'react';
import Card from '@components/Card/Card';
import { useStore } from '@contexts/GlobalContext';

import { QuestionWrap } from './Question.style';

export type OwnerType = {
  profile_image: string;
  display_name: string;
};

export type CardInfoType = {
  title: string;
  view_count: number;
  link: string;
  score: number;
  answer_count: number;
  owner: OwnerType;
  is_answered: boolean;
};

const QuestionList: FC = () => {
  const { state } = useStore();
  const {
    questions: { data: questionList = [] }
  } = state;
  return (
    <QuestionWrap>
      {questionList.map((question) => {
        return <Card key={question.title} {...question} />;
      })}
    </QuestionWrap>
  );
};

export default QuestionList;
