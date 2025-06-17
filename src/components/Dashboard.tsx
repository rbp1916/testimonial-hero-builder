
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Star, Copy, Download, Mail, Settings, Users, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DashboardProps {
  userEmail: string;
  onNavigateToLanding: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ userEmail, onNavigateToLanding }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'collect' | 'testimonials' | 'settings'>('overview');
  const [settings, setSettings] = useState({
    companyName: '',
    logoUrl: '',
    customMessage: ''
  });
  const [clientEmail, setClientEmail] = useState('');
  const { toast } = useToast();

  // Mock testimonials data
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      company: 'TechStart Inc.',
      quote: 'Absolutely amazing work! The team delivered exactly what we needed and exceeded our expectations.',
      rating: 5,
      date: '2024-01-15'
    },
    {
      id: 2,
      name: 'Mike Chen',
      company: 'Design Studio',
      quote: 'Professional, fast, and incredible attention to detail. Our new website is performing amazingly.',
      rating: 5,
      date: '2024-01-12'
    }
  ];

  const testimonialLink = `testimonialhero.app/submit/${userEmail.split('@')[0]}123`;

  const handleSendRequest = () => {
    if (!clientEmail || !clientEmail.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid client email address.",
        variant: "destructive",
      });
      return;
    }

    console.log('Sending testimonial request to:', clientEmail);
    toast({
      title: "Request Sent!",
      description: `Testimonial request sent to ${clientEmail}`,
    });
    setClientEmail('');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Link copied to clipboard",
    });
  };

  const downloadTestimonial = (testimonial: any) => {
    toast({
      title: "Downloaded!",
      description: `Testimonial card for ${testimonial.name} saved as PNG`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onNavigateToLanding}
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Star className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">TestimonialHero</span>
              </div>
            </div>
            <div className="text-sm text-gray-600">Welcome, {userEmail}</div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 space-y-2">
            <Button
              variant={activeTab === 'overview' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveTab('overview')}
            >
              <Zap className="w-4 h-4 mr-2" />
              Overview
            </Button>
            <Button
              variant={activeTab === 'collect' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveTab('collect')}
            >
              <Mail className="w-4 h-4 mr-2" />
              Collect
            </Button>
            <Button
              variant={activeTab === 'testimonials' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveTab('testimonials')}
            >
              <Users className="w-4 h-4 mr-2" />
              Testimonials
            </Button>
            <Button
              variant={activeTab === 'settings' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveTab('settings')}
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
                
                {/* Stats Cards */}
                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Total Testimonials</p>
                        <p className="text-3xl font-bold text-blue-600">{testimonials.length}</p>
                      </div>
                      <Users className="w-12 h-12 text-blue-600" />
                    </div>
                  </Card>
                  
                  <Card className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Average Rating</p>
                        <p className="text-3xl font-bold text-yellow-500">5.0</p>
                      </div>
                      <Star className="w-12 h-12 text-yellow-500" />
                    </div>
                  </Card>
                  
                  <Card className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">This Month</p>
                        <p className="text-3xl font-bold text-green-600">2</p>
                      </div>
                      <Zap className="w-12 h-12 text-green-600" />
                    </div>
                  </Card>
                </div>

                {/* Quick Actions */}
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                  <div className="flex gap-4">
                    <Button onClick={() => setActiveTab('collect')}>
                      <Mail className="w-4 h-4 mr-2" />
                      Request Testimonial
                    </Button>
                    <Button variant="outline" onClick={() => copyToClipboard(`https://${testimonialLink}`)}>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Your Link
                    </Button>
                  </div>
                </Card>
              </div>
            )}

            {activeTab === 'collect' && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold text-gray-900">Collect Testimonials</h1>
                
                {/* Your Link */}
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Your Testimonial Collection Link</h2>
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded border">
                    <code className="flex-1 text-sm">https://{testimonialLink}</code>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => copyToClipboard(`https://${testimonialLink}`)}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Share this link with clients to collect testimonials
                  </p>
                </Card>

                {/* Send Email Request */}
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Send Email Request</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Client Email Address
                      </label>
                      <div className="flex gap-2">
                        <Input
                          type="email"
                          placeholder="client@example.com"
                          value={clientEmail}
                          onChange={(e) => setClientEmail(e.target.value)}
                          className="flex-1"
                        />
                        <Button onClick={handleSendRequest}>
                          <Mail className="w-4 h-4 mr-2" />
                          Send Request
                        </Button>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded">
                      <h3 className="font-medium mb-2">Email Preview:</h3>
                      <div className="text-sm text-gray-600">
                        <p><strong>Subject:</strong> We&apos;d love your feedback!</p>
                        <p className="mt-2">Hi there,</p>
                        <p className="mt-1">We hope you&apos;re thrilled with our work! Would you mind taking 2 minutes to share your experience?</p>
                        <p className="mt-1 text-blue-600">→ Share Your Feedback (links to your form)</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {activeTab === 'testimonials' && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold text-gray-900">Your Testimonials</h1>
                
                <div className="space-y-4">
                  {testimonials.map((testimonial) => (
                    <Card key={testimonial.id} className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-lg font-semibold text-blue-600">
                              {testimonial.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                            <p className="text-gray-600 text-sm">{testimonial.company}</p>
                            <div className="flex mt-1">
                              {[...Array(testimonial.rating)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="text-sm text-gray-500">{testimonial.date}</div>
                      </div>
                      
                      <blockquote className="text-gray-700 italic mb-4">
                        &quot;{testimonial.quote}&quot;
                      </blockquote>
                      
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => downloadTestimonial(testimonial)}
                        >
                          <Download className="w-4 h-4 mr-1" />
                          Download Card
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => copyToClipboard(`"${testimonial.quote}" - ${testimonial.name}, ${testimonial.company}`)}
                        >
                          <Copy className="w-4 h-4 mr-1" />
                          Copy Text
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
                
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Branding</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Name
                      </label>
                      <Input
                        value={settings.companyName}
                        onChange={(e) => setSettings({...settings, companyName: e.target.value})}
                        placeholder="Your Company Name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Logo URL
                      </label>
                      <Input
                        value={settings.logoUrl}
                        onChange={(e) => setSettings({...settings, logoUrl: e.target.value})}
                        placeholder="https://yoursite.com/logo.png"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Custom Message (Optional)
                      </label>
                      <Textarea
                        value={settings.customMessage}
                        onChange={(e) => setSettings({...settings, customMessage: e.target.value})}
                        placeholder="Custom message to include in testimonial requests..."
                        rows={3}
                      />
                    </div>
                    
                    <Button>Save Settings</Button>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
