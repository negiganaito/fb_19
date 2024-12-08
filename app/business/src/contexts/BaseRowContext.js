import { createContext } from 'react';

/**
 * @typedef BaseRowContextProps
 * @property {number} columns
 * @property {string} wrap
 */

/**
 * @type {import("react").Context<BaseRowContextProps>}
 */
export const BaseRowContext = createContext({
  columns: 1,
  wrap: 'none',
});
