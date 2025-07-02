"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicyPage() {
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
              <Shield className="w-8 h-8" />
              Privacy Policy
            </CardTitle>
            <p className="text-gray-600 mt-2">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </CardHeader>
          
          <CardContent className="prose prose-gray max-w-none">
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Introduction</h2>
                <p className="text-gray-700 leading-relaxed">
                  Welcome to Hanuman Blessed. We respect your privacy and are committed to protecting your personal data. 
                  This privacy policy will inform you about how we look after your personal data when you visit our website 
                  and tell you about your privacy rights and how the law protects you.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Information We Collect</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-2">Personal Information</h3>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1">
                      <li>Name and contact information (email, phone number)</li>
                      <li>Billing and shipping addresses</li>
                      <li>Payment information (processed securely through third-party providers)</li>
                      <li>Order history and preferences</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-2">Automatically Collected Information</h3>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1">
                      <li>IP address and browser information</li>
                      <li>Device information and operating system</li>
                      <li>Pages visited and time spent on our website</li>
                      <li>Referring website information</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">How We Use Your Information</h2>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Process and fulfill your orders</li>
                  <li>Send order confirmations and shipping updates</li>
                  <li>Provide customer support and respond to inquiries</li>
                  <li>Improve our website and services</li>
                  <li>Send promotional emails (with your consent)</li>
                  <li>Comply with legal obligations</li>
                  <li>Prevent fraud and enhance security</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Information Sharing</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li><strong>Service Providers:</strong> With trusted third-party service providers who assist us in operating our website and conducting business</li>
                  <li><strong>Payment Processing:</strong> With secure payment processors to handle transactions</li>
                  <li><strong>Shipping Partners:</strong> With delivery services to fulfill your orders</li>
                  <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Data Security</h2>
                <p className="text-gray-700 leading-relaxed">
                  We implement appropriate technical and organizational measures to protect your personal data against 
                  unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over 
                  the internet is 100% secure, and we cannot guarantee absolute security.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Rights</h2>
                <p className="text-gray-700 leading-relaxed mb-4">You have the right to:</p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Access your personal data</li>
                  <li>Correct inaccurate or incomplete data</li>
                  <li>Request deletion of your data</li>
                  <li>Object to processing of your data</li>
                  <li>Request data portability</li>
                  <li>Withdraw consent for marketing communications</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Cookies</h2>
                <p className="text-gray-700 leading-relaxed">
                  Our website uses cookies to enhance your browsing experience. Cookies are small text files stored 
                  on your device that help us analyze website traffic and customize content. You can control cookie 
                  settings through your browser preferences.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Third-Party Links</h2>
                <p className="text-gray-700 leading-relaxed">
                  Our website may contain links to third-party websites. We are not responsible for the privacy 
                  practices or content of these external sites. We encourage you to review their privacy policies 
                  before providing any personal information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Changes to This Policy</h2>
                <p className="text-gray-700 leading-relaxed">
                  We may update this privacy policy from time to time. Any changes will be posted on this page 
                  with an updated revision date. We encourage you to review this policy periodically.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
                <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    If you have any questions about this Privacy Policy or our data practices, please contact us:
                  </p>
                  <div className="space-y-2 text-gray-700">
                    <p><strong>Email:</strong> hanumanblessedhomes@gmail.com</p>
                    <p><strong>Phone:</strong> +91 92044 28426</p>
                  </div>
                </div>
              </section>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 