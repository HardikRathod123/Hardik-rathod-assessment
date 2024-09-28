import React from 'react';
import { useLinkedInContext } from './contexts/linkedin-context';

const LinkedInButton = () => {
  const { state, dispatch } = useLinkedInContext();

  if (!state.showIcon) return null;

  return (
    <div
      className="fixed z-50"
      style={{ top: `${state.iconPosition.top}px`, left: `${state.iconPosition.left}px` }}
    >
      <button
        onClick={() => dispatch({ type: 'SET_SHOW_MODAL', payload: true })}
        className="w-8 h-8 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center text-xs"
      >
        AI
      </button>
    </div>
  );
};

export default LinkedInButton;
