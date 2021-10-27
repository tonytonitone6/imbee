import { FC } from 'react';

import { CardInfoType } from '@components/QuestionList/QuestionList';
import {
  CardWrap,
  ContentWrap,
  ContentTitle,
  ContentInfo,
  CardImgWrap,
  CardImg,
  CountCard,
  ScoreCountDiv,
  AnswerCountDiv
} from './Card.style';

export type InfoType = {
  title: string;
  count: number;
  helperFunc?: (key: any, isAnswer: boolean) => void;
};

const Card: FC<CardInfoType> = ({
  title,
  view_count,
  link,
  score,
  answer_count,
  owner,
  is_answered: isAnswer
}) => {
  const { profile_image = '', display_name: name = '' } = owner;

  const infos: InfoType[] = [
    {
      title: 'Score',
      count: score,
      helperFunc: (count) =>
        score < 0 ? (
          // Wrote a common tag, I think, its over design in this case
          // because it will be add more logic in styled component
          <ScoreCountDiv warning>{count}</ScoreCountDiv>
        ) : (
          <ScoreCountDiv>{count}</ScoreCountDiv>
        )
    },
    {
      title: 'Answers',
      count: answer_count,
      helperFunc: (count, isAnswer) =>
        isAnswer ? (
          <AnswerCountDiv checked>{count}</AnswerCountDiv>
        ) : (
          <AnswerCountDiv>{count}</AnswerCountDiv>
        )
    },
    {
      title: 'Viewed',
      count: view_count
    }
  ];

  return (
    <CardWrap href={link} rel="noopener noreferrer" target="_blank">
      <ContentWrap>
        <ContentTitle>{title}</ContentTitle>
        <ContentInfo>
          {infos.map(({ title, count, helperFunc }) => {
            return (
              <CountCard key={title}>
                <div>{title}</div>
                {helperFunc ? helperFunc(count, isAnswer) : <div>{count}</div>}
              </CountCard>
            );
          })}
        </ContentInfo>
      </ContentWrap>
      <CardImgWrap>
        <CardImg src={profile_image} alt="owner profile" />
        <span>{name}</span>
      </CardImgWrap>
    </CardWrap>
  );
};

export default Card;
