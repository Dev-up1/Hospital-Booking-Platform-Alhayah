import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Calendar, Clock, Shield, Stethoscope, Users, Heart, Star, CheckCircle } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const features = [
    {
      icon: Calendar,
      title: 'Easy Booking',
      description: 'Book appointments with your preferred doctors in just a few clicks'
    },
    {
      icon: Clock,
      title: 'Real-time Availability',
      description: 'See live availability and get instant confirmation for your appointments'
    },
    {
      icon: Shield,
      title: 'Secure Payments',
      description: 'Safe and secure electronic payment processing for all medical services'
    },
    {
      icon: Users,
      title: 'Expert Doctors',
      description: 'Access to qualified specialists across all medical departments'
    }
  ];

  const departments = [
    { name: 'Cardiology', icon: Heart, color: 'text-red-500' },
    { name: 'Neurology', icon: Stethoscope, color: 'text-blue-500' },
    { name: 'Pediatrics', icon: Users, color: 'text-green-500' },
    { name: 'Orthopedics', icon: Shield, color: 'text-purple-500' }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      text: 'Excellent service! The online booking system made it so easy to schedule my appointment.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      text: 'Professional staff and modern facilities. Highly recommend this hospital.',
      rating: 5
    },
    {
      name: 'Emily Davis',
      text: 'The doctor dashboard is intuitive and helps me manage my schedule efficiently.',
      rating: 5
    }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900">
                Your Health,{' '}
                <span className="text-primary">Our Priority</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Experience seamless healthcare with our advanced booking platform. 
                Connect with expert doctors, manage appointments, and receive quality care.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="px-8 py-3"
                  onClick={() => onNavigate('comprehensive-booking')}
                >
                  Book Any Service
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="px-8 py-3"
                  onClick={() => onNavigate('doctors')}
                >
                  Find Doctors
                </Button>
              </div>
              
              {/* Stats */}
              <div className="flex flex-wrap gap-8 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">50+</div>
                  <div className="text-sm text-gray-600">Expert Doctors</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">10k+</div>
                  <div className="text-sm text-gray-600">Happy Patients</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">15</div>
                  <div className="text-sm text-gray-600">Departments</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1642975967602-653d378f3b5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwZG9jdG9yJTIwcHJvZmVzc2lvbmFsJTIwaG9zcGl0YWwlMjB3aGl0ZSUyMGNvYXQlMjBob3Jpem9udGFsfGVufDF8fHx8MTc3MDAyNzY5Mnww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Professional Doctor"
                  className="w-full h-96 object-cover object-top scale-110"
                />
              </div>
              
              {/* Floating Cards */}
              <div className="absolute -top-4 -left-4 bg-white rounded-lg shadow-lg p-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-medium">24/7 Available</span>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-lg p-4">
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-500" fill="currentColor" />
                  <span className="text-sm font-medium">4.9/5 Rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose MediCare?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're committed to providing exceptional healthcare services with modern technology and compassionate care.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Departments Preview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Medical Departments
            </h2>
            <p className="text-lg text-gray-600">
              Comprehensive healthcare services across specialized departments
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {departments.map((dept, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => onNavigate('departments')}
              >
                <dept.icon className={`h-8 w-8 mx-auto mb-3 ${dept.color}`} />
                <h3 className="font-medium text-gray-900">{dept.name}</h3>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Button 
              variant="outline" 
              onClick={() => onNavigate('departments')}
              className="px-8 py-3"
            >
              View All Departments
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Our Patients Say
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-500" fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
                  <p className="font-medium text-gray-900">- {testimonial.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Book Your Appointment?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of satisfied patients who trust MediCare for their healthcare needs.
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            className="px-8 py-3"
            onClick={() => onNavigate('comprehensive-booking')}
          >
            Book Services Now
          </Button>
        </div>
      </section>
    </div>
  );
}