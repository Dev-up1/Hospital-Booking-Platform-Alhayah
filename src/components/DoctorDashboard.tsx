import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { 
  Calendar, 
  Clock, 
  Users, 
  TrendingUp, 
  Phone, 
  Video, 
  FileText, 
  Settings,
  Plus,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface DoctorDashboardProps {
  onNavigate: (page: string) => void;
}

export function DoctorDashboard({ onNavigate }: DoctorDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [acceptingNewPatients, setAcceptingNewPatients] = useState(true);
  const [telehealthEnabled, setTelehealthEnabled] = useState(true);

  // Mock doctor data
  const doctor = {
    name: 'Dr. Sarah Wilson',
    specialty: 'Cardiology',
    license: 'MD12345',
    rating: 4.9,
    totalPatients: 1247,
    yearsExperience: 15
  };

  const todayAppointments = [
    {
      id: 1,
      patient: 'John Smith',
      time: '9:00 AM',
      type: 'Follow-up',
      duration: '30 min',
      status: 'confirmed',
      isNew: false,
      notes: 'Blood pressure follow-up'
    },
    {
      id: 2,
      patient: 'Maria Garcia',
      time: '10:00 AM',
      type: 'Consultation',
      duration: '45 min',
      status: 'confirmed',
      isNew: true,
      notes: 'Chest pain evaluation'
    },
    {
      id: 3,
      patient: 'Robert Johnson',
      time: '11:30 AM',
      type: 'Telehealth',
      duration: '15 min',
      status: 'pending',
      isNew: false,
      notes: 'Medication review'
    },
    {
      id: 4,
      patient: 'Emily Chen',
      time: '2:00 PM',
      type: 'Physical Exam',
      duration: '60 min',
      status: 'confirmed',
      isNew: false,
      notes: 'Annual cardiac checkup'
    },
    {
      id: 5,
      patient: 'David Wilson',
      time: '3:30 PM',
      type: 'Procedure',
      duration: '90 min',
      status: 'confirmed',
      isNew: false,
      notes: 'Echocardiogram'
    }
  ];

  const upcomingAppointments = [
    {
      date: 'Tomorrow',
      count: 12,
      firstTime: '8:00 AM',
      lastTime: '5:00 PM'
    },
    {
      date: 'March 19',
      count: 8,
      firstTime: '9:00 AM',
      lastTime: '3:00 PM'
    },
    {
      date: 'March 20',
      count: 15,
      firstTime: '8:30 AM',
      lastTime: '6:00 PM'
    }
  ];

  const recentPatients = [
    {
      id: 1,
      name: 'Jennifer Davis',
      age: 45,
      lastVisit: '2 days ago',
      condition: 'Hypertension',
      status: 'stable'
    },
    {
      id: 2,
      name: 'Michael Brown',
      age: 62,
      lastVisit: '1 week ago',
      condition: 'Arrhythmia',
      status: 'monitoring'
    },
    {
      id: 3,
      name: 'Lisa Anderson',
      age: 38,
      lastVisit: '2 weeks ago',
      condition: 'Preventive Care',
      status: 'healthy'
    }
  ];

  const weeklyStats = {
    totalAppointments: 42,
    completedAppointments: 38,
    cancelledAppointments: 4,
    newPatients: 8,
    revenue: '$12,450'
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPatientStatusColor = (status: string) => {
    switch (status) {
      case 'stable':
        return 'bg-green-100 text-green-800';
      case 'monitoring':
        return 'bg-yellow-100 text-yellow-800';
      case 'healthy':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Good morning, {doctor.name}
              </h1>
              <p className="text-gray-600 mt-1">
                You have {todayAppointments.filter(apt => apt.status === 'confirmed').length} appointments today
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Block Time
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Today's Appointments</p>
                  <p className="text-2xl font-bold text-primary">{todayAppointments.length}</p>
                </div>
                <Calendar className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Patients</p>
                  <p className="text-2xl font-bold text-blue-600">{doctor.totalPatients}</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">This Week</p>
                  <p className="text-2xl font-bold text-green-600">{weeklyStats.totalAppointments}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Rating</p>
                  <p className="text-2xl font-bold text-yellow-600">{doctor.rating}</p>
                </div>
                <div className="text-yellow-500">★</div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">New Patients</p>
                  <p className="text-2xl font-bold text-purple-600">{weeklyStats.newPatients}</p>
                </div>
                <Plus className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="patients">Patients</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Today's Schedule */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Today's Schedule</span>
                    <Badge variant="secondary">
                      {todayAppointments.length} appointments
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    Your appointments for today, {new Date().toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {todayAppointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        className="flex items-start gap-4 p-3 border rounded-lg hover:bg-gray-50"
                      >
                        <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-medium">{appointment.patient}</h4>
                                {appointment.isNew && (
                                  <Badge variant="outline" className="text-xs">
                                    New
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-gray-600">{appointment.notes}</p>
                            </div>
                            <Badge className={getStatusColor(appointment.status)}>
                              {appointment.status}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{appointment.time}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span>{appointment.duration}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              {appointment.type === 'Telehealth' ? (
                                <Video className="h-4 w-4" />
                              ) : (
                                <Users className="h-4 w-4" />
                              )}
                              <span>{appointment.type}</span>
                            </div>
                          </div>
                          
                          <div className="flex gap-2 mt-3">
                            {appointment.type === 'Telehealth' ? (
                              <Button size="sm">
                                <Video className="h-4 w-4 mr-1" />
                                Join Call
                              </Button>
                            ) : (
                              <Button size="sm" variant="outline">
                                Start Visit
                              </Button>
                            )}
                            <Button size="sm" variant="outline">
                              <FileText className="h-4 w-4 mr-1" />
                              Notes
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming Days */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Schedule</CardTitle>
                    <CardDescription>
                      Your schedule for the next few days
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {upcomingAppointments.map((day, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <h4 className="font-medium">{day.date}</h4>
                            <p className="text-sm text-gray-600">
                              {day.firstTime} - {day.lastTime}
                            </p>
                          </div>
                          <Badge variant="secondary">
                            {day.count} appointments
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Patients</CardTitle>
                    <CardDescription>
                      Patients you've seen recently
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {recentPatients.map((patient) => (
                        <div key={patient.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback>
                                {patient.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{patient.name}</p>
                              <p className="text-sm text-gray-600">
                                Age {patient.age} • {patient.lastVisit}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge className={getPatientStatusColor(patient.status)}>
                              {patient.status}
                            </Badge>
                            <p className="text-xs text-gray-500 mt-1">{patient.condition}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Schedule</CardTitle>
                <CardDescription>
                  Manage your availability and appointments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  <Calendar className="h-16 w-16 mx-auto mb-4" />
                  <p>Calendar integration would be implemented here</p>
                  <p className="text-sm">Connect with Google Calendar, Outlook, or other scheduling systems</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="patients" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Patient Management</CardTitle>
                <CardDescription>
                  View and manage your patient roster
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  <Users className="h-16 w-16 mx-auto mb-4" />
                  <p>Patient management interface would be implemented here</p>
                  <p className="text-sm">Search, filter, and manage patient records and communications</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Practice Settings</CardTitle>
                  <CardDescription>
                    Configure your practice preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="new-patients">Accept New Patients</Label>
                      <p className="text-sm text-gray-500 mt-1">
                        Allow new patients to book appointments
                      </p>
                    </div>
                    <Switch
                      id="new-patients"
                      checked={acceptingNewPatients}
                      onCheckedChange={setAcceptingNewPatients}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="telehealth">Enable Telehealth</Label>
                      <p className="text-sm text-gray-500 mt-1">
                        Offer video consultation appointments
                      </p>
                    </div>
                    <Switch
                      id="telehealth"
                      checked={telehealthEnabled}
                      onCheckedChange={setTelehealthEnabled}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Default Appointment Duration</Label>
                    <select className="w-full p-2 border rounded-md">
                      <option>15 minutes</option>
                      <option>30 minutes</option>
                      <option>45 minutes</option>
                      <option>60 minutes</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Buffer Time Between Appointments</Label>
                    <select className="w-full p-2 border rounded-md">
                      <option>0 minutes</option>
                      <option>5 minutes</option>
                      <option>10 minutes</option>
                      <option>15 minutes</option>
                    </select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Your professional information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Full Name</Label>
                    <p className="text-sm text-gray-600 mt-1">{doctor.name}</p>
                  </div>
                  
                  <div>
                    <Label>Specialty</Label>
                    <p className="text-sm text-gray-600 mt-1">{doctor.specialty}</p>
                  </div>
                  
                  <div>
                    <Label>License Number</Label>
                    <p className="text-sm text-gray-600 mt-1">{doctor.license}</p>
                  </div>
                  
                  <div>
                    <Label>Years of Experience</Label>
                    <p className="text-sm text-gray-600 mt-1">{doctor.yearsExperience} years</p>
                  </div>
                  
                  <Button className="w-full mt-4">
                    Edit Profile
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}