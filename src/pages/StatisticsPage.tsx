
import React from 'react';
import StatisticsDisplay from '@/components/StatisticsDisplay';

const StatisticsPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-custom-darkgray mb-2">Performance Statistics</h1>
        <p className="text-gray-600">
          Detailed metrics and analytics about pipeline performance
        </p>
      </div>
      
      <StatisticsDisplay />
    </div>
  );
};

export default StatisticsPage;
