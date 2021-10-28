import styled from '@emotion/styled';

type TradingTagType = {
  fixed: boolean;
};

export const TradingTagWrap = styled('div')<TradingTagType>`
  position: ${(props) => (props.fixed ? 'relative' : 'fixed')};
  top: ${(props) => (props.fixed ? 0 : '50px')};
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  width: 100%;
  height: 100px;
  min-height: 100px;
`;

export const TagWrap = styled('div')`
  margin: 5px 5px 0 0;
`;
