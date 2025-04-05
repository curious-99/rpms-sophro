import React, { useEffect, useState } from 'react';
import { Maximize } from 'lucide-react';
import VitalDetailModal from '@/components/Modal/VitalDetailsModal';
import { 
  generateMockChartData, 
  ActivityBarChart, 
  generateActivityStats, 
  getPointCount 
} from '../Chart/Charts';

interface ActivityPanelProps {
  metric: {
    key: string;
    title: string;
    color: string;
    range: { min: number; max: number };
    unit?: string;
    icon: string;
  };
  selectedRange: { label: string; days: number };
}

const ActivityPanel: React.FC<ActivityPanelProps> = ({ metric, selectedRange }) => {
  const [chartData, setChartData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const stats = generateActivityStats(metric.key);

  useEffect(() => {
    const count = getPointCount('activities', selectedRange.label);
    let data = generateMockChartData(count, metric.range);
    
    // If the metric is steps, transform the data for stacked bars:
    if (metric.key === 'steps') {
      data = data.map((item) => ({
        ...item,
        normal: Math.min(item.value, 10000),
        excess: item.value > 10000 ? item.value - 10000 : 0,
      }));
    }
    
    setChartData(data);
  }, [selectedRange, metric.key, metric.range]);

  const Icon = metric.icon;

  return (
    <>
      <div className="rounded-lg bg-white shadow-[0px_0px_10px_rgba(0,0,0,0.05)] border border-gray-100 py-4 px-4">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
           <img src={metric.icon} alt={`${metric.title} icon`} className="w-7 h-7 mr-2" />
            <h3 className="text-xl font-semibold">{metric.title}</h3>
          </div>
          <button
            className="p-1.5 border border-gray-200 rounded hover:bg-gray-50 transition-colors"
            onClick={() => setShowModal(true)}
          >
            <Maximize size={16} />
          </button>
        </div>

        <div className="flex flex-row gap-2">
          <div className="flex-1">
            <ActivityBarChart 
              data={chartData} 
              timeRange={selectedRange} 
              metric={metric} 
            />
          </div>

          <div className="flex flex-col gap-2">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="rounded-lg bg-[#CCFBF1] border border-[#b8e6d9] px-3 py-2 text-center"
                style={{
                  boxShadow:
                    '1px 1px 4px 0px rgba(0,0,0,0.25) inset, 1px 1px 4px 0px rgba(0,0,0,0.25)',
                }}
              >
                <p className="text-[16px] text-gray-600 mb-1">{stat.title}</p>
                <p className="font-semibold text-[16px] flex justify-center items-baseline">
                  {stat.value}
                  {stat.unit && <span className="text-xs ml-1">{stat.unit}</span>}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <VitalDetailModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        vitalType="activity"
        vitalInfo={metric}
        chartData={generateMockChartData(
          getPointCount('activities', selectedRange.label),
          metric.range
        )}
        selectedTimeRange={selectedRange}
      />
    </>
  );
};

export default ActivityPanel;