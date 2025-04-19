
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import SimulationPage from './SimulationPage';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <SimulationPage />
    </div>
  );
};

export default Index;
