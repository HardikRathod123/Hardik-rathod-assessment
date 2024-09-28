import { useCallback, useEffect } from "react";
import { useLinkedInContext } from "./contexts/linkedin-context";
import LinkedInButton from "./linkedin-button";

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

  const handleFocus = useCallback(
    (event: FocusEvent) => {
      const target = event.target as HTMLElement;
      if (target.classList.contains("msg-form__contenteditable")) {
        dispatch({ type: "SET_SHOW_ICON", payload: true });
        updateIconPosition(target);
      }
    },
    [dispatch, updateIconPosition]
  );

  const handleBlur = useCallback(() => {
    dispatch({ type: "SET_SHOW_ICON", payload: false });
  }, [dispatch]);

  useEffect(() => {
    document.addEventListener("focus", handleFocus, true);
    document.addEventListener("blur", handleBlur, true);

    return () => {
      document.removeEventListener("focus", handleFocus, true);
      document.removeEventListener("blur", handleBlur, true);
    };
  }, [handleFocus, handleBlur]);

  return (
    <>
      <LinkedInButton />
    </>
  );
};

export default LinkedInScript;
