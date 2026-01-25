// components/SettingSection.jsx
import React from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const SettingSection = ({ title, icon: Icon, children, isOpen, onToggle, description }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
      >
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Icon className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-left">
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            {description && (
              <p className="text-sm text-gray-500 mt-1">{description}</p>
            )}
          </div>
        </div>
        <div className="text-gray-400">
          {isOpen ? <FaChevronUp className="w-4 h-4" /> : <FaChevronDown className="w-4 h-4" />}
        </div>
      </button>
      
      {isOpen && (
        <div className="px-6 py-4 border-t border-gray-100">
          {children}
        </div>
      )}
    </div>
  );
};

export default SettingSection;