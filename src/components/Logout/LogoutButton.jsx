// components/LogoutButton.jsx
import React, { useState } from 'react';
import { FaSignOutAlt, FaUser, FaCog, FaTimes } from 'react-icons/fa';

const LogoutButton = ({ user = {}, onLogout, onCancel }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogoutClick = () => {
    setShowConfirm(true);
  };

  const handleConfirmLogout = () => {
    setShowConfirm(false);
    onLogout();
  };

  const handleCancel = () => {
    setShowConfirm(false);
    if (onCancel) onCancel();
  };

  return (
    <>
      {/* Main Logout Button */}
      <button
        onClick={handleLogoutClick}
        className="flex items-center space-x-3 w-full px-4 py-3 text-left text-gray-700 hover:bg-red-50 hover:text-red-700 transition-all duration-200 rounded-lg group"
      >
        <div className="p-2 bg-red-100 rounded-lg group-hover:bg-red-200 transition-colors">
          <FaSignOutAlt className="w-4 h-4 text-red-600" />
        </div>
        <span className="font-medium">Sign Out</span>
      </button>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-auto transform animate-scaleIn">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <FaSignOutAlt className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Sign Out</h3>
                  <p className="text-sm text-gray-500">Confirm your action</p>
                </div>
              </div>
              <button
                onClick={handleCancel}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FaTimes className="w-4 h-4 text-gray-400" />
              </button>
            </div>

            {/* User Info */}
            {user.name && (
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <FaUser className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Message */}
            <div className="p-6">
              <p className="text-gray-700 mb-2">
                Are you sure you want to sign out?
              </p>
              <p className="text-sm text-gray-500">
                You'll need to sign in again to access your account.
              </p>
            </div>

            {/* Actions */}
            <div className="flex space-x-3 p-6 border-t border-gray-100">
              <button
                onClick={handleCancel}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmLogout}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors duration-200 shadow-sm hover:shadow-md flex items-center justify-center"
              >
                <FaSignOutAlt className="w-4 h-4 mr-2" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LogoutButton;