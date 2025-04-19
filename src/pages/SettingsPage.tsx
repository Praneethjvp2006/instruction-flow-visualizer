
import React from 'react';
import SettingsPanel from '@/components/SettingsPanel';

const SettingsPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-custom-darkgray mb-2">Settings</h1>
        <p className="text-gray-600">
          Configure pipeline settings and enable/disable various features
        </p>
      </div>
      
      <SettingsPanel />
    </div>
  );
};

export default SettingsPage;
