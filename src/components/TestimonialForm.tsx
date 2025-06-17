
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Star, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TestimonialFormProps {
  onNavigateToLanding: () => void;
}

const TestimonialForm: React.FC<TestimonialFormProps> = ({ onNavigateToLanding }) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    quote: '',
    rating: 5,
    email: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.quote) {
      toast({
        title: "Missing Information",
        description: "Please fill in your name and testimonial.",
        variant: "destructive",
      });
      return;
    }

    console.log('Testimonial submitted:', formData);
    setIsSubmitted(true);
    
    toast({
      title: "Thank You!",
      description: "Your testimonial has been submitted successfully.",
    });
  };

  const handleRatingClick = (rating: number) => {
    setFormData({ ...formData, rating });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md mx-auto p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Send className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Thank You!</h2>
          <p className="text-gray-600 mb-6">
            Your testimonial has been sent successfully. We really appreciate your feedback!
          </p>
          <Button 
            onClick={onNavigateToLanding}
            variant="outline"
            className="w-full"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to TestimonialHero
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
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
            variant="ghost" 
            size="sm" 
            onClick={onNavigateToLanding}
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Form Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Share Your Experience
            </h1>
            <p className="text-lg text-gray-600">
              Your feedback means the world to us and helps other potential clients make informed decisions.
            </p>
          </div>

          {/* Testimonial Form */}
          <Card className="p-8 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  How would you rate your experience?
                </label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleRatingClick(star)}
                      className="focus:outline-none"
                    >
                      <Star 
                        className={`w-8 h-8 ${
                          star <= formData.rating 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-gray-300'
                        } hover:text-yellow-400 transition-colors`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name *
                </label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Smith"
                  required
                />
              </div>

              {/* Company */}
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                  Company (Optional)
                </label>
                <Input
                  id="company"
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="Your Company Name"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email (Optional)
                </label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@company.com"
                />
              </div>

              {/* Testimonial */}
              <div>
                <label htmlFor="quote" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Testimonial *
                </label>
                <Textarea
                  id="quote"
                  value={formData.quote}
                  onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                  placeholder="Tell us about your experience working with us. What did you like most? How did we help your business?"
                  rows={6}
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  Feel free to mention specific results, what stood out, or how we exceeded your expectations.
                </p>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-3"
              >
                <Send className="w-5 h-5 mr-2" />
                Submit Testimonial
              </Button>
            </form>
          </Card>

          {/* Trust Signals */}
          <div className="text-center mt-8 text-sm text-gray-500">
            <p>🔒 Your information is secure and will only be used for testimonial purposes</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialForm;
