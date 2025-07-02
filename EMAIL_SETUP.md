# 📧 Gmail SMTP Setup Guide for Hanuman Blessed

This guide will help you set up Gmail SMTP to send order confirmation emails.

## 🔧 **Step 1: Enable Gmail SMTP Access**

### 1.1 Go to Google Account Settings
- Visit: https://myaccount.google.com/
- Or from Gmail: Click your profile → "Manage your Google Account"

### 1.2 Enable 2-Step Verification
- Navigate to **Security** tab
- Find **2-Step Verification** and click it
- Follow the setup process (requires your phone number)
- ✅ This is **required** for app passwords

### 1.3 Generate App Password
- Still in **Security** tab  
- Click **App passwords** (only appears after 2-Step is enabled)
- Select **Mail** as the app
- Select **Other (Custom name)** as device  
- Enter name: **"Hanuman Blessed Website"**
- Click **Generate**
- 📋 **Copy the 16-character password** (like: `abcd efgh ijkl mnop`)

## 🔧 **Step 2: Configure Environment Variables**

### 2.1 Update .env.local file
Open `.env.local` in your project root and update:

```bash
# Replace with your actual app password (16 characters, no spaces)
EMAIL_USER=priyankarag2001@gmail.com
EMAIL_PASS=abcdefghijklmnop
```

**Important:** 
- Remove all spaces from the app password
- Don't use your regular Gmail password
- Never commit this file to version control

### 2.2 Restart Development Server
After updating .env.local:
```bash
# Stop the server (Ctrl+C) and restart
npm run dev
```

## 🧪 **Step 3: Test Gmail SMTP Setup**

### 3.1 Use the Test Page
1. Go to: http://localhost:3001/test-email
2. Click **"Test Gmail SMTP Setup"**
3. Check the results

### 3.2 Alternative: Manual Test via API
```bash
# Test via curl
curl -X POST http://localhost:3001/api/test-email \
  -H "Content-Type: application/json"
```

## ✅ **Step 4: Verify Success**

### If Test Succeeds:
- ✅ You'll see "Gmail SMTP test email sent successfully!"
- 📧 Check `priyankarag2001@gmail.com` inbox for test email
- 🎉 Order confirmation emails will now work

### If Test Fails:
Common issues and solutions:

**"Invalid login" Error:**
- ✅ Verify EMAIL_USER is `priyankarag2001@gmail.com`
- ✅ Check EMAIL_PASS is the 16-character app password (not regular password)
- ✅ Ensure 2-Step Verification is enabled
- ✅ Regenerate app password if needed

**"Connection timeout" Error:**
- ✅ Check internet connection
- ✅ Verify firewall isn't blocking SMTP (ports 587/465)
- ✅ Try again in a few minutes

## 🚀 **Step 5: Production Deployment**

### For Vercel:
1. Go to your project dashboard
2. Settings → Environment Variables
3. Add:
   - `EMAIL_USER` = `priyankarag2001@gmail.com`
   - `EMAIL_PASS` = `your_16_character_app_password`

### For Netlify:
1. Site settings → Environment variables
2. Add the same variables

### For Other Platforms:
Check their documentation for environment variable setup.

## 📋 **Email Templates Overview**

The system sends two types of emails:

### Customer Confirmation Email:
- 🙏 Beautiful HTML with Hanuman Blessed branding
- Order details with unique Order ID
- Payment summary and billing information
- Contact information and support details
- Environmental impact (tree planting) message
- Sacred giving information (Project Kusum donation)

### Admin Notification Email:
- 🚨 Order alert to `priyankarag2001@gmail.com`
- Complete customer and order details
- Action items checklist for processing
- Professional layout for easy handling

## 🛠 **Technical Details**

### Gmail SMTP Configuration:
- **Service:** Gmail SMTP
- **Authentication:** OAuth2 via App Password
- **Security:** TLS/SSL encryption
- **Ports:** 587 (TLS) / 465 (SSL)

### API Endpoints:
- `POST /api/send-order-email` - Send order confirmation
- `POST /api/test-email` - Test SMTP setup

## 🔒 **Security Best Practices**

- ✅ Use app passwords (never regular passwords)
- ✅ Keep .env.local in .gitignore
- ✅ Regenerate app passwords periodically
- ✅ Monitor email sending logs
- ✅ Use environment variables in production

## 🆘 **Need Help?**

If you're still having issues:

1. **Double-check the steps above**
2. **Use the test page**: http://localhost:3001/test-email
3. **Check server logs** for detailed error messages
4. **Regenerate app password** if authentication fails
5. **Contact support** if problems persist

---

🙏 **Made with devotion for Hanuman Blessed** 🇮🇳 