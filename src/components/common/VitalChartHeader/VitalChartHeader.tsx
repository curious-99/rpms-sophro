import React from 'react'; 
import {  Maximize } from 'lucide-react';

interface ChartHeaderProps {
  title?: string;
  onMaximize?: () => void;
  showMaximize?: boolean;
}

const ChartHeader: React.FC<ChartHeaderProps> = ({ 
  title, 
  onMaximize, 
  showMaximize = true 
}) => {
  return (
    <div className="flex justify-between items-center mb-2">
      {title && (
        <h2 className="text-2xl font-semibold capitalize">
          {title.replace('-', ' ')}
        </h2>
      )}
      <div className="ml-auto flex items-center gap-2">
        {showMaximize && (
          <button
            className="p-1.5 border border-gray-200 rounded hover:bg-gray-50 transition-colors"
            onClick={onMaximize}
          >
            <Maximize size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ChartHeader;