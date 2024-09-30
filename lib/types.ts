export type ActionType =
  | { type: "SET_SHOW_ICON"; payload: boolean }
  | { type: "SET_SHOW_MODAL"; payload: boolean }
  | { type: "SET_PROMPT"; payload: string }
  | { type: "SET_GENERATED_TEXT"; payload: string }
  | { type: "SET_ICON_POSITION"; payload: { top: number; left: number } };

export interface State {
  showIcon: boolean;
  showModal: boolean;
  generatedText: string | undefined;
  prompt: string;
  iconPosition: { top: number; left: number };
}
