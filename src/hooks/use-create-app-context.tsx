'use client';

import { ReactNode, createContext, useContext } from 'react';

/**
 * Creates a React context along with a custom hook for consuming that context.
 *
 * @template T - The type of the value returned by the provided function.
 * @template E - The type of the props accepted by the provided function.
 * @param callback - A callback function that takes props of type E and returns a value of type T.
 * @returns A tuple containing:
 *   - A custom hook that can be used to access the context value.
 *   - A ContextProvider component that provides the context value to its children.
 */
const createAppContext = <T, E>(callback: (props: E) => T) => {
  type HookReturnType = ReturnType<typeof callback>;

  const Context = createContext({} as HookReturnType);

  /**
   * A provider component that supplies the context value to its children.
   *
   * @param children - The child components that will have access to the context.
   * @param other - Additional props of type E that will be passed to the function fn.
   * @returns A Context.Provider component that wraps the children.
   */
  const ContextProvider = ({ children, ...other }: { children: ReactNode } & E) => (
    <Context.Provider value={callback(other as E)}>{children}</Context.Provider>
  );

  /**
   * A custom hook for consuming the context value.
   * @returns The context value provided by the ContextProvider.
   */
  const useHook = () => useContext(Context);

  return [useHook, ContextProvider] as const;
};

export { createAppContext };
