// Based on the code from https://kentcdodds.com/blog/how-to-use-react-context-effectively

import * as React from 'react';

type TransitionProviderProps = { children: React.ReactNode };

const TransitionContext = React.createContext<
  | {
      transitionFinished: boolean;
      setTransitionFinished: React.Dispatch<React.SetStateAction<boolean>>;
    }
  | undefined
>(undefined);

function TransitionProvider({ children }: TransitionProviderProps) {
  const [transitionFinished, setTransitionFinished] = React.useState(false);

  const value = React.useMemo(
    () => ({
      transitionFinished,
      setTransitionFinished,
    }),
    [transitionFinished]
  );

  return (
    <TransitionContext.Provider value={value}>
      {children}
    </TransitionContext.Provider>
  );
}

function useTransition() {
  const context = React.useContext(TransitionContext);

  if (context === undefined) {
    throw new Error('useTransition must be used within a TransitionProvider');
  }
  return context;
}

export { TransitionProvider, useTransition };
