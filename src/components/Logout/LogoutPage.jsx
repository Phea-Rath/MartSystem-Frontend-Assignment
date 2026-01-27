// pages/LogoutPage.jsx
import React, { useState, useEffect } from 'react';
import { FaSignOutAlt, FaUser, FaCheckCircle, FaSpinner, FaHome, FaSignInAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router';

const LogoutPage = ({ onLogout, onCancel, user = {} }) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const navigater = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isLoggingOut) {
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            clearInterval(timer);
            setIsLoggingOut(false);
            setIsLoggedOut(true);
            // Call the actual logout function after animation
            setTimeout(() => {
              if (onLogout) onLogout();
            }, 1000);
            return 100;
          }
          return Math.min(oldProgress + 20, 100);
        });
      }, 200);

      return () => clearInterval(timer);
    }
  }, [isLoggingOut, onLogout]);

  const handleLogout = () => {
    setIsLoggingOut(true);
    setProgress(0);
  };

  const handleCancel = () => {
    navigater('/');
    if (onCancel) onCancel();
  };

  const handleGoHome = () => {
    // Redirect to home or login page
    window.location.href = '/';
  };

  const handleLoginAgain = () => {
    // Redirect to login page
    window.location.href = '/login';
  };

  if (isLoggedOut) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 dark:from-gray-900 to-emerald-100 dark:to-green-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center animate-scaleIn">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaCheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Successfully Signed Out</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              You have been successfully signed out of your account.
            </p>

            <div className="space-y-3">
              <button
                onClick={handleGoHome}
                className="w-full flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
              >
                <FaHome className="w-4 h-4 mr-2" />
                Go to Homepage
              </button>

              <button
                onClick={handleLoginAgain}
                className="w-full flex items-center justify-center px-6 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                <FaSignInAlt className="w-4 h-4 mr-2" />
                Sign In Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 dark:from-gray-900 to-pink-100 dark:to-red-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden animate-scaleIn">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-500 to-pink-600 dark:from-red-600 dark:to-pink-700 p-6 text-white">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                <FaSignOutAlt className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Sign Out</h2>
                <p className="text-red-100 dark:text-red-200 text-sm">Confirm your action</p>
              </div>
            </div>
          </div>

          {/* User Info */}
          {user.name && (
            <div className="p-6 border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-lg">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{user.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">{user.role}</p>
                </div>
              </div>
            </div>
          )}

          {/* Content */}
          <div className="p-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Ready to leave?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                You'll be signed out of your account. Make sure to save any important work before proceeding.
              </p>
            </div>

            {/* Progress Bar for Logging Out */}
            {isLoggingOut && (
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
                  <span>Signing out...</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-red-500 dark:bg-red-500 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Security Notice */}
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-3">
                <div className="p-1 bg-yellow-100 dark:bg-yellow-900/40 rounded">
                  <FaUser className="w-4 h-4 text-yellow-600 dark:text-yellow-500" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-300 mb-1">Security Notice</h4>
                  <p className="text-xs text-yellow-700 dark:text-yellow-400">
                    For security reasons, please ensure you're signing out from a trusted device.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-3 p-6 bg-gray-50 dark:bg-gray-700">
            <button
              onClick={handleCancel}
              disabled={isLoggingOut}
              className="flex-1 px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="flex-1 px-4 py-3 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoggingOut ? (
                <>
                  <FaSpinner className="w-4 h-4 mr-2 animate-spin" />
                  Signing Out...
                </>
              ) : (
                <>
                  <FaSignOutAlt className="w-4 h-4 mr-2" />
                  Sign Out
                </>
              )}
            </button>
          </div>
        </div>

        {/* Quick Links */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Changed your mind?{' '}
            <button
              onClick={handleCancel}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
            >
              Return to dashboard
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LogoutPage;