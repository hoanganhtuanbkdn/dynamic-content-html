# MJML Example

This example demonstrates how to use the `dynamic-content-html` library with MJML (Mailjet Markup Language) to create dynamic email templates.

## Features Demonstrated

- **MJML Processing**: Process MJML templates with dynamic variables
- **Attribute Processing**: Replace variables in MJML attributes (href, src, etc.)
- **Text Content Processing**: Replace variables in MJML text content
- **Nested Object Support**: Use complex data structures in templates
- **HTML Generation**: Convert processed MJML to HTML using the mjml library

## Setup

1. Install dependencies:
```bash
npm install
```

2. Run the example:
```bash
npm start
```

## What This Example Does

1. **Creates a sample email template** with MJML markup containing dynamic variables
2. **Processes the template** using `d.mjml()` with sample order data
3. **Converts MJML to HTML** using the official mjml library
4. **Saves the result** as an HTML file for preview

## Sample Data

The example uses realistic e-commerce order confirmation data:

```javascript
const emailData = {
  recipient: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com'
  },
  company: {
    name: 'MyStore',
    website: 'https://mystore.com',
    supportEmail: 'support@mystore.com'
  },
  order: {
    id: 'ORD-12345',
    date: '2024-01-15',
    total: '$99.99',
    trackingUrl: 'https://mystore.com/track/ORD-12345'
  }
};
```

## MJML Template Features

- **Dynamic recipient name**: `{recipient.firstName}`
- **Dynamic order details**: `{order.id}`, `{order.total}`
- **Dynamic links**: `href="{order.trackingUrl}"`
- **Dynamic company info**: `{company.name}`, `{company.supportEmail}`
- **Professional email layout** with MJML components

## Output

The example generates:
- Processed MJML with all variables replaced
- HTML email ready for sending
- Preview file (`email-preview.html`) for testing

## Use Cases

This pattern is perfect for:
- **E-commerce order confirmations**
- **Newsletter templates**
- **Transactional emails**
- **Marketing campaigns**
- **Any email that needs dynamic content**

## Integration with Email Services

The generated HTML can be used with any email service:
- **SendGrid**
- **Mailgun**
- **Amazon SES**
- **Postmark**
- **Any SMTP service**
