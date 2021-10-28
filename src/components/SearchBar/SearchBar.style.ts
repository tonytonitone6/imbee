import styled from '@emotion/styled';
import * as vars from '@styles/color';

export const SearchBarWrap = styled('div')`
  width: 100%;
  height: 40px;
  display: flex;
`;

export const Input = styled('input')`
  width: 100%;
  padding: 10px;
  border: 1px solid ${vars.blueACD9E6};
  border-radius: 5px 0 0 5px;
`;

export const SearchBtn = styled('button')`
  width: 75px;
  border: 1px solid ${vars.blueACD9E6};
  background-color: ${vars.blueACD9E6};
  color: ${vars.black};
  height: 100%;
  border-radius: 0 5px 5px 0;
`;
