import { d, rich, mjml } from '../core';

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

describe('d.mjml() function', () => {
  test('should process MJML text content with default format', () => {
    const result = mjml('<mj-text>Hello {name}!</mj-text>', { name: 'Jane' });
    expect(result).toBe('<mj-text>Hello Jane!</mj-text>');
  });

  test('should process MJML text content with custom format', () => {
    const result = mjml('<mj-text>Hello {{name}}!</mj-text>', 
      { name: 'Jane' }, 
      { variableFormat: { start: '{{', end: '}}' } }
    );
    expect(result).toBe('<mj-text>Hello Jane!</mj-text>');
  });

  test('should process MJML attributes with default format', () => {
    const result = mjml('<mj-button href="{url}">Click here</mj-button>', { url: 'https://example.com' });
    expect(result).toBe('<mj-button href="https://example.com">Click here</mj-button>');
  });

  test('should process MJML attributes with custom format', () => {
    const result = mjml('<mj-button href="[url]">Click here</mj-button>', 
      { url: 'https://example.com' }, 
      { variableFormat: { start: '[', end: ']' } }
    );
    expect(result).toBe('<mj-button href="https://example.com">Click here</mj-button>');
  });

  test('should process complex MJML with multiple variables', () => {
    const template = `
      <mj-section>
        <mj-column>
          <mj-text>Hello {user.name}!</mj-text>
          <mj-button href="{user.profile.website}">Visit {user.profile.website}</mj-button>
        </mj-column>
      </mj-section>
    `;
    
    const data = {
      user: {
        name: 'John Doe',
        profile: {
          website: 'https://johndoe.com'
        }
      }
    };
    
    const result = mjml(template, data);
    expect(result).toContain('Hello John Doe!');
    expect(result).toContain('href="https://johndoe.com"');
    expect(result).toContain('Visit https://johndoe.com');
  });

  test('should process MJML with nested object properties', () => {
    const template = '<mj-text>Welcome {user.profile.name} from {user.profile.location.city}!</mj-text>';
    const data = {
      user: {
        profile: {
          name: 'Alice',
          location: {
            city: 'New York'
          }
        }
      }
    };
    
    const result = mjml(template, data);
    expect(result).toBe('<mj-text>Welcome Alice from New York!</mj-text>');
  });

  test('should process MJML with multiple attributes', () => {
    const template = '<mj-image src="{imageUrl}" alt="{imageAlt}" width="{width}px" />';
    const data = {
      imageUrl: 'https://example.com/image.jpg',
      imageAlt: 'Example Image',
      width: 300
    };
    
    const result = mjml(template, data);
    expect(result).toBe('<mj-image src="https://example.com/image.jpg" alt="Example Image" width="300px" />');
  });

  test('should handle MJML with mixed content and attributes', () => {
    const template = '<mj-text color="{textColor}">Hello {name}, you have {count} messages!</mj-text>';
    const data = {
      textColor: '#ff0000',
      name: 'Bob',
      count: 5
    };
    
    const result = mjml(template, data);
    expect(result).toBe('<mj-text color="#ff0000">Hello Bob, you have 5 messages!</mj-text>');
  });

  test('should handle empty or undefined values in MJML', () => {
    const result = mjml('<mj-text>Hello {name}!</mj-text>', { name: '' });
    expect(result).toBe('<mj-text>Hello !</mj-text>');
    
    const result2 = mjml('<mj-text>Hello {name}!</mj-text>', {});
    expect(result2).toBe('<mj-text>Hello !</mj-text>');
  });

  test('should handle MJML without variables', () => {
    const template = '<mj-text>Static content</mj-text>';
    const result = mjml(template, { name: 'Jane' });
    expect(result).toBe('<mj-text>Static content</mj-text>');
  });

  test('should handle empty MJML template', () => {
    expect(mjml('', { name: 'Jane' })).toBe('');
    expect(mjml(null as any, { name: 'Jane' })).toBe('');
  });

  test('should process MJML with custom variable format', () => {
    const template = '<mj-text>Hello [[name]]!</mj-text>';
    const result = mjml(template, 
      { name: 'Jane' }, 
      { variableFormat: { start: '[[', end: ']]' } }
    );
    expect(result).toBe('<mj-text>Hello Jane!</mj-text>');
  });

  test('should process MJML with disabled attributes processing', () => {
    const template = '<mj-button href="{url}">Click here</mj-button>';
    const result = mjml(template, 
      { url: 'https://example.com' }, 
      { mjmlAttributes: false }
    );
    expect(result).toBe('<mj-button href="{url}">Click here</mj-button>');
  });

  test('should process MJML with disabled text content processing', () => {
    const template = '<mj-text>Hello {name}!</mj-text>';
    const result = mjml(template, 
      { name: 'Jane' }, 
      { mjmlTextContent: false }
    );
    expect(result).toBe('<mj-text>Hello {name}!</mj-text>');
  });

  test('should process complex MJML email template', () => {
    const template = `
      <mjml>
        <mj-head>
          <mj-title>{emailTitle}</mj-title>
        </mj-head>
        <mj-body>
          <mj-section>
            <mj-column>
              <mj-text font-size="16px" color="{textColor}">
                Hello {user.name}!
              </mj-text>
              <mj-text>
                Welcome to {company.name}. Your order #{order.id} has been confirmed.
              </mj-text>
              <mj-button href="{order.trackingUrl}" background-color="{buttonColor}">
                Track Your Order
              </mj-button>
            </mj-column>
          </mj-section>
        </mj-body>
      </mjml>
    `;
    
    const data = {
      emailTitle: 'Order Confirmation',
      textColor: '#333333',
      user: {
        name: 'John Smith'
      },
      company: {
        name: 'MyStore'
      },
      order: {
        id: '12345',
        trackingUrl: 'https://mystore.com/track/12345'
      },
      buttonColor: '#007bff'
    };
    
    const result = mjml(template, data);
    expect(result).toContain('Order Confirmation');
    expect(result).toContain('Hello John Smith!');
    expect(result).toContain('Welcome to MyStore');
    expect(result).toContain('Your order #12345 has been confirmed');
    expect(result).toContain('href="https://mystore.com/track/12345"');
    expect(result).toContain('background-color="#007bff"');
  });
});
