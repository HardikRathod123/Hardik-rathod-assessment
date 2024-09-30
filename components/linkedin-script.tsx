import { useLinkedInContext } from "./contexts/linkedin-context";
import LinkedInButton from "./linkedin-button";
import LinkedInModal from "./linkedin-modal";

const LinkedInScript = () => {
  const { handleFocus, handleFocusOut } = useLinkedInContext();

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
