import { extractVariables, replaceVariables, processRichContent, getNestedValue } from '../utils';
import { DynamicTextOptions } from '../types';

describe('extractVariables', () => {
  test('should extract single variable with default format', () => {
    const variables = extractVariables('Hello {name}!');
    expect(variables).toEqual(['name']);
  });

  test('should extract multiple variables with default format', () => {
    const variables = extractVariables('Hello {name}, you have {count} messages');
    expect(variables).toEqual(['name', 'count']);
  });

  test('should extract nested object variables with default format', () => {
    const variables = extractVariables('Hello {user.name} {user.surname}!');
    expect(variables).toEqual(['user.name', 'user.surname']);
  });

  test('should extract variables with custom format', () => {
    // Square brackets format
    const variables1 = extractVariables('Hello [name]!', { variableFormat: { start: '[', end: ']' } });
    expect(variables1).toEqual(['name']);

    // Double square brackets format
    const variables2 = extractVariables('Hello [[name]]!', { variableFormat: { start: '[[', end: ']]' } });
    expect(variables2).toEqual(['name']);

    // Custom format
    const variables3 = extractVariables('Hello <name>!', { variableFormat: { start: '<', end: '>' } });
    expect(variables3).toEqual(['name']);
  });

  test('should handle variables with spaces', () => {
    const variables = extractVariables('Hello { name }!');
    expect(variables).toEqual(['name']);
  });

  test('should return empty array for no variables', () => {
    const variables = extractVariables('Hello World!');
    expect(variables).toEqual([]);
  });

  test('should handle nested variables', () => {
    const variables = extractVariables('{user.profile.name} and {user.settings.theme}');
    expect(variables).toEqual(['user.profile.name', 'user.settings.theme']);
  });
});

describe('replaceVariables', () => {
  test('should replace simple variables', () => {
    const result = replaceVariables('Hello {name}!', { name: 'Jane' });
    expect(result).toBe('Hello Jane!');
  });

  test('should replace nested object variables', () => {
    const user = {
      name: 'John',
      email: 'john@example.com'
    };

    const result = replaceVariables('Hello {user.name}!', { user });
    expect(result).toBe('Hello John!');
  });

  test('should replace multiple variables', () => {
    const result = replaceVariables('{greeting} {name}!', {
      greeting: 'Hello',
      name: 'World'
    });
    expect(result).toBe('Hello World!');
  });

  test('should handle undefined values', () => {
    const result = replaceVariables('Hello {name}!', { name: undefined });
    expect(result).toBe('Hello !');
  });

  test('should handle empty template', () => {
    const result = replaceVariables('', { name: 'John' });
    expect(result).toBe('');
  });
});

describe('processRichContent', () => {
  test('should process rich content with functions', () => {
    const richFunctions = {
      link: (chunks: string) => `<a href="/test">${chunks}</a>`
    };

    const result = processRichContent('Click {link} here', {}, richFunctions);
    expect(result).toBe('Click <a href="/test">link</a> here');
  });

  test('should process rich content with variables', () => {
    const options: DynamicTextOptions = {
      name: 'John'
    };

    const richFunctions = {
      link: (chunks: string) => `<a href="/user">${chunks}</a>`
    };

    const result = processRichContent('Hello {name}, click {link}', options, richFunctions);
    expect(result).toBe('Hello John, click <a href="/user">link</a>');
  });

  test('should handle multiple rich functions', () => {
    const richFunctions = {
      bold: (chunks: string) => `<strong>${chunks}</strong>`,
      italic: (chunks: string) => `<em>${chunks}</em>`
    };

    const result = processRichContent('{bold} and {italic}', {}, richFunctions);
    expect(result).toBe('<strong>bold</strong> and <em>italic</em>');
  });

  test('should handle empty rich functions', () => {
    const richFunctions = {};

    const result = processRichContent('Hello {name}!', { name: 'John' }, richFunctions);
    expect(result).toBe('Hello John!');
  });
});

describe('getNestedValue', () => {
  test('should get nested property values', () => {
    const obj = {
      user: {
        profile: {
          name: 'John',
          settings: {
            theme: 'dark'
          }
        }
      }
    };

    expect(getNestedValue(obj, 'user.profile.name')).toBe('John');
    expect(getNestedValue(obj, 'user.profile.settings.theme')).toBe('dark');
    expect(getNestedValue(obj, 'user.profile.nonexistent')).toBeUndefined();
    expect(getNestedValue(obj, 'nonexistent.path')).toBeUndefined();
  });

  test('should handle null and undefined values', () => {
    const obj = {
      user: null,
      profile: undefined
    };

    expect(getNestedValue(obj, 'user.name')).toBeUndefined();
    expect(getNestedValue(obj, 'profile.settings')).toBeUndefined();
  });

  test('should handle empty path', () => {
    const obj = { name: 'John' };
    expect(getNestedValue(obj, '')).toBeUndefined();
  });
});
