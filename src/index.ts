export { d, rich, mjml } from './core';
export type { DynamicTextOptions, RichTextOptions, RichContentFunction, DynamicTextConfig, MJMLOptions, MJMLConfig } from './types';
export { extractVariables, replaceVariables, processRichContent, getNestedValue, processMJML } from './utils';

// Default export
import d from './core';
export default d;
