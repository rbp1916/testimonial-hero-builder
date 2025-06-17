
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Star, Zap, Users, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LandingSectionProps {
  onNavigateToDemo: () => void;
  onNavigateToDashboard: (email: string) => void;
}

const LandingSection: React.FC<LandingSectionProps> = ({ onNavigateToDemo, onNavigateToDashboard }) => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleGetStarted = () => {
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email to get started.",
        variant: "destructive",
      });
      return;
    }
    if (!email.includes('@')) {
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
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Star className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">TestimonialHero</span>
          </div>
          <Button 
            variant="outline" 
            onClick={onNavigateToDemo}
            className="hover:bg-blue-50"
          >
            See Demo
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Get Stunning Client
            <span className="text-blue-600 block">Testimonials in 60 Seconds</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            No login, no setup, no code. Just one link to collect and share client praise.
            Perfect for freelancers and small agencies.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button 
              size="lg" 
              onClick={onNavigateToDemo}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg animate-pulse"
            >
              <Zap className="w-5 h-5 mr-2" />
              See It In Action
            </Button>
            
            <div className="flex items-center gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-64"
                onKeyPress={(e) => e.key === 'Enter' && handleGetStarted()}
              />
              <Button 
                onClick={handleGetStarted}
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                Start for Free
              </Button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <Card className="p-6 border-none shadow-lg hover:shadow-xl transition-shadow bg-white">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Instant Setup</h3>
              <p className="text-gray-600">Share your custom link immediately. No technical setup required.</p>
            </Card>

            <Card className="p-6 border-none shadow-lg hover:shadow-xl transition-shadow bg-white">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Client-Friendly</h3>
              <p className="text-gray-600">Beautiful forms that clients actually want to fill out.</p>
            </Card>

            <Card className="p-6 border-none shadow-lg hover:shadow-xl transition-shadow bg-white">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Download className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Ready to Share</h3>
              <p className="text-gray-600">Download cards or embed testimonials anywhere instantly.</p>
            </Card>
          </div>

          {/* Social Proof Carousel */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-semibold mb-8 text-gray-900">Join 500+ Happy Users</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 italic mb-2">"TestimonialHero made collecting client feedback effortless. I got 5 testimonials in my first week!"</p>
                <p className="font-semibold">Sarah Chen</p>
                <p className="text-sm text-gray-500">Freelance Designer</p>
              </div>
              
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 italic mb-2">"The testimonial cards look so professional. My clients love how easy the process is."</p>
                <p className="font-semibold">Mike Rodriguez</p>
                <p className="text-sm text-gray-500">Marketing Agency Owner</p>
              </div>
              
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 italic mb-2">"Finally, a testimonial tool that just works. No complex setup, instant results."</p>
                <p className="font-semibold">Emma Thompson</p>
                <p className="text-sm text-gray-500">Consultant</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingSection;
