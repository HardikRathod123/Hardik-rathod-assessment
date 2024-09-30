import { ActionType, State } from "@/lib/types";
import React, { createContext, ReactNode, useContext, useReducer } from "react";
import { initialState, reducer } from "../reducer";

interface LinkedInContextType {
  state: State;
  dispatch: React.Dispatch<ActionType>;
  handleFocus: (event: FocusEvent) => void;
  handleFocusOut: (event: FocusEvent) => void;
  handleInsertText: (text: string) => void;
  updateIconPosition: (target: HTMLElement) => void;
}

const LinkedInContext = createContext<LinkedInContextType | undefined>(
  undefined
);

export const LinkedInProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const updateIconPosition = useCallback(
    (target: HTMLElement) => {
      const rect = target.getBoundingClientRect();
      dispatch({
        type: "SET_ICON_POSITION",
        payload: {
          top: rect.bottom - 40,
          left: rect.right - 40,
        },
      });
    },
    [dispatch]
  );

  const handleFocus = (event: FocusEvent) => {
    const target = event.target as HTMLElement;
    if (target.matches(".msg-form__contenteditable")) {
      dispatch({ type: "SET_SHOW_ICON", payload: true });
      updateIconPosition(target);
    }
  };

  const handleFocusOut = (event: FocusEvent) => {
    const target = event.relatedTarget as HTMLElement;
    if (!target || target.matches(".AI-icon")) {
      dispatch({ type: "SET_SHOW_ICON", payload: false });
    }
  };

  const handleInsertText = (text: string) => {
    dispatch({ type: "SET_SHOW_MODAL", payload: false });
    const replyText = text;

    const messageElement: HTMLElement | null = document.querySelector(
      ".msg-form__contenteditable"
    );

    if (messageElement) {
      const pTag = messageElement.querySelector("p");
      if (pTag) {
        pTag.innerHTML = replyText;
      } else {
        const paragraph: HTMLParagraphElement = document.createElement("p");
        paragraph.textContent = replyText;
        messageElement.textContent = "";
        messageElement.appendChild(paragraph);
      }
      const label: HTMLElement | null = document.querySelector(
        ".msg-form__placeholder"
      );
      label?.classList.remove("msg-form__placeholder");

      const sendButton: HTMLButtonElement | null = document.querySelector(
        ".msg-form__send-button"
      );
      if (sendButton) {
        sendButton.disabled = false;
      }
    }
  };

  const contextValue = useMemo(
    () => ({
      state,
      dispatch,
      handleFocus,
      handleFocusOut,
      handleInsertText,
      updateIconPosition,
    }),
    [
      state,
      dispatch,
      handleFocus,
      handleFocusOut,
      handleInsertText,
      updateIconPosition,
    ]
  );

  return (
    <LinkedInContext.Provider value={contextValue}>
      {children}
    </LinkedInContext.Provider>
  );
};

export const useLinkedInContext = (): LinkedInContextType => {
  const context = useContext(LinkedInContext);
  if (context === undefined) {
    throw new Error(
      "useLinkedInContext must be used within a LinkedInProvider"
    );
  }
  return context;
};
