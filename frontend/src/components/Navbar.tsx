import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GraduationCap, Users, BookOpen, Calendar, Search, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: GraduationCap },
    { path: '/students', label: 'Students', icon: Users },
    { path: '/faculty', label: 'Faculty', icon: Users },
    { path: '/instruction', label: 'Instruction', icon: BookOpen },
    { path: '/schedule', label: 'Schedule', icon: Calendar },
    { path: '/events', label: 'Events', icon: Calendar },
    { path: '/query', label: 'Query', icon: Search },
  ];

  return (
    <nav className="clay-nav sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="text-white font-bold text-xl">
              CCS Profiling System
            </div>
            <div className="hidden md:flex text-white text-sm">
              Computer System Servicing - Pamantasan ng Cabuyao
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-white transition-all duration-200 ${
                    isActive
                      ? 'bg-white bg-opacity-20 shadow-lg'
                      : 'hover:bg-white hover:bg-opacity-10'
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-2 rounded-lg hover:bg-white hover:bg-opacity-10"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white border-opacity-20">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-white transition-all duration-200 ${
                    isActive
                      ? 'bg-white bg-opacity-20 shadow-lg'
                      : 'hover:bg-white hover:bg-opacity-10'
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
