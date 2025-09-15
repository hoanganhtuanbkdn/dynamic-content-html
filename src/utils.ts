import { DynamicTextOptions, DynamicTextConfig } from './types';

/**
 * Default variable format
 */
const DEFAULT_VARIABLE_FORMAT = {
  start: '{',
  end: '}'
};

/**
 * Extract variables from template string using custom format
 */
export function extractVariables(template: string, config?: DynamicTextConfig): string[] {
  const format = config?.variableFormat || DEFAULT_VARIABLE_FORMAT;
  const start = format.start.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const end = format.end.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`${start}([^${end}]+)${end}`, 'g');
  
  const variables: string[] = [];
  let match;

  while ((match = regex.exec(template)) !== null) {
    variables.push(match[1].trim());
  }

  return variables;
}

/**
 * Get nested property value from object using dot notation
 */
export function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : undefined;
  }, obj);
}

/**
 * Replace variables in template with values from options using custom format
 */
export function replaceVariables(template: string, options: DynamicTextOptions, config?: DynamicTextConfig): string {
  let result = template;
  const format = config?.variableFormat || DEFAULT_VARIABLE_FORMAT;
  const start = format.start.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const end = format.end.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  // Replace all variables (including nested object properties)
  Object.entries(options).forEach(([key, value]) => {
    // Handle direct variables like {name} or {{name}} or [name]
    const directRegex = new RegExp(`${start}${key}${end}`, 'g');
    result = result.replace(directRegex, value !== undefined && value !== null ? String(value) : '');
    
    // Handle nested object properties like {user.name} or {{user.name}} or [user.name]
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      Object.entries(value).forEach(([nestedKey, nestedValue]) => {
        const nestedRegex = new RegExp(`${start}${key}\\.${nestedKey}${end}`, 'g');
        result = result.replace(nestedRegex, nestedValue !== undefined && nestedValue !== null ? String(nestedValue) : '');
      });
    }
  });

  // Handle any remaining variables that might not have been processed
  // This covers cases like {user.profile.name} where user is in options but profile.name is nested deeper
  // and also handles missing variables by replacing them with empty string
  const remainingVariables = extractVariables(result, config);
  remainingVariables.forEach(variable => {
    const value = getNestedValue(options, variable);
    const escapedVariable = variable.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`${start}${escapedVariable}${end}`, 'g');
    result = result.replace(regex, value !== undefined ? String(value) : '');
  });

  return result;
}

/**
 * Process rich content with HTML functions using custom format
 */
export function processRichContent(
  template: string,
  options: DynamicTextOptions,
  richFunctions: Record<string, (chunks: string) => string>,
  config?: DynamicTextConfig
): string {
  let result = template;
  const format = config?.variableFormat || DEFAULT_VARIABLE_FORMAT;
  const start = format.start.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const end = format.end.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  // First process rich content functions (before variable replacement)
  Object.entries(richFunctions).forEach(([key, fn]) => {
    if (typeof fn === 'function') {
      const regex = new RegExp(`${start}${key}${end}`, 'g');
      result = result.replace(regex, (match) => {
        // Extract content between tags - remove the start and end markers
        const content = match.slice(format.start.length, -format.end.length);
        return fn(content);
      });
    }
  });

  // Then replace all remaining variables
  result = replaceVariables(result, options, config);

  return result;
}
