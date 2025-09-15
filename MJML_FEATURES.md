# MJML Support - New Features

## Overview
Added comprehensive MJML (Mailjet Markup Language) support to the `dynamic-content-html` library, enabling dynamic email template processing with MJML markup.

## New Features Added

### 1. MJML Function (`d.mjml()`)
- **Purpose**: Process MJML content with dynamic data
- **Usage**: `d.mjml(template, options, config)`
- **Features**:
  - Processes MJML attributes (href, src, color, etc.)
  - Processes MJML text content
  - Supports nested object properties
  - Configurable variable formats
  - Optional processing controls

### 2. New Types
- **`MJMLOptions`**: Interface for MJML data options
- **`MJMLConfig`**: Configuration interface with MJML-specific options
  - `mjmlAttributes`: Enable/disable attribute processing
  - `mjmlTextContent`: Enable/disable text content processing

### 3. New Utility Functions
- **`processMJML()`**: Main MJML processing function
- **`processMJMLAttributes()`**: Handles MJML attribute processing
- **`processMJMLTextContent()`**: Handles MJML text content processing

### 4. Comprehensive Test Coverage
- 15 new unit tests covering:
  - Basic MJML text processing
  - MJML attribute processing
  - Custom variable formats
  - Nested object properties
  - Complex email templates
  - Error handling
  - Configuration options

### 5. Documentation Updates
- **README.md**: Added MJML section with examples
- **USAGE.md**: Added MJML usage examples
- **API Reference**: Updated with MJML function documentation
- **TypeScript Support**: Added MJML types to exports

### 6. Keywords & Searchability
Added MJML-related keywords to `package.json`:
- `mjml`
- `mjml-email`
- `email-template`
- `email-builder`

### 7. Example Implementation
Created complete MJML example in `/examples/mjml/`:
- **Real-world email template** with order confirmation
- **Sample data** with nested objects
- **HTML generation** using official mjml library
- **Preview functionality** for testing

## Usage Examples

### Basic MJML Processing
```javascript
import d from 'dynamic-content-html';

// Text content
d.mjml('<mj-text>Hello {name}!</mj-text>', { name: 'Jane' })
// "<mj-text>Hello Jane!</mj-text>"

// Attributes
d.mjml('<mj-button href="{url}">Click here</mj-button>', { url: 'https://example.com' })
// "<mj-button href="https://example.com">Click here</mj-button>"
```

### Complex Email Template
```javascript
const mjmlTemplate = `
  <mjml>
    <mj-head>
      <mj-title>{emailTitle}</mj-title>
    </mj-head>
    <mj-body>
      <mj-section>
        <mj-column>
          <mj-text color="{textColor}">Hello {user.name}!</mj-text>
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
  order: { trackingUrl: 'https://example.com/track/123' },
  buttonColor: '#007bff'
};

d.mjml(mjmlTemplate, data)
```

## Benefits

1. **Email Template Processing**: Perfect for dynamic email content
2. **MJML Integration**: Works seamlessly with MJML ecosystem
3. **Flexible Configuration**: Customizable processing options
4. **Type Safety**: Full TypeScript support
5. **Well Tested**: Comprehensive test coverage
6. **Easy Integration**: Drop-in functionality for existing projects

## Use Cases

- **E-commerce order confirmations**
- **Newsletter templates**
- **Transactional emails**
- **Marketing campaigns**
- **Email builder integrations**
- **Any MJML-based email system**

## Backward Compatibility

All existing functionality remains unchanged. MJML support is additive and doesn't affect existing `d()` and `d.rich()` functions.
