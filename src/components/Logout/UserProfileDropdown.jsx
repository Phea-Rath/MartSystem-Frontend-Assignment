// components/UserProfileDropdown.jsx
import React, { useState, useRef, useEffect } from 'react';
import { FaUser, FaCog, FaSignOutAlt, FaChevronDown, FaBell } from 'react-icons/fa';
import LogoutButton from './LogoutButton';

const UserProfileDropdown = ({ user = {}, onLogout, onProfile, onSettings }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsOpen(false);
    onLogout();
  };

  const handleProfile = () => {
    setIsOpen(false);
    if (onProfile) onProfile();
  };

  const handleSettings = () => {
    setIsOpen(false);
    if (onSettings) onSettings();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* User Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
      >
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">
              {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </span>
          </div>
          <div className="hidden md:block text-left">
            <p className="text-sm font-medium text-gray-900">{user.name || 'User'}</p>
            <p className="text-xs text-gray-500">{user.role || 'Member'}</p>
          </div>
        </div>
        <FaChevronDown className={`w-3 h-3 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50 animate-scaleIn">
          {/* User Info */}
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-medium">
                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {user.name || 'User Name'}
                </p>
                <p className="text-sm text-gray-500 truncate">
                  {user.email || 'user@example.com'}
                </p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <button
              onClick={handleProfile}
              className="flex items-center space-x-3 w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              <FaUser className="w-4 h-4 text-gray-400" />
              <span>Your Profile</span>
            </button>

            <button
              onClick={handleSettings}
              className="flex items-center space-x-3 w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              <FaCog className="w-4 h-4 text-gray-400" />
              <span>Settings</span>
            </button>

            <div className="px-4 py-2">
              <div className="border-t border-gray-100"></div>
            </div>

            {/* Logout Button */}
            <LogoutButton 
              user={user}
              onLogout={handleLogout}
              onCancel={() => setIsOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileDropdown;