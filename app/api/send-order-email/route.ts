import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { billingDetails, paymentMethod, totalAmount, productDetails } = body;

    // Create transporter (you'll need to set up environment variables)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, // App password
      },
    });

    // Generate order ID
    const orderId = `HB${Date.now()}${Math.floor(Math.random() * 1000)}`;
    const orderDate = new Date().toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    // Email template for customer
    const customerEmailHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; }
          .header { background: #dc2626; color: white; padding: 40px 30px; text-align: center; }
          .header h1 { margin: 0; font-size: 28px; font-weight: 600; }
          .header p { margin: 10px 0 0 0; font-size: 16px; opacity: 0.9; }
          .content { padding: 30px; }
          .section { margin-bottom: 30px; }
          .section h2 { color: #dc2626; font-size: 20px; margin-bottom: 15px; border-bottom: 2px solid #dc2626; padding-bottom: 5px; }
          .order-summary { background: #f8f9fa; padding: 20px; border-radius: 8px; border: 1px solid #e9ecef; }
          .detail-row { display: flex; justify-content: space-between; margin: 10px 0; padding: 8px 0; }
          .detail-row:not(:last-child) { border-bottom: 1px solid #e9ecef; }
          .detail-label { font-weight: 500; color: #666; }
          .detail-value { font-weight: 600; color: #333; }
          .product-card { border: 1px solid #e9ecef; padding: 25px; border-radius: 8px; background: #fafafa; }
          .price-row { display: flex; justify-content: space-between; margin: 12px 0; font-size: 15px; }
          .price-label { color: #666; }
          .price-value { font-weight: 600; }
          .total-row { border-top: 2px solid #dc2626; padding-top: 15px; margin-top: 15px; font-size: 18px; font-weight: bold; }
          .total-row .price-value { color: #dc2626; }
          .address-block { background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #dc2626; }
          .contact-section { background: #e3f2fd; padding: 20px; border-radius: 8px; border: 1px solid #bbdefb; }
          .impact-section { background: #e8f5e8; padding: 20px; border-radius: 8px; border: 1px solid #c8e6c9; margin: 20px 0; }
          .giving-section { background: #fff3e0; padding: 20px; border-radius: 8px; border: 1px solid #ffcc02; margin: 20px 0; }
          .footer { background: #f8f9fa; padding: 25px; text-align: center; border-top: 1px solid #e9ecef; }
          .footer p { margin: 5px 0; color: #666; }
          .highlight { color: #dc2626; font-weight: 600; }
          .success-badge { background: #28a745; color: white; padding: 6px 12px; border-radius: 20px; font-size: 14px; font-weight: 500; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Order Confirmation</h1>
            <p>Hanuman Blessed - Thank you for your order</p>
          </div>
          
          <div class="content">
            <div class="section">
              <h2>Order Information</h2>
              <div class="order-summary">
                <div class="detail-row">
                  <span class="detail-label">Order ID:</span>
                  <span class="detail-value highlight">${orderId}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Order Date:</span>
                  <span class="detail-value">${orderDate}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Payment Method:</span>
                  <span class="detail-value">${paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Order Status:</span>
                  <span class="success-badge">Confirmed</span>
                </div>
              </div>
            </div>

            <div class="section">
              <h2>Product Details</h2>
              <div class="product-card">
                <h3 style="margin-top: 0; color: #dc2626; font-size: 18px;">${productDetails.name}</h3>
                <p style="color: #666; margin: 10px 0;">Crafted with sacred soil and sindoor from Hanuman Garhi Mandir, Ayodhya</p>
                
                <div class="price-row">
                  <span class="price-label">Product Price:</span>
                  <span class="price-value">₹${productDetails.price}</span>
                </div>
                <div class="price-row">
                  <span class="price-label">Shipping Charges:</span>
                  <span class="price-value" style="color: #28a745;">FREE</span>
                </div>
                ${paymentMethod === 'cod' ? `
                <div class="price-row">
                  <span class="price-label">Cash on Delivery Charges:</span>
                  <span class="price-value">₹${productDetails.codCharges}</span>
                </div>
                ` : ''}
                <div class="price-row total-row">
                  <span class="price-label">Total Amount:</span>
                  <span class="price-value">₹${totalAmount}</span>
                </div>
              </div>
            </div>

            <div class="section">
              <h2>Billing Address</h2>
              <div class="address-block">
                <p style="margin: 0 0 10px 0; font-weight: 600; font-size: 16px;">${billingDetails.name}</p>
                <p style="margin: 5px 0;">${billingDetails.address}</p>
                <p style="margin: 5px 0;">${billingDetails.city}, ${billingDetails.state} - ${billingDetails.pincode}</p>
                <p style="margin: 5px 0;"><strong>Email:</strong> ${billingDetails.email}</p>
                <p style="margin: 5px 0;"><strong>Phone:</strong> ${billingDetails.phone}</p>
              </div>
            </div>

            <div class="section">
              <h2>Customer Support</h2>
              <div class="contact-section">
                <p style="margin: 0 0 10px 0; font-weight: 600;">Need assistance with your order?</p>
                <p style="margin: 5px 0;"><strong>WhatsApp/Call:</strong> +91 92044 28426</p>
                <p style="margin: 5px 0;"><strong>Email:</strong> priyankarag2001@gmail.com</p>
                <p style="margin: 5px 0;"><strong>Business Hours:</strong> 9:00 AM - 8:00 PM (Monday to Saturday)</p>
              </div>
            </div>

            <div class="impact-section">
              <h3 style="color: #2e7d32; margin-top: 0;">Environmental Impact</h3>
              <p style="margin: 0;">Your purchase contributes to our environmental initiative by planting one tree in India. This supports our mission to plant 26 crore trees for 26 crore Hindu homes across the nation.</p>
            </div>

            <div class="giving-section">
              <h3 style="color: #f57c00; margin-top: 0;">Community Contribution</h3>
              <p style="margin: 0;">All proceeds from Hanuman Blessed are donated to Project Kusum, dedicated to supporting sacred causes and community welfare initiatives.</p>
            </div>
          </div>

          <div class="footer">
            <p style="font-weight: 600; margin-bottom: 10px;">Thank you for choosing Hanuman Blessed</p>
            <p style="margin: 0;">Made with devotion in India</p>
            <p style="margin: 5px 0 0 0; font-size: 12px;">© 2024 Hanuman Blessed. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Email template for admin notification
    const adminEmailHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; }
          .header { background: #dc2626; color: white; padding: 30px; text-align: center; }
          .content { padding: 30px; }
          .section { margin-bottom: 25px; }
          .section h2 { color: #dc2626; margin-bottom: 15px; border-bottom: 1px solid #dc2626; padding-bottom: 5px; }
          .details-box { background: #f8f9fa; padding: 20px; border-radius: 8px; border: 1px solid #e9ecef; }
          .detail-row { margin: 8px 0; }
          .label { font-weight: 600; color: #666; }
          .value { color: #333; }
          .priority-box { background: #fff3cd; padding: 15px; border: 1px solid #ffeaa7; border-radius: 8px; border-left: 4px solid #dc2626; }
          .action-list { margin: 10px 0; }
          .action-list li { margin: 5px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Order Alert</h1>
            <p>Order ID: ${orderId}</p>
          </div>
          
          <div class="content">
            <div class="section">
              <h2>Order Summary</h2>
              <div class="details-box">
                <div class="detail-row"><span class="label">Order ID:</span> <span class="value">${orderId}</span></div>
                <div class="detail-row"><span class="label">Date & Time:</span> <span class="value">${orderDate}</span></div>
                <div class="detail-row"><span class="label">Payment Method:</span> <span class="value">${paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}</span></div>
                <div class="detail-row"><span class="label">Total Amount:</span> <span class="value">₹${totalAmount}</span></div>
              </div>
            </div>

            <div class="section">
              <h2>Customer Information</h2>
              <div class="details-box">
                <div class="detail-row"><span class="label">Name:</span> <span class="value">${billingDetails.name}</span></div>
                <div class="detail-row"><span class="label">Email:</span> <span class="value">${billingDetails.email}</span></div>
                <div class="detail-row"><span class="label">Phone:</span> <span class="value">${billingDetails.phone}</span></div>
                <div class="detail-row"><span class="label">Address:</span> <span class="value">${billingDetails.address}, ${billingDetails.city}, ${billingDetails.state} - ${billingDetails.pincode}</span></div>
              </div>
            </div>

            <div class="section">
              <h2>Product Information</h2>
              <div class="details-box">
                <div class="detail-row"><span class="label">Product:</span> <span class="value">${productDetails.name}</span></div>
                <div class="detail-row"><span class="label">Price:</span> <span class="value">₹${productDetails.price}</span></div>
                ${paymentMethod === 'cod' ? `<div class="detail-row"><span class="label">COD Charges:</span> <span class="value">₹${productDetails.codCharges}</span></div>` : ''}
              </div>
            </div>

            <div class="priority-box">
              <h3 style="margin-top: 0; color: #dc2626;">Action Items Required</h3>
              <ul class="action-list">
                <li>Process order for shipping and packaging</li>
                <li>Generate and send tracking details to customer</li>
                <li>Coordinate tree plantation for environmental impact</li>
                <li>Update inventory management system</li>
                <li>Schedule quality check before dispatch</li>
              </ul>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send email to customer
    await transporter.sendMail({
      from: '"Hanuman Blessed" <priyankarag2001@gmail.com>',
      to: billingDetails.email,
      subject: `Order Confirmation - ${orderId} | Hanuman Blessed`,
      html: customerEmailHTML,
    });

    // Send notification to admin
    await transporter.sendMail({
      from: '"Hanuman Blessed Order System" <priyankarag2001@gmail.com>',
      to: 'priyankarag2001@gmail.com',
      subject: `New Order Received - ${orderId} | ₹${totalAmount}`,
      html: adminEmailHTML,
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Order placed successfully and confirmation emails sent!',
      orderId 
    });

  } catch (error) {
    console.error('Error sending emails:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to process order' },
      { status: 500 }
    );
  }
} 