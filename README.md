# Dynamic Text

A powerful and lightweight utility library for dynamic text processing with template interpolation and rich content support. Designed specifically for **translation libraries**, **i18n frameworks**, and **dynamic email systems**. Perfect for email editors like **Unlayer**, **GrapesJS**, **Canva**, and any scenario where you need flexible text processing.

## 🎯 Purpose & Use Cases

### For Translation Libraries & i18n
- **Template interpolation** for any i18n library (react-i18next, vue-i18n, etc.)
- **Custom variable formats** to match your existing translation system
- **Rich content processing** for complex multilingual content
- **Nested object support** for complex translation data structures

### For Dynamic Email Systems
- **Email template processing** with recipient data
- **Rich HTML content** generation for email campaigns
- **Integration with email editors** (Unlayer, GrapesJS, Canva)
- **Flexible variable formats** for different email platforms

### For Email Editors & Builders
- **Unlayer integration** - Process dynamic content in email templates
- **GrapesJS support** - Handle dynamic text in visual email builders
- **Canva compatibility** - Process dynamic content in design tools
- **Custom format support** - Match any email platform's variable syntax

## ✨ Key Features

- 🚀 **Simple API** - Similar to i18n libraries with `d()` and `d.rich()` functions
- 🔧 **Configurable Format** - Support `{var}`, `{{var}}`, `[var]`, `[[var]]`, or any custom format
- 📧 **Email Template Support** - Perfect for dynamic email content processing
- 🎨 **Rich Content** - Support for HTML functions and complex content processing
- 🌐 **Universal** - Works with React, Vue, Node.js, and vanilla JavaScript
- 📦 **Lightweight** - Small bundle size with no external dependencies
- ✅ **Well Tested** - Comprehensive test coverage
- 🔌 **Easy Integration** - Drop-in replacement for existing text processing

## Installation

```bash
npm install dynamic-content-html
```

```bash
yarn add dynamic-content-html
```

```bash
pnpm add dynamic-content-html
```

## Quick Start

### Basic Usage (Default Format: `{variable}`)

```javascript
import d from 'dynamic-content-html';

// Simple variable replacement
const message = d('Hello {name}!', { name: 'Jane' });
console.log(message); // "Hello Jane!"

// Multiple variables
const welcome = d('Welcome {name}, you have {count} messages', {
  name: 'John',
  count: 5
});
console.log(welcome); // "Welcome John, you have 5 messages"

// Direct variables (no object wrapper needed)
const greeting = d('Hello {firstName}!', { firstName: 'Jane' });
console.log(greeting); // "Hello Jane!"

// Nested object properties
const user = { firstName: 'John', lastName: 'Doe' };
const fullName = d('Hello {user.firstName} {user.lastName}!', { user });
console.log(fullName); // "Hello John Doe!"

// Deep nested properties
const data = {
  user: {
    profile: {
      personal: { firstName: 'John', lastName: 'Doe' },
      contact: { email: 'john@example.com' }
    }
  }
};
const deepTemplate = d('User: {user.profile.personal.firstName}, Email: {user.profile.contact.email}', data);
console.log(deepTemplate); // "User: John, Email: john@example.com"
```

### Custom Variable Formats

```javascript
// Double curly braces (like Handlebars/Mustache)
const message1 = d('Hello {{name}}!', { name: 'Jane' }, { 
  variableFormat: { start: '{{', end: '}}' } 
});

// Square brackets (like some email platforms)
const message2 = d('Hello [name]!', { name: 'Jane' }, { 
  variableFormat: { start: '[', end: ']' } 
});

// Double square brackets (like some CMS systems)
const message3 = d('Hello [[name]]!', { name: 'Jane' }, { 
  variableFormat: { start: '[[', end: ']]' } 
});

// Custom format (like HTML-like tags)
const message4 = d('Hello <name>!', { name: 'Jane' }, { 
  variableFormat: { start: '<', end: '>' } 
});
```

### Email Template Support

```javascript
import d from 'dynamic-content-html';

const recipient = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  phoneNumber: '+1234567890',
  address: {
    street: '123 Main St',
    city: 'New York',
    state: 'NY',
    zipCode: '10001'
  }
};

// Process email template with recipient data
const emailTemplate = `
  Dear {recipient.firstName} {recipient.lastName},
  
  Thank you for your order! We'll send updates to {recipient.email}.
  
  Shipping Address:
  {recipient.address.street}
  {recipient.address.city}, {recipient.address.state} {recipient.address.zipCode}
  
  Best regards,
  The Team
`;

const personalizedEmail = d(emailTemplate, { recipient });
console.log(personalizedEmail);
```

### Rich Content Support

```javascript
import d from 'dynamic-content-html';

// Rich content with HTML functions (default format)
const richMessage = d.rich('Click {guidelines} for more information', {
  guidelines: (chunks) => `<a href="/guidelines">${chunks}</a>`
});
console.log(richMessage); // "Click <a href="/guidelines">guidelines</a> for more information"

// Rich content with variables
const welcomeEmail = d.rich(`
  Hello {user.firstName},
  
  Please click {verifyLink} to verify your email address.
  
  If you have any questions, contact us at {supportLink}.
`, {
  user: { firstName: 'Jane' },
  verifyLink: (chunks) => `<a href="/verify?token=abc123">${chunks}</a>`,
  supportLink: (chunks) => `<a href="mailto:support@example.com">${chunks}</a>`
});

// Rich content with custom format (for email platforms)
const emailTemplate = d.rich('Click [[button]] to continue', {
  button: (chunks) => `<button style="background: #007bff; color: white; padding: 10px;">${chunks}</button>`
}, { variableFormat: { start: '[[', end: ']]' } });
```

### MJML Support

```javascript
import d from 'dynamic-content-html';

// Basic MJML text content processing
const mjmlText = d.mjml('<mj-text>Hello {name}!</mj-text>', { name: 'Jane' });
console.log(mjmlText); // "<mj-text>Hello Jane!</mj-text>"

// MJML with attributes
const mjmlButton = d.mjml('<mj-button href="{url}">Click here</mj-button>', { 
  url: 'https://example.com' 
});
console.log(mjmlButton); // "<mj-button href="https://example.com">Click here</mj-button>"

// Complex MJML email template
const emailTemplate = `
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
  user: { name: 'John Smith' },
  company: { name: 'MyStore' },
  order: { 
    id: '12345', 
    trackingUrl: 'https://mystore.com/track/12345' 
  },
  buttonColor: '#007bff'
};

const processedEmail = d.mjml(emailTemplate, data);
console.log(processedEmail);
// Output: Complete MJML with all variables replaced

// MJML with custom variable format
const customMjml = d.mjml('<mj-text>Hello [[name]]!</mj-text>', 
  { name: 'Jane' }, 
  { variableFormat: { start: '[[', end: ']]' } }
);
console.log(customMjml); // "<mj-text>Hello Jane!</mj-text>"

// MJML with nested object properties
const userData = {
  user: {
    profile: {
      name: 'Alice',
      location: { city: 'New York' }
    }
  }
};

const nestedMjml = d.mjml(
  '<mj-text>Welcome {user.profile.name} from {user.profile.location.city}!</mj-text>', 
  userData
);
console.log(nestedMjml); // "<mj-text>Welcome Alice from New York!</mj-text>"
```

## API Reference

### `d(template, options)`

Processes a template string with variable interpolation.

**Parameters:**
- `template` (string): Template string with `{{variable}}` placeholders
- `options` (DynamicTextOptions): Object containing variable values

**Returns:** Processed string with variables replaced

**Example:**
```javascript
d('Hello {{name}}!', { name: 'World' }) // "Hello World!"
```

### `d.rich(template, options)`

Processes a template string with variable interpolation and rich content functions.

**Parameters:**
- `template` (string): Template string with `{{variable}}` placeholders
- `options` (RichTextOptions): Object containing variable values and rich content functions

**Returns:** Processed string with variables replaced and rich content applied

**Example:**
```javascript
d.rich('Click {{link}}', {
  link: (chunks) => `<a href="/test">${chunks}</a>`
}) // "Click <a href="/test">link</a>"
```

### `d.mjml(template, options, config)`

Processes MJML content with dynamic data, handling both MJML attributes and text content.

**Parameters:**
- `template` (string): MJML template string with variable placeholders
- `options` (MJMLOptions): Object containing variable values
- `config` (MJMLConfig, optional): Configuration for variable format and MJML processing

**Returns:** Processed MJML string with variables replaced

**Example:**
```javascript
d.mjml('<mj-text>Hello {name}!</mj-text>', { name: 'Jane' })
// "<mj-text>Hello Jane!</mj-text>"

d.mjml('<mj-button href="{url}">Click here</mj-button>', { url: 'https://example.com' })
// "<mj-button href="https://example.com">Click here</mj-button>"
```

## Types

### Recipient Object

The library provides built-in support for recipient objects with the following properties:

```typescript
interface Recipient {
  first_name?: string;
  last_name?: string;
  full_name?: string;    // Auto-generated if not provided
  email?: string;
  phone_number?: string;
  street?: string;
  city?: string;
  state?: string;
  zip_code?: string;
}
```

### TypeScript Support

```typescript
import d, { Recipient, DynamicTextOptions, RichTextOptions, MJMLOptions, MJMLConfig } from 'dynamic-content-html';

const recipient: Recipient = {
  first_name: 'John',
  last_name: 'Doe'
};

const options: DynamicTextOptions = {
  recipient,
  message: 'Welcome!'
};

const result = d('Hello {{recipient.full_name}}, {{message}}', options);
```

## Integration Examples

### For i18n Libraries

#### React i18next Integration
```jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import d from 'dynamic-content-html';

const WelcomeComponent = ({ user }) => {
  const { t } = useTranslation();
  
  // Use dynamic-content-html for complex translations
  const welcomeMessage = d(t('welcome.message'), { 
    user: { 
      firstName: user.firstName,
      lastName: user.lastName 
    } 
  });
  
  return <div>{welcomeMessage}</div>;
};

// Translation files (en.json)
{
  "welcome": {
    "message": "Hello {user.firstName} {user.lastName}! Welcome to our platform."
  }
}
```

#### Vue i18n Integration
```vue
<template>
  <div v-html="welcomeMessage"></div>
</template>

<script>
import { useI18n } from 'vue-i18n';
import d from 'dynamic-content-html';

export default {
  setup() {
    const { t } = useI18n();
    
    const welcomeMessage = d(t('welcome.message'), {
      user: { firstName: 'John', lastName: 'Doe' }
    });
    
    return { welcomeMessage };
  }
}
</script>
```

### For Email Editors

#### Unlayer Integration
```javascript
import d from 'dynamic-content-html';

// Process Unlayer email template
function processUnlayerTemplate(template, recipientData) {
  // Unlayer uses {{variable}} format
  return d(template, recipientData, {
    variableFormat: { start: '{{', end: '}}' }
  });
}

// Example usage
const unlayerTemplate = `
  <div style="font-family: Arial;">
    <h1>Hello {{recipient.firstName}}!</h1>
    <p>Your order {{order.id}} is ready.</p>
    <a href="{{order.trackingUrl}}">Track Order</a>
  </div>
`;

const processed = processUnlayerTemplate(unlayerTemplate, {
  recipient: { firstName: 'John' },
  order: { id: '12345', trackingUrl: '/track/12345' }
});
```

#### GrapesJS Integration
```javascript
import d from 'dynamic-content-html';

// Process GrapesJS email template
function processGrapesJSTemplate(template, data) {
  // GrapesJS might use [variable] format
  return d(template, data, {
    variableFormat: { start: '[', end: ']' }
  });
}

// Example usage
const grapesTemplate = `
  <div>
    <h1>Welcome [user.name]!</h1>
    <p>You have [notifications.count] new messages.</p>
  </div>
`;

const processed = processGrapesJSTemplate(grapesTemplate, {
  user: { name: 'Jane' },
  notifications: { count: 5 }
});
```

#### Canva Integration
```javascript
import d from 'dynamic-content-html';

// Process Canva design template
function processCanvaTemplate(template, data) {
  // Canva might use [[variable]] format
  return d(template, data, {
    variableFormat: { start: '[[', end: ']]' }
  });
}

// Example usage
const canvaTemplate = `
  <div style="text-align: center;">
    <h1>[[company.name]]</h1>
    <p>Welcome [[user.firstName]]!</p>
    <p>Visit us at [[company.website]]</p>
  </div>
`;

const processed = processCanvaTemplate(canvaTemplate, {
  company: { name: 'My Company', website: 'https://mycompany.com' },
  user: { firstName: 'John' }
});
```

### Framework Integration

#### React
```jsx
import React from 'react';
import d from 'dynamic-content-html';

const WelcomeEmail = ({ user, message }) => {
  const emailContent = d(`
    <div>
      <h1>Welcome {user.firstName}!</h1>
      <p>{message}</p>
    </div>
  `, { user, message });

  return <div dangerouslySetInnerHTML={{ __html: emailContent }} />;
};
```

#### Vue
```vue
<template>
  <div v-html="emailContent"></div>
</template>

<script>
import d from 'dynamic-content-html';

export default {
  props: ['user', 'message'],
  computed: {
    emailContent() {
      return d(`
        <div>
          <h1>Welcome {user.firstName}!</h1>
          <p>{message}</p>
        </div>
      `, { user: this.user, message: this.message });
    }
  }
}
</script>
```

#### Node.js
```javascript
const d = require('dynamic-content-html');

// Server-side email processing
function sendWelcomeEmail(user) {
  const emailTemplate = `
    Dear {user.firstName} {user.lastName},
    
    Welcome to our platform! Your account has been created successfully.
    
    Email: {user.email}
    Phone: {user.phoneNumber}
  `;

  const personalizedEmail = d(emailTemplate, { user });
  
  // Send email...
  console.log(personalizedEmail);
}
```

## Advanced Usage

### Flexible Object Processing

```javascript
// Direct variables (flat structure)
const message1 = d('Hello {{firstName}}!', { firstName: 'Jane' });
console.log(message1); // "Hello Jane!"

// Nested object properties
const user = {
  profile: {
    name: 'John Doe',
    preferences: {
      theme: 'dark'
    }
  }
};

const message2 = d('Hello {{user.profile.name}}, your theme is {{user.profile.preferences.theme}}', { user });
console.log(message2); // "Hello John Doe, your theme is dark"

// Mixed approach - both direct and nested
const data = {
  firstName: 'Jane',  // Direct variable
  user: {             // Nested object
    profile: {
      email: 'jane@example.com'
    }
  }
};

const mixedMessage = d('Hello {{firstName}}, your email is {{user.profile.email}}', data);
console.log(mixedMessage); // "Hello Jane, your email is jane@example.com"

// Complex nested structures
const orderData = {
  customer: {
    personal: {
      firstName: 'John',
      lastName: 'Doe'
    },
    contact: {
      email: 'john@example.com',
      phone: '+1234567890'
    }
  },
  order: {
    id: '12345',
    items: ['item1', 'item2'],
    total: 99.99
  }
};

const orderTemplate = `
  Customer: {{customer.personal.firstName}} {{customer.personal.lastName}}
  Email: {{customer.contact.email}}
  Phone: {{customer.contact.phone}}
  Order ID: {{order.id}}
  Total: ${{order.total}}
`;

const orderMessage = d(orderTemplate, orderData);
console.log(orderMessage);
```

### Rich Content with Multiple Functions

```javascript
const emailTemplate = `
  <div>
    <h1>{{title}}</h1>
    <p>{{content}}</p>
    <div>
      {{action_button}}
    </div>
    <footer>
      {{footer_link}}
    </footer>
  </div>
`;

const richEmail = d.rich(emailTemplate, {
  title: 'Welcome!',
  content: 'Thank you for joining us.',
  action_button: (chunks) => `<button class="btn-primary">${chunks}</button>`,
  footer_link: (chunks) => `<a href="/unsubscribe">${chunks}</a>`
});
```

### Error Handling

```javascript
// Handle missing variables gracefully
const template = 'Hello {{name}}, you have {{count}} messages';
const result = d(template, { name: 'John' }); // count is missing
console.log(result); // "Hello John, you have  messages"

// Handle null/undefined values
const result2 = d('Hello {{name}}!', { name: null });
console.log(result2); // "Hello !"
```

## Development

### Building

```bash
npm run build
```

### Testing

```bash
npm test
```

```bash
npm run test:watch
```

```bash
npm run test:coverage
```

### Development Mode

```bash
npm run dev
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Changelog

### 1.0.0
- Initial release
- Basic template interpolation
- Recipient object support
- Rich content processing
- TypeScript support
- Comprehensive test coverage

## Why Choose Dynamic Text?

### 🎯 **Perfect for Translation Libraries**
- **Drop-in replacement** for existing i18n interpolation
- **Custom format support** to match any translation system
- **Rich content processing** for complex multilingual content
- **Nested object support** for complex translation data

### 📧 **Ideal for Email Systems**
- **Email template processing** with flexible variable formats
- **Rich HTML content** generation for email campaigns
- **Integration ready** for Unlayer, GrapesJS, Canva
- **Recipient data processing** for personalized emails

### 🔧 **Developer Friendly**
- **Simple API** similar to existing i18n libraries
- **TypeScript support** with full type definitions
- **Lightweight** - no external dependencies
- **Well tested** with comprehensive coverage

## Real-World Use Cases

### Email Marketing Platforms
```javascript
// Process email templates from various sources
const unlayerTemplate = processUnlayerTemplate(template, recipientData);
const grapesTemplate = processGrapesJSTemplate(template, recipientData);
const canvaTemplate = processCanvaTemplate(template, recipientData);
```

### Multi-language Applications
```javascript
// Handle complex translations with nested data
const message = d(t('welcome.complex'), {
  user: { profile: { name: 'John' } },
  order: { items: [{ name: 'Product 1' }] }
});
```

### Email Campaign Systems
```javascript
// Process dynamic email content
const emailContent = d.rich(template, {
  recipient: userData,
  actionButton: (text) => `<button>${text}</button>`,
  unsubscribeLink: (text) => `<a href="/unsubscribe">${text}</a>`
});
```

## Support & Contact

If you have any questions, need help, or want to discuss integration:

- 📧 **Email**: code4change.co@gmail.com
- 📚 **Documentation**: Check the [API Reference](#api-reference)
- 🐛 **Issues**: [GitHub Issues](https://github.com/yourusername/dynamic-content-html/issues)
- 💡 **Feature Requests**: [GitHub Discussions](https://github.com/yourusername/dynamic-content-html/discussions)

## Contributing

We welcome contributions! Whether you're:
- Adding support for new email platforms
- Improving i18n library integrations
- Enhancing performance
- Adding new features

Please see our [Contributing Guide](CONTRIBUTING.md) for details.

---

**Dynamic Text** - The ultimate utility for translation libraries and dynamic email systems! 🚀

Made with ❤️ for developers who need flexible text processing
# dynamic-content-html
