# Contact Form Setup Guide

Your contact form is ready! Here are the options for receiving form submissions:

## Option 1: EmailJS (Recommended - Free & Easy)

EmailJS lets you send emails directly from the frontend without a backend.

### Setup Steps:

1. **Sign up for EmailJS**
   - Go to https://www.emailjs.com
   - Create a free account (200 emails/month free)

2. **Create an Email Service**
   - Go to Email Services → Add New Service
   - Choose your email provider (Gmail, Outlook, etc.)
   - Connect your email account

3. **Create an Email Template**
   - Go to Email Templates → Create New Template
   - Use this template:
   ```
   Subject: New Contact Form Submission
   
   Name: {{first_name}} {{last_name}}
   Email: {{email}}
   
   Message:
   {{message}}
   ```

4. **Get Your Keys**
   - Go to Account → API Keys
   - Copy your Public Key

5. **Add to Your Project**
   - Create `.env` file in project root:
   ```
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```
   - Get these from EmailJS dashboard

6. **Update Contact.tsx** (I'll do this for you if you want)

---

## Option 2: Formspree (Easiest - No Setup)

1. Go to https://formspree.io
2. Sign up (free tier: 50 submissions/month)
3. Create a form
4. Copy the form endpoint
5. Update the form action in `Contact.tsx`

---

## Option 3: Backend API (Most Control)

If you have a backend server, you can:
1. Create an API endpoint (e.g., `/api/contact`)
2. Use a service like SendGrid, Mailgun, or Nodemailer
3. Update the form to POST to your endpoint

---

## Option 4: Current Setup (Mailto Fallback)

Right now, the form opens your email client with the form data pre-filled. This works but requires the user to have an email client configured.

---

## Quick Setup with EmailJS

After setting up EmailJS, I can update the code to use it. Just provide:
- Service ID
- Template ID  
- Public Key

Or follow the steps above and I'll help you integrate it!

---

## Testing

Once set up, test the form:
1. Fill out all fields
2. Click "SEND MESSAGE"
3. Check your email inbox
4. You should receive the form submission

---

**Need help?** Let me know which option you prefer and I'll help you set it up!


















