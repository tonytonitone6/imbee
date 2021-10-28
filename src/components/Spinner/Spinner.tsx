import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

import * as vars from '@styles/color';

const SpinnerAnimate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Circle = styled('div')`
  width: 50px;
  height: 50px;
  border: 2px solid ${vars.yellowF57F17};
  border-radius: 50%;
  border-top-color: transparent;
  border-bottom-color: transparent;
  animation: ${SpinnerAnimate} 500ms infinite linear;
`;

const Spinner = () => <Circle />;

export default Spinner;
