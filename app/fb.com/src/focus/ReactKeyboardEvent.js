import { useEffect } from 'react';
import { useReactEvent } from '@fb-event-interaction/ReactUseEvent';

const defaultEventOptions = {
  passive: true,
};

function useKeyboard(ref, options) {
  const { disabled = false, onKeyDown, onKeyUp } = options;

  const keyDownEvent = useReactEvent('keydown');
  const keyUpEvent = useReactEvent('keyup', defaultEventOptions);

  useEffect(() => {
    const element = ref.current;

    if (element) {
      keyDownEvent.setListener(element, (!disabled && onKeyDown) || null);
      keyUpEvent.setListener(element, (!disabled && onKeyUp) || null);
    }
  }, [disabled, onKeyDown, keyDownEvent, onKeyUp, keyUpEvent, ref]);
}

export const ReactKeyboardEvent = {
  useKeyboard,
};
