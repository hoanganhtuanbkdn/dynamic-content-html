import { DynamicTextOptions, RichTextOptions, RichContentFunction, DynamicTextConfig } from './types';
import { replaceVariables, processRichContent } from './utils';

/**
 * Main dynamic text function - similar to i18n t() function
 * @param template - Template string with variable placeholders
 * @param options - Object containing variable values
 * @param config - Optional configuration for variable format
 * @returns Processed string with variables replaced
 * 
 * @example
 * d('Hello {name}!', { name: 'Jane' }) // "Hello Jane!" (default format)
 * d('Hello {{name}}!', { name: 'Jane' }, { variableFormat: { start: '{{', end: '}}' } }) // "Hello Jane!"
 * d('Hello [name]!', { name: 'Jane' }, { variableFormat: { start: '[', end: ']' } }) // "Hello Jane!"
 */
export function d(template: string, options: DynamicTextOptions = {}, config?: DynamicTextConfig): string {
  if (!template || typeof template !== 'string') {
    return '';
  }

  return replaceVariables(template, options, config);
}

/**
 * Rich content function - similar to i18n rich() function
 * @param template - Template string with variable placeholders
 * @param options - Object containing variable values and rich content functions
 * @param config - Optional configuration for variable format
 * @returns Processed string with variables replaced and rich content applied
 * 
 * @example
 * d.rich('Click {link} for more info', { 
 *   link: (chunks) => `<a href="/info">${chunks}</a>`
 * }) // "Click <a href="/info">link</a> for more info"
 * 
 * d.rich('Click [[link]] for more info', { 
 *   link: (chunks) => `<a href="/info">${chunks}</a>`
 * }, { variableFormat: { start: '[[', end: ']]' } })
 */
export function rich(template: string, options: RichTextOptions = {}, config?: DynamicTextConfig): string {
  if (!template || typeof template !== 'string') {
    return '';
  }

  // Separate rich functions from regular options
  const richFunctions: Record<string, RichContentFunction> = {};
  const regularOptions: DynamicTextOptions = {};

  Object.entries(options).forEach(([key, value]) => {
    if (typeof value === 'function') {
      richFunctions[key] = value;
    } else {
      regularOptions[key] = value;
    }
  });

  return processRichContent(template, regularOptions, richFunctions, config);
}

// Attach rich function to main d function
d.rich = rich;

export default d;
