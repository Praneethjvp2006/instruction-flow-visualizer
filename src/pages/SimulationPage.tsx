
import React from 'react';
import PipelineGrid from '@/components/PipelineGrid';

const SimulationPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-custom-darkgray mb-2">Pipeline Simulation</h1>
        <p className="text-gray-600">
          Visualization of instructions flowing through the 5-stage pipeline
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <PipelineGrid />
      </div>
    </div>
  );
};

export default SimulationPage;
