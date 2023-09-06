import React from "react";

interface IGlobalState {
  user: string;
  setUser: (nic: string) => void;
  selectedServices: number[];
  addService: (val: number) => void;
  removeService: (val: number) => void;
}

type IAction =
  | {
      type: "SET_USER";
      payload: string;
    }
  | {
      type: "ADD_SERVICE";
      payload: number;
    }
  | {
      type: "REMOVE_SERVICE";
      payload: number;
    };

const initialState: IGlobalState = {
  user: "",
  setUser: () => {},
  selectedServices: [],
  addService: () => {},
  removeService: () => {},
};

const globalContext = React.createContext(initialState);

export const useGlobalContext = () => React.useContext(globalContext);

const globalReducer = (state: IGlobalState, action: IAction): IGlobalState => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    case "ADD_SERVICE":
      return {
        ...state,
        selectedServices: [...state.selectedServices, action.payload],
      };
    case "REMOVE_SERVICE":
      return {
        ...state,
        selectedServices: state.selectedServices.filter(
          (s) => s != action.payload
        ),
      };
    default:
      return state;
  }
};

const useGlobalReducer = () => {
  const [state, dispatch] = React.useReducer(globalReducer, initialState);

  const setUser = (value: string) => {
    dispatch({ type: "SET_USER", payload: value });
  };

  const addService = (value: number) => {
    dispatch({ type: "ADD_SERVICE", payload: value });
  };
  const removeService = (value: number) => {
    dispatch({ type: "REMOVE_SERVICE", payload: value });
  };

  return {
    ...state,
    setUser,
    addService,
    removeService,
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
