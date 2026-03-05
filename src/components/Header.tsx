import { useState } from 'react';
import { Menu, X, User, LogIn, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { EmergencyBanner } from './EmergencyBanner';
import { LoginDialog } from './LoginDialog';
import { useAuth } from '../contexts/AuthContext';
import logo from 'figma:asset/31d5378685693e6bde14bea83db13d2ab5259e4e.png';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  user?: any;
  onLogin?: (user: any) => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);

  const menuItems = [
    { id: 'home', label: 'الرئيسية', href: '#' },
    { id: 'departments', label: 'الأقسام الطبية', href: '#' },
    { id: 'doctors', label: 'الأطباء', href: '#' },
    { id: 'comprehensive-booking', label: 'حجز موعد', href: '#' },
  ];

  const handleLoginClick = () => {
    if (user) {
      logout();
    } else {
      setIsLoginDialogOpen(true);
    }
  };

  return (
    <>
      <EmergencyBanner />
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Logo */}
            <div className="flex items-center">
              <img
                src={logo}
                alt="مركز الحياة الطبي"
                className="h-12 w-auto object-contain"
              />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`text-sm transition-colors hover:text-blue-600 ${currentPage === item.id ? 'text-blue-600 font-medium' : 'text-gray-700'
                    }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* User Actions */}
            <div className="flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-3">
                  {/* --- بداية التعديل: تم تحويل الزر إلى div وإلغاء النقر --- */}
                  <div className="hidden sm:flex items-center gap-2 text-right">
                    <User className="w-4 h-4 text-blue-600" />
                    <div className="text-right">
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-gray-600">مريض</p>
                    </div>
                  </div>
                  {/* --- نهاية التعديل --- */}
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLoginClick}
                    className="flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    تسجيل خروج
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={handleLoginClick}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
                >
                  <LogIn className="w-4 h-4" />
                  تسجيل دخول
                </Button>
              )}
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden border-t bg-white">
              <nav className="py-4 space-y-2">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id);
                      setIsMenuOpen(false);
                    }}
                    className={`block w-full text-right px-4 py-2 text-sm transition-colors hover:bg-gray-50 ${currentPage === item.id ? 'text-blue-600 font-medium bg-blue-50' : 'text-gray-700'
                      }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>
      <LoginDialog
        isOpen={isLoginDialogOpen}
        onClose={() => setIsLoginDialogOpen(false)}
        onLogin={(userData) => {
          setIsLoginDialogOpen(false);
        }}
      />
    </>
  );
}
