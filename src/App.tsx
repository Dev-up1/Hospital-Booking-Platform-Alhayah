import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { DepartmentsPage } from './components/DepartmentsPage';
import { DoctorsPage } from './components/DoctorsPage';
import { BookingPage } from './components/BookingPage';
import { DoctorDashboard } from './components/DoctorDashboard';
import { ComprehensiveBooking } from './components/ComprehensiveBooking';
import { InsuranceCompaniesPage } from './components/InsuranceCompaniesPage';
import { AuthProvider } from './contexts/AuthContext';
import { useState } from 'react';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [bookingContext, setBookingContext] = useState(null);

  const navigateToBooking = (context = null) => {
    setBookingContext(context);
    setCurrentPage('comprehensive-booking');
  };

  const navigate = (page: string, context: any = null) => {
    if (page === 'comprehensive-booking') {
      navigateToBooking(context);
    } else {
      setCurrentPage(page);
      setBookingContext(null);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={navigate} />;
      case 'departments':
        return <DepartmentsPage onNavigate={navigate} />;
      case 'doctors':
        return <DoctorsPage onNavigate={navigate} />;
      case 'booking':
        return <BookingPage onNavigate={navigate} />;
      case 'comprehensive-booking':
        return <ComprehensiveBooking onNavigate={navigate} bookingContext={bookingContext} />;
      case 'doctor-dashboard':
        return <DoctorDashboard onNavigate={navigate} />;
      case 'insurance-companies':
        return <InsuranceCompaniesPage onNavigate={navigate} />;
      default:
        return <HomePage onNavigate={navigate} />;
    }
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-background rtl" dir="rtl">
        <Header
          currentPage={currentPage}
          onNavigate={navigate}
        />
        {renderPage()}
      </div>
    </AuthProvider>
  );
}