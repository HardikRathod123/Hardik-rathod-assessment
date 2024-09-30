import { ActionType, State } from "@/lib/types";

export const initialState: State = {
  showIcon: false,
  showModal: false,
  prompt: "",
  generatedText: undefined,
  iconPosition: { top: 0, left: 0 },
};

export const reducer = (state: State, action: ActionType): State => {
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
