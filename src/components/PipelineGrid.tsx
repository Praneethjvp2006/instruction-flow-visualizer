
import React, { useState, useEffect } from 'react';

interface PipelineGridProps {
  // Add props if needed
}

const PipelineGrid: React.FC<PipelineGridProps> = () => {
  const rows = ['Instruction 1', 'Instruction 2', 'Instruction 3', 'Instruction 4', 'Instruction 5'];
  const columns = ['Fetch', 'Decode', 'Execute', 'Memory', 'Writeback'];
  
  const [activeCell, setActiveCell] = useState<{ row: number, col: number } | null>(null);

  // Simulate pipeline execution with a moving highlight
  useEffect(() => {
    let currentRow = 0;
    let currentCol = 0;
    
    const interval = setInterval(() => {
      if (currentCol < columns.length) {
        setActiveCell({ row: currentRow, col: currentCol });
        currentCol++;
      } else {
        currentCol = 0;
        currentRow = (currentRow + 1) % rows.length;
        setActiveCell({ row: currentRow, col: currentCol });
      }
    }, 800); // Update every 800ms
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-full bg-white rounded-lg shadow-md">
        {/* Grid Header */}
        <div className="grid grid-cols-6 bg-custom-darkgray text-white rounded-t-lg">
          <div className="p-4 font-semibold"></div>
          {columns.map((column, colIndex) => (
            <div key={colIndex} className="p-4 font-semibold text-center">
              {column}
            </div>
          ))}
        </div>
        
        {/* Grid Body */}
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-6 border-b border-gray-200">
            <div className="p-4 font-medium bg-gray-50 flex items-center">
              {row}
            </div>
            
            {columns.map((_, colIndex) => (
              <div 
                key={colIndex} 
                className={`p-4 flex items-center justify-center border-l border-gray-200 transition-all duration-300 ${
                  activeCell?.row === rowIndex && activeCell?.col === colIndex
                    ? 'bg-custom-teal bg-opacity-30 grid-cell-highlight'
                    : ''
                }`}
              >
                {activeCell?.row === rowIndex && activeCell?.col === colIndex && (
                  <div className="w-3 h-3 bg-custom-teal rounded-full animate-pulse"></div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PipelineGrid;
