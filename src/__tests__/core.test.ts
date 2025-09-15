import { d, rich } from '../core';

describe('d() function', () => {
  test('should replace simple variables with default format', () => {
    expect(d('Hello {name}!', { name: 'Jane' })).toBe('Hello Jane!');
    expect(d('Welcome {user}!', { user: 'John' })).toBe('Welcome John!');
  });

  test('should replace simple variables with custom format', () => {
    // Double curly braces format
    expect(d('Hello {{name}}!', { name: 'Jane' }, { variableFormat: { start: '{{', end: '}}' } })).toBe('Hello Jane!');
    
    // Square brackets format
    expect(d('Hello [name]!', { name: 'Jane' }, { variableFormat: { start: '[', end: ']' } })).toBe('Hello Jane!');
    
    // Double square brackets format
    expect(d('Hello [[name]]!', { name: 'Jane' }, { variableFormat: { start: '[[', end: ']]' } })).toBe('Hello Jane!');
    
    // Custom format
    expect(d('Hello <name>!', { name: 'Jane' }, { variableFormat: { start: '<', end: '>' } })).toBe('Hello Jane!');
  });

  test('should handle multiple variables with custom format', () => {
    const result = d('Hello {name}, you have {count} messages', {
      name: 'Alice',
      count: 5
    });
    expect(result).toBe('Hello Alice, you have 5 messages');
  });

  test('should handle multiple variables with different formats', () => {
    // Square brackets
    const result1 = d('Hello [name], you have [count] messages', {
      name: 'Alice',
      count: 5
    }, { variableFormat: { start: '[', end: ']' } });
    expect(result1).toBe('Hello Alice, you have 5 messages');

    // Double square brackets
    const result2 = d('Hello [[name]], you have [[count]] messages', {
      name: 'Bob',
      count: 3
    }, { variableFormat: { start: '[[', end: ']]' } });
    expect(result2).toBe('Hello Bob, you have 3 messages');
  });

  test('should handle nested object properties with default format', () => {
    const user = {
      name: 'John',
      email: 'john@example.com',
      profile: {
        age: 30,
        city: 'New York'
      }
    };

    expect(d('Hello {user.name}!', { user })).toBe('Hello John!');
    expect(d('Email: {user.email}!', { user })).toBe('Email: john@example.com!');
    expect(d('Age: {user.profile.age}!', { user })).toBe('Age: 30!');
  });

  test('should handle nested object properties with custom format', () => {
    const user = {
      name: 'John',
      email: 'john@example.com',
      profile: {
        age: 30,
        city: 'New York'
      }
    };

    // Square brackets format
    expect(d('Hello [user.name]!', { user }, { variableFormat: { start: '[', end: ']' } })).toBe('Hello John!');
    expect(d('Email: [user.email]!', { user }, { variableFormat: { start: '[', end: ']' } })).toBe('Email: john@example.com!');
    expect(d('Age: [user.profile.age]!', { user }, { variableFormat: { start: '[', end: ']' } })).toBe('Age: 30!');

    // Double square brackets format
    expect(d('Hello [[user.name]]!', { user }, { variableFormat: { start: '[[', end: ']]' } })).toBe('Hello John!');
    expect(d('Email: [[user.email]]!', { user }, { variableFormat: { start: '[[', end: ']]' } })).toBe('Email: john@example.com!');
  });

  test('should handle empty or undefined values', () => {
    expect(d('Hello {name}!', { name: '' })).toBe('Hello !');
    expect(d('Hello {name}!', { name: undefined })).toBe('Hello !');
    expect(d('Hello {name}!', {})).toBe('Hello !');
  });

  test('should handle empty template', () => {
    expect(d('', { name: 'John' })).toBe('');
    expect(d('   ', { name: 'John' })).toBe('   ');
  });

  test('should handle template without variables', () => {
    expect(d('Hello World!', { name: 'John' })).toBe('Hello World!');
  });

  test('should handle non-string template', () => {
    expect(d(null as any, { name: 'John' })).toBe('');
    expect(d(undefined as any, { name: 'John' })).toBe('');
  });

  test('should handle direct variables', () => {
    expect(d('Hello {name}!', { name: 'Jane' })).toBe('Hello Jane!');
    expect(d('Welcome {username}!', { username: 'John' })).toBe('Welcome John!');
  });

  test('should handle nested object properties', () => {
    const user = {
      name: 'John',
      surname: 'Doe',
      profile: {
        email: 'john@example.com',
        settings: {
          theme: 'dark'
        }
      }
    };

    expect(d('Hello {user.name}!', { user })).toBe('Hello John!');
    expect(d('Email: {user.profile.email}!', { user })).toBe('Email: john@example.com!');
    expect(d('Theme: {user.profile.settings.theme}!', { user })).toBe('Theme: dark!');
  });

  test('should handle mixed direct and nested variables', () => {
    const user = {
      name: 'John',
      surname: 'Doe'
    };

    const result = d('Hello {name} {user.surname}!', { 
      name: 'Jane', 
      user 
    });
    expect(result).toBe('Hello Jane Doe!');
  });

  test('should handle complex nested objects', () => {
    const data = {
      user: {
        profile: {
          personal: {
            name: 'John',
            surname: 'Doe'
          },
          contact: {
            email: 'john@example.com',
            phone: '+1234567890'
          }
        }
      },
      order: {
        id: '12345',
        items: ['item1', 'item2']
      }
    };

    const template = `
      User: {user.profile.personal.name} {user.profile.personal.surname}
      Email: {user.profile.contact.email}
      Phone: {user.profile.contact.phone}
      Order: {order.id}
    `;

    const result = d(template, data);
    expect(result).toContain('User: John Doe');
    expect(result).toContain('Email: john@example.com');
    expect(result).toContain('Phone: +1234567890');
    expect(result).toContain('Order: 12345');
  });
});

describe('d.rich() function', () => {
  test('should process rich content with HTML functions using default format', () => {
    const result = d.rich('Click {guidelines} for more info', {
      guidelines: (chunks: string) => `<a href="/guidelines">${chunks}</a>`
    });
    expect(result).toBe('Click <a href="/guidelines">guidelines</a> for more info');
  });

  test('should process rich content with HTML functions using custom format', () => {
    // Square brackets format
    const result1 = d.rich('Click [guidelines] for more info', {
      guidelines: (chunks: string) => `<a href="/guidelines">${chunks}</a>`
    }, { variableFormat: { start: '[', end: ']' } });
    expect(result1).toBe('Click <a href="/guidelines">guidelines</a> for more info');

    // Double square brackets format
    const result2 = d.rich('Click [[guidelines]] for more info', {
      guidelines: (chunks: string) => `<a href="/guidelines">${chunks}</a>`
    }, { variableFormat: { start: '[[', end: ']]' } });
    expect(result2).toBe('Click <a href="/guidelines">guidelines</a> for more info');

    // Custom format
    const result3 = d.rich('Click <guidelines> for more info', {
      guidelines: (chunks: string) => `<a href="/guidelines">${chunks}</a>`
    }, { variableFormat: { start: '<', end: '>' } });
    expect(result3).toBe('Click guidelines for more info');
  });

  test('should handle rich content with variables', () => {
    const result = d.rich('Hello {name}, click {link} to continue', {
      name: 'John',
      link: (chunks: string) => `<a href="/continue">${chunks}</a>`
    });
    expect(result).toBe('Hello John, click <a href="/continue">link</a> to continue');
  });

  test('should handle rich content with nested objects', () => {
    const user = {
      name: 'Jane',
      email: 'jane@example.com'
    };

    const result = d.rich('Hello {user.name}, click {email_link} to verify', {
      user,
      email_link: (chunks: string) => `<a href="mailto:${user.email}">${chunks}</a>`
    });
    expect(result).toBe('Hello Jane, click <a href="mailto:jane@example.com">email_link</a> to verify');
  });

  test('should handle multiple rich functions', () => {
    const result = d.rich('{bold} and {italic} text', {
      bold: (chunks: string) => `<strong>${chunks}</strong>`,
      italic: (chunks: string) => `<em>${chunks}</em>`
    });
    expect(result).toBe('<strong>bold</strong> and <em>italic</em> text');
  });

  test('should handle mixed rich and regular variables', () => {
    const result = d.rich('Hello {name}, {action} now!', {
      name: 'User',
      action: (chunks: string) => `<button>${chunks}</button>`
    });
    expect(result).toBe('Hello User, <button>action</button> now!');
  });

  test('should handle empty rich functions', () => {
    const result = d.rich('{empty} content', {
      empty: (chunks: string) => ''
    });
    expect(result).toBe(' content');
  });

  test('should handle non-function values in rich options', () => {
    const result = d.rich('Hello {name} and {link}', {
      name: 'John',
      link: 'regular string' // This should be treated as regular variable
    });
    expect(result).toBe('Hello John and regular string');
  });
});
