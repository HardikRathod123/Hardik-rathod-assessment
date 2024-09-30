import { useLinkedInContext } from "./contexts/linkedin-context";

const Conversation = () => {
  const { state } = useLinkedInContext();
  return (
    <>
      <div className="self-end bg-gray-100 rounded-xl p-2">
        <span className="text-gray-500">{state.prompt}</span>
      </div>
      <div className="self-start bg-blue-100 rounded-xl p-2">
        <span className="text-gray-500">{state.generatedText}</span>
      </div>
    </>
  );
};

export default Conversation;
