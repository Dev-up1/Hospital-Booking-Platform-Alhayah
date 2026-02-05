import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Search, Star, MapPin, Clock, Calendar, Filter } from 'lucide-react';

interface DoctorsPageProps {
  onNavigate: (page: string) => void;
}

export function DoctorsPage({ onNavigate }: DoctorsPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedAvailability, setSelectedAvailability] = useState('all');

  const doctors = [
    {
      id: 1,
      name: 'Dr. Sarah Wilson',
      specialty: 'Cardiology',
      department: 'Cardiology',
      rating: 4.9,
      reviewsCount: 156,
      experience: '15 years',
      education: 'MD, Harvard Medical School',
      availability: 'Available Today',
      nextAvailable: '2:30 PM',
      location: 'Building A, Floor 3',
      languages: ['English', 'Spanish'],
      image: 'https://images.unsplash.com/photo-1659353888906-adb3e0041693?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBkb2N0b3IlMjBwcm9mZXNzaW9uYWwlMjBtZWRpY2FsfGVufDF8fHx8MTc1NTM3Mjc1M3ww&ixlib=rb-4.1.0&q=80&w=1080',
      specializations: ['Heart Surgery', 'Interventional Cardiology', 'Cardiac Imaging']
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialty: 'Neurology',
      department: 'Neurology',
      rating: 4.8,
      reviewsCount: 143,
      experience: '12 years',
      education: 'MD, Johns Hopkins University',
      availability: 'Available Tomorrow',
      nextAvailable: '10:00 AM',
      location: 'Building B, Floor 2',
      languages: ['English', 'Mandarin'],
      image: 'https://images.unsplash.com/photo-1615177393114-bd2917a4f74a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBkb2N0b3IlMjBwb3J0cmFpdCUyMG1lZGljYWx8ZW58MXx8fHwxNzU1MzA5ODk3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      specializations: ['Stroke Treatment', 'Epilepsy', 'Movement Disorders']
    },
    {
      id: 3,
      name: 'Dr. Emily Johnson',
      specialty: 'Pediatrics',
      department: 'Pediatrics',
      rating: 4.9,
      reviewsCount: 198,
      experience: '18 years',
      education: 'MD, Stanford University',
      availability: 'Available Today',
      nextAvailable: '4:15 PM',
      location: 'Children\'s Wing, Floor 1',
      languages: ['English', 'French'],
      image: 'https://images.unsplash.com/photo-1659353888906-adb3e0041693?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBkb2N0b3IlMjBwcm9mZXNzaW9uYWwlMjBtZWRpY2FsfGVufDF8fHx8MTc1NTM3Mjc1M3ww&ixlib=rb-4.1.0&q=80&w=1080',
      specializations: ['Pediatric Cardiology', 'Child Development', 'Adolescent Medicine']
    },
    {
      id: 4,
      name: 'Dr. Robert Martinez',
      specialty: 'Orthopedics',
      department: 'Orthopedics',
      rating: 4.7,
      reviewsCount: 112,
      experience: '20 years',
      education: 'MD, Mayo Clinic',
      availability: 'Next Week',
      nextAvailable: 'Mon 9:00 AM',
      location: 'Building C, Floor 4',
      languages: ['English', 'Spanish'],
      image: 'https://images.unsplash.com/photo-1615177393114-bd2917a4f74a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBkb2N0b3IlMjBwb3J0cmFpdCUyMG1lZGljYWx8ZW58MXx8fHwxNzU1MzA5ODk3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      specializations: ['Joint Replacement', 'Sports Medicine', 'Spine Surgery']
    },
    {
      id: 5,
      name: 'Dr. Lisa Thompson',
      specialty: 'Internal Medicine',
      department: 'Internal Medicine',
      rating: 4.8,
      reviewsCount: 167,
      experience: '10 years',
      education: 'MD, UCLA Medical School',
      availability: 'Available Today',
      nextAvailable: '1:00 PM',
      location: 'Building A, Floor 2',
      languages: ['English'],
      image: 'https://images.unsplash.com/photo-1659353888906-adb3e0041693?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBkb2N0b3IlMjBwcm9mZXNzaW9uYWwlMjBtZWRpY2FsfGVufDF8fHx8MTc1NTM3Mjc1M3ww&ixlib=rb-4.1.0&q=80&w=1080',
      specializations: ['Preventive Care', 'Diabetes Management', 'Hypertension']
    },
    {
      id: 6,
      name: 'Dr. David Kim',
      specialty: 'Emergency Medicine',
      department: 'Emergency Medicine',
      rating: 4.6,
      reviewsCount: 89,
      experience: '8 years',
      education: 'MD, University of Michigan',
      availability: 'Available 24/7',
      nextAvailable: 'Now',
      location: 'Emergency Department',
      languages: ['English', 'Korean'],
      image: 'https://images.unsplash.com/photo-1615177393114-bd2917a4f74a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBkb2N0b3IlMjBwb3J0cmFpdCUyMG1lZGljYWx8ZW58MXx8fHwxNzU1MzA5ODk3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      specializations: ['Trauma Care', 'Critical Care', 'Emergency Surgery']
    }
  ];

  const departments = [
    'Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics', 'Internal Medicine', 
    'Emergency Medicine', 'Dermatology', 'Ophthalmology'
  ];

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || doctor.department === selectedDepartment;
    const matchesAvailability = selectedAvailability === 'all' || 
                               (selectedAvailability === 'today' && doctor.availability.includes('Today')) ||
                               (selectedAvailability === 'tomorrow' && doctor.availability.includes('Tomorrow')) ||
                               (selectedAvailability === 'week' && doctor.availability.includes('Week'));
    
    return matchesSearch && matchesDepartment && matchesAvailability;
  });

  const getAvailabilityColor = (availability: string) => {
    if (availability.includes('Today') || availability.includes('24/7') || availability.includes('Now')) {
      return 'bg-green-100 text-green-800';
    } else if (availability.includes('Tomorrow')) {
      return 'bg-blue-100 text-blue-800';
    } else {
      return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Find Your Doctor
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse our team of expert physicians and book appointments with ease. 
            All our doctors are board-certified and committed to providing exceptional care.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search doctors or specialties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger>
                <SelectValue placeholder="All Departments" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map(dept => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedAvailability} onValueChange={setSelectedAvailability}>
              <SelectTrigger>
                <SelectValue placeholder="Availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Availability</SelectItem>
                <SelectItem value="today">Available Today</SelectItem>
                <SelectItem value="tomorrow">Available Tomorrow</SelectItem>
                <SelectItem value="week">Available This Week</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              More Filters
            </Button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? 's' : ''}
            {searchTerm && ` for "${searchTerm}"`}
            {selectedDepartment !== 'all' && ` in ${selectedDepartment}`}
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {filteredDoctors.map((doctor) => (
            <Card key={doctor.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <ImageWithFallback
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                    <div className={`absolute -bottom-1 -right-1 px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(doctor.availability)}`}>
                      {doctor.availability.includes('24/7') ? '24/7' : doctor.availability.includes('Today') ? 'Today' : 'Soon'}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-1">{doctor.name}</CardTitle>
                    <CardDescription className="text-base mb-2">
                      {doctor.specialty} • {doctor.experience} experience
                    </CardDescription>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500" fill="currentColor" />
                        <span>{doctor.rating}</span>
                        <span>({doctor.reviewsCount} reviews)</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{doctor.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>Next: {doctor.nextAvailable}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">{doctor.education}</p>
                    <div className="flex flex-wrap gap-1">
                      {doctor.specializations.slice(0, 3).map((spec, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {spec}
                        </Badge>
                      ))}
                      {doctor.specializations.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{doctor.specializations.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>Languages:</span>
                    <span>{doctor.languages.join(', ')}</span>
                  </div>
                  
                  <div className="flex gap-3 pt-2">
                    <Button 
                      className="flex-1"
                      onClick={() => onNavigate('booking')}
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Book Appointment
                    </Button>
                    <Button variant="outline">
                      View Profile
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredDoctors.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              No doctors found
            </h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search criteria or browse all departments.
            </p>
            <Button 
              variant="outline"
              onClick={() => {
                setSearchTerm('');
                setSelectedDepartment('all');
                setSelectedAvailability('all');
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Call to Action */}
        <div className="bg-blue-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Need Help Finding the Right Doctor?
          </h2>
          <p className="text-gray-600 mb-6">
            Our patient coordinators can help match you with the best specialist for your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button>
              Contact Patient Services
            </Button>
            <Button variant="outline" onClick={() => onNavigate('departments')}>
              Browse Departments
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}