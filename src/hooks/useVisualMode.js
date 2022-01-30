import { useState } from 'react';

function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history] = useState([initial]);

  function transition(newMode, replace = false) {
    setMode(newMode)
    if  (replace) {
      history.pop();
    }
    setMode(newMode);
    history.push(newMode)
  }

  function back () {
    if (history.length > 1) {
      history.pop();
      const backMode = history.length - 1;
      setMode(history[backMode])
    }
  };
  
  
  return {mode, transition, back};
}

export default useVisualMode;
