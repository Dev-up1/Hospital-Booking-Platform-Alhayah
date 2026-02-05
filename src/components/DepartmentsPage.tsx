import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Heart, 
  Brain, 
  Baby, 
  Bone, 
  Eye, 
  Activity, 
  Stethoscope,
  Shield,
  Users,
  Microscope,
  Pill,
  Scissors
} from 'lucide-react';

interface DepartmentsPageProps {
  onNavigate: (page: string) => void;
}

export function DepartmentsPage({ onNavigate }: DepartmentsPageProps) {
  const departments = [
    {
      id: 1,
      name: 'Cardiology',
      icon: Heart,
      description: 'Comprehensive heart and cardiovascular care with advanced diagnostic and treatment options.',
      specialties: ['Heart Surgery', 'Cardiac Catheterization', 'Echocardiography', 'Arrhythmia Treatment'],
      doctorsCount: 8,
      color: 'text-red-500',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    },
    {
      id: 2,
      name: 'Neurology',
      icon: Brain,
      description: 'Expert care for disorders of the brain, spinal cord, and nervous system.',
      specialties: ['Stroke Treatment', 'Epilepsy Care', 'Movement Disorders', 'Memory Disorders'],
      doctorsCount: 6,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    {
      id: 3,
      name: 'Pediatrics',
      icon: Baby,
      description: 'Specialized medical care for infants, children, and adolescents.',
      specialties: ['Newborn Care', 'Childhood Development', 'Pediatric Surgery', 'Immunizations'],
      doctorsCount: 10,
      color: 'text-green-500',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      id: 4,
      name: 'Orthopedics',
      icon: Bone,
      description: 'Treatment of musculoskeletal conditions including bones, joints, and muscles.',
      specialties: ['Joint Replacement', 'Sports Medicine', 'Spine Surgery', 'Trauma Care'],
      doctorsCount: 7,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      id: 5,
      name: 'Ophthalmology',
      icon: Eye,
      description: 'Complete eye care services from routine exams to complex surgical procedures.',
      specialties: ['Cataract Surgery', 'Retinal Disorders', 'Glaucoma Treatment', 'LASIK'],
      doctorsCount: 4,
      color: 'text-amber-500',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200'
    },
    {
      id: 6,
      name: 'Emergency Medicine',
      icon: Activity,
      description: '24/7 emergency care for urgent medical conditions and trauma.',
      specialties: ['Trauma Care', 'Critical Care', 'Emergency Surgery', 'Toxicology'],
      doctorsCount: 12,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    },
    {
      id: 7,
      name: 'Internal Medicine',
      icon: Stethoscope,
      description: 'Primary care for adults with focus on prevention and treatment of diseases.',
      specialties: ['Preventive Care', 'Chronic Disease Management', 'Health Screenings', 'Geriatric Care'],
      doctorsCount: 9,
      color: 'text-indigo-500',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200'
    },
    {
      id: 8,
      name: 'Dermatology',
      icon: Shield,
      description: 'Diagnosis and treatment of skin, hair, and nail conditions.',
      specialties: ['Skin Cancer Screening', 'Cosmetic Dermatology', 'Acne Treatment', 'Psoriasis Care'],
      doctorsCount: 5,
      color: 'text-pink-500',
      bgColor: 'bg-pink-50',
      borderColor: 'border-pink-200'
    },
    {
      id: 9,
      name: 'Obstetrics & Gynecology',
      icon: Users,
      description: 'Comprehensive womens health care including pregnancy and reproductive health.',
      specialties: ['Prenatal Care', 'Labor & Delivery', 'Gynecologic Surgery', 'Fertility Treatment'],
      doctorsCount: 8,
      color: 'text-rose-500',
      bgColor: 'bg-rose-50',
      borderColor: 'border-rose-200'
    },
    {
      id: 10,
      name: 'Pathology',
      icon: Microscope,
      description: 'Laboratory services and diagnostic testing for accurate medical diagnoses.',
      specialties: ['Blood Tests', 'Tissue Analysis', 'Genetic Testing', 'Microbiology'],
      doctorsCount: 3,
      color: 'text-teal-500',
      bgColor: 'bg-teal-50',
      borderColor: 'border-teal-200'
    },
    {
      id: 11,
      name: 'Pharmacy',
      icon: Pill,
      description: 'Full-service pharmacy with medication management and consultation.',
      specialties: ['Prescription Filling', 'Drug Interaction Checks', 'Medication Therapy', 'Immunizations'],
      doctorsCount: 4,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    },
    {
      id: 12,
      name: 'Surgery',
      icon: Scissors,
      description: 'Advanced surgical procedures with minimally invasive techniques.',
      specialties: ['General Surgery', 'Laparoscopic Surgery', 'Robotic Surgery', 'Outpatient Procedures'],
      doctorsCount: 11,
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200'
    }
  ];

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Medical Departments
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our comprehensive range of medical specialties ensures you receive expert care 
            for all your health needs. Each department is staffed with board-certified specialists 
            and equipped with state-of-the-art technology.
          </p>
        </div>

        {/* Departments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {departments.map((department) => (
            <Card 
              key={department.id} 
              className={`hover:shadow-xl transition-all duration-300 cursor-pointer group ${department.borderColor} border-2 hover:scale-105`}
              onClick={() => onNavigate('doctors')}
            >
              <CardHeader className={`${department.bgColor} rounded-t-lg`}>
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-full bg-white shadow-md`}>
                    <department.icon className={`h-8 w-8 ${department.color}`} />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {department.doctorsCount} Doctors
                  </Badge>
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {department.name}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="pt-6">
                <CardDescription className="text-base mb-6 leading-relaxed">
                  {department.description}
                </CardDescription>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Specialties:</h4>
                    <div className="flex flex-wrap gap-2">
                      {department.specialties.map((specialty, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full mt-4"
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate('doctors');
                    }}
                  >
                    View Doctors
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Emergency Contact */}
        <Card className="bg-red-50 border-red-200 border-2">
          <CardContent className="pt-6">
            <div className="text-center">
              <Activity className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-red-700 mb-2">
                Emergency Services Available 24/7
              </h3>
              <p className="text-red-600 mb-4">
                For life-threatening emergencies, call 911 immediately or visit our Emergency Department.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-100">
                  Emergency: 911
                </Button>
                <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-100">
                  Hospital: (555) 123-4567
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Need Help Choosing a Department?
          </h2>
          <p className="text-gray-600 mb-6">
            Our patient coordinators can help you find the right specialist for your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => onNavigate('doctors')}>
              Browse All Doctors
            </Button>
            <Button variant="outline">
              Contact Patient Services
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}