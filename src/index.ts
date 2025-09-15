export { d, rich } from './core';
export type { DynamicTextOptions, RichTextOptions, RichContentFunction, DynamicTextConfig } from './types';
export { extractVariables, replaceVariables, processRichContent, getNestedValue } from './utils';

// Default export
import d from './core';
export default d;
