import { cn } from "@/lib/utils";
import { useLinkedInContext } from "./contexts/linkedin-context";

const LinkedInModal = () => {
  const { state, dispatch } = useLinkedInContext();

  const handleOutsideClick = () => {
    dispatch({ type: "SET_SHOW_MODAL", payload: false });
  };

  return (
    <div
      className={cn(
        "z-50 fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity",
        `${!state.showModal ? "hidden" : ""}`
      )}
      aria-hidden="true"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        onClick={handleOutsideClick}
      >
        <div
          className="bg-white rounded-lg p-4 w-1/3"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-lg font-bold mb-2 text-center">Hello</h2>
        </div>
      </div>
    </div>
  );
};

export default LinkedInModal;
