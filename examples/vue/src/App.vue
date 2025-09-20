<template>
  <div class="app">
    <h1>Dynamic Content Html - Vue Example</h1>
    
    <div class="controls">
      <h2>Edit Recipient Information:</h2>
      <div class="form-grid">
        <input
          v-model="recipient.first_name"
          type="text"
          placeholder="First Name"
        />
        <input
          v-model="recipient.last_name"
          type="text"
          placeholder="Last Name"
        />
        <input
          v-model="recipient.email"
          type="email"
          placeholder="Email"
        />
        <input
          v-model="recipient.phone_number"
          type="tel"
          placeholder="Phone Number"
        />
        <input
          v-model="recipient.street"
          type="text"
          placeholder="Street"
        />
        <input
          v-model="recipient.city"
          type="text"
          placeholder="City"
        />
        <input
          v-model="recipient.state"
          type="text"
          placeholder="State"
        />
        <input
          v-model="recipient.zip_code"
          type="text"
          placeholder="ZIP Code"
        />
      </div>
      <textarea
        v-model="message"
        placeholder="Message"
        class="message-input"
      />
    </div>

    <div class="templates">
      <div class="template">
        <h2>Basic Template:</h2>
        <div 
          class="template-content"
          v-html="processedEmail"
        />
      </div>
      
      <div class="template">
        <h2>Rich Content Template:</h2>
        <div 
          class="template-content"
          v-html="processedRichEmail"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import d from 'dynamic-content-html'
import type { Recipient } from 'dynamic-content-html'

const recipient = ref<Recipient>({
  first_name: 'Jane',
  last_name: 'Smith',
  email: 'jane.smith@example.com',
  phone_number: '+1987654321',
  street: '456 Oak Ave',
  city: 'Los Angeles',
  state: 'CA',
  zip_code: '90210'
})

const message = ref('Welcome to our platform!')

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
      <a href="/dashboard" style="background-color: #28a745; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
        Go to Dashboard
      </a>
    </div>
    
    <p style="color: #666; font-size: 12px;">
      If you have any questions, please contact us at support@example.com
    </p>
  </div>
`

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
`

const processedEmail = computed(() => {
  return d(emailTemplate, { recipient: recipient.value, message: message.value })
})

const processedRichEmail = computed(() => {
  return d.rich(richEmailTemplate, {
    recipient: recipient.value,
    message: message.value,
    action_button: (chunks: string) => 
      `<a href="/dashboard" style="background-color: #28a745; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">${chunks}</a>`,
    contact_link: (chunks: string) => 
      `<a href="mailto:support@example.com" style="color: #28a745;">${chunks}</a>`
  })
})
</script>

<style scoped>
.app {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.controls {
  margin-bottom: 20px;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 10px;
}

.message-input {
  width: 100%;
  height: 60px;
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.templates {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.template h2 {
  margin-bottom: 10px;
  color: #333;
}

.template-content {
  border: 1px solid #ccc;
  padding: 10px;
  background-color: #f9f9f9;
  max-height: 400px;
  overflow: auto;
  border-radius: 4px;
}

@media (max-width: 768px) {
  .templates {
    grid-template-columns: 1fr;
  }
  
  .form-grid {
    grid-template-columns: 1fr;
  }
}
</style>
