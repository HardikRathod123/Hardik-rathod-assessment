import React, { createContext, ReactNode, useContext, useReducer } from "react";

type ActionType =
  | { type: "SET_SHOW_ICON"; payload: boolean }
  | { type: "SET_SHOW_MODAL"; payload: boolean }
  | { type: "SET_PROMPT"; payload: string }
  | { type: "SET_GENERATED_TEXT"; payload: string }
  | { type: "SET_ICON_POSITION"; payload: { top: number; left: number } };

interface State {
  showIcon: boolean;
  showModal: boolean;
  generatedText: string | undefined;
  prompt: string;
  iconPosition: { top: number; left: number };
}

const initialState: State = {
  showIcon: false,
  showModal: false,
  prompt: "",
  generatedText: undefined,
  iconPosition: { top: 0, left: 0 },
};

const reducer = (state: State, action: ActionType): State => {
  switch (action.type) {
    case "SET_SHOW_ICON":
      return { ...state, showIcon: action.payload };
    case "SET_SHOW_MODAL":
      return { ...state, showModal: action.payload };
    case "SET_PROMPT":
      return { ...state, prompt: action.payload };
    case "SET_GENERATED_TEXT":
      return { ...state, generatedText: action.payload };
    case "SET_ICON_POSITION":
      return { ...state, iconPosition: action.payload };
    default:
      return state;
  }
};

const LinkedInContext = createContext<{
  state: State;
  dispatch: React.Dispatch<ActionType>;
}>({ state: initialState, dispatch: () => null });

export const LinkedInProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <LinkedInContext.Provider value={{ state, dispatch }}>
      {children}
    </LinkedInContext.Provider>
  );
};

export const useLinkedInContext = () => useContext(LinkedInContext);
