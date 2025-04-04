// import React, { useEffect, useState } from 'react';
// import {
//   BarChart,
//   Bar,
//   LineChart,
//   Line,
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from 'recharts';
// import { Dialog, DialogContent } from '../ui/dialog';
// import { Button } from '../ui/Button';
// import { ChevronLeft } from 'lucide-react';

// interface VitalDetailModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   vitalType: string;
//   vitalInfo: {
//     title: string;
//     color: string;
//     range: { min: number; max: number };
//     unit?: string;
//     icon?: string;
//   };
//   chartData: { time: number; value: number }[];
//   selectedTimeRange: { label: string };
// }

// const colors = {
//   primary: '#14B8A6',
//   secondary: '#EF4444',
//   background: '#fff',
//   border: '#f0f0f0',
//   tooltipText: '#333',
//   tooltipBackground: '#fff8f8',
//   grid: '#ffdddd',
//   gridHighlight: '#ffcccc',
//   line: '#555555',
//   statBackground: '#e0f5f0',
//   statBorder: '#b8e6d9',
//   selectedButtonBackground: '#CCFBF1',
//   selectedButtonText: '#0F766E', // approximate teal-800
// };

// // -----------------------
// // Helper Functions for Axes
// // -----------------------

// const getXAxisTicksForModal = (vitalType: string, rangeLabel: string) => {
//   if (
//     ['heart-rate', 'temperature', 'spo2', 'respiration'].includes(vitalType)
//   ) {
//     if (rangeLabel === '1 Day') return [1, 4, 7, 10, 13, 16, 19, 22];
//     if (rangeLabel === '7 Days') return [1, 2, 3, 4, 5, 6, 7];
//     if (rangeLabel === '1 Month') return [1, 30];
//     if (rangeLabel === '3 Months') return [1, 90];
//   }
//   return undefined;
// };

// const formatXAxisTickForModal = (
//   tick: number,
//   vitalType: string,
//   rangeLabel: string
// ) => {
//   if (
//     ['heart-rate', 'temperature', 'spo2', 'respiration'].includes(vitalType)
//   ) {
//     if (rangeLabel === '1 Day') {
//       const hour = tick - 1;
//       const period = hour < 12 ? 'am' : 'pm';
//       let displayHour = hour % 12;
//       if (displayHour === 0) displayHour = 12;
//       return `${displayHour}${period}`;
//     } else if (rangeLabel === '1 Month' || rangeLabel === '3 Months') {
//       if (tick === 1) return 'Min';
//       if (tick === (rangeLabel === '1 Month' ? 30 : 90)) return 'Max';
//       return '';
//     } else if (rangeLabel === '7 Days') {
//       return `${tick}`;
//     }
//   }
//   return `${tick}`;
// };

// const getYAxisSettingsForModal = (
//   vitalType: string,
//   vitalRange: { min: number; max: number }
// ) => {
//   if (vitalType === 'heart-rate') {
//     return { domain: [30, 100], ticks: [30, 40, 50, 60, 70, 80, 90, 100] };
//   } else if (vitalType === 'spo2') {
//     return { domain: [30, 100], ticks: [30, 40, 50, 60, 70, 80, 90, 100] };
//   } else if (vitalType === 'temperature') {
//     return { domain: [90, 104], ticks: [90, 92, 94, 96, 98, 100, 102, 104] };
//   } else if (vitalType === 'respiration') {
//     return { domain: [0, 21], ticks: [0, 3, 6, 9, 12, 15, 18, 21] };
//   }
//   return { domain: [vitalRange.min, vitalRange.max], ticks: undefined };
// };

// // -----------------------
// // VitalDetailModal Component
// // -----------------------

// const VitalDetailModal = ({
//   isOpen,
//   onClose,
//   vitalType,
//   vitalInfo,
//   chartData,
//   selectedTimeRange,
// }: VitalDetailModalProps) => {
//   const [ecgData, setEcgData] = useState<{ time: number; value: number }[]>([]);

//   useEffect(() => {
//     if (vitalType === 'ecg' && isOpen) {
//       setEcgData(generateEcgData());
//     }
//   }, [vitalType, isOpen]);

//   // Fallback X-axis formatter if not using custom ticks
//   const formatXAxis = (value: number) => `${value}`;

//   const getChartComponent = () => {
//     if (vitalType === 'activities' || vitalType.includes('activity')) {
//       return (
//         <BarChart
//           data={chartData}
//           margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
//         >
//           <CartesianGrid strokeDasharray="3 3" vertical={false} />
//           <XAxis
//             dataKey="time"
//             tickFormatter={formatXAxis}
//             interval={Math.ceil(chartData.length / 20)}
//           />
//           <YAxis hide />
//           <Tooltip
//             formatter={(value) => [
//               `${value} ${vitalInfo.unit || ''}`,
//               vitalInfo.title,
//             ]}
//             labelFormatter={(label) => `Time ${label}`}
//           />
//           <Bar
//             dataKey="value"
//             fill={vitalInfo.color}
//             radius={[4, 4, 0, 0]}
//             barSize={10}
//           />
//         </BarChart>
//       );
//     } else if (vitalType === 'ecg') {
//       return (
//         <div
//           className="relative"
//           style={{ backgroundColor: colors.tooltipBackground }}
//         >
//           {/* ECG Grid background */}
//           <div className="absolute inset-0 z-0">
//             <svg width="100%" height="100%" className="absolute inset-0">
//               {Array.from({ length: 25 }).map((_, i) => (
//                 <line
//                   key={`h-${i}`}
//                   x1="0"
//                   y1={`${(i * 100) / 25}%`}
//                   x2="100%"
//                   y2={`${(i * 100) / 25}%`}
//                   stroke={colors.grid}
//                   strokeWidth="1"
//                 />
//               ))}
//               {Array.from({ length: 25 }).map((_, i) => (
//                 <line
//                   key={`v-${i}`}
//                   x1={`${(i * 100) / 25}%`}
//                   y1="0"
//                   x2={`${(i * 100) / 25}%`}
//                   y2="100%"
//                   stroke={colors.grid}
//                   strokeWidth="1"
//                 />
//               ))}
//               {Array.from({ length: 6 }).map((_, i) => (
//                 <line
//                   key={`hm-${i}`}
//                   x1="0"
//                   y1={`${(i * 100) / 5}%`}
//                   x2="100%"
//                   y2={`${(i * 100) / 5}%`}
//                   stroke={colors.gridHighlight}
//                   strokeWidth="1.5"
//                 />
//               ))}
//               {Array.from({ length: 11 }).map((_, i) => (
//                 <line
//                   key={`vm-${i}`}
//                   x1={`${(i * 100) / 10}%`}
//                   y1="0"
//                   x2={`${(i * 100) / 10}%`}
//                   y2="100%"
//                   stroke={colors.gridHighlight}
//                   strokeWidth="1.5"
//                 />
//               ))}
//             </svg>
//           </div>

//           <div className="relative z-10">
//             <ResponsiveContainer width="100%" height={300}>
//               <LineChart
//                 data={ecgData}
//                 margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
//               >
//                 <XAxis dataKey="time" hide />
//                 <YAxis domain={[-0.3, 1.1]} hide />
//                 <Tooltip
//                   formatter={(value: any) => [
//                     `${typeof value === 'number' ? value.toFixed(2) : value} ${vitalInfo.unit || ''}`,
//                     vitalInfo.title,
//                   ]}
//                   labelFormatter={(label) => `Time ${label}`}
//                 />
//                 <Line
//                   type="monotone"
//                   dataKey="value"
//                   stroke={colors.line}
//                   strokeWidth={2}
//                   dot={false}
//                   isAnimationActive={true}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>

//           <div
//             className="flex justify-between px-6 text-xs"
//             style={{ color: colors.tooltipText }}
//           >
//             {Array.from({ length: 11 }).map((_, i) => (
//               <div key={`time-${i}`}>{i}s</div>
//             ))}
//           </div>
//         </div>
//       );
//     } else {
//       const xTicks = getXAxisTicksForModal(vitalType, selectedTimeRange.label);
//       const yAxisSettings = getYAxisSettingsForModal(
//         vitalType,
//         vitalInfo.range
//       );
//       return (
//         <ResponsiveContainer width="100%" height={300}>
//           <AreaChart
//             data={chartData}
//             margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
//           >
//             <CartesianGrid strokeDasharray="3 3" vertical={false} />
//             <XAxis
//               dataKey="time"
//               tickFormatter={(tick) =>
//                 formatXAxisTickForModal(
//                   tick,
//                   vitalType,
//                   selectedTimeRange.label
//                 )
//               }
//               ticks={xTicks}
//             />
//             <YAxis
//               domain={yAxisSettings.domain}
//               ticks={yAxisSettings.ticks}
//               tick={{ fill: colors.tooltipText, fontSize: 12 }}
//               axisLine={{ stroke: colors.tooltipText }}
//             />
//             <Tooltip
//               formatter={(value) => [
//                 `${value} ${vitalInfo.unit || ''}`,
//                 vitalInfo.title,
//               ]}
//               labelFormatter={(label) => `Time ${label}`}
//             />
//             <Area
//               type="monotone"
//               dataKey="value"
//               stroke={vitalInfo.color}
//               fill={`${vitalInfo.color}33`}
//               strokeWidth={2}
//             />
//           </AreaChart>
//         </ResponsiveContainer>
//       );
//     }
//   };

//   // -----------------------
//   // Generate Statistics
//   // -----------------------

//   const generateStats = () => {
//     const isActivity =
//       vitalType === 'activities' || vitalType.includes('activity');

//     if (isActivity) {
//       return [
//         {
//           label: 'Today',
//           value: Math.floor(
//             vitalInfo.range.min +
//               Math.random() * (vitalInfo.range.max - vitalInfo.range.min)
//           ),
//         },
//         {
//           label: 'Average',
//           value: Math.floor((vitalInfo.range.min + vitalInfo.range.max) / 2),
//         },
//         {
//           label: 'Maximum',
//           value: Math.floor(vitalInfo.range.max * 0.9),
//         },
//         {
//           label: 'Goal',
//           value: Math.floor(vitalInfo.range.max * 0.8),
//         },
//         {
//           label: 'Last Week',
//           value: Math.floor(
//             vitalInfo.range.min +
//               Math.random() * (vitalInfo.range.max - vitalInfo.range.min)
//           ),
//         },
//         { label: 'Trend', value: '+12%' },
//       ];
//     } else {
//       return [
//         {
//           label: 'Current',
//           value: Math.floor(
//             vitalInfo.range.min +
//               Math.random() * (vitalInfo.range.max - vitalInfo.range.min)
//           ),
//         },
//         {
//           label: 'Minimum',
//           value: Math.floor(vitalInfo.range.min * 1.1),
//         },
//         {
//           label: 'Maximum',
//           value: Math.floor(vitalInfo.range.max * 0.9),
//         },
//         {
//           label: 'Average',
//           value: Math.floor((vitalInfo.range.min + vitalInfo.range.max) / 2),
//         },
//         {
//           label: 'Last Reading',
//           value: Math.floor(
//             vitalInfo.range.min +
//               Math.random() * (vitalInfo.range.max - vitalInfo.range.min)
//           ),
//         },
//         { label: 'Trend', value: '-3%' },
//       ];
//     }
//   };

//   const statsData = generateStats();

//   return (
//     <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
//       <DialogContent
//         className="sm:max-w-[90vw] h-[90vh] p-0 overflow-hidden flex flex-col"
//         style={{ backgroundColor: colors.background }}
//       >
//         <div className="p-6 flex-1 overflow-auto">
//           <div
//             className="rounded-lg shadow-sm p-8 mb-6"
//             style={{
//               backgroundColor: colors.background,
//               border: `1px solid ${colors.border}`,
//             }}
//           >
//             <div className="flex items-center justify-center mx-auto mb-4">
//               {vitalInfo.icon && (
//                 <span className="text-2xl mr-2">{vitalInfo.icon}</span>
//               )}
//               <h3 className="text-2xl font-semibold">{vitalInfo.title}</h3>
//             </div>

//             <div className="flex justify-between items-center mb-6">
//               <div className="flex gap-2">
//                 {['1 Day', '7 Days', '1 Month', '3 Months'].map((range) => (
//                   <button
//                     key={range}
//                     className="px-4 py-2 rounded-md transition-all text-sm font-medium"
//                     style={
//                       selectedTimeRange.label === range
//                         ? {
//                             backgroundColor: colors.selectedButtonBackground,
//                             color: colors.selectedButtonText,
//                             border: `1px solid ${colors.primary}`,
//                           }
//                         : {}
//                     }
//                   >
//                     {range}
//                   </button>
//                 ))}
//               </div>

//               <div className="ml-auto">
//                 <Button variant="outline" size="sm" className="gap-2">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="16"
//                     height="16"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   >
//                     <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
//                     <polyline points="7 10 12 15 17 10" />
//                     <line x1="12" y1="15" x2="12" y2="3" />
//                   </svg>
//                   <span>Export PDF</span>
//                 </Button>
//               </div>
//             </div>

//             <div className="h-[500px] w-full">
//               {vitalType === 'ecg' ? (
//                 getChartComponent()
//               ) : (
//                 <ResponsiveContainer width="100%" height="100%">
//                   {getChartComponent()}
//                 </ResponsiveContainer>
//               )}
//             </div>
//           </div>

//           <div
//             className="rounded-lg shadow-sm p-6"
//             style={{
//               backgroundColor: colors.background,
//               border: `1px solid ${colors.border}`,
//             }}
//           >
//             <h3 className="text-lg font-semibold mb-4">Statistics</h3>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//               {statsData.map((stat, index) => (
//                 <div
//                   key={index}
//                   className="rounded-lg p-4"
//                   style={{
//                     backgroundColor: colors.statBackground,
//                     border: `1px solid ${colors.statBorder}`,
//                   }}
//                 >
//                   <p
//                     className="text-sm mb-1"
//                     style={{ color: colors.tooltipText }}
//                   >
//                     {stat.label}
//                   </p>
//                   <p className="font-bold text-xl">
//                     {typeof stat.value === 'number'
//                       ? vitalType === 'activities' && stat.label === 'Today'
//                         ? `${(stat.value / 1000).toFixed(0)}K`
//                         : stat.value
//                       : stat.value}
//                     {vitalInfo.unit && (
//                       <span className="text-sm ml-1">{vitalInfo.unit}</span>
//                     )}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default VitalDetailModal;

// // -----------------------
// // Helper: Generate ECG Data
// // -----------------------

// const generateEcgData = (
//   numPoints = 200
// ): { time: number; value: number }[] => {
//   const data: { time: number; value: number }[] = [];
//   let time = 0;

//   const generateCycle = (startIndex: number, cycleLength: number) => {
//     // P wave (atrial depolarization)
//     for (let i = 0; i < cycleLength * 0.1; i++) {
//       const progress = i / (cycleLength * 0.1);
//       data.push({
//         time: startIndex + i,
//         value: 0.2 * Math.sin(progress * Math.PI),
//       });
//     }

//     // PR segment (flat)
//     for (let i = 0; i < cycleLength * 0.05; i++) {
//       data.push({
//         time: startIndex + cycleLength * 0.1 + i,
//         value: 0,
//       });
//     }

//     // QRS complex (ventricular depolarization)
//     data.push({ time: startIndex + cycleLength * 0.15, value: -0.1 });
//     data.push({ time: startIndex + cycleLength * 0.16, value: 1 });
//     data.push({ time: startIndex + cycleLength * 0.17, value: -0.2 });

//     // ST segment (flat)
//     for (let i = 0; i < cycleLength * 0.13; i++) {
//       data.push({
//         time: startIndex + cycleLength * 0.17 + i,
//         value: 0,
//       });
//     }

//     // T wave (ventricular repolarization)
//     for (let i = 0; i < cycleLength * 0.15; i++) {
//       const progress = i / (cycleLength * 0.15);
//       data.push({
//         time: startIndex + cycleLength * 0.3 + i,
//         value: 0.3 * Math.sin(progress * Math.PI),
//       });
//     }

//     // TP segment (rest)
//     for (let i = 0; i < cycleLength * 0.55; i++) {
//       data.push({
//         time: startIndex + cycleLength * 0.45 + i,
//         value: 0,
//       });
//     }

//     return cycleLength;
//   };

//   while (time < numPoints) {
//     const cycleLength = Math.floor(40 + Math.random() * 5);
//     time += generateCycle(time, cycleLength);
//   }

//   return data.slice(0, numPoints);
// };




import React, { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/Button";
import { ChevronLeft, Download } from "lucide-react";
import TimeRangeSelector from "../common/TImeRangeSelector/TimeRangeSelector";
import {
  generateEcgData,
  EcgChart,
  AreaVitalChart,
  BarVitalChart,
  LineVitalChart,
  ActivityBarChart,
  timeRanges
} from '../common/Chart/Charts';

interface VitalDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  vitalType: string;
  vitalInfo: {
    title: string;
    color: string;
    range: { min: number; max: number };
    unit?: string;
    icon?: React.ReactNode;
  };
  chartData: { time: number; value: number }[];
  selectedTimeRange: { label: string; days: number };
}

const VitalDetailModal = ({
  isOpen,
  onClose,
  vitalType,
  vitalInfo,
  chartData,
  selectedTimeRange,
}: VitalDetailModalProps) => {
  const [selectedRange, setSelectedRange] = useState(selectedTimeRange);
  const [ecgData, setEcgData] = useState([]);

  useEffect(() => {
    if (vitalType === "ecg" && isOpen) {
      setEcgData(generateEcgData(200)); // Generate more data points for larger display
    }
  }, [vitalType, isOpen]);

  // Generate statistics based on vital type
  const generateStats = () => {
    const isActivity = vitalType === "activities" || vitalType.includes("activity");

    if (isActivity) {
      return [
        { label: "Today", value: Math.floor(vitalInfo.range.min + Math.random() * (vitalInfo.range.max - vitalInfo.range.min)) },
        { label: "Average", value: Math.floor((vitalInfo.range.min + vitalInfo.range.max) / 2) },
        { label: "Maximum", value: Math.floor(vitalInfo.range.max * 0.9) },
        { label: "Goal", value: Math.floor(vitalInfo.range.max * 0.8) },
        { label: "Last Week", value: Math.floor(vitalInfo.range.min + Math.random() * (vitalInfo.range.max - vitalInfo.range.min)) },
        { label: "Trend", value: "+12%" },
      ];
    } else {
      return [
        { label: "Current", value: Math.floor(vitalInfo.range.min + Math.random() * (vitalInfo.range.max - vitalInfo.range.min)) },
        { label: "Minimum", value: Math.floor(vitalInfo.range.min * 1.1) },
        { label: "Maximum", value: Math.floor(vitalInfo.range.max * 0.9) },
        { label: "Average", value: Math.floor((vitalInfo.range.min + vitalInfo.range.max) / 2) },
        { label: "Last Reading", value: Math.floor(vitalInfo.range.min + Math.random() * (vitalInfo.range.max - vitalInfo.range.min)) },
        { label: "Trend", value: "-3%" },
      ];
    }
  };

  // Determine the chart type based on vital type
  const renderChart = () => {
    if (vitalType === "ecg") {
      return <EcgChart data={ecgData} vitalInfo={vitalInfo} />;
    } else if (vitalType === "activities" || vitalType.includes("activity")) {
      if (vitalType.includes("activity")) {
        return (
          <div className="h-[400px]">
            <ActivityBarChart
              data={chartData}
              timeRange={selectedRange}
              metric={vitalInfo}
            />
          </div>
        );
      }
      return (
        <BarVitalChart
          data={chartData}
          vitalType={vitalType}
          timeRange={selectedRange}
          vitalInfo={vitalInfo}
        />
      );
    } else {
      return (
        <AreaVitalChart
          data={chartData}
          vitalType={vitalType}
          timeRange={selectedRange}
          vitalInfo={vitalInfo}
        />
      );
    }
  };

  const stats = generateStats();

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[90vw] h-[90vh] p-0 bg-gray-50 overflow-hidden flex flex-col">
        <div className="p-5 flex-1 overflow-auto">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
            <div className="flex justify-center items-center mb-6">
              <div className="flex items-center">

                {vitalInfo.icon && <span className="text-2xl mr-2">{vitalInfo.icon}</span>}
                <h3 className="text-2xl font-semibold w-auto">{vitalInfo.title}</h3>
              </div>
            </div>

            <TimeRangeSelector
              selectedRange={selectedRange}
              setSelectedRange={setSelectedRange}
            />

            <div className=" w-full">
              {renderChart()}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VitalDetailModal;
