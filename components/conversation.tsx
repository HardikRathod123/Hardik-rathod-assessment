import { useLinkedInContext } from "./contexts/linkedin-context";

const Conversation = () => {
  const { state } = useLinkedInContext();
  return (
    <div>
      <h1>Conversation</h1>
    </div>
  );
};

export default Conversation;
