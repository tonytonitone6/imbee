import styled from '@emotion/styled';
import * as vars from '@styles/color';

type ScoreCountType = {
  readonly warning?: boolean;
};

type AnswerCountType = {
  readonly checked?: boolean;
};

export const CardWrap = styled('a')`
  display: flex;
  width: 100%;
  height: 110px;
  padding: 0 5px;
  border-bottom: 1px solid gray;
  cursor: pointer;
  color: inherit;
  text-decoration: none;
`;

export const ContentWrap = styled('div')`
  flex: 1;
`;

export const CardImgWrap = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  width: 20%;

  & > span {
    display: inline-block;
    text-align: center;
    height: 20px;
    width: 100%;
  }
`;

export const CardImg = styled('img')`
  width: 100%;
  max-width: 75px;
  object-fit: contain;
  border-radius: 50%;
`;

export const ContentTitle = styled('div')`
  width: 100%;
`;

export const ContentInfo = styled('div')`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

export const CountCard = styled('div')`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  width: 60px;
  height: 100px;

  & > div {
    width: 100%;
    text-align: center;

    &:nth-of-type(1) {
      color: rgb(201, 98, 109);
    }
  }
`;

export const ScoreCountDiv = styled('div')<ScoreCountType>`
  text-align: center;
  color: ${(props) => (props.warning ? 'red' : '#000')};
`;

export const AnswerCountDiv = styled('div')<AnswerCountType>`
  text-align: center;
  color: ${(props) => (props.checked ? vars.white : vars.green068100)};
  background-color: ${(props) =>
    props.checked ? vars.green068100 : vars.white};
  border: 1px solid rgb(6, 129, 0);
`;
