import { useCallback } from "react";
import { useLinkedInContext } from "./contexts/linkedin-context";
import LinkedInButton from "./linkedin-button";
import LinkedInModal from "./linkedin-modal";

const LinkedInScript = () => {
  const { dispatch } = useLinkedInContext();

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
      <LinkedInModal />
    </>
  );
};

export default LinkedInScript;
