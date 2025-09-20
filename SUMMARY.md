# Dynamic Content Html Library - Summary

## 🎯 What is Dynamic Content Html?

Dynamic Content Html is a powerful and flexible JavaScript library for processing Dynamic Content Html content with template interpolation. It's designed to handle various use cases from simple variable replacement to complex nested object processing and rich content generation.

## ✨ Key Features

### 1. **Flexible Variable Processing**
- **Direct variables**: `{{firstName}}` → `{ firstName: 'John' }`
- **Nested properties**: `{{user.firstName}}` → `{ user: { firstName: 'John' } }`
- **Deep nesting**: `{{user.profile.settings.theme}}` → Complex nested objects
- **Mixed usage**: Combine direct and nested variables in the same template

### 2. **Rich Content Support**
- HTML function processing: `{{link}}` → `<a href="/info">link</a>`
- Rich content with variables: `{{name}}` + `{{action}}` functions
- Perfect for email templates and dynamic HTML generation

### 3. **Email Template Support**
- Built-in recipient object handling
- Auto-generated properties (full_name from first_name + last_name)
- Backward compatibility with existing email systems

### 4. **Universal Compatibility**
- **React**: Works seamlessly with JSX and React components
- **Vue**: Compatible with Vue 2.x and 3.x
- **Node.js**: Perfect for server-side email processing
- **Vanilla JS**: Works in any JavaScript environment

### 5. **TypeScript Support**
- Full TypeScript definitions
- IntelliSense support
- Type safety for all functions

## 🚀 Quick Start

```javascript
import d from 'dynamic-content-html';

// Basic usage
d('Hello {{name}}!', { name: 'Jane' }) // "Hello Jane!"

// Nested objects
d('Hello {{user.firstName}}!', { user: { firstName: 'John' } }) // "Hello John!"

// Rich content
d.rich('Click {{link}}', {
  link: (chunks) => `<a href="/info">${chunks}</a>`
}) // "Click <a href="/info">link</a>"
```

## 📁 Project Structure

```
dynamic-content-html/
├── src/
│   ├── core.ts          # Main d() and d.rich() functions
│   ├── utils.ts         # Utility functions for processing
│   ├── types.ts         # TypeScript type definitions
│   ├── index.ts         # Main export file
│   └── __tests__/       # Unit tests
├── examples/
│   ├── react/           # React example
│   ├── vue/             # Vue example
│   └── nodejs/          # Node.js example
├── dist/                # Built files
├── package.json         # NPM package configuration
├── README.md            # Main documentation
├── USAGE.md             # Detailed usage guide
└── publish.sh           # Publishing script
```

## 🧪 Testing

- **43 unit tests** covering all functionality
- **100% test coverage** for core functions
- Tests for edge cases, error handling, and complex scenarios
- Automated testing with Jest

## 📦 Build & Distribution

- **Rollup** for bundling
- **TypeScript** compilation
- **ESM** and **CommonJS** support
- **Source maps** for debugging
- **Tree shaking** friendly

## 🎨 Use Cases

### 1. **Email Templates**
```javascript
const emailTemplate = `
  Dear {{recipient.full_name}},
  
  Your order {{order.id}} has been shipped!
  
  Tracking: {{order.tracking_number}}
`;

d(emailTemplate, { recipient, order })
```

### 2. **Dynamic Content Generation**
```javascript
const content = d('Welcome {{user.firstName}}! You have {{notifications.count}} new messages.', {
  user: { firstName: 'John' },
  notifications: { count: 5 }
});
```

### 3. **Rich HTML Content**
```javascript
const richContent = d.rich('Click {{button}} to continue', {
  button: (chunks) => `<button class="btn-primary">${chunks}</button>`
});
```

### 4. **Internationalization**
```javascript
const messages = {
  welcome: 'Hello {{name}}!',
  goodbye: 'Goodbye {{name}}!'
};

d(messages.welcome, { name: 'John' })
```

## 🔧 API Reference

### `d(template, options)`
- **template**: String with `{{variable}}` placeholders
- **options**: Object with variable values
- **returns**: Processed string

### `d.rich(template, options)`
- **template**: String with `{{variable}}` placeholders
- **options**: Object with variables and rich content functions
- **returns**: Processed string with rich content applied

## 🌟 Why Choose Dynamic Content Html?

1. **Flexibility**: Handles any object structure, not just predefined schemas
2. **Performance**: Lightweight and fast processing
3. **Compatibility**: Works with all major frameworks and environments
4. **Type Safety**: Full TypeScript support
5. **Rich Content**: Built-in support for HTML functions
6. **Well Tested**: Comprehensive test coverage
7. **Easy to Use**: Simple API similar to i18n libraries
8. **Zero Dependencies**: No external dependencies required

## 📈 Performance

- **Small bundle size**: ~2KB minified
- **Fast processing**: Optimized regex and string operations
- **Memory efficient**: No unnecessary object creation
- **Tree shaking**: Only import what you need

## 🛠️ Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Build library
npm run build

# Development mode
npm run dev
```

## 📝 License

MIT License - Free to use in commercial and personal projects.

---

**Dynamic Content Html** - Making Dynamic Content Html processing simple, flexible, and powerful! 🚀
