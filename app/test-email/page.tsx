"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, AlertCircle, Loader2, Mail } from "lucide-react";

export default function TestEmailPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [showNotification, setShowNotification] = useState(false);

  // Show notification for 5 seconds when email is sent successfully
  useEffect(() => {
    if (result?.success && !showNotification) {
      setShowNotification(true);
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 9000);
      return () => clearTimeout(timer);
    }
  }, [result?.success]);

  const testEmailSetup = async () => {
    setIsLoading(true);
    setResult(null);
    setShowNotification(false);

    try {
      const response = await fetch('/api/test-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({
        success: false,
        message: 'Failed to test email setup',
        error: 'Network error or server is down'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      {/* Success Notification Toast */}
      {showNotification && result?.success && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3 animate-in slide-in-from-right duration-300">
          <CheckCircle className="w-6 h-6" />
          <div>
            <p className="font-semibold">Order Placed successfully and shared mail</p>
            <p className="text-sm opacity-90">Email has been sent successfully!</p>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 max-w-2xl">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-red-600 flex items-center justify-center gap-2">
              <Mail className="w-6 h-6" />
              Gmail SMTP Test
            </CardTitle>
            <p className="text-gray-600">
              Test your Gmail SMTP configuration for Hanuman Blessed
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium text-blue-800 mb-2">Before Testing:</h3>
              <ol className="text-blue-700 text-sm space-y-1 list-decimal list-inside">
                <li>Make sure you've enabled 2-Step Verification on Gmail</li>
                <li>Generate an App Password from Google Account settings</li>
                <li>Update the .env.local file with your app password</li>
                <li>Restart your development server after updating .env.local</li>
              </ol>
            </div>

            <Button 
              onClick={testEmailSetup}
              disabled={isLoading}
              className="w-full bg-red-600 hover:bg-red-700"
              size="lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Testing Gmail SMTP...
                </>
              ) : (
                <>
                  <Mail className="w-5 h-5 mr-2" />
                  Test Gmail SMTP Setup
                </>
              )}
            </Button>

            {result && (
              <div className={`p-4 rounded-lg border ${
                result.success 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-red-50 border-red-200'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  {result.success ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-600" />
                  )}
                  <span className={`font-medium ${
                    result.success ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {result.message}
                  </span>
                </div>

                {result.success && result.details && (
                  <div className="text-green-700 text-sm space-y-1">
                    <p><strong>From:</strong> {result.details.from}</p>
                    <p><strong>To:</strong> {result.details.to}</p>
                    <p><strong>Time:</strong> {new Date(result.details.timestamp).toLocaleString()}</p>
                    <p><strong>Email ID:</strong> {result.emailId}</p>
                  </div>
                )}

                {!result.success && result.troubleshooting && (
                  <div className="text-red-700 text-sm mt-3">
                    <p className="font-medium mb-2">Troubleshooting Steps:</p>
                    <ul className="list-disc list-inside space-y-1">
                      {result.troubleshooting.map((step: string, index: number) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {!result.success && result.error && (
                  <div className="text-red-600 text-xs mt-2 font-mono bg-red-100 p-2 rounded">
                    Error: {result.error}
                  </div>
                )}
              </div>
            )}

            {result?.success && (
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h3 className="font-medium text-yellow-800 mb-2">✅ Success! Next Steps:</h3>
                <ul className="text-yellow-700 text-sm space-y-1 list-disc list-inside">
                  <li>Check your Gmail inbox for the test email</li>
                  <li>Your order confirmation emails will now work</li>
                  <li>You can now go back to the main website</li>
                  <li>This test page can be deleted in production</li>
                </ul>
              </div>
            )}

            <div className="text-center">
              <a 
                href="/"
                className="text-red-600 hover:text-red-700 underline"
              >
                ← Back to Hanuman Blessed Website
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 