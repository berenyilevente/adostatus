import { ReactElement } from 'react';

import { MotionContainer } from './components/MotionContainer';
import { MotionFadeIn } from './components/MotionFadeIn';

export const Motion = ({ children, id }: { children: ReactElement; id: string }) => {
  return (
    <MotionContainer id={id}>
      <MotionFadeIn>{children}</MotionFadeIn>
    </MotionContainer>
  );
};
