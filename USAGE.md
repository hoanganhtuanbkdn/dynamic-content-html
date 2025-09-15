# Dynamic Text - Usage Guide

## Quick Examples

### 1. Basic Variable Replacement

```javascript
import d from 'dynamic-content-html';

// Direct variables
d('Hello {{name}}!', { name: 'Jane' }) // "Hello Jane!"

// Multiple variables
d('Welcome {{firstName}} {{lastName}}!', { 
  firstName: 'John', 
  lastName: 'Doe' 
}) // "Welcome John Doe!"
```

### 2. Nested Object Properties

```javascript
// Object with nested properties
const user = {
  firstName: 'John',
  lastName: 'Doe',
  profile: {
    email: 'john@example.com',
    settings: {
      theme: 'dark'
    }
  }
};

// Access nested properties
d('Hello {{user.firstName}}!', { user }) // "Hello John!"
d('Email: {{user.profile.email}}', { user }) // "Email: john@example.com"
d('Theme: {{user.profile.settings.theme}}', { user }) // "Theme: dark"
```

### 3. Mixed Variables (Direct + Nested)

```javascript
const data = {
  firstName: 'Jane',        // Direct variable
  user: {                   // Nested object
    lastName: 'Smith',
    email: 'jane@example.com'
  }
};

d('Hello {{firstName}} {{user.lastName}}!', data) 
// "Hello Jane Smith!"

d('Email: {{user.email}}', data) 
// "Email: jane@example.com"
```

### 4. Rich Content with HTML Functions

```javascript
// Rich content processing
d.rich('Click {{link}} for more info', {
  link: (chunks) => `<a href="/info">${chunks}</a>`
}) // "Click <a href="/info">link</a> for more info"

// Rich content with variables
d.rich('Hello {{name}}, click {{action}}', {
  name: 'John',
  action: (chunks) => `<button>${chunks}</button>`
}) // "Hello John, click <button>action</button>"
```

### 5. MJML Email Templates

```javascript
// Basic MJML text processing
d.mjml('<mj-text>Hello {name}!</mj-text>', { name: 'Jane' })
// "<mj-text>Hello Jane!</mj-text>"

// MJML with attributes
d.mjml('<mj-button href="{url}">Click here</mj-button>', { url: 'https://example.com' })
// "<mj-button href="https://example.com">Click here</mj-button>"

// Complex MJML email template
const mjmlTemplate = `
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

const emailData = {
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

d.mjml(mjmlTemplate, emailData)
// Complete MJML with all variables replaced

// MJML with custom variable format
d.mjml('<mj-text>Hello [[name]]!</mj-text>', 
  { name: 'Jane' }, 
  { variableFormat: { start: '[[', end: ']]' } }
)
// "<mj-text>Hello Jane!</mj-text>"

// MJML with nested object properties
const userData = {
  user: {
    profile: {
      name: 'Alice',
      location: { city: 'New York' }
    }
  }
};

d.mjml(
  '<mj-text>Welcome {user.profile.name} from {user.profile.location.city}!</mj-text>', 
  userData
)
// "<mj-text>Welcome Alice from New York!</mj-text>"
```

### 6. Legacy Email Templates

```javascript
// Using recipient object (backward compatibility)
const recipient = {
  first_name: 'John',
  last_name: 'Doe',
  email: 'john@example.com',
  phone_number: '+1234567890',
  street: '123 Main St',
  city: 'New York',
  state: 'NY',
  zip_code: '10001'
};

const emailTemplate = `
  Dear {{recipient.full_name}},
  
  Thank you for your order! We'll send updates to {{recipient.email}}.
  
  Shipping Address:
  {{recipient.street}}
  {{recipient.city}}, {{recipient.state}} {{recipient.zip_code}}
`;

d(emailTemplate, { recipient })
```

### 7. Complex Nested Structures

```javascript
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

const template = `
  Customer: {{customer.personal.firstName}} {{customer.personal.lastName}}
  Email: {{customer.contact.email}}
  Phone: {{customer.contact.phone}}
  Order ID: {{order.id}}
  Total: ${{order.total}}
`;

d(template, orderData)
```

## Framework Integration

### React

```jsx
import React from 'react';
import d from 'dynamic-content-html';

const WelcomeEmail = ({ user, message }) => {
  const emailContent = d(`
    <div>
      <h1>Welcome {{user.firstName}}!</h1>
      <p>{{message}}</p>
    </div>
  `, { user, message });

  return <div dangerouslySetInnerHTML={{ __html: emailContent }} />;
};
```

### Vue

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
          <h1>Welcome {{user.firstName}}!</h1>
          <p>{{message}}</p>
        </div>
      `, { user: this.user, message: this.message });
    }
  }
}
</script>
```

### Node.js

```javascript
const d = require('dynamic-content-html');

// Server-side email processing
function sendWelcomeEmail(user) {
  const emailTemplate = `
    Dear {{user.firstName}},
    
    Welcome to our platform! Your account has been created successfully.
    
    Email: {{user.email}}
    Phone: {{user.phone}}
  `;

  const personalizedEmail = d(emailTemplate, { user });
  
  // Send email...
  console.log(personalizedEmail);
}
```

## API Reference

### `d(template, options)`

Processes a template string with variable interpolation.

**Parameters:**
- `template` (string): Template string with `{{variable}}` placeholders
- `options` (object): Object containing variable values

**Returns:** Processed string with variables replaced

**Examples:**
```javascript
d('Hello {{name}}!', { name: 'World' }) // "Hello World!"
d('Email: {{user.email}}', { user: { email: 'test@example.com' } }) // "Email: test@example.com"
```

### `d.rich(template, options)`

Processes a template string with variable interpolation and rich content functions.

**Parameters:**
- `template` (string): Template string with `{{variable}}` placeholders
- `options` (object): Object containing variable values and rich content functions

**Returns:** Processed string with variables replaced and rich content applied

**Examples:**
```javascript
d.rich('Click {{link}}', {
  link: (chunks) => `<a href="/test">${chunks}</a>`
}) // "Click <a href="/test">link</a>"
```

## Variable Patterns

### Supported Patterns

1. **Direct variables**: `{{firstName}}` → `{ firstName: 'John' }`
2. **Nested properties**: `{{user.firstName}}` → `{ user: { firstName: 'John' } }`
3. **Deep nesting**: `{{user.profile.settings.theme}}` → `{ user: { profile: { settings: { theme: 'dark' } } } }`
4. **Mixed usage**: `{{firstName}} {{user.lastName}}` → `{ firstName: 'Jane', user: { lastName: 'Doe' } }`

### Special Cases

- **Recipient object**: `{{recipient.first_name}}` (backward compatibility)
- **Auto-generated properties**: `{{recipient.full_name}}` (auto-generated from first_name + last_name)
- **Missing variables**: Replaced with empty string
- **Undefined/null values**: Replaced with empty string

## Error Handling

The library handles errors gracefully:

- Missing variables are replaced with empty strings
- Undefined/null values are replaced with empty strings
- Invalid templates return empty strings
- Non-string templates return empty strings

```javascript
d('Hello {{missing}}!', {}) // "Hello !"
d('Hello {{name}}!', { name: null }) // "Hello !"
d(null, { name: 'John' }) // ""
```
