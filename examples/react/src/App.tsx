import React, { useState } from 'react';
import d from 'dynamic-content-html';
import { Recipient } from 'dynamic-content-html';

const App: React.FC = () => {
  const [recipient, setRecipient] = useState<Recipient>({
    first_name: 'John',
    last_name: 'Doe',
    email: 'john.doe@example.com',
    phone_number: '+1234567890',
    street: '123 Main St',
    city: 'New York',
    state: 'NY',
    zip_code: '10001'
  });

  const [message, setMessage] = useState('Welcome to our platform!');

  const emailTemplate = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #333;">Hello {{recipient.first_name}}!</h1>
      
      <p>{{message}}</p>
      
      <div style="background-color: #f5f5f5; padding: 15px; margin: 20px 0; border-radius: 5px;">
        <h3>Your Information:</h3>
        <p><strong>Name:</strong> {{recipient.full_name}}</p>
        <p><strong>Email:</strong> {{recipient.email}}</p>
        <p><strong>Phone:</strong> {{recipient.phone_number}}</p>
        <p><strong>Address:</strong> {{recipient.street}}, {{recipient.city}}, {{recipient.state}} {{recipient.zip_code}}</p>
      </div>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="/dashboard" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
          Go to Dashboard
        </a>
      </div>
      
      <p style="color: #666; font-size: 12px;">
        If you have any questions, please contact us at support@example.com
      </p>
    </div>
  `;

  const richEmailTemplate = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #333;">Hello {{recipient.first_name}}!</h1>
      
      <p>{{message}}</p>
      
      <div style="background-color: #f5f5f5; padding: 15px; margin: 20px 0; border-radius: 5px;">
        <h3>Your Information:</h3>
        <p><strong>Name:</strong> {{recipient.full_name}}</p>
        <p><strong>Email:</strong> {{recipient.email}}</p>
        <p><strong>Phone:</strong> {{recipient.phone_number}}</p>
        <p><strong>Address:</strong> {{recipient.street}}, {{recipient.city}}, {{recipient.state}} {{recipient.zip_code}}</p>
      </div>
      
      <div style="text-align: center; margin: 30px 0;">
        {{action_button}}
      </div>
      
      <p style="color: #666; font-size: 12px;">
        If you have any questions, please {{contact_link}}.
      </p>
    </div>
  `;

  const processedEmail = d(emailTemplate, { recipient, message });
  
  const processedRichEmail = d.rich(richEmailTemplate, {
    recipient,
    message,
    action_button: (chunks: string) => 
      `<a href="/dashboard" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">${chunks}</a>`,
    contact_link: (chunks: string) => 
      `<a href="mailto:support@example.com" style="color: #007bff;">${chunks}</a>`
  });

  return (
    <div style={{ padding: '20px' }}>
      <h1>Dynamic Text - React Example</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <h2>Edit Recipient Information:</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="First Name"
            value={recipient.first_name || ''}
            onChange={(e) => setRecipient({...recipient, first_name: e.target.value})}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={recipient.last_name || ''}
            onChange={(e) => setRecipient({...recipient, last_name: e.target.value})}
          />
          <input
            type="email"
            placeholder="Email"
            value={recipient.email || ''}
            onChange={(e) => setRecipient({...recipient, email: e.target.value})}
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={recipient.phone_number || ''}
            onChange={(e) => setRecipient({...recipient, phone_number: e.target.value})}
          />
          <input
            type="text"
            placeholder="Street"
            value={recipient.street || ''}
            onChange={(e) => setRecipient({...recipient, street: e.target.value})}
          />
          <input
            type="text"
            placeholder="City"
            value={recipient.city || ''}
            onChange={(e) => setRecipient({...recipient, city: e.target.value})}
          />
          <input
            type="text"
            placeholder="State"
            value={recipient.state || ''}
            onChange={(e) => setRecipient({...recipient, state: e.target.value})}
          />
          <input
            type="text"
            placeholder="ZIP Code"
            value={recipient.zip_code || ''}
            onChange={(e) => setRecipient({...recipient, zip_code: e.target.value})}
          />
        </div>
        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ width: '100%', height: '60px', marginBottom: '10px' }}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div>
          <h2>Basic Template:</h2>
          <div 
            style={{ 
              border: '1px solid #ccc', 
              padding: '10px', 
              backgroundColor: '#f9f9f9',
              maxHeight: '400px',
              overflow: 'auto'
            }}
            dangerouslySetInnerHTML={{ __html: processedEmail }}
          />
        </div>
        
        <div>
          <h2>Rich Content Template:</h2>
          <div 
            style={{ 
              border: '1px solid #ccc', 
              padding: '10px', 
              backgroundColor: '#f9f9f9',
              maxHeight: '400px',
              overflow: 'auto'
            }}
            dangerouslySetInnerHTML={{ __html: processedRichEmail }}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
