import React from "react";

interface IGlobalState {
  user: string;
  setUser: (nic: string) => void;
}

type IAction = {
  type: "SET_USER";
  payload: string;
};

const initialState: IGlobalState = {
  user: "",
  setUser: () => {},
};

const globalContext = React.createContext(initialState);

export const useGlobalContext = () => React.useContext(globalContext);

const globalReducer = (state: IGlobalState, action: IAction) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

const useGlobalReducer = () => {
  const [state, dispatch] = React.useReducer(globalReducer, initialState);

  const setUser = (value: string) => {
    dispatch({ type: "SET_USER", payload: value });
  };

  return {
    ...state,
    setUser,
  };
};

export default function GlobalContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const state = useGlobalReducer();

  return (
    <globalContext.Provider value={state}>{children}</globalContext.Provider>
  );
}
