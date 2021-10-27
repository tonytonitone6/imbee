import { Fragment } from 'react';

import * as vars from '@styles/color';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const slide = keyframes`
    0% {
      opacity: 1;
    }

    50% {
      opacity: 0.5;
    }

    100% {
      opacity: 1;
    }
`;

const SkeletonWrap = styled('div')`
  height: 100%;
  width: 100%;
  animation: ${slide} 1.5s ease-in 0.5s infinite;
  background-color: ${vars.graye2e8f1};
`;

const LoadingSkeleton = () => {
  return (
    <Fragment>
      <SkeletonWrap className="loading-skelton" />
    </Fragment>
  );
};

export default LoadingSkeleton;
