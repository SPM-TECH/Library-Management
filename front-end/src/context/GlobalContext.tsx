import { User } from "@/api/users";
import React from "react";

interface IGlobalState {
  user: User | null;
  setUser: (nic: User | null) => void;
  selectedServices: number[];
  addService: (val: number) => void;
  removeService: (val: number) => void;
  accessToken: string | null;
  setAccessToken: (val: string | null) => void;
}

type IAction =
  | {
      type: "SET_USER";
      payload: User | null;
    }
  | {
      type: "ADD_SERVICE";
      payload: number;
    }
  | {
      type: "REMOVE_SERVICE";
      payload: number;
    }
  | {
      type: "SET_TOKEN";
      payload: string | null;
    };

const initialState: IGlobalState = {
  user: null,
  setUser: () => {},
  selectedServices: [],
  addService: () => {},
  removeService: () => {},
  accessToken: localStorage.getItem("lib-token"),
  setAccessToken: () => {},
};

const globalContext = React.createContext(initialState);

// eslint-disable-next-line react-refresh/only-export-components
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
    case "SET_TOKEN":
      return {
        ...state,
        accessToken: action.payload,
      };
    default:
      return state;
  }
};

const useGlobalReducer = () => {
  const [state, dispatch] = React.useReducer(globalReducer, initialState);

  const setUser = (value: User | null) => {
    dispatch({ type: "SET_USER", payload: value });
  };

  const addService = (value: number) => {
    dispatch({ type: "ADD_SERVICE", payload: value });
  };
  const removeService = (value: number) => {
    dispatch({ type: "REMOVE_SERVICE", payload: value });
  };

  const setAccessToken = (value: string | null) => {
    dispatch({ type: "SET_TOKEN", payload: value });
  };

  return {
    ...state,
    setUser,
    addService,
    removeService,
    setAccessToken,
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
