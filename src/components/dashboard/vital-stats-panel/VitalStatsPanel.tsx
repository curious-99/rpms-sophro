import { useState } from 'react';
import LeftArrow from '../../../assets/icons/arrow-left.svg';

const generateLeadData = () => {
  return Array.from({ length: 8 }, (_, i) => ({
    title: `Lead ${i + 1}`,
    value: (Math.random() * 2 - 1).toFixed(2),
    unit: 'mV',
  }));
};

const statsConfig = {
  'heart-rate': [
    { title: 'Minimum', value: '48', unit: 'bpm' },
    { title: 'Average', value: '72', unit: 'bpm' },
    { title: 'Maximum', value: '81', unit: 'bpm' },
  ],
  ecg: {
    'Lead V1': generateLeadData(),
    'Lead V2': generateLeadData(),
    'Lead V3': generateLeadData(),
  },
  temperature: [
    { title: 'Current', value: '98.6', unit: '°F' },
    { title: 'Min (24h)', value: '97.8', unit: '°F' },
    { title: 'Max (24h)', value: '99.4', unit: '°F' },
  ],
  spo2: [
    { title: 'Current', value: '98', unit: '%' },
    { title: 'Min (24h)', value: '95', unit: '%' },
    { title: 'Avg (24h)', value: '97', unit: '%' },
  ],
  respiration: [
    { title: 'Current', value: '16', unit: 'rpm' },
    { title: 'Min (24h)', value: '12', unit: 'rpm' },
    { title: 'Max (24h)', value: '20', unit: 'rpm' },
  ],
  activities: [
    { title: 'Steps', value: '8,432', unit: '' },
    { title: 'Distance', value: '6.2', unit: 'km' },
    { title: 'Calories', value: '420', unit: 'kcal' },
  ],
};

const VitalStatsPanel = ({ selectedVital }) => {
  const [selectedLead, setSelectedLead] = useState('Lead V1');

  let stats = [];
  if (selectedVital === 'ecg') {
    stats = statsConfig.ecg[selectedLead];
  } else {
    stats = statsConfig[selectedVital] || [];
  }

  if (selectedVital === 'activities') return null;

  const isSpecialVital =
    selectedVital === 'heart-rate' || selectedVital === 'respiration';

  return (
    <div className="flex flex-col gap-4 p-5 rounded-xl items-center">
      {/* ECG Dropdown */}
      {selectedVital === 'ecg' && (
        <div className="mb-4">
          <select
            value={selectedLead}
            onChange={(e) => setSelectedLead(e.target.value)}
            className="flex p-[8px_12px] items-center gap-[10px] self-stretch 
                        rounded-[6px] border border-teal-500 bg-white 
                        text-gray-700 outline-none focus:ring-2 hover:ring-teal-400"
          >
            {Object.keys(statsConfig.ecg).map((lead) => (
              <option key={lead} value={lead}>
                {lead}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center p-4 bg-[#CCFBF1] border border-[#b8e6d9] rounded-lg text-center h-[100px]"
            style={{
              boxShadow:
                '1px 1px 4px 0px rgba(0, 0, 0, 0.25) inset, 1px 1px 4px 0px rgba(0, 0, 0, 0.25)',
            }}
          >
            <span className="text-[#4B5563] font-medium mb-0.5">
              {stat.title}
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-[#0A0A0A]">
                {stat.value}
              </span>
              {stat.unit && (
                <span className="text-sm text-[#0A0A0A]">{stat.unit}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Special Section for Heart Rate Variability & RDI */}
      {isSpecialVital && (
        <div className="w-[252px] mt-6 px-4 py-5 bg-white rounded-xl shadow-[1px_1px_12px_0px_rgba(0,0,0,0.10)] flex flex-col justify-start items-center gap-0.5">
          <div className="flex flex-col justify-center items-center gap-3">
            {/* Title */}
            <div className="inline-flex justify-end items-start gap-2.5">
              <div className="text-center text-black text-xl font-bold font-['Lato'] leading-[30px]">
                {selectedVital === 'heart-rate'
                  ? 'Heart Rate Variability'
                  : 'Respiratory Disturbance Index (RDI)'}
              </div>
            </div>

            {/* Button */}
            <div className="w-[180px] px-4 py-2 bg-teal-500 rounded-[50px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] flex flex-row justify-between items-center">
              <span className="text-white text-xl font-semibold">
                72 {selectedVital === 'heart-rate' ? 'ms' : ''}
              </span>
              <img
                src={LeftArrow}
                alt="Left Arrow"
                className="w-5 h-5 ml-auto"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VitalStatsPanel;
