import { recoverableViolation } from '@fb-error/recoverableViolation';

/**
 * Merges multiple refs into a single callback ref.
 *
 * @param {...(React.RefCallback | React.MutableRefObject)} refs - Refs to be merged.
 * @returns {React.RefCallback} - Callback ref to be used in a React component.
 */
export function mergeRefs(...refs) {
  return function (ref) {
    refs.forEach((singleRef) => {
      if (!singleRef) {
        return;
      }

      if (typeof singleRef === 'function') {
        singleRef(ref);
        return;
      }

      if (typeof singleRef === 'object') {
        singleRef.current = ref;
        return;
      }

      recoverableViolation(
        'mergeRefs cannot handle Refs of type boolean, number or string, received ref ' + String(singleRef),
        'comet_ui',
      );
    });
  };
}
