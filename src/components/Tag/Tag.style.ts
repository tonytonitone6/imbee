import styled from '@emotion/styled';
import * as vars from '@styles/color';

type TagWrapType = {
  readonly active: boolean;
};

export const TagWrap = styled('button')<TagWrapType>`
  border-radius: 5px;
  padding: 12px 5px;
  background-color: ${(props) => (props.active ? vars.blueACD9E6 : vars.white)};
  border: 2px solid ${vars.blueACD9E6};
  outline: none;
  cursor: pointer;
`;
