// pages/SettingsPage.jsx
import React, { useState } from 'react';
import {
  FaCog,
  FaUser,
  FaBell,
  FaShieldAlt,
  FaPalette,
  FaDatabase,
  FaGlobe,
  FaSave,
  FaKey,
  FaEye,
  FaEyeSlash,
  FaUpload,
  FaDownload,
  FaTrash,
  FaLock,
  FaUsers,
  FaEnvelope,
  FaMobile,
  FaDesktop,
  FaMoon,
  FaSun
} from 'react-icons/fa';
import SettingSection from './SettingSection';
import SettingItem from './SettingItem';
import ToggleSwitch from './ToggleSwitch';

const SettingsPage = () => {
  const [openSection, setOpenSection] = useState('general');
  const [settings, setSettings] = useState({
    // General Settings
    general: {
      siteName: 'My Application',
      siteDescription: 'A modern web application',
      language: 'en',
      timezone: 'UTC',
      dateFormat: 'MM/DD/YYYY',
    },

    // Account Settings
    account: {
      email: 'user@example.com',
      username: 'john_doe',
      firstName: 'John',
      lastName: 'Doe',
      phone: '+1 (555) 123-4567',
      visibility: 'public',
      twoFactorAuth: false,
    },

    // Notification Settings
    notifications: {
      emailNotifications: true,
      pushNotifications: false,
      smsNotifications: false,
      securityAlerts: true,
      marketingEmails: false,
      productUpdates: true,
    },

    // Privacy & Security
    privacy: {
      profileVisibility: 'public',
      dataSharing: false,
      cookieConsent: true,
      activityTracking: true,
      autoLogout: 30,
      passwordLastChanged: '2024-01-15',
    },

    // Appearance Settings
    appearance: {
      theme: 'light',
      fontSize: 'medium',
      compactMode: false,
      sidebarPosition: 'left',
      animations: true,
      highContrast: false,
    },

    // System Settings
    system: {
      autoBackup: true,
      backupFrequency: 'daily',
      storageLimit: 1000,
      cacheEnabled: true,
      logRetention: 30,
      performanceMode: false,
    }
  });

  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleToggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleSettingChange = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  const handleSaveSettings = () => {
    // Here you would typically send the settings to your backend
    console.log('Saving settings:', settings);
    alert('Settings saved successfully!');
  };

  const handleExportData = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'settings-backup.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleResetSettings = () => {
    if (window.confirm('Are you sure you want to reset all settings to default? This action cannot be undone.')) {
      // Reset to default settings
      setSettings({
        general: {
          siteName: 'My Application',
          siteDescription: 'A modern web application',
          language: 'en',
          timezone: 'UTC',
          dateFormat: 'MM/DD/YYYY',
        },
        account: {
          email: 'user@example.com',
          username: 'john_doe',
          firstName: 'John',
          lastName: 'Doe',
          phone: '+1 (555) 123-4567',
          visibility: 'public',
          twoFactorAuth: false,
        },
        notifications: {
          emailNotifications: true,
          pushNotifications: false,
          smsNotifications: false,
          securityAlerts: true,
          marketingEmails: false,
          productUpdates: true,
        },
        privacy: {
          profileVisibility: 'public',
          dataSharing: false,
          cookieConsent: true,
          activityTracking: true,
          autoLogout: 30,
          passwordLastChanged: '2024-01-15',
        },
        appearance: {
          theme: 'light',
          fontSize: 'medium',
          compactMode: false,
          sidebarPosition: 'left',
          animations: true,
          highContrast: false,
        },
        system: {
          autoBackup: true,
          backupFrequency: 'daily',
          storageLimit: 1000,
          cacheEnabled: true,
          logRetention: 30,
          performanceMode: false,
        }
      });
      alert('Settings have been reset to default.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 dark:from-gray-900 to-blue-50 dark:to-gray-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-blue-200 dark:border-blue-900">
              <FaCog className="w-8 h-8 text-blue-600 dark:text-blue-400 animate-spin" style={{ animationDuration: '3s' }} />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">Settings</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Manage your application preferences and account settings
          </p>
        </div>

        {/* Settings Sections */}
        <div className="space-y-6">
          {/* General Settings */}
          <SettingSection
            title="General Settings"
            icon={FaCog}
            isOpen={openSection === 'general'}
            onToggle={() => handleToggleSection('general')}
            description="Basic application preferences and configuration"
          >
            <div className="space-y-4">
              <SettingItem
                title="Site Name"
                description="The name of your application as it appears throughout the platform"
              >
                <input
                  type="text"
                  value={settings.general.siteName}
                  onChange={(e) => handleSettingChange('general', 'siteName', e.target.value)}
                  className="w-64 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                />
              </SettingItem>

              <SettingItem
                title="Language"
                description="Choose your preferred language"
              >
                <select
                  value={settings.general.language}
                  onChange={(e) => handleSettingChange('general', 'language', e.target.value)}
                  className="w-64 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                  <option value="zh">Chinese</option>
                </select>
              </SettingItem>

              <SettingItem
                title="Timezone"
                description="Set your local timezone for accurate time displays"
              >
                <select
                  value={settings.general.timezone}
                  onChange={(e) => handleSettingChange('general', 'timezone', e.target.value)}
                  className="w-64 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                >
                  <option value="UTC">UTC</option>
                  <option value="EST">Eastern Time</option>
                  <option value="PST">Pacific Time</option>
                  <option value="CET">Central European Time</option>
                  <option value="JST">Japan Standard Time</option>
                </select>
              </SettingItem>
            </div>
          </SettingSection>

          {/* Account Settings */}
          <SettingSection
            title="Account Settings"
            icon={FaUser}
            isOpen={openSection === 'account'}
            onToggle={() => handleToggleSection('account')}
            description="Manage your account information and security"
          >
            <div className="space-y-4">
              <SettingItem
                title="Email Address"
                description="Your primary email address for notifications and account recovery"
              >
                <input
                  type="email"
                  value={settings.account.email}
                  onChange={(e) => handleSettingChange('account', 'email', e.target.value)}
                  className="w-64 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                />
              </SettingItem>

              <SettingItem
                title="Two-Factor Authentication"
                description="Add an extra layer of security to your account"
              >
                <ToggleSwitch
                  enabled={settings.account.twoFactorAuth}
                  onChange={(value) => handleSettingChange('account', 'twoFactorAuth', value)}
                />
              </SettingItem>

              <SettingItem
                title="Change Password"
                description="Update your account password regularly for security"
              >
                <div className="space-y-2">
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="New password"
                      className="w-64 px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400"
                    >
                      {showPassword ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                    </button>
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    className="w-64 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                  />
                </div>
              </SettingItem>
            </div>
          </SettingSection>

          {/* Notification Settings */}
          <SettingSection
            title="Notification Preferences"
            icon={FaBell}
            isOpen={openSection === 'notifications'}
            onToggle={() => handleToggleSection('notifications')}
            description="Control how and when you receive notifications"
          >
            <div className="space-y-4">
              <SettingItem
                title="Email Notifications"
                description="Receive important updates via email"
              >
                <ToggleSwitch
                  enabled={settings.notifications.emailNotifications}
                  onChange={(value) => handleSettingChange('notifications', 'emailNotifications', value)}
                />
              </SettingItem>

              <SettingItem
                title="Push Notifications"
                description="Get real-time alerts in your browser"
              >
                <ToggleSwitch
                  enabled={settings.notifications.pushNotifications}
                  onChange={(value) => handleSettingChange('notifications', 'pushNotifications', value)}
                />
              </SettingItem>

              <SettingItem
                title="Security Alerts"
                description="Immediate notifications for security-related events"
              >
                <ToggleSwitch
                  enabled={settings.notifications.securityAlerts}
                  onChange={(value) => handleSettingChange('notifications', 'securityAlerts', value)}
                />
              </SettingItem>

              <SettingItem
                title="Product Updates"
                description="News about new features and improvements"
              >
                <ToggleSwitch
                  enabled={settings.notifications.productUpdates}
                  onChange={(value) => handleSettingChange('notifications', 'productUpdates', value)}
                />
              </SettingItem>
            </div>
          </SettingSection>

          {/* Privacy & Security */}
          <SettingSection
            title="Privacy & Security"
            icon={FaShieldAlt}
            isOpen={openSection === 'privacy'}
            onToggle={() => handleToggleSection('privacy')}
            description="Manage your privacy settings and data controls"
          >
            <div className="space-y-4">
              <SettingItem
                title="Profile Visibility"
                description="Control who can see your profile information"
              >
                <select
                  value={settings.privacy.profileVisibility}
                  onChange={(e) => handleSettingChange('privacy', 'profileVisibility', e.target.value)}
                  className="w-64 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                  <option value="contacts">Contacts Only</option>
                </select>
              </SettingItem>

              <SettingItem
                title="Data Sharing"
                description="Allow anonymous data sharing to help improve our services"
              >
                <ToggleSwitch
                  enabled={settings.privacy.dataSharing}
                  onChange={(value) => handleSettingChange('privacy', 'dataSharing', value)}
                />
              </SettingItem>

              <SettingItem
                title="Auto Logout"
                description="Automatically log out after period of inactivity"
              >
                <select
                  value={settings.privacy.autoLogout}
                  onChange={(e) => handleSettingChange('privacy', 'autoLogout', parseInt(e.target.value))}
                  className="w-64 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                >
                  <option value={15}>15 minutes</option>
                  <option value={30}>30 minutes</option>
                  <option value={60}>1 hour</option>
                  <option value={120}>2 hours</option>
                  <option value={0}>Never</option>
                </select>
              </SettingItem>
            </div>
          </SettingSection>

          {/* Appearance */}
          <SettingSection
            title="Appearance"
            icon={FaPalette}
            isOpen={openSection === 'appearance'}
            onToggle={() => handleToggleSection('appearance')}
            description="Customize the look and feel of the application"
          >
            <div className="space-y-4">
              <SettingItem
                title="Theme"
                description="Choose between light and dark themes"
              >
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleSettingChange('appearance', 'theme', 'light')}
                    className={`p-3 rounded-lg border-2 transition-all ${settings.appearance.theme === 'light'
                        ? 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                  >
                    <FaSun className="w-5 h-5 text-yellow-500" />
                  </button>
                  <button
                    onClick={() => handleSettingChange('appearance', 'theme', 'dark')}
                    className={`p-3 rounded-lg border-2 transition-all ${settings.appearance.theme === 'dark'
                        ? 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                  >
                    <FaMoon className="w-5 h-5 text-gray-700 dark:text-yellow-400" />
                  </button>
                </div>
              </SettingItem>

              <SettingItem
                title="Animations"
                description="Enable or disable interface animations"
              >
                <ToggleSwitch
                  enabled={settings.appearance.animations}
                  onChange={(value) => handleSettingChange('appearance', 'animations', value)}
                />
              </SettingItem>

              <SettingItem
                title="Compact Mode"
                description="Use a more compact layout with smaller spacing"
              >
                <ToggleSwitch
                  enabled={settings.appearance.compactMode}
                  onChange={(value) => handleSettingChange('appearance', 'compactMode', value)}
                />
              </SettingItem>

              <SettingItem
                title="High Contrast"
                description="Increase contrast for better readability"
              >
                <ToggleSwitch
                  enabled={settings.appearance.highContrast}
                  onChange={(value) => handleSettingChange('appearance', 'highContrast', value)}
                />
              </SettingItem>
            </div>
          </SettingSection>

          {/* System Settings */}
          <SettingSection
            title="System Settings"
            icon={FaDatabase}
            isOpen={openSection === 'system'}
            onToggle={() => handleToggleSection('system')}
            description="Advanced system configuration and maintenance"
          >
            <div className="space-y-4">
              <SettingItem
                title="Automatic Backups"
                description="Automatically backup your data regularly"
              >
                <ToggleSwitch
                  enabled={settings.system.autoBackup}
                  onChange={(value) => handleSettingChange('system', 'autoBackup', value)}
                />
              </SettingItem>

              <SettingItem
                title="Backup Frequency"
                description="How often to create automatic backups"
              >
                <select
                  value={settings.system.backupFrequency}
                  onChange={(e) => handleSettingChange('system', 'backupFrequency', e.target.value)}
                  className="w-64 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!settings.system.autoBackup}
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </SettingItem>

              <SettingItem
                title="Cache Enabled"
                description="Improve performance by caching data"
              >
                <ToggleSwitch
                  enabled={settings.system.cacheEnabled}
                  onChange={(value) => handleSettingChange('system', 'cacheEnabled', value)}
                />
              </SettingItem>

              <SettingItem
                title="Performance Mode"
                description="Optimize for speed (may use more resources)"
              >
                <ToggleSwitch
                  enabled={settings.system.performanceMode}
                  onChange={(value) => handleSettingChange('system', 'performanceMode', value)}
                />
              </SettingItem>
            </div>
          </SettingSection>
        </div>

        {/* Action Buttons */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex space-x-3">
              <button
                onClick={handleExportData}
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                <FaDownload className="w-4 h-4 mr-2" />
                Export Settings
              </button>
              <button
                onClick={handleResetSettings}
                className="flex items-center px-4 py-2 text-sm font-medium text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors duration-200"
              >
                <FaTrash className="w-4 h-4 mr-2" />
                Reset to Default
              </button>
            </div>

            <button
              onClick={handleSaveSettings}
              className="flex items-center px-6 py-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
            >
              <FaSave className="w-4 h-4 mr-2" />
              Save All Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;