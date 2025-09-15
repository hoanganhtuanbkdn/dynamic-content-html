import express from 'express';
import d from 'dynamic-content-html';
import { Recipient } from 'dynamic-content-html';
import nodemailer from 'nodemailer';

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Sample recipient data
const sampleRecipients: Recipient[] = [
  {
    first_name: 'John',
    last_name: 'Doe',
    email: 'john.doe@example.com',
    phone_number: '+1234567890',
    street: '123 Main St',
    city: 'New York',
    state: 'NY',
    zip_code: '10001'
  },
  {
    first_name: 'Jane',
    last_name: 'Smith',
    email: 'jane.smith@example.com',
    phone_number: '+1987654321',
    street: '456 Oak Ave',
    city: 'Los Angeles',
    state: 'CA',
    zip_code: '90210'
  }
];

// Email templates
const welcomeEmailTemplate = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Welcome to Our Platform</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #007bff; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .info-box { background-color: #f8f9fa; padding: 15px; margin: 20px 0; border-radius: 5px; }
        .button { display: inline-block; background-color: #28a745; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 10px 0; }
        .footer { background-color: #6c757d; color: white; padding: 15px; text-align: center; font-size: 12px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Welcome {{recipient.first_name}}!</h1>
    </div>
    
    <div class="content">
        <p>Thank you for joining our platform! We're excited to have you on board.</p>
        
        <div class="info-box">
            <h3>Your Account Information:</h3>
            <p><strong>Name:</strong> {{recipient.full_name}}</p>
            <p><strong>Email:</strong> {{recipient.email}}</p>
            <p><strong>Phone:</strong> {{recipient.phone_number}}</p>
            <p><strong>Address:</strong> {{recipient.street}}, {{recipient.city}}, {{recipient.state}} {{recipient.zip_code}}</p>
        </div>
        
        <p>You can now access your dashboard and start using all our features.</p>
        
        <div style="text-align: center;">
            <a href="https://example.com/dashboard" class="button">Go to Dashboard</a>
        </div>
        
        <p>If you have any questions, please don't hesitate to contact our support team.</p>
    </div>
    
    <div class="footer">
        <p>© 2024 Our Platform. All rights reserved.</p>
        <p>If you no longer wish to receive these emails, you can <a href="https://example.com/unsubscribe" style="color: white;">unsubscribe here</a>.</p>
    </div>
</body>
</html>
`;

const orderConfirmationTemplate = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Order Confirmation</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #dc3545; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .order-details { background-color: #f8f9fa; padding: 15px; margin: 20px 0; border-radius: 5px; }
        .button { display: inline-block; background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 10px 0; }
        .footer { background-color: #6c757d; color: white; padding: 15px; text-align: center; font-size: 12px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Order Confirmation</h1>
    </div>
    
    <div class="content">
        <p>Dear {{recipient.first_name}},</p>
        
        <p>Thank you for your order! We've received your order and it's being processed.</p>
        
        <div class="order-details">
            <h3>Order Details:</h3>
            <p><strong>Order Number:</strong> {{order_number}}</p>
            <p><strong>Order Date:</strong> {{order_date}}</p>
            <p><strong>Total Amount:</strong> ${{total_amount}}</p>
            <p><strong>Shipping Address:</strong> {{recipient.street}}, {{recipient.city}}, {{recipient.state}} {{recipient.zip_code}}</p>
        </div>
        
        <p>You will receive a shipping confirmation email once your order has been shipped.</p>
        
        <div style="text-align: center;">
            <a href="https://example.com/orders/{{order_number}}" class="button">Track Your Order</a>
        </div>
        
        <p>If you have any questions about your order, please contact us at support@example.com.</p>
    </div>
    
    <div class="footer">
        <p>© 2024 Our Store. All rights reserved.</p>
    </div>
</body>
</html>
`;

// Routes
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Dynamic Text - Node.js Example</title>
        <style>
            body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
            .endpoint { background-color: #f8f9fa; padding: 15px; margin: 10px 0; border-radius: 5px; }
            .method { background-color: #007bff; color: white; padding: 2px 8px; border-radius: 3px; font-size: 12px; }
            .url { font-family: monospace; background-color: #e9ecef; padding: 2px 6px; border-radius: 3px; }
        </style>
    </head>
    <body>
        <h1>Dynamic Text - Node.js Example</h1>
        <p>This server demonstrates how to use the dynamic-content-html library in a Node.js environment.</p>
        
        <h2>Available Endpoints:</h2>
        
        <div class="endpoint">
            <span class="method">GET</span> <span class="url">/api/templates/welcome</span>
            <p>Get a sample welcome email template</p>
        </div>
        
        <div class="endpoint">
            <span class="method">POST</span> <span class="url">/api/templates/welcome</span>
            <p>Generate a personalized welcome email</p>
            <p>Body: { "recipient": { "first_name": "John", "last_name": "Doe", ... }, "message": "Welcome!" }</p>
        </div>
        
        <div class="endpoint">
            <span class="method">POST</span> <span class="url">/api/templates/order-confirmation</span>
            <p>Generate an order confirmation email</p>
            <p>Body: { "recipient": { ... }, "order_number": "12345", "order_date": "2024-01-01", "total_amount": "99.99" }</p>
        </div>
        
        <div class="endpoint">
            <span class="method">GET</span> <span class="url">/api/samples</span>
            <p>Get sample recipient data</p>
        </div>
        
        <h2>Try it out:</h2>
        <p>Use tools like Postman or curl to test the API endpoints.</p>
    </body>
    </html>
  `);
});

// Get sample welcome email
app.get('/api/templates/welcome', (req, res) => {
  const sampleRecipient = sampleRecipients[0];
  const processedEmail = d(welcomeEmailTemplate, { 
    recipient: sampleRecipient,
    message: 'Welcome to our platform!'
  });
  
  res.json({
    template: welcomeEmailTemplate,
    processed: processedEmail,
    recipient: sampleRecipient
  });
});

// Generate personalized welcome email
app.post('/api/templates/welcome', (req, res) => {
  const { recipient, message } = req.body;
  
  if (!recipient) {
    return res.status(400).json({ error: 'Recipient data is required' });
  }
  
  const processedEmail = d(welcomeEmailTemplate, { 
    recipient,
    message: message || 'Welcome to our platform!'
  });
  
  res.json({
    processed: processedEmail,
    recipient
  });
});

// Generate order confirmation email
app.post('/api/templates/order-confirmation', (req, res) => {
  const { recipient, order_number, order_date, total_amount } = req.body;
  
  if (!recipient || !order_number) {
    return res.status(400).json({ error: 'Recipient data and order number are required' });
  }
  
  const processedEmail = d(orderConfirmationTemplate, { 
    recipient,
    order_number,
    order_date: order_date || new Date().toISOString().split('T')[0],
    total_amount: total_amount || '0.00'
  });
  
  res.json({
    processed: processedEmail,
    order: {
      order_number,
      order_date: order_date || new Date().toISOString().split('T')[0],
      total_amount: total_amount || '0.00'
    },
    recipient
  });
});

// Get sample data
app.get('/api/samples', (req, res) => {
  res.json({
    recipients: sampleRecipients,
    templates: {
      welcome: welcomeEmailTemplate,
      orderConfirmation: orderConfirmationTemplate
    }
  });
});

// Rich content example
app.post('/api/templates/rich', (req, res) => {
  const { recipient, message } = req.body;
  
  if (!recipient) {
    return res.status(400).json({ error: 'Recipient data is required' });
  }
  
  const richTemplate = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1>Hello {{recipient.first_name}}!</h1>
      <p>{{message}}</p>
      
      <div style="text-align: center; margin: 20px 0;">
        {{action_button}}
      </div>
      
      <p>If you have any questions, please {{contact_link}}.</p>
    </div>
  `;
  
  const processedEmail = d.rich(richTemplate, {
    recipient,
    message: message || 'Welcome!',
    action_button: (chunks: string) => 
      `<a href="/dashboard" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">${chunks}</a>`,
    contact_link: (chunks: string) => 
      `<a href="mailto:support@example.com" style="color: #007bff;">${chunks}</a>`
  });
  
  res.json({
    processed: processedEmail,
    recipient
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📧 Dynamic Text Node.js Example`);
  console.log(`\nAvailable endpoints:`);
  console.log(`  GET  /api/templates/welcome`);
  console.log(`  POST /api/templates/welcome`);
  console.log(`  POST /api/templates/order-confirmation`);
  console.log(`  POST /api/templates/rich`);
  console.log(`  GET  /api/samples`);
});
