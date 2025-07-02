"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function TermsConditionsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-6">
          <Link 
            href="/"
            className="inline-flex items-center text-red-600 hover:text-red-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Hanuman Blessed
          </Link>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl text-red-600 flex items-center justify-center gap-3">
              <FileText className="w-8 h-8" />
              Terms & Conditions
            </CardTitle>
            <p className="text-gray-600 mt-2">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </CardHeader>
          
          <CardContent className="prose prose-gray max-w-none">
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Agreement to Terms</h2>
                <p className="text-gray-700 leading-relaxed">
                  By accessing and using the Hanuman Blessed website, you accept and agree to be bound by the terms 
                  and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Product Information</h2>
                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    We strive to provide accurate product descriptions and images. However:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Product colors may vary slightly due to monitor settings and lighting conditions</li>
                    <li>Handcrafted items may have slight variations as each piece is unique</li>
                    <li>We reserve the right to modify product specifications without prior notice</li>
                    <li>All dimensions and weights are approximate</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Ordering and Payment</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-2">Order Acceptance</h3>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1">
                      <li>All orders are subject to acceptance and availability</li>
                      <li>We reserve the right to refuse or cancel any order</li>
                      <li>Order confirmation will be sent via email</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-2">Payment Terms</h3>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1">
                      <li>We accept online payments and Cash on Delivery (COD)</li>
                      <li>COD orders include additional handling charges</li>
                      <li>All prices are in Indian Rupees (INR)</li>
                      <li>Prices are inclusive of applicable taxes</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Shipping and Delivery</h2>
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Delivery Timeline</h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Standard delivery: 5-7 business days within India</li>
                    <li>Remote areas may require additional 2-3 days</li>
                    <li>Delivery times are estimates and may vary due to unforeseen circumstances</li>
                    <li>We will provide tracking information once your order is shipped</li>
                  </ul>
                  
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Shipping Charges</h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Free shipping on all orders</li>
                    <li>Additional charges may apply for express delivery (if available)</li>
                    <li>COD orders include handling charges as mentioned at checkout</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Return and Refund Policy</h2>
                <div className="space-y-4">
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <h3 className="text-lg font-medium text-yellow-800 mb-2">Important Note</h3>
                    <p className="text-yellow-700">
                      Due to the sacred and spiritual nature of our products, we have specific return policies. 
                      Please read carefully before placing your order.
                    </p>
                  </div>
                  
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Return Conditions</h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Returns are accepted only for damaged or defective items</li>
                    <li>Return requests must be initiated within 7 days of delivery</li>
                    <li>Items must be in original condition with all packaging</li>
                    <li>Sacred items cannot be returned once used for worship</li>
                    <li>Custom or personalized items cannot be returned</li>
                  </ul>
                  
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Refund Process</h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Refunds will be processed within 7-10 business days</li>
                    <li>Refunds will be credited to the original payment method</li>
                    <li>Shipping charges are non-refundable unless the item is defective</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Intellectual Property</h2>
                <p className="text-gray-700 leading-relaxed">
                  All content on this website, including but not limited to text, graphics, logos, images, and software, 
                  is the property of Hanuman Blessed and is protected by copyright and trademark laws. You may not 
                  reproduce, distribute, or use any content without our written permission.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">User Conduct</h2>
                <p className="text-gray-700 leading-relaxed mb-4">You agree not to:</p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Use our website for any unlawful purpose or activity</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Upload or transmit malicious code or viruses</li>
                  <li>Interfere with the proper functioning of the website</li>
                  <li>Use our products for any commercial resale without permission</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Limitation of Liability</h2>
                <p className="text-gray-700 leading-relaxed">
                  Hanuman Blessed shall not be liable for any direct, indirect, incidental, special, or consequential 
                  damages resulting from the use or inability to use our products or services. Our maximum liability 
                  shall not exceed the purchase price of the product(s) in question.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Force Majeure</h2>
                <p className="text-gray-700 leading-relaxed">
                  We shall not be liable for any delay or failure to perform due to circumstances beyond our reasonable 
                  control, including but not limited to natural disasters, government actions, strikes, or other 
                  unforeseeable events.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Governing Law</h2>
                <p className="text-gray-700 leading-relaxed">
                  These terms and conditions are governed by and construed in accordance with the laws of India. 
                  Any disputes shall be subject to the exclusive jurisdiction of the courts in [Your City], India.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Changes to Terms</h2>
                <p className="text-gray-700 leading-relaxed">
                  We reserve the right to modify these terms and conditions at any time. Changes will be effective 
                  immediately upon posting on this page. Your continued use of our website constitutes acceptance 
                  of the modified terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Information</h2>
                <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    If you have any questions about these Terms & Conditions, please contact us:
                  </p>
                  <div className="space-y-2 text-gray-700">
                    <p><strong>Email:</strong> hanumanblessedhomes@gmail.com</p>
                    <p><strong>Phone:</strong> +91 92044 28426</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Acknowledgment</h2>
                <p className="text-gray-700 leading-relaxed">
                  By using our website and services, you acknowledge that you have read, understood, and agree to be 
                  bound by these Terms & Conditions and our Privacy Policy.
                </p>
              </section>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 