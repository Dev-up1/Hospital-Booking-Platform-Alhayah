import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Calendar } from './ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { Alert, AlertDescription } from './ui/alert';
import { getServerUrl } from '../utils/supabase/client';
import { publicAnonKey } from '../utils/supabase/info';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Heart, 
  Stethoscope, 
  MessageSquare, 
  Scissors,
  Users,
  Video,
  CheckCircle,
  ArrowLeft,
  Star,
  Brain,
  Baby,
  Bone,
  Eye,
  Zap,
  Activity,
  Loader2
} from 'lucide-react';

interface ComprehensiveBookingProps {
  onNavigate: (page: string) => void;
  user: any;
  accessToken: string;
}

export function ComprehensiveBooking({ onNavigate, user, accessToken }: ComprehensiveBookingProps) {
  const [selectedService, setSelectedService] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [specialties, setSpecialties] = useState<any[]>([]);
  const [doctorsBySpecialty, setDoctorsBySpecialty] = useState<any>({});
  const [availabilityData, setAvailabilityData] = useState<any>({});
  const [bookingData, setBookingData] = useState({
    patientName: user?.name || '',
    email: user?.email || '',
    phone: '',
    urgency: '',
    symptoms: '',
    preferredContact: 'phone',
    insurance: ''
  });

  // Load specialties and doctors on component mount
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        // Load specialties
        const specialtiesRes = await fetch(getServerUrl('/specialties'), {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        });
        
        if (specialtiesRes.ok) {
          const data = await specialtiesRes.json();
          setSpecialties(data.specialties || []);
        }
      } catch (err) {
        console.error('Error loading initial data:', err);
      }
    };

    loadInitialData();
  }, []);

  // Load doctors when specialty is selected
  useEffect(() => {
    const loadDoctors = async () => {
      if (!selectedSpecialty) return;

      try {
        const response = await fetch(
          getServerUrl(`/specialties/${selectedSpecialty}/doctors`),
          {
            headers: {
              'Authorization': `Bearer ${publicAnonKey}`
            }
          }
        );

        if (response.ok) {
          const data = await response.json();
          setDoctorsBySpecialty((prev: any) => ({
            ...prev,
            [selectedSpecialty]: data.doctors || []
          }));
        }
      } catch (err) {
        console.error('Error loading doctors:', err);
      }
    };

    loadDoctors();
  }, [selectedSpecialty]);

  // Load availability when doctor, date, and time are selected
  useEffect(() => {
    const loadAvailability = async () => {
      if (!selectedDoctor || !selectedDate || !selectedTime) return;

      const dateStr = selectedDate.toISOString().split('T')[0];
      const key = `${selectedDoctor}:${dateStr}:${selectedTime}`;

      try {
        const response = await fetch(
          getServerUrl(`/availability/${selectedDoctor}/${dateStr}/${encodeURIComponent(selectedTime)}`),
          {
            headers: {
              'Authorization': `Bearer ${publicAnonKey}`
            }
          }
        );

        if (response.ok) {
          const data = await response.json();
          setAvailabilityData((prev: any) => ({
            ...prev,
            [key]: data
          }));
        }
      } catch (err) {
        console.error('Error loading availability:', err);
      }
    };

    loadAvailability();
  }, [selectedDoctor, selectedDate, selectedTime]);

  const services = [
    {
      id: 'doctor-appointment',
      title: 'Doctor Appointment',
      description: 'Schedule a consultation with our specialist doctors',
      icon: Stethoscope,
      duration: '30-60 minutes',
      price: '$150-300',
      color: 'bg-blue-50 border-blue-200 text-blue-700',
      iconColor: 'text-blue-600'
    },
    {
      id: 'digital-inquiry',
      title: 'Digital Health Inquiry',
      description: 'Get medical advice through our telehealth platform',
      icon: Video,
      duration: '15-30 minutes',
      price: '$75-150',
      color: 'bg-green-50 border-green-200 text-green-700',
      iconColor: 'text-green-600'
    },
    {
      id: 'surgery-booking',
      title: 'Surgery Scheduling',
      description: 'Book surgical procedures with our expert surgeons',
      icon: Scissors,
      duration: '1-4 hours',
      price: '$2,000-15,000',
      color: 'bg-red-50 border-red-200 text-red-700',
      iconColor: 'text-red-600'
    },
    {
      id: 'emergency-consultation',
      title: 'Emergency Consultation',
      description: 'Urgent medical consultation for immediate concerns',
      icon: Heart,
      duration: '20-45 minutes',
      price: '$200-400',
      color: 'bg-orange-50 border-orange-200 text-orange-700',
      iconColor: 'text-orange-600'
    },
    {
      id: 'group-consultation',
      title: 'Group Health Session',
      description: 'Health education and consultation sessions',
      icon: Users,
      duration: '60-90 minutes',
      price: '$50-100',
      color: 'bg-purple-50 border-purple-200 text-purple-700',
      iconColor: 'text-purple-600'
    },
    {
      id: 'health-chat',
      title: 'Health Chat Support',
      description: 'Text-based health consultation and support',
      icon: MessageSquare,
      duration: '24/7 Available',
      price: '$25-75',
      color: 'bg-indigo-50 border-indigo-200 text-indigo-700',
      iconColor: 'text-indigo-600'
    }
  ];

  const specialtyIcons: any = {
    'cardiology': Heart,
    'neurology': Brain,
    'pediatrics': Baby,
    'orthopedics': Bone,
    'ophthalmology': Eye,
    'dermatology': Activity,
    'psychiatry': Zap,
    'internal-medicine': Stethoscope
  };

  const doctors = {
    'digital-inquiry': [
      { id: '4', name: 'Dr. Lisa Thompson', specialty: 'Internal Medicine', rating: 4.8, nextAvailable: 'Available Now' },
      { id: '5', name: 'Dr. David Kim', specialty: 'Emergency Medicine', rating: 4.6, nextAvailable: 'Available Now' }
    ],
    'surgery-booking': [
      { id: '6', name: 'Dr. Robert Martinez', specialty: 'Orthopedic Surgery', rating: 4.7, nextAvailable: 'Next Week' },
      { id: '7', name: 'Dr. Jennifer Davis', specialty: 'Cardiac Surgery', rating: 4.9, nextAvailable: 'In 2 weeks' }
    ],
    'emergency-consultation': [
      { id: '8', name: 'Dr. Alex Rodriguez', specialty: 'Emergency Medicine', rating: 4.8, nextAvailable: 'Available Now' },
      { id: '9', name: 'Dr. Maria Garcia', specialty: 'Urgent Care', rating: 4.7, nextAvailable: 'Available Now' }
    ],
    'group-consultation': [
      { id: '10', name: 'Dr. Thomas Brown', specialty: 'Public Health', rating: 4.6, nextAvailable: 'This Saturday' },
      { id: '11', name: 'Dr. Anna Lee', specialty: 'Nutrition', rating: 4.8, nextAvailable: 'Next Monday' }
    ],
    'health-chat': [
      { id: '12', name: 'Nurse Rebecca Wilson', specialty: 'General Health', rating: 4.5, nextAvailable: 'Online Now' },
      { id: '13', name: 'Health Assistant John', specialty: 'Health Guidance', rating: 4.4, nextAvailable: 'Online Now' }
    ]
  };

  // Get booking data for time slots - now using real data from backend
  const getTimeSlotBookings = (doctorId: string, date: Date, time: string) => {
    const dateStr = date.toISOString().split('T')[0];
    const key = `${doctorId}:${dateStr}:${time}`;
    
    // Return real data if available, otherwise return default values
    if (availabilityData[key]) {
      return {
        booked: availabilityData[key].booked,
        limit: availabilityData[key].limit
      };
    }

    // Fallback to default values while loading
    const doctor = Object.values(doctorsBySpecialty).flat().find((d: any) => d.id === doctorId);
    if (!doctor) return { booked: 0, limit: 1 };
    
    const periodLimit = Math.floor((doctor as any).dailyLimit / 2);
    
    return {
      booked: 0,
      limit: periodLimit
    };
  };

  const getAvailableSlots = (service: string, date: Date, doctorId?: string) => {
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();
    const isTomorrow = date.toDateString() === new Date(today.getTime() + 24 * 60 * 60 * 1000).toDateString();

    switch (service) {
      case 'doctor-appointment':
        // Always return morning and evening periods for doctor appointments
        return ['Morning Period (8:00 AM - 12:00 PM)', 'Evening Period (4:00 PM - 9:00 PM)'];
      
      case 'digital-inquiry':
        return ['Available Now', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM'];
      
      case 'surgery-booking':
        if (isToday || isTomorrow) return [];
        return ['7:00 AM', '9:00 AM', '11:00 AM', '1:00 PM'];
      
      case 'emergency-consultation':
        return ['Available Now', 'Next 15 min', 'Next 30 min', 'Next 45 min'];
      
      case 'group-consultation':
        if (date.getDay() === 6) return ['10:00 AM', '2:00 PM']; // Saturday
        if (date.getDay() === 1) return ['6:00 PM']; // Monday
        return [];
      
      case 'health-chat':
        return ['Available 24/7'];
      
      default:
        return [];
    }
  };

  const currentSpecialtyDoctors = selectedSpecialty && selectedService === 'doctor-appointment' 
    ? doctorsBySpecialty[selectedSpecialty as keyof typeof doctorsBySpecialty] || []
    : [];

  const availableSlots = selectedService && selectedDate ? getAvailableSlots(selectedService, selectedDate, selectedDoctor) : [];

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
    setSelectedSpecialty('');
    setSelectedDate(undefined);
    setSelectedTime('');
    setSelectedDoctor('');
  };

  const handleSpecialtySelect = (specialtyId: string) => {
    setSelectedSpecialty(specialtyId);
    setSelectedDoctor('');
    setSelectedDate(undefined);
    setSelectedTime('');
  };

  const handleBookingComplete = async () => {
    if (!user || !accessToken) {
      setError('Please log in to complete your booking');
      return;
    }

    setLoading(true);
    setError('');
    const dateStr = selectedDate?.toISOString().split('T')[0];

    try {
      const response = await fetch(
        getServerUrl('/bookings'),
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            selectedService,
            selectedSpecialty,
            selectedDoctor,
            selectedDate: dateStr,
            selectedTime,
            patientName: bookingData.patientName,
            email: bookingData.email,
            phone: bookingData.phone,
            urgency: bookingData.urgency,
            symptoms: bookingData.symptoms,
            preferredContact: bookingData.preferredContact,
            insurance: bookingData.insurance
          })
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log('Booking successful:', data);
        setCurrentStep(3);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to book appointment');
      }
    } catch (err: any) {
      console.error('Error booking appointment:', err);
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const getUrgencyOptions = () => {
    switch (selectedService) {
      case 'emergency-consultation':
        return [
          { value: 'immediate', label: 'Immediate - Life threatening' },
          { value: 'urgent', label: 'Urgent - Within 2 hours' },
          { value: 'soon', label: 'Soon - Within 24 hours' }
        ];
      case 'surgery-booking':
        return [
          { value: 'scheduled', label: 'Scheduled - Plan ahead' },
          { value: 'urgent', label: 'Urgent - Within 2 weeks' },
          { value: 'emergency', label: 'Emergency - ASAP' }
        ];
      default:
        return [
          { value: 'routine', label: 'Routine - General care' },
          { value: 'urgent', label: 'Urgent - Need soon' },
          { value: 'follow-up', label: 'Follow-up - Previous visit' }
        ];
    }
  };

  return (
    <div className="py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => onNavigate('home')}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Book Medical Services
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from our comprehensive range of medical services. 
            See real-time availability and book instantly.
          </p>
        </div>

        {currentStep === 1 && (
          <>
            {/* Service Selection */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Select a Service
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                  <Card 
                    key={service.id}
                    className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                      selectedService === service.id 
                        ? `${service.color} border-2 shadow-lg` 
                        : 'border border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleServiceSelect(service.id)}
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`p-3 rounded-full ${
                          selectedService === service.id ? 'bg-white' : service.color.split(' ')[0]
                        }`}>
                          <service.icon className={`h-6 w-6 ${service.iconColor}`} />
                        </div>
                        {selectedService === service.id && (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        )}
                      </div>
                      <CardTitle className="text-lg">{service.title}</CardTitle>
                      <CardDescription className="text-sm">
                        {service.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span>{service.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-semibold text-primary">
                            {service.price}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Specialty Selection for Doctor Appointments */}
            {selectedService === 'doctor-appointment' && (
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  Choose Medical Specialty
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {specialties.map((specialty) => {
                    const IconComponent = specialtyIcons[specialty.id] || Stethoscope;
                    return (
                      <Card 
                        key={specialty.id}
                        className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                          selectedSpecialty === specialty.id 
                            ? 'border-primary bg-primary/5 border-2' 
                            : 'border border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => handleSpecialtySelect(specialty.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${
                              selectedSpecialty === specialty.id 
                                ? 'bg-primary/10' 
                                : 'bg-gray-100'
                            }`}>
                              <IconComponent className={`h-5 w-5 ${
                                selectedSpecialty === specialty.id 
                                  ? 'text-primary' 
                                  : 'text-gray-600'
                              }`} />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-sm">{specialty.name}</h4>
                              <p className="text-xs text-gray-500">{specialty.description}</p>
                            </div>
                            {selectedSpecialty === specialty.id && (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Enhanced Doctor Selection for Doctor Appointments */}
            {selectedService === 'doctor-appointment' && selectedSpecialty && (
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  Available Doctors
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {currentSpecialtyDoctors.map((doctor) => (
                    <Card 
                      key={doctor.id}
                      className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                        selectedDoctor === doctor.id 
                          ? 'border-primary bg-primary/5 border-2' 
                          : 'border border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedDoctor(doctor.id)}
                    >
                      <CardContent className="p-6">
                        <div className="flex gap-4">
                          <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200">
                            <img 
                              src={doctor.image} 
                              alt={doctor.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-semibold text-lg">{doctor.name}</h4>
                                <p className="text-gray-600 mb-1">{doctor.specialty}</p>
                                <p className="text-sm text-gray-500 mb-2">{doctor.experience} experience</p>
                                <div className="flex items-center gap-1 mb-2">
                                  <Star className="h-4 w-4 text-yellow-500" fill="currentColor" />
                                  <span className="text-sm font-medium">{doctor.rating}</span>
                                  <span className="text-sm text-gray-500">(120+ reviews)</span>
                                </div>
                                <div className="text-sm">
                                  <span className="text-gray-500">Daily Limit: </span>
                                  <span className="font-medium">{doctor.dailyLimit} patients</span>
                                </div>
                              </div>
                              <div className="text-right">
                                <Badge variant="secondary" className="mb-2">
                                  {doctor.nextAvailable}
                                </Badge>
                                {selectedDoctor === doctor.id && (
                                  <div className="flex justify-end">
                                    <CheckCircle className="h-5 w-5 text-green-600" />
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Date & Time Selection */}
            {selectedService && ((selectedService === 'doctor-appointment' && selectedDoctor) || selectedService !== 'doctor-appointment') && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CalendarIcon className="h-5 w-5" />
                      Select Date
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => {
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        return date < today;
                      }}
                      className="rounded-md border"
                    />
                  </CardContent>
                </Card>

                {selectedDate && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Clock className="h-5 w-5" />
                        Available Times
                      </CardTitle>
                      <CardDescription>
                        {selectedDate.toDateString()}
                        {selectedService === 'doctor-appointment' && selectedDoctor && (
                          <span className="block mt-1 text-xs">
                            Each period shows current bookings / period limit
                          </span>
                        )}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {availableSlots.length > 0 ? (
                        <div className="space-y-2">
                          {availableSlots.map((slot) => {
                            if (selectedService === 'doctor-appointment' && selectedDoctor) {
                              const bookingInfo = getTimeSlotBookings(selectedDoctor, selectedDate, slot);
                              const isFullyBooked = bookingInfo.booked >= bookingInfo.limit;
                              const availabilityPercentage = (bookingInfo.booked / bookingInfo.limit) * 100;
                              
                              return (
                                <div key={slot} className="space-y-1">
                                  <Button
                                    variant={selectedTime === slot ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => !isFullyBooked && setSelectedTime(slot)}
                                    disabled={isFullyBooked}
                                    className={`w-full justify-between text-sm ${
                                      isFullyBooked ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                                  >
                                    <span>{slot}</span>
                                    <span className="text-xs">
                                      {bookingInfo.booked}/{bookingInfo.limit}
                                      {isFullyBooked ? ' (Full)' : ` (${bookingInfo.limit - bookingInfo.booked} left)`}
                                    </span>
                                  </Button>
                                  <div className="px-3">
                                    <Progress 
                                      value={availabilityPercentage} 
                                      className="h-1"
                                    />
                                  </div>
                                </div>
                              );
                            } else {
                              return (
                                <Button
                                  key={slot}
                                  variant={selectedTime === slot ? "default" : "outline"}
                                  size="sm"
                                  onClick={() => setSelectedTime(slot)}
                                  className="text-sm mr-2 mb-2"
                                >
                                  {slot}
                                </Button>
                              );
                            }
                          })}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          <Clock className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                          <p>No available slots for this date</p>
                          <p className="text-sm">Please select another date</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {/* Doctor Selection for Other Services */}
            {selectedService && selectedService !== 'doctor-appointment' && selectedTime && (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Select Healthcare Provider</CardTitle>
                  <CardDescription>
                    Choose your preferred doctor or healthcare provider
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {doctors[selectedService as keyof typeof doctors]?.map((doctor) => (
                      <div
                        key={doctor.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          selectedDoctor === doctor.id 
                            ? 'border-primary bg-primary/5' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setSelectedDoctor(doctor.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{doctor.name}</h4>
                            <p className="text-sm text-gray-600">{doctor.specialty}</p>
                            <div className="flex items-center gap-1 mt-1">
                              <Star className="h-4 w-4 text-yellow-500" fill="currentColor" />
                              <span className="text-sm">{doctor.rating}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge variant="secondary" className="mb-2">
                              {doctor.nextAvailable}
                            </Badge>
                            {selectedDoctor === doctor.id && (
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Continue Button */}
            {selectedService && selectedTime && selectedDoctor && (
              <div className="text-center">
                <Button 
                  size="lg"
                  onClick={() => setCurrentStep(2)}
                  className="px-8 py-3"
                >
                  Continue to Details
                </Button>
              </div>
            )}
          </>
        )}

        {currentStep === 2 && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Patient Information</CardTitle>
              <CardDescription>
                Please provide your details for the appointment
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {!user && (
                <Alert>
                  <AlertDescription>
                    Please log in to complete your booking. <button onClick={() => onNavigate('home')} className="underline">Go to login</button>
                  </AlertDescription>
                </Alert>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="patientName">Full Name *</Label>
                  <Input
                    id="patientName"
                    value={bookingData.patientName}
                    onChange={(e) => setBookingData(prev => ({ ...prev, patientName: e.target.value }))}
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={bookingData.phone}
                    onChange={(e) => setBookingData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={bookingData.email}
                  onChange={(e) => setBookingData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <Label htmlFor="urgency">Urgency Level</Label>
                <Select value={bookingData.urgency} onValueChange={(value) => 
                  setBookingData(prev => ({ ...prev, urgency: value }))
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="Select urgency level" />
                  </SelectTrigger>
                  <SelectContent>
                    {getUrgencyOptions().map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="symptoms">Symptoms or Reason for Visit</Label>
                <Textarea
                  id="symptoms"
                  value={bookingData.symptoms}
                  onChange={(e) => setBookingData(prev => ({ ...prev, symptoms: e.target.value }))}
                  placeholder="Please describe your symptoms or reason for the appointment"
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="preferredContact">Preferred Contact Method</Label>
                <Select value={bookingData.preferredContact} onValueChange={(value) => 
                  setBookingData(prev => ({ ...prev, preferredContact: value }))
                }>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="phone">Phone Call</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="sms">Text Message</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="insurance">Insurance Provider</Label>
                <Select value={bookingData.insurance} onValueChange={(value) => 
                  setBookingData(prev => ({ ...prev, insurance: value }))
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="Select insurance provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aetna">Aetna</SelectItem>
                    <SelectItem value="bluecross">Blue Cross Blue Shield</SelectItem>
                    <SelectItem value="cigna">Cigna</SelectItem>
                    <SelectItem value="united">United Healthcare</SelectItem>
                    <SelectItem value="medicare">Medicare</SelectItem>
                    <SelectItem value="none">No Insurance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setCurrentStep(1)}>
                  Back
                </Button>
                <Button 
                  className="flex-1"
                  onClick={handleBookingComplete}
                  disabled={!bookingData.patientName || !bookingData.email || !bookingData.phone}
                >
                  Complete Booking
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {currentStep === 3 && (
          <Card className="max-w-2xl mx-auto">
            <CardContent className="pt-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Booking Confirmed!
              </h2>
              <p className="text-gray-600 mb-6">
                Your {services.find(s => s.id === selectedService)?.title.toLowerCase()} has been successfully booked.
              </p>
              
              <div className="bg-gray-50 rounded-lg p-6 text-left mb-6">
                <h3 className="font-medium mb-4">Booking Details:</h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span className="font-medium">Service:</span>
                    <span>{services.find(s => s.id === selectedService)?.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Date:</span>
                    <span>{selectedDate?.toDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Time:</span>
                    <span>{selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Provider:</span>
                    <span>{
                      selectedService === 'doctor-appointment' && selectedSpecialty
                        ? currentSpecialtyDoctors.find(d => d.id === selectedDoctor)?.name
                        : doctors[selectedService as keyof typeof doctors]?.find(d => d.id === selectedDoctor)?.name
                    }</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Patient:</span>
                    <span>{bookingData.patientName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Contact:</span>
                    <span>{bookingData.email}</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-800">
                  <strong>Next Steps:</strong> You will receive a confirmation email within 5 minutes. 
                  Please check your email for detailed instructions and appointment preparation guidelines.
                </p>
              </div>

              <div className="flex gap-4">
                <Button variant="outline" onClick={() => onNavigate('patient-dashboard')}>
                  View Dashboard
                </Button>
                <Button onClick={() => onNavigate('home')}>
                  Back to Home
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {loading && (
          <Card className="max-w-2xl mx-auto">
            <CardContent className="pt-6 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Loader2 className="h-8 w-8 text-gray-600 animate-spin" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Processing...
              </h2>
              <p className="text-gray-600 mb-6">
                Your booking is being processed. Please wait.
              </p>
            </CardContent>
          </Card>
        )}

        {error && (
          <Card className="max-w-2xl mx-auto">
            <CardContent className="pt-6 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Alert className="h-8 w-8 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Booking Failed
              </h2>
              <p className="text-gray-600 mb-6">
                {error}
              </p>
              
              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setCurrentStep(1)}>
                  Try Again
                </Button>
                <Button onClick={() => onNavigate('home')}>
                  Back to Home
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}