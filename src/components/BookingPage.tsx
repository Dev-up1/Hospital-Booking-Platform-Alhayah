import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Calendar } from './ui/calendar';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ArrowLeft, Calendar as CalendarIcon, Clock, MapPin, CreditCard, Check } from 'lucide-react';

interface BookingPageProps {
  onNavigate: (page: string) => void;
}

export function BookingPage({ onNavigate }: BookingPageProps) {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState('');
  const [appointmentType, setAppointmentType] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    patientName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    reason: '',
    insurance: '',
    emergencyContact: ''
  });

  // Mock doctor data (in real app, this would come from props or state)
  const selectedDoctor = {
    id: 1,
    name: 'Dr. Sarah Wilson',
    specialty: 'Cardiology',
    rating: 4.9,
    experience: '15 years',
    location: 'Building A, Floor 3',
    image: 'https://images.unsplash.com/photo-1659353888906-adb3e0041693?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBkb2N0b3IlMjBwcm9mZXNzaW9uYWwlMjBtZWRpY2FsfGVufDF8fHx8MTc1NTM3Mjc1M3ww&ixlib=rb-4.1.0&q=80&w=1080'
  };

  const availableTimes = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM'
  ];

  const appointmentTypes = [
    { value: 'consultation', label: 'Consultation', duration: '30 min', price: '$150' },
    { value: 'follow-up', label: 'Follow-up', duration: '15 min', price: '$100' },
    { value: 'physical', label: 'Physical Exam', duration: '45 min', price: '$200' },
    { value: 'procedure', label: 'Minor Procedure', duration: '60 min', price: '$300' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setBookingData(prev => ({ ...prev, [field]: value }));
  };

  const handleBookingSubmit = () => {
    // Mock booking submission
    setCurrentStep(4);
    // In real app, this would send data to backend
  };

  const isStepComplete = (step: number) => {
    switch (step) {
      case 1:
        return selectedDate && selectedTime && appointmentType;
      case 2:
        return bookingData.patientName && bookingData.email && bookingData.phone;
      case 3:
        return true; // Payment step
      default:
        return false;
    }
  };

  const StepIndicator = ({ step, title, isActive, isComplete }: { 
    step: number; 
    title: string; 
    isActive: boolean; 
    isComplete: boolean; 
  }) => (
    <div className="flex items-center">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
        isComplete ? 'bg-green-500 text-white' : 
        isActive ? 'bg-primary text-white' : 
        'bg-gray-200 text-gray-600'
      }`}>
        {isComplete ? <Check className="h-4 w-4" /> : step}
      </div>
      <span className={`ml-2 text-sm font-medium ${isActive ? 'text-primary' : 'text-gray-600'}`}>
        {title}
      </span>
    </div>
  );

  return (
    <div className="py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => onNavigate('doctors')}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Doctors
        </Button>

        {/* Step Indicator */}
        <div className="mb-8">
          <div className="flex justify-between items-center max-w-md mx-auto">
            <StepIndicator 
              step={1} 
              title="DateTime" 
              isActive={currentStep === 1} 
              isComplete={currentStep > 1} 
            />
            <div className="flex-1 h-px bg-gray-200 mx-4" />
            <StepIndicator 
              step={2} 
              title="Details" 
              isActive={currentStep === 2} 
              isComplete={currentStep > 2} 
            />
            <div className="flex-1 h-px bg-gray-200 mx-4" />
            <StepIndicator 
              step={3} 
              title="Payment" 
              isActive={currentStep === 3} 
              isComplete={currentStep > 3} 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {currentStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5" />
                    Select Date & Time
                  </CardTitle>
                  <CardDescription>
                    Choose your preferred appointment date and time
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Appointment Type */}
                  <div>
                    <Label>Appointment Type</Label>
                    <Select value={appointmentType} onValueChange={setAppointmentType}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select appointment type" />
                      </SelectTrigger>
                      <SelectContent>
                        {appointmentTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            <div className="flex justify-between w-full">
                              <span>{type.label}</span>
                              <span className="text-sm text-gray-500 ml-4">
                                {type.duration} • {type.price}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Calendar */}
                  <div>
                    <Label>Select Date</Label>
                    <div className="mt-1">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                        className="rounded-md border"
                      />
                    </div>
                  </div>

                  {/* Time Slots */}
                  {selectedDate && (
                    <div>
                      <Label>Available Times</Label>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mt-2">
                        {availableTimes.map((time) => (
                          <Button
                            key={time}
                            variant={selectedTime === time ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedTime(time)}
                            className="text-sm"
                          >
                            {time}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  <Button 
                    className="w-full"
                    disabled={!isStepComplete(1)}
                    onClick={() => setCurrentStep(2)}
                  >
                    Continue to Patient Details
                  </Button>
                </CardContent>
              </Card>
            )}

            {currentStep === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle>Patient Information</CardTitle>
                  <CardDescription>
                    Please provide your details for the appointment
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="patientName">Full Name *</Label>
                      <Input
                        id="patientName"
                        value={bookingData.patientName}
                        onChange={(e) => handleInputChange('patientName', e.target.value)}
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="dateOfBirth">Date of Birth</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={bookingData.dateOfBirth}
                        onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={bookingData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="your.email@example.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={bookingData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="insurance">Insurance Provider</Label>
                    <Select value={bookingData.insurance} onValueChange={(value) => handleInputChange('insurance', value)}>
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

                  <div>
                    <Label htmlFor="reason">Reason for Visit</Label>
                    <Textarea
                      id="reason"
                      value={bookingData.reason}
                      onChange={(e) => handleInputChange('reason', e.target.value)}
                      placeholder="Please describe your symptoms or reason for the appointment"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="emergencyContact">Emergency Contact</Label>
                    <Input
                      id="emergencyContact"
                      value={bookingData.emergencyContact}
                      onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                      placeholder="Emergency contact name and phone"
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button variant="outline" onClick={() => setCurrentStep(1)}>
                      Back
                    </Button>
                    <Button 
                      className="flex-1"
                      disabled={!isStepComplete(2)}
                      onClick={() => setCurrentStep(3)}
                    >
                      Continue to Payment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {currentStep === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Payment Information
                  </CardTitle>
                  <CardDescription>
                    Secure payment processing for your appointment
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <p className="text-sm text-blue-800">
                      <strong>Note:</strong> This is a demo payment form. In a real application, 
                      this would integrate with secure payment providers like Stripe or Square.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        disabled
                      />
                    </div>
                    <div>
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input
                        id="expiryDate"
                        placeholder="MM/YY"
                        disabled
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        disabled
                      />
                    </div>
                    <div>
                      <Label htmlFor="cardName">Name on Card</Label>
                      <Input
                        id="cardName"
                        placeholder="John Doe"
                        disabled
                      />
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span>Consultation Fee</span>
                      <span>$150.00</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span>Processing Fee</span>
                      <span>$5.00</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between items-center font-semibold">
                        <span>Total</span>
                        <span>$155.00</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button variant="outline" onClick={() => setCurrentStep(2)}>
                      Back
                    </Button>
                    <Button className="flex-1" onClick={handleBookingSubmit}>
                      Complete Booking
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {currentStep === 4 && (
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="h-8 w-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Appointment Confirmed!
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Your appointment has been successfully booked. You'll receive a confirmation email shortly.
                  </p>
                  
                  <div className="bg-gray-50 rounded-lg p-4 text-left mb-6">
                    <h3 className="font-medium mb-2">Appointment Details:</h3>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p><strong>Doctor:</strong> {selectedDoctor.name}</p>
                      <p><strong>Date:</strong> {selectedDate?.toDateString()}</p>
                      <p><strong>Time:</strong> {selectedTime}</p>
                      <p><strong>Type:</strong> {appointmentTypes.find(t => t.value === appointmentType)?.label}</p>
                      <p><strong>Location:</strong> {selectedDoctor.location}</p>
                    </div>
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
          </div>

          {/* Sidebar - Doctor Info */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="text-lg">Appointment Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <ImageWithFallback
                    src={selectedDoctor.image}
                    alt={selectedDoctor.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-medium">{selectedDoctor.name}</h3>
                    <p className="text-sm text-gray-600">{selectedDoctor.specialty}</p>
                    <p className="text-sm text-gray-600">{selectedDoctor.experience} experience</p>
                    <div className="flex items-center gap-1 mt-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="h-3 w-3 bg-yellow-400 rounded-full mr-0.5" />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">{selectedDoctor.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span>{selectedDoctor.location}</span>
                  </div>
                  
                  {selectedDate && (
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4 text-gray-400" />
                      <span>{selectedDate.toDateString()}</span>
                    </div>
                  )}
                  
                  {selectedTime && (
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span>{selectedTime}</span>
                    </div>
                  )}
                </div>

                {appointmentType && (
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">
                        {appointmentTypes.find(t => t.value === appointmentType)?.label}
                      </span>
                      <Badge variant="secondary">
                        {appointmentTypes.find(t => t.value === appointmentType)?.price}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {appointmentTypes.find(t => t.value === appointmentType)?.duration}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}