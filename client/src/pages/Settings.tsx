import React, { useState } from 'react';
import { User, Bell, Palette, LogOut, Save } from 'lucide-react';

const Settings: React.FC = () => {
  const [settings, setSettings] = useState({
    theme: 'dark',
    notifications: true,
    emailAlerts: false,
    sidebarCollapsed: false,
    language: 'en'
  });

  const [message, setMessage] = useState('');

  const handleSave = () => {
    // In production, save to backend/localStorage
    setMessage('Settings saved successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      // In production, clear auth tokens and redirect to login
      window.location.href = '/';
    }
  };

  return (
    <div className="main-content" style={{ maxHeight: 'calc(100vh - 64px)', overflowY: 'auto' }}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Settings</h1>

        {message && (
          <div className="p-4 rounded-lg mb-6 bg-green-500 bg-opacity-20 text-green-400">
            {message}
          </div>
        )}

        <div className="space-y-6">
          {/* Profile Section */}
          <div className="clay-card p-6">
            <div className="flex items-center mb-4">
              <User size={24} className="text-orange-400 mr-3" />
              <h2 className="text-xl font-semibold text-white">Profile Settings</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Display Name</label>
                <input type="text" defaultValue="Admin User" className="clay-input px-4 py-3 text-white w-full" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Email</label>
                <input type="email" defaultValue="admin@ccs.edu" className="clay-input px-4 py-3 text-white w-full" />
              </div>
            </div>
          </div>

          {/* Appearance */}
          <div className="clay-card p-6">
            <div className="flex items-center mb-4">
              <Palette size={24} className="text-orange-400 mr-3" />
              <h2 className="text-xl font-semibold text-white">Appearance</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Theme</label>
                <select 
                  value={settings.theme}
                  onChange={(e) => setSettings({...settings, theme: e.target.value})}
                  className="clay-input px-4 py-3 text-white w-full"
                >
                  <option value="dark">Dark</option>
                  <option value="light">Light</option>
                  <option value="auto">Auto</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white">Collapsed Sidebar</span>
                <button
                  onClick={() => setSettings({...settings, sidebarCollapsed: !settings.sidebarCollapsed})}
                  className={`relative w-12 h-6 rounded-full transition-colors ${settings.sidebarCollapsed ? 'bg-orange-500' : 'bg-gray-600'}`}
                >
                  <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${settings.sidebarCollapsed ? 'translate-x-6' : ''}`} />
                </button>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="clay-card p-6">
            <div className="flex items-center mb-4">
              <Bell size={24} className="text-orange-400 mr-3" />
              <h2 className="text-xl font-semibold text-white">Notifications</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-white">Push Notifications</span>
                <button
                  onClick={() => setSettings({...settings, notifications: !settings.notifications})}
                  className={`relative w-12 h-6 rounded-full transition-colors ${settings.notifications ? 'bg-orange-500' : 'bg-gray-600'}`}
                >
                  <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${settings.notifications ? 'translate-x-6' : ''}`} />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white">Email Alerts</span>
                <button
                  onClick={() => setSettings({...settings, emailAlerts: !settings.emailAlerts})}
                  className={`relative w-12 h-6 rounded-full transition-colors ${settings.emailAlerts ? 'bg-orange-500' : 'bg-gray-600'}`}
                >
                  <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${settings.emailAlerts ? 'translate-x-6' : ''}`} />
                </button>
              </div>
            </div>
          </div>

          {/* Account Actions */}
          <div className="clay-card p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Account Actions</h2>
            <div className="space-y-4">
              <button 
                onClick={handleSave}
                className="ccs-orange-btn flex items-center gap-2 px-6 py-3"
              >
                <Save size={20} />
                Save All Settings
              </button>
              <button 
                onClick={handleLogout}
                className="w-full bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <LogOut size={20} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
