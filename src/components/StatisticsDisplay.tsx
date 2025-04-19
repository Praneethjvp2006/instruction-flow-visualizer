
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface StatsData {
  totalCycles: number;
  totalInstructionsExecuted: number;
  cpi: number;
  dataTransferInstructions: number;
  aluInstructions: number;
  controlInstructions: number;
  totalStalls: number;
  dataHazards: number;
  controlHazards: number;
  branchMispredictions: number;
  stallsDueToDataHazards: number;
  stallsDueToControlHazards: number;
}

const StatisticsDisplay: React.FC = () => {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch data from web2.txt
    const fetchStats = async () => {
      try {
        // Simulated data - would come from the second part of web2.txt
        const mockData: StatsData = {
          totalCycles: 14,
          totalInstructionsExecuted: 4,
          cpi: 3.5,
          dataTransferInstructions: 0,
          aluInstructions: 4,
          controlInstructions: 0,
          totalStalls: 6,
          dataHazards: 6,
          controlHazards: 0,
          branchMispredictions: 0,
          stallsDueToDataHazards: 6,
          stallsDueToControlHazards: 0
        };
        
        setStats(mockData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching statistics:", err);
        setLoading(false);
      }
    };

    fetchStats();
    
    // Animate the stats in sequence
    const timeout = setTimeout(() => {
      const statElements = document.querySelectorAll('.stat-card');
      statElements.forEach((el, index) => {
        setTimeout(() => {
          el.classList.add('animate-scale-in');
        }, index * 150);
      });
    }, 300);

    return () => clearTimeout(timeout);
  }, []);

  if (loading || !stats) {
    return (
      <div className="p-8 flex justify-center items-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-custom-teal border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading statistics...</p>
        </div>
      </div>
    );
  }

  const getInstructionPercentage = (count: number) => {
    return (count / stats.totalInstructionsExecuted) * 100;
  };

  const getHazardPercentage = (count: number) => {
    return stats.totalStalls > 0 ? (count / stats.totalStalls) * 100 : 0;
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Performance Overview */}
        <Card className="stat-card opacity-0">
          <CardHeader className="bg-custom-teal bg-opacity-10 rounded-t-lg">
            <CardTitle>Performance Overview</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">CPI (Cycles per Instruction)</span>
                  <span className="text-sm font-medium">{stats.cpi}</span>
                </div>
                <Progress value={Math.min(stats.cpi / 5 * 100, 100)} className="h-2 bg-gray-200" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500">Total Cycles</p>
                  <p className="text-2xl font-bold text-custom-darkgray">{stats.totalCycles}</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500">Instructions</p>
                  <p className="text-2xl font-bold text-custom-darkgray">
                    {stats.totalInstructionsExecuted}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Instruction Mix */}
        <Card className="stat-card opacity-0">
          <CardHeader className="bg-custom-teal bg-opacity-10 rounded-t-lg">
            <CardTitle>Instruction Mix</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">ALU Instructions</span>
                  <span className="text-sm font-medium">{stats.aluInstructions}</span>
                </div>
                <Progress 
                  value={getInstructionPercentage(stats.aluInstructions)} 
                  className="h-2 bg-gray-200" 
                />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Data Transfer</span>
                  <span className="text-sm font-medium">{stats.dataTransferInstructions}</span>
                </div>
                <Progress 
                  value={getInstructionPercentage(stats.dataTransferInstructions)} 
                  className="h-2 bg-gray-200" 
                />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Control</span>
                  <span className="text-sm font-medium">{stats.controlInstructions}</span>
                </div>
                <Progress 
                  value={getInstructionPercentage(stats.controlInstructions)} 
                  className="h-2 bg-gray-200" 
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stalls Overview */}
        <Card className="stat-card opacity-0">
          <CardHeader className="bg-custom-teal bg-opacity-10 rounded-t-lg">
            <CardTitle>Pipeline Stalls</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg mb-4">
                <p className="text-xs text-gray-500">Total Stalls/Bubbles</p>
                <p className="text-2xl font-bold text-custom-darkgray">{stats.totalStalls}</p>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Data Hazards</span>
                  <span className="text-sm font-medium">{stats.dataHazards}</span>
                </div>
                <Progress 
                  value={getHazardPercentage(stats.dataHazards)} 
                  className="h-2 bg-gray-200" 
                />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Control Hazards</span>
                  <span className="text-sm font-medium">{stats.controlHazards}</span>
                </div>
                <Progress 
                  value={getHazardPercentage(stats.controlHazards)} 
                  className="h-2 bg-gray-200" 
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="stat-card opacity-0">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-2">Branch Mispredictions</h3>
            <p className="text-3xl font-bold text-custom-teal">{stats.branchMispredictions}</p>
          </CardContent>
        </Card>

        <Card className="stat-card opacity-0">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-2">Stalls due to Data Hazards</h3>
            <p className="text-3xl font-bold text-custom-teal">{stats.stallsDueToDataHazards}</p>
          </CardContent>
        </Card>

        <Card className="stat-card opacity-0">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-2">Stalls due to Control Hazards</h3>
            <p className="text-3xl font-bold text-custom-teal">{stats.stallsDueToControlHazards}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StatisticsDisplay;
