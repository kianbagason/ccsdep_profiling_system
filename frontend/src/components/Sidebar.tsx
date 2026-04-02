import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Users, 
  UserPlus, 
  BookOpen, 
  Calendar, 
  Target, 
  Search, 
  Settings, 
  LogOut, 
  Menu, 
  X 
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const location = useLocation();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/' },
    { id: 'students', label: 'Students', icon: Users, path: '/students' },
    { id: 'add-student', label: 'Add Student', icon: UserPlus, path: '/students/add' },
    { id: 'faculty', label: 'Faculty', icon: Users, path: '/faculty' },
    { id: 'instruction', label: 'Instruction', icon: BookOpen, path: '/instruction' },
    { id: 'schedule', label: 'Schedule', icon: Calendar, path: '/schedule' },
    { id: 'events', label: 'Events', icon: Target, path: '/events' },
    { id: 'query', label: 'Query System', icon: Search, path: '/query' },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <button 
        className="mobile-menu-btn md:hidden"
        onClick={onToggle}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <nav className={`sidebar-nav ${isOpen ? 'open' : ''}`}>
        {/* Logo Section */}
        <div className="nav-logo">
          <div className="logo-icon">
            <Target size={32} color="rgb(252, 94, 3)" />
          </div>
          <div className="logo-text">
            <h2>CCS</h2>
            <p>Profiling System</p>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="nav-menu">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                to={item.path}
                onClick={() => onToggle()}
                className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
                title={!isOpen ? item.label : ''}
              >
                <Icon size={22} strokeWidth={location.pathname === item.path ? 2.5 : 2} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Bottom Actions */}
        <div className="nav-actions" style={{ marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px' }}>
          <Link to="/settings" className="nav-item">
            <Settings size={22} />
            <span>Settings</span>
          </Link>
          <Link to="/logout" className="nav-item logout">
            <LogOut size={22} />
            <span>Logout</span>
          </Link>
        </div>

        {/* Status Indicator - Hidden by default, shown on hover */}
        <div className="nav-status" style={{ display: 'none' }}>
          <div className="status-dot"></div>
          <span>System Online</span>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
