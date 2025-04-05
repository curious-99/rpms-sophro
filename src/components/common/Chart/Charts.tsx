// import {
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   AreaChart,
//   Area,
//   BarChart,
//   Bar,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Tooltip,
// } from 'recharts';
// import React from 'react';

// // Chart color configuration
// export const chartColors = {
//   primary: '#14B8A6',
//   secondary: '#EF4444',
//   background: '#fff',
//   border: '#f0f0f0',
//   tooltipText: '#333',
//   tooltipBackground: '#fff8f8',
//   grid: '#ffdddd',
//   gridHighlight: '#ffcccc',
//   highlight: '#CCFBF1',
//   highlightBorder: '#b8e6d9',
//   ecgLine: '#555555',
//   textPrimary: '#155e75',
//   textSecondary: '#4B5563',
//   textWhite: '#ffffff',
// };

// // Vital types configuration
// export const vitalChartConfig = {
//   'heart-rate': {
//     type: 'area',
//     color: chartColors.primary,
//     range: { min: 60, max: 100 },
//     title: 'Heart Rate',
//     unit: 'bpm',
//   },
//   temperature: {
//     type: 'area',
//     color: chartColors.primary,
//     range: { min: 97, max: 102 },
//     title: 'Temperature',
//     unit: '°F',
//   },
//   spo2: {
//     type: 'area',
//     color: chartColors.primary,
//     range: { min: 85, max: 100 },
//     title: 'SpO2',
//     unit: '%',
//   },
//   respiration: {
//     type: 'area',
//     color: chartColors.primary,
//     range: { min: 10, max: 20 },
//     title: 'Respiration',
//     unit: 'rpm',
//   },
//   ecg: {
//     type: 'line',
//     color: chartColors.secondary,
//     range: { min: -1, max: 1 },
//     title: 'ECG',
//     unit: 'mV',
//   },
//   activities: {
//     type: 'bar',
//     color: chartColors.primary,
//     range: { min: 0, max: 100 },
//     title: 'Activities',
//   },
// };

// // Time ranges configuration
// export const timeRanges = [
//   { label: '1 Day', days: 24 },
//   { label: '7 Days', days: 7 * 24 },
//   { label: '1 Month', days: 30 * 24 },
//   { label: '3 Months', days: 90 * 24 },
// ];

// // Activity metrics configuration
// export const activityMetrics = [
//   {
//     key: 'steps',
//     title: 'Steps',
//     color: chartColors.primary,
//     range: { min: 1000, max: 15000 },
//     icon: '👣',
//   },
//   {
//     key: 'calories',
//     title: 'Calories',
//     color: chartColors.primary,
//     range: { min: 100, max: 1500 },
//     unit: 'kcal',
//     icon: '🔥',
//   },
//   {
//     key: 'distance',
//     title: 'Distance',
//     color: chartColors.primary,
//     range: { min: 1, max: 20 },
//     unit: 'km',
//     icon: '📍',
//   },
//   {
//     key: 'time',
//     title: 'Time',
//     color: chartColors.primary,
//     range: { min: 4, max: 15 },
//     unit: 'mins',
//     icon: '⏱️',
//   },
// ];

// // Generate random chart data
// export const generateMockChartData = (
//   totalPoints: number,
//   range: { min: number; max: number }
// ) => {
//   return Array.from({ length: totalPoints }, (_, i) => ({
//     time: i + 1,
//     value: range.min + Math.random() * (range.max - range.min),
//   }));
// };

// // Generate ECG data
// export const generateEcgData = (numPoints = 100) => {
//   const data = [];
//   let time = 0;

//   // Function to generate one ECG cycle
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
//     data.push({ time: startIndex + cycleLength * 0.15, value: -0.1 }); // Q wave
//     data.push({ time: startIndex + cycleLength * 0.16, value: 1 }); // R wave (peak)
//     data.push({ time: startIndex + cycleLength * 0.17, value: -0.2 }); // S wave

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

//   // Generate multiple cycles to fill the chart
//   while (time < numPoints) {
//     // Vary the cycle length slightly to create natural heart rate variability
//     const cycleLength = Math.floor(30 + Math.random() * 5);
//     time += generateCycle(time, cycleLength);
//   }

//   // Trim to exact length
//   return data.slice(0, numPoints);
// };

// // Helper functions for chart axis and formatting
// export const getPointCount = (vital: string, rangeLabel: string) => {
//   if (
//     ['heart-rate', 'temperature', 'spo2', 'respiration', 'activities'].includes(
//       vital
//     )
//   ) {
//     if (rangeLabel === '1 Day') return 24;
//     if (rangeLabel === '7 Days') return 7;
//     if (rangeLabel === '1 Month') return 30;
//     if (rangeLabel === '3 Months') return 90;
//   }
//   return 24;
// };

// export const getXAxisTicks = (vital: string, rangeLabel: string) => {
//   if (['heart-rate', 'temperature', 'spo2', 'respiration'].includes(vital)) {
//     if (rangeLabel === '1 Day') return [1, 4, 7, 10, 13, 16, 19, 22];
//     if (rangeLabel === '7 Days') return [1, 2, 3, 4, 5, 6, 7];
//     if (rangeLabel === '1 Month') return [1, 30];
//     if (rangeLabel === '3 Months') return [1, 90];
//   }
//   return undefined;
// };

// export const getActivityXAxisTicks = (rangeLabel: string) => {
//   if (rangeLabel === '1 Day') return [1, 4, 7, 10, 13, 16, 19, 22];
//   if (rangeLabel === '7 Days') return [1, 2, 3, 4, 5, 6, 7];
//   if (rangeLabel === '1 Month') return [0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30];
//   if (rangeLabel === '3 Months')
//     return [0, 9, 18, 27, 36, 45, 54, 63, 72, 81, 90];
//   return undefined;
// };

// export const formatXAxisTick = (
//   tick: number,
//   vital: string,
//   rangeLabel: string
// ) => {
//   if (vital === 'activities') {
//     if (rangeLabel === '1 Day') {
//       const hour = tick - 1;
//       const period = hour < 12 ? 'am' : 'pm';
//       let displayHour = hour % 12;
//       if (displayHour === 0) displayHour = 12;
//       return `${displayHour}${period}`;
//     }
//     return tick;
//   } else if (
//     ['heart-rate', 'temperature', 'spo2', 'respiration'].includes(vital)
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
//   return tick.toString();
// };

// export const getYAxisSettings = (vital: string) => {
//   if (vital === 'heart-rate') {
//     return { domain: [30, 100], ticks: [30, 40, 50, 60, 70, 80, 90, 100] };
//   } else if (vital === 'spo2') {
//     return { domain: [30, 100], ticks: [30, 40, 50, 60, 70, 80, 90, 100] };
//   } else if (vital === 'temperature') {
//     return { domain: [90, 104], ticks: [90, 92, 94, 96, 98, 100, 102, 104] };
//   } else if (vital === 'respiration') {
//     return { domain: [0, 21], ticks: [0, 3, 6, 9, 12, 15, 18, 21] };
//   }
//   return { domain: ['auto', 'auto'] as const, ticks: undefined };
// };

// // Formatted tooltip values
// export const customTooltipFormatter = (
//   value: number,
//   vital: string,
//   unit: string
// ) => {
//   return `${Math.round(value)} ${unit}`;
// };

// export const customTooltipLabelFormatter = (
//   label: number,
//   vital: string,
//   rangeLabel: string
// ) => {
//   return formatXAxisTick(label, vital, rangeLabel);
// };

// // Generate activity stats
// export const generateActivityStats = (key: string) => {
//   const metric = activityMetrics.find((m) => m.key === key);
//   if (!metric) return [];

//   const min = Math.round(metric.range.min * 1.2);
//   const max = Math.round(metric.range.max * 0.9);
//   const avg = Math.round((min + max) / 2);

//   const unit =
//     metric.key === 'steps'
//       ? 'K'
//       : metric.key === 'calories'
//         ? 'kcal'
//         : metric.key === 'distance'
//           ? 'km'
//           : 'mins';

//   return [
//     {
//       title: 'Minimum',
//       value:
//         metric.key === 'steps' ? `${(min / 1000).toFixed(1)}K` : min.toString(),
//       unit: metric.key === 'steps' ? '' : unit,
//     },
//     {
//       title: 'Average',
//       value:
//         metric.key === 'steps' ? `${(avg / 1000).toFixed(1)}K` : avg.toString(),
//       unit: metric.key === 'steps' ? '' : unit,
//     },
//     {
//       title: 'Maximum',
//       value:
//         metric.key === 'steps' ? `${(max / 1000).toFixed(1)}K` : max.toString(),
//       unit: metric.key === 'steps' ? '' : unit,
//     },
//   ];
// };

// // Chart Components
// interface ChartProps {
//   data: Array<any>;
//   vitalType: string;
//   timeRange: { label: string };
//   vitalInfo: {
//     title: string;
//     color: string;
//     unit?: string;
//   };
// }

// export const EcgChart: React.FC<{
//   data: Array<any>;
//   vitalInfo: { title: string; unit?: string };
// }> = ({ data, vitalInfo }) => {
//   return (
//     <div className="bg-[#fff8f8] relative">
//       {/* ECG Grid background */}
//       <div className="absolute inset-0 z-0">
//         <svg width="100%" height="100%" className="absolute inset-0">
//           {/* Horizontal grid lines - lighter */}
//           {Array.from({ length: 25 }).map((_, i) => (
//             <line
//               key={`h-${i}`}
//               x1="0"
//               y1={`${(i * 100) / 25}%`}
//               x2="100%"
//               y2={`${(i * 100) / 25}%`}
//               stroke={chartColors.grid}
//               strokeWidth="1"
//             />
//           ))}
//           {/* Vertical grid lines - lighter */}
//           {Array.from({ length: 25 }).map((_, i) => (
//             <line
//               key={`v-${i}`}
//               x1={`${(i * 100) / 25}%`}
//               y1="0"
//               x2={`${(i * 100) / 25}%`}
//               y2="100%"
//               stroke={chartColors.grid}
//               strokeWidth="1"
//             />
//           ))}
//           {/* Horizontal major grid lines - darker */}
//           {Array.from({ length: 6 }).map((_, i) => (
//             <line
//               key={`hm-${i}`}
//               x1="0"
//               y1={`${(i * 100) / 5}%`}
//               x2="100%"
//               y2={`${(i * 100) / 5}%`}
//               stroke={chartColors.gridHighlight}
//               strokeWidth="1.5"
//             />
//           ))}
//           {/* Vertical major grid lines - darker */}
//           {Array.from({ length: 11 }).map((_, i) => (
//             <line
//               key={`vm-${i}`}
//               x1={`${(i * 100) / 10}%`}
//               y1="0"
//               x2={`${(i * 100) / 10}%`}
//               y2="100%"
//               stroke={chartColors.gridHighlight}
//               strokeWidth="1.5"
//             />
//           ))}
//         </svg>
//       </div>

//       <div className="relative z-10">
//         <ResponsiveContainer width="100%" height={200}>
//           <LineChart
//             data={data}
//             margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
//           >
//             <XAxis dataKey="time" hide={true} />
//             <YAxis domain={[-0.3, 1.1]} hide />
//             <Tooltip
//               formatter={(value: any) => [
//                 `${typeof value === 'number' ? value.toFixed(2) : value} ${vitalInfo.unit || ''}`,
//                 vitalInfo.title,
//               ]}
//               labelFormatter={(label) => `Time ${label}`}
//             />
//             <Line
//               type="monotone"
//               dataKey="value"
//               stroke={chartColors.ecgLine}
//               strokeWidth={2}
//               dot={false}
//               isAnimationActive={true}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>

//       {/* Time indicators at the bottom */}
//       <div className="flex justify-between px-6 text-xs text-gray-500">
//         {Array.from({ length: 11 }).map((_, i) => (
//           <div key={`time-${i}`}>{i}s</div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export const AreaVitalChart: React.FC<ChartProps> = ({
//   data,
//   vitalType,
//   timeRange,
//   vitalInfo,
// }) => {
//   const yAxisSettings = getYAxisSettings(vitalType);
//   const xTicks = getXAxisTicks(vitalType, timeRange.label);

//   return (
//     <ResponsiveContainer width="100%" height={300}>
//       <AreaChart data={data}>
//         <CartesianGrid strokeDasharray="3 3" vertical={false} />
//         <XAxis
//           dataKey="time"
//           tickFormatter={(tick) =>
//             formatXAxisTick(tick, vitalType, timeRange.label)
//           }
//           ticks={xTicks}
//         />
//         <YAxis
//           domain={yAxisSettings.domain}
//           ticks={yAxisSettings.ticks}
//           tick={{ fill: '#333', fontSize: 12 }}
//           axisLine={{ stroke: '#333' }}
//         />
//         <Tooltip
//           formatter={(value) => [
//             customTooltipFormatter(
//               value as number,
//               vitalType,
//               vitalInfo.unit || ''
//             ),
//             vitalInfo.title,
//           ]}
//           labelFormatter={(label) =>
//             customTooltipLabelFormatter(
//               label as number,
//               vitalType,
//               timeRange.label
//             )
//           }
//         />
//         <Area
//           type="monotone"
//           dataKey="value"
//           stroke={vitalInfo.color}
//           fill={`${vitalInfo.color}33`}
//           strokeWidth={2}
//         />
//       </AreaChart>
//     </ResponsiveContainer>
//   );
// };

// export const LineVitalChart: React.FC<ChartProps> = ({
//   data,
//   vitalType,
//   timeRange,
//   vitalInfo,
// }) => {
//   const yAxisSettings = getYAxisSettings(vitalType);
//   const xTicks = getXAxisTicks(vitalType, timeRange.label);

//   return (
//     <ResponsiveContainer width="100%" height={300}>
//       <LineChart data={data}>
//         <CartesianGrid strokeDasharray="3 3" vertical={false} />
//         <XAxis
//           dataKey="time"
//           tickFormatter={(tick) =>
//             formatXAxisTick(tick, vitalType, timeRange.label)
//           }
//           ticks={xTicks}
//         />
//         <YAxis
//           domain={yAxisSettings.domain}
//           ticks={yAxisSettings.ticks}
//           tick={{ fill: '#333', fontSize: 12 }}
//           axisLine={{ stroke: '#333' }}
//         />
//         <Tooltip
//           formatter={(value) => [
//             customTooltipFormatter(
//               value as number,
//               vitalType,
//               vitalInfo.unit || ''
//             ),
//             vitalInfo.title,
//           ]}
//           labelFormatter={(label) =>
//             customTooltipLabelFormatter(
//               label as number,
//               vitalType,
//               timeRange.label
//             )
//           }
//         />
//         <Line
//           type="monotone"
//           dataKey="value"
//           stroke={vitalInfo.color}
//           strokeWidth={2}
//           dot={false}
//         />
//       </LineChart>
//     </ResponsiveContainer>
//   );
// };

// export const BarVitalChart: React.FC<ChartProps> = ({
//   data,
//   vitalType,
//   timeRange,
//   vitalInfo,
// }) => {
//   const yAxisSettings = getYAxisSettings(vitalType);
//   const xTicks = getXAxisTicks(vitalType, timeRange.label);

//   return (
//     <ResponsiveContainer width="100%" height={300}>
//       <BarChart data={data}>
//         <CartesianGrid strokeDasharray="3 3" vertical={false} />
//         <XAxis
//           dataKey="time"
//           tickFormatter={(tick) =>
//             formatXAxisTick(tick, vitalType, timeRange.label)
//           }
//           ticks={xTicks}
//         />
//         <YAxis
//           domain={yAxisSettings.domain}
//           ticks={yAxisSettings.ticks}
//           tick={{ fill: '#333', fontSize: 12 }}
//           axisLine={{ stroke: '#333' }}
//         />
//         <Tooltip
//           formatter={(value) => [
//             customTooltipFormatter(
//               value as number,
//               vitalType,
//               vitalInfo.unit || ''
//             ),
//             vitalInfo.title,
//           ]}
//           labelFormatter={(label) =>
//             customTooltipLabelFormatter(
//               label as number,
//               vitalType,
//               timeRange.label
//             )
//           }
//         />
//         <Bar
//           dataKey="value"
//           fill={vitalInfo.color}
//           radius={[4, 4, 0, 0]}
//           barSize={10}
//         />
//       </BarChart>
//     </ResponsiveContainer>
//   );
// };

// export const ActivityBarChart: React.FC<{
//   data: Array<any>;
//   timeRange: { label: string };
//   metric: any;
// }> = ({ data, timeRange, metric }) => {
//   const xTicks = getActivityXAxisTicks(timeRange.label);

//   return (
//     <ResponsiveContainer width="100%" height="100%">
//       <BarChart data={data}>
//         <CartesianGrid strokeDasharray="3 3" vertical={false} />
//         <XAxis
//           dataKey="time"
//           ticks={xTicks}
//           tickFormatter={(tick) =>
//             formatXAxisTick(tick, 'activities', timeRange.label)
//           }
//         />
//         <YAxis
//           tick={{ fill: '#333', fontSize: 12 }}
//           axisLine={{ stroke: '#333' }}
//         />
//         <Tooltip
//           formatter={(value) => [
//             customTooltipFormatter(
//               value as number,
//               'activities',
//               metric.unit || ''
//             ),
//             metric.title,
//           ]}
//           labelFormatter={(label) => `Hour ${label}`}
//         />
//         {metric.key === 'steps' ? (
//           <>
//             <Bar
//               dataKey="normal"
//               stackId="a"
//               fill={metric.color}
//               radius={[4, 4, 0, 0]}
//               barSize={10}
//             />
//             <Bar
//               dataKey="excess"
//               stackId="a"
//               fill={chartColors.secondary}
//               radius={[4, 4, 0, 0]}
//               barSize={10}
//             />
//           </>
//         ) : (
//           <Bar
//             dataKey="value"
//             fill={metric.color}
//             radius={[4, 4, 0, 0]}
//             barSize={10}
//           />
//         )}
//       </BarChart>
//     </ResponsiveContainer>
//   );
// };




import { ResponsiveContainer, LineChart, Line, AreaChart, Area, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import React from "react";
import {
  chartColors,
  vitalChartConfig,
  timeRanges,
  activityMetrics,
  generateMockChartData,
  generateEcgData,
  getPointCount,
  getXAxisTicks,
  getActivityXAxisTicks,
  formatXAxisTick,
  getYAxisSettings,
  customTooltipFormatter,
  customTooltipLabelFormatter,
  generateActivityStats
} from "./ChartUtils";

// Chart Components
interface ChartProps {
  data: Array<any>;
  vitalType: string;
  timeRange: { label: string };
  vitalInfo: {
    title: string;
    color: string;
    unit?: string;
  };
}

export const EcgChart: React.FC<{
  data: any[];
  vitalInfo: { title: string; unit?: string };
}> = ({ data, vitalInfo }) => {
  const smallBoxes = 25;
  return (
    <div className="bg-[#fff8f8] relative">
      {/* ECG Grid background */}
      <div className="absolute inset-0 z-0">
        <svg width="100%" height="90%" className="absolute inset-0">
          {/* Horizontal grid lines */}
          {Array.from({ length: smallBoxes + 1 }).map((_, i) => {
            const y = (i * 100) / smallBoxes;
            const isThick = i % 5 === 0;
            return (
              <line
                key={`h-${i}`}
                x1="0"
                y1={`${y}%`}
                x2="100%"
                y2={`${y}%`}
                stroke={isThick ? chartColors.gridHighlight : chartColors.grid}
                strokeWidth={isThick ? 1.5 : 1}
              />
            );
          })}
          {/* Vertical grid lines */}
          {Array.from({ length: smallBoxes + 1 }).map((_, i) => {
            const x = (i * 100) / smallBoxes;
            const isThick = i % 5 === 0;
            return (
              <line
                key={`v-${i}`}
                x1={`${x}%`}
                y1="0"
                x2={`${x}%`}
                y2="100%"
                stroke={isThick ? chartColors.gridHighlight : chartColors.grid}
                strokeWidth={isThick ? 1.5 : 1}
              />
            );
          })}
        </svg>
      </div>

      <div className="relative z-10">
        <ResponsiveContainer width="100%" height={200}>
          <LineChart
            data={data}
            margin={{ top: 20, right: 20, left: 10, bottom: 0 }}
          >
            <XAxis dataKey="time" hide />
            <YAxis domain={[-0.3, 1.1]} hide />
            <Tooltip
              formatter={(value) => [
                `${typeof value === 'number' ? value.toFixed(2) : value} ${
                  vitalInfo.unit || ''
                }`,
                vitalInfo.title,
              ]}
              labelFormatter={(label) => `Time ${label}`}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke={chartColors.ecgLine}
              strokeWidth={2}
              dot={false}
              isAnimationActive={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Time indicators at the bottom */}
      <div className="flex justify-between text-sm text-gray-500">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={`time-${i}`}>{i}s</div>
        ))}
      </div>
    </div>
  );
};



// TODO: // ECG Chart Component -> SQUARISH 
// export const EcgChart: React.FC<{
//   data: any[];
//   vitalInfo: { title: string; unit?: string };
// }> = ({ data, vitalInfo }) => {
//   // Define number of small boxes
//   const smallBoxesX = 125; // 5 seconds / 0.04 seconds per small box
//   const smallBoxesY = 14;  // 1.4 units / 0.1 units per small box

//   // Calculate aspect ratio: width / height = smallBoxesX / smallBoxesY
//   const aspectRatio = smallBoxesX / smallBoxesY; // 125 / 14 ≈ 8.9286

//   return (
//     <div className="bg-white relative">
//       {/* ECG Grid background */}
//       <div className="absolute inset-0 z-0">
//         <svg width="100%" height="100%" className="absolute inset-0">
//           {/* Horizontal grid lines (for amplitude) */}
//           {Array.from({ length: smallBoxesY + 1 }).map((_, i) => {
//             const y = (i * 100) / smallBoxesY;
//             const isThick = i % 5 === 0;
//             return (
//               <line
//                 key={`h-${i}`}
//                 x1="0"
//                 y1={`${y}%`}
//                 x2="100%"
//                 y2={`${y}%`}
//                 stroke={isThick ? chartColors.gridHighlight : chartColors.grid}
//                 strokeWidth={isThick ? 1.4 : 1}
//               />
//             );
//           })}
//           {/* Vertical grid lines (for time) */}
//           {Array.from({ length: smallBoxesX + 1 }).map((_, i) => {
//             const x = (i * 100) / smallBoxesX;
//             const isThick = i % 5 === 0;
//             return (
//               <line
//                 key={`v-${i}`}
//                 x1={`${x}%`}
//                 y1="0"
//                 x2={`${x}%`}
//                 y2="100%"
//                 stroke={isThick ? chartColors.gridHighlight : chartColors.grid}
//                 strokeWidth={isThick ? 1.4 : 1}
                
//               />
//             );
//           })}
//         </svg>
//       </div>

//       {/* ECG Waveform */}
//       <div className="relative z-10">
//         <ResponsiveContainer width="100%" aspect={aspectRatio}>
//           <LineChart
//             data={data}
//             margin={{ top: 20, right: 20, left: 10, bottom: 0 }}
//           >
//             <XAxis dataKey="time" hide />
//             <YAxis domain={[-0.3, 1.1]} hide />
//             <Tooltip
//               formatter={(value) => [
//                 `${typeof value === 'number' ? value.toFixed(2) : value} ${vitalInfo.unit || ''}`,
//                 vitalInfo.title,
//               ]}
//               labelFormatter={(label) => `Time ${label}`}
//             />
//             <Line
//               type="monotone"
//               dataKey="value"
//               stroke={chartColors.ecgLine}
//               strokeWidth={2}
//               dot={false}
//               isAnimationActive={true}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>

//       {/* Time indicators at the bottom */}
//       <div className="flex justify-between text-sm text-gray-800">
//         {Array.from({ length: 6 }).map((_, i) => (
//           <div key={`time-${i}`}>{i}s</div>
//         ))}
//       </div>
//     </div>
//   );
// };


export const AreaVitalChart: React.FC<ChartProps> = ({ data, vitalType, timeRange, vitalInfo }) => {
  const yAxisSettings = getYAxisSettings(vitalType);
  const xTicks = getXAxisTicks(vitalType, timeRange.label);
  
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis 
          dataKey="time" 
          tickFormatter={(tick) => formatXAxisTick(tick, vitalType, timeRange.label)}
          ticks={xTicks}
        />
        <YAxis 
          domain={yAxisSettings.domain} 
          ticks={yAxisSettings.ticks} 
          tick={{ fill: '#333', fontSize: 12 }}
          axisLine={{ stroke: '#333' }}
        />
        <Tooltip
          formatter={(value) => [
            customTooltipFormatter(value as number, vitalType, vitalInfo.unit || ""),
            vitalInfo.title
          ]}
          labelFormatter={(label) =>
            customTooltipLabelFormatter(Number(label), vitalInfo.title, timeRange.label)
          }
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke={vitalInfo.color}
          fill={`${vitalInfo.color}33`}
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export const LineVitalChart: React.FC<ChartProps> = ({ data, vitalType, timeRange, vitalInfo }) => {
  const yAxisSettings = getYAxisSettings(vitalType);
  const xTicks = getXAxisTicks(vitalType, timeRange.label);
  
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis 
          dataKey="time" 
          tickFormatter={(tick) => formatXAxisTick(tick, vitalType, timeRange.label)}
          ticks={xTicks}
        />
        <YAxis 
          domain={yAxisSettings.domain} 
          ticks={yAxisSettings.ticks}
          tick={{ fill: '#333', fontSize: 12 }}
          axisLine={{ stroke: '#333' }}
        />
        <Tooltip
          formatter={(value) => [
            customTooltipFormatter(value as number, vitalType, vitalInfo.unit || ""),
            vitalInfo.title
          ]}
          labelFormatter={(label) => customTooltipLabelFormatter(label as number, vitalType, timeRange.label)}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke={vitalInfo.color}
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export const BarVitalChart: React.FC<ChartProps> = ({ data, vitalType, timeRange, vitalInfo }) => {
  const yAxisSettings = getYAxisSettings(vitalType);
  const xTicks = getXAxisTicks(vitalType, timeRange.label);
  
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis 
          dataKey="time" 
          tickFormatter={(tick) => formatXAxisTick(tick, vitalType, timeRange.label)}
          ticks={xTicks}
        />
        <YAxis 
          domain={yAxisSettings.domain} 
          ticks={yAxisSettings.ticks}
          tick={{ fill: '#333', fontSize: 12 }}
          axisLine={{ stroke: '#333' }}
        />
        <Tooltip
          formatter={(value) => [
            customTooltipFormatter(value as number, vitalType, vitalInfo.unit || ""),
            vitalInfo.title
          ]}
          labelFormatter={(label) => customTooltipLabelFormatter(label as number, vitalType, timeRange.label)}
        />
        <Bar
          dataKey="value"
          fill={vitalInfo.color}
          radius={[4, 4, 0, 0]}
          barSize={10}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export const ActivityBarChart: React.FC<{
  data: Array<any>;
  timeRange: { label: string };
  metric: any;
}> = ({ data, timeRange, metric }) => {
  const xTicks = getActivityXAxisTicks(timeRange.label);
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="time"
          ticks={xTicks}
          tickFormatter={(tick) => formatXAxisTick(tick, 'activities', timeRange.label)}
        />
        <YAxis
          tick={{ fill: '#333', fontSize: 12 }}
          axisLine={{ stroke: '#333' }}
        />
        <Tooltip
          formatter={(value) => [
            customTooltipFormatter(value as number, 'activities', metric.unit || ""),
            metric.title
          ]}
          labelFormatter={(label) => customTooltipLabelFormatter(Number(label), "activities", timeRange.label)}
        />
        {metric.key === 'steps' ? (
          <>
            <Bar
              dataKey="normal"
              stackId="a"
              fill={metric.color}
              radius={[4, 4, 0, 0]}
              barSize={10}
            />
            <Bar
              dataKey="excess"
              stackId="a"
              fill={chartColors.secondary}
              radius={[4, 4, 0, 0]}
              barSize={10}
            />
          </>
        ) : (
          <Bar
            dataKey="value"
            fill={metric.color}
            radius={[4, 4, 0, 0]}
            barSize={10}
          />
        )}
      </BarChart>
    </ResponsiveContainer>
  );
};

// Re-export all utilities from ChartUtils for backward compatibility
export {
  chartColors,
  vitalChartConfig,
  timeRanges,
  activityMetrics,
  generateMockChartData,
  generateEcgData,
  getPointCount,
  getXAxisTicks,
  getActivityXAxisTicks,
  formatXAxisTick,
  getYAxisSettings,
  customTooltipFormatter,
  customTooltipLabelFormatter,
  generateActivityStats
};