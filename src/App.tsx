import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { DepartmentsPage } from './components/DepartmentsPage';
import { DoctorsPage } from './components/DoctorsPage';
import { BookingPage } from './components/BookingPage';
import { PatientDashboard } from './components/PatientDashboard';
import { DoctorDashboard } from './components/DoctorDashboard';
import { ComprehensiveBooking } from './components/ComprehensiveBooking';
import { AuthDialog } from './components/AuthDialog';
import { createClient, getServerUrl } from './utils/supabase/client';
import { publicAnonKey } from './utils/supabase/info';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState<any>(null);
  const [accessToken, setAccessToken] = useState<string>('');
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const supabase = createClient();

  // Initialize data on first load
  useEffect(() => {
    const initializeData = async () => {
      try {
        const response = await fetch(getServerUrl('/init-data'), {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        });
        
        if (response.ok) {
          console.log('Data initialized successfully');
        }
      } catch (error) {
        console.error('Failed to initialize data:', error);
      } finally {
        setIsInitialized(true);
      }
    };

    // Check for existing session
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        // Fetch user profile
        const response = await fetch(getServerUrl('/auth/profile'), {
          headers: {
            'Authorization': `Bearer ${session.access_token}`
          }
        });

        if (response.ok) {
          const { user: profile } = await response.json();
          setUser(profile);
          setAccessToken(session.access_token);
        }
      }
    };

    if (!isInitialized) {
      initializeData();
    }
    checkSession();
  }, []);

  const handleAuthSuccess = (userData: any, token: string) => {
    setUser(userData);
    setAccessToken(token);
  };

  const handleLogin = () => {
    setAuthDialogOpen(true);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setAccessToken('');
    setCurrentPage('home');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'departments':
        return <DepartmentsPage onNavigate={setCurrentPage} />;
      case 'doctors':
        return <DoctorsPage onNavigate={setCurrentPage} />;
      case 'booking':
        return <BookingPage onNavigate={setCurrentPage} />;
      case 'comprehensive-booking':
        return <ComprehensiveBooking onNavigate={setCurrentPage} user={user} accessToken={accessToken} />;
      case 'patient-dashboard':
        return <PatientDashboard onNavigate={setCurrentPage} user={user} accessToken={accessToken} />;
      case 'doctor-dashboard':
        return <DoctorDashboard onNavigate={setCurrentPage} user={user} accessToken={accessToken} />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        currentPage={currentPage} 
        onNavigate={setCurrentPage}
        user={user}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />
      {renderPage()}
      
      <AuthDialog 
        open={authDialogOpen}
        onOpenChange={setAuthDialogOpen}
        onAuthSuccess={handleAuthSuccess}
      />
    </div>
  );
}