import { FC, ReactNode } from 'react';
import styled from '@emotion/styled';

const Container = styled('div')`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const CentralWrap = styled('div')`
  position: relative;
  min-width: 375px;
  width: 60%;
`;

type ContainerType = {
  children: ReactNode;
};

const FlexContainer: FC<ContainerType> = ({ children }) => {
  return (
    <Container>
      <CentralWrap>{children}</CentralWrap>
    </Container>
  );
};

export default FlexContainer;
