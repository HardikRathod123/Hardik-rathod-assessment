import { useCallback } from "react";
import { useLinkedInContext } from "./contexts/linkedin-context";
import LinkedInButton from "./linkedin-button";
import LinkedInModal from "./linkedin-modal";

const LinkedInScript = () => {
  const { state, dispatch } = useLinkedInContext();

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
  useEffect(() => {
    document.addEventListener("focus", handleFocus, true);
    document.addEventListener("blur", handleFocusOut, true);

    return () => {
      document.removeEventListener("focus", handleFocus, true);
      document.removeEventListener("blur", handleFocusOut, true);
    };
  }, [handleFocus, handleFocusOut]);

  return (
    <>
      <LinkedInButton />
      <LinkedInModal handleInsertText={handleInsertText} />
    </>
  );
};

export default LinkedInScript;
