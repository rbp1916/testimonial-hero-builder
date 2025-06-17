
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Copy, Download, ExternalLink, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DemoSectionProps {
  onNavigateToForm: () => void;
  onNavigateToLanding: () => void;
  onNavigateToDashboard: (email: string) => void;
}

const DemoSection: React.FC<DemoSectionProps> = ({ 
  onNavigateToForm, 
  onNavigateToLanding, 
  onNavigateToDashboard 
}) => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const demoFormLink = "testimonialhero.app/submit/demo123";
  const embedCode = `<iframe src="https://testimonialhero.app/embed/demo123" width="400" height="300" frameborder="0"></iframe>`;

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${type} copied to clipboard`,
    });
  };

  const handleGetStarted = () => {
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    onNavigateToDashboard(email);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 border-b bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onNavigateToLanding}
              className="flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                <Star className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">TestimonialHero</span>
            </div>
          </div>
          <div className="text-sm text-gray-600">Live Demo</div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Demo Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              See TestimonialHero in Action
            </h1>
            <p className="text-xl text-gray-600">
              This is exactly what you and your clients will experience
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column - What Your Client Sees */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900">1. What Your Client Receives</h2>
              
              <Card className="p-6 border-2 border-blue-200 bg-blue-50">
                <h3 className="font-semibold mb-4 text-blue-900">Email to Client:</h3>
                <div className="bg-white p-4 rounded border">
                  <div className="text-sm text-gray-600 mb-2">From: you@yourcompany.com</div>
                  <div className="text-sm text-gray-600 mb-2">Subject: We'd love your feedback!</div>
                  <div className="border-t pt-2">
                    <p className="mb-3">Hi John,</p>
                    <p className="mb-3">I hope you're thrilled with the website we created for your business! Would you mind taking 2 minutes to share your experience?</p>
                    <Button 
                      onClick={onNavigateToForm}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Share Your Feedback
                    </Button>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold mb-4">Your Testimonial Collection Link:</h3>
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded border">
                  <code className="flex-1 text-sm">{demoFormLink}</code>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => copyToClipboard(`https://${demoFormLink}`, "Link")}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Share this link via email, text, or any way you prefer
                </p>
              </Card>
            </div>

            {/* Right Column - What You Get */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900">2. What You Get Back</h2>
              
              {/* Sample Testimonial Card */}
              <Card className="p-6 bg-gradient-to-br from-white to-blue-50 border shadow-lg">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-lg font-semibold text-blue-600">JD</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">John Davis</h4>
                    <p className="text-gray-600 text-sm">CEO, Davis Consulting</p>
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <blockquote className="text-gray-700 italic mb-4">
                  "Working with this team was absolutely incredible. They delivered exactly what we needed, on time and within budget. The attention to detail was outstanding, and our new website has already increased our leads by 40%. I couldn't recommend them more highly!"
                </blockquote>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500">Testimonial collected via TestimonialHero</div>
                  <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                    <Star className="w-4 h-4 text-white" />
                  </div>
                </div>
              </Card>

              {/* Actions */}
              <div className="space-y-3">
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={() => toast({ title: "Downloaded!", description: "Testimonial card saved as PNG" })}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download as PNG
                </Button>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Embed Code (Copy & Paste):
                  </label>
                  <div className="flex items-center gap-2">
                    <Input 
                      value={embedCode} 
                      readOnly 
                      className="font-mono text-xs"
                    />
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => copyToClipboard(embedCode, "Embed code")}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <Card className="p-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <h3 className="text-2xl font-bold mb-4">Ready to Start Collecting Testimonials?</h3>
              <p className="text-blue-100 mb-6">Join hundreds of freelancers and agencies already using TestimonialHero</p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-gray-900"
                  onKeyPress={(e) => e.key === 'Enter' && handleGetStarted()}
                />
                <Button 
                  onClick={handleGetStarted}
                  className="bg-white text-blue-600 hover:bg-gray-100"
                >
                  Start Free Now
                </Button>
              </div>
              
              <p className="text-xs text-blue-200 mt-3">
                No credit card required • Setup in under 60 seconds
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoSection;
