import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    // Create transporter with Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Test the connection
    await transporter.verify();
    console.log('✅ Gmail SMTP connection verified successfully!');

    // Send a test email
    const testEmail = await transporter.sendMail({
      from: '"Hanuman Blessed Test 🙏" <priyankarag2001@gmail.com>',
      to: 'priyankarag2001@gmail.com', // Send to yourself for testing
      subject: '✅ Gmail SMTP Test - Hanuman Blessed',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #dc2626, #ef4444); color: white; padding: 20px; text-align: center; border-radius: 10px;">
            <h1>🙏 Gmail SMTP Test Successful!</h1>
            <p>Your email configuration is working perfectly!</p>
          </div>
          
          <div style="padding: 20px; background: #f8f9fa; margin: 20px 0; border-radius: 8px;">
            <h2>Configuration Details:</h2>
            <p><strong>Email Service:</strong> Gmail SMTP</p>
            <p><strong>From Address:</strong> ${process.env.EMAIL_USER}</p>
            <p><strong>Test Time:</strong> ${new Date().toLocaleString('en-IN')}</p>
            <p><strong>Status:</strong> ✅ Successfully Connected & Sent</p>
          </div>
          
          <div style="background: #ecfdf5; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #059669;">🎉 Next Steps:</h3>
            <ul style="color: #065f46;">
              <li>Your Gmail SMTP is configured correctly</li>
              <li>Order confirmation emails will now work</li>
              <li>You can delete this test API endpoint if you want</li>
            </ul>
          </div>
          
          <div style="text-align: center; padding: 20px; color: #666;">
            <p>🙏 Made with devotion for Hanuman Blessed 🇮🇳</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Gmail SMTP test email sent successfully!',
      emailId: testEmail.messageId,
      details: {
        from: process.env.EMAIL_USER,
        to: 'priyankarag2001@gmail.com',
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('❌ Gmail SMTP Error:', error);
    
    let errorMessage = 'Failed to send test email';
    let troubleshooting: string[] = [];

    if (error instanceof Error) {
      if (error.message.includes('Invalid login')) {
        errorMessage = 'Invalid Gmail credentials';
        troubleshooting = [
          'Check if EMAIL_USER is correct (priyankarag2001@gmail.com)',
          'Verify EMAIL_PASS is the 16-character app password (not your regular password)',
          'Make sure 2-Step Verification is enabled on Gmail',
          'Regenerate app password if needed'
        ];
      } else if (error.message.includes('Connection timeout')) {
        errorMessage = 'Connection timeout to Gmail SMTP';
        troubleshooting = [
          'Check your internet connection',
          'Verify firewall is not blocking SMTP (port 587/465)',
          'Try again in a few minutes'
        ];
      }
    }

    return NextResponse.json(
      { 
        success: false, 
        message: errorMessage,
        error: error instanceof Error ? error.message : 'Unknown error',
        troubleshooting
      },
      { status: 500 }
    );
  }
} 