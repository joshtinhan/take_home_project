import styled from 'styled-components';
import React from 'react';

const Container = styled.div`
  padding: 0 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledMain = styled.main`
  padding: 5rem 0;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

interface DefaultTemplateProps {
  children: React.ReactNode;
}

export function DefaultTemplate ({
  children,
}: DefaultTemplateProps) {
  return (
    <Container>
      <StyledMain>
        {children}
      </StyledMain>
    </Container>
  );
}
