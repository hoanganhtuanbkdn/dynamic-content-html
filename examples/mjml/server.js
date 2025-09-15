import d from 'dynamic-content-html';
import mjml from 'mjml';

// Sample data for email template
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
  },
  products: [
    { name: 'Wireless Headphones', price: '$79.99', quantity: 1 },
    { name: 'Phone Case', price: '$19.99', quantity: 1 }
  ]
};

// MJML template with dynamic variables
const mjmlTemplate = `
<mjml>
  <mj-head>
    <mj-title>{company.name} - Order Confirmation</mj-title>
    <mj-attributes>
      <mj-all font-family="Arial, sans-serif"></mj-all>
      <mj-text font-size="16px" color="#333333" line-height="1.6"></mj-text>
    </mj-attributes>
  </mj-head>
  <mj-body background-color="#f4f4f4">
    <mj-section background-color="#ffffff" padding="20px">
      <mj-column>
        <mj-text font-size="24px" font-weight="bold" color="#2c3e50" align="center">
          Thank you for your order, {recipient.firstName}!
        </mj-text>
        
        <mj-text>
          Your order #{order.id} has been confirmed and will be processed shortly.
        </mj-text>
        
        <mj-text font-weight="bold">
          Order Details:
        </mj-text>
        
        <mj-table>
          <tr style="border-bottom:1px solid #e0e0e0;">
            <td style="padding:10px; font-weight:bold;">Product</td>
            <td style="padding:10px; font-weight:bold;">Price</td>
            <td style="padding:10px; font-weight:bold;">Qty</td>
            <td style="padding:10px; font-weight:bold;">Total</td>
          </tr>
          <tr style="border-bottom:1px solid #e0e0e0;">
            <td style="padding:10px;">Wireless Headphones</td>
            <td style="padding:10px;">$79.99</td>
            <td style="padding:10px;">1</td>
            <td style="padding:10px;">$79.99</td>
          </tr>
          <tr style="border-bottom:1px solid #e0e0e0;">
            <td style="padding:10px;">Phone Case</td>
            <td style="padding:10px;">$19.99</td>
            <td style="padding:10px;">1</td>
            <td style="padding:10px;">$19.99</td>
          </tr>
          <tr>
            <td colspan="3" style="padding:10px; font-weight:bold; text-align:right;">Total:</td>
            <td style="padding:10px; font-weight:bold;">{order.total}</td>
          </tr>
        </mj-table>
        
        <mj-button href="{order.trackingUrl}" background-color="#3498db" color="#ffffff" font-size="16px" padding="15px 30px">
          Track Your Order
        </mj-button>
        
        <mj-text>
          If you have any questions, please contact us at {company.supportEmail} or visit our website at {company.website}.
        </mj-text>
        
        <mj-text font-size="14px" color="#7f8c8d">
          Best regards,<br/>
          The {company.name} Team
        </mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
`;

console.log('🚀 MJML Dynamic Content Example\n');

// Process MJML template with dynamic data
console.log('📧 Processing MJML template with dynamic data...');
const processedMjml = d.mjml(mjmlTemplate, emailData);

console.log('✅ MJML processed successfully!');
console.log('\n📋 Processed MJML (first 500 characters):');
console.log(processedMjml.substring(0, 500) + '...\n');

// Convert MJML to HTML
console.log('🔄 Converting MJML to HTML...');
const { html, errors } = mjml(processedMjml);

if (errors && errors.length > 0) {
  console.log('⚠️  MJML conversion warnings:');
  errors.forEach(error => console.log(`  - ${error.message}`));
}

console.log('✅ HTML generated successfully!');
console.log('\n📄 Generated HTML (first 500 characters):');
console.log(html.substring(0, 500) + '...\n');

// Save HTML to file for preview
import fs from 'fs';
import path from 'path';

const htmlPath = path.join(process.cwd(), 'email-preview.html');
const fullHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Email Preview</title>
</head>
<body>
  ${html}
</body>
</html>
`;

fs.writeFileSync(htmlPath, fullHtml);
console.log(`💾 HTML saved to: ${htmlPath}`);
console.log('🌐 Open this file in your browser to preview the email!');
