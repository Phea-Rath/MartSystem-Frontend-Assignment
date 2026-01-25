// components/SettingItem.jsx
import React from 'react';

const SettingItem = ({ 
  title, 
  description, 
  children, 
  action, 
  isDanger = false 
}) => {
  return (
    <div className={`flex items-center justify-between py-4 ${
      isDanger ? 'border-red-100' : 'border-gray-100'
    } border-b last:border-b-0`}>
      <div className="flex-1">
        <h4 className={`text-sm font-medium ${
          isDanger ? 'text-red-700' : 'text-gray-700'
        }`}>
          {title}
        </h4>
        {description && (
          <p className={`text-sm ${
            isDanger ? 'text-red-500' : 'text-gray-500'
          } mt-1`}>
            {description}
          </p>
        )}
      </div>
      
      <div className="flex items-center space-x-4">
        {children}
        {action && (
          <div className="ml-4">
            {action}
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingItem;