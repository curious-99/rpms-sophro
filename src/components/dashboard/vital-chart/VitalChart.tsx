// import React, { useEffect, useState } from 'react';
// import {
//   LineChart,
//   Line,
//   XAxis,
//   Tooltip,
//   ResponsiveContainer,
//   AreaChart,
//   Area,
//   BarChart,
//   Bar,
//   CartesianGrid,
//   YAxis,
// } from 'recharts';
// import { Button } from '../../ui/Button';
// import { cn } from '../../../lib/utils';
// import { Maximize } from 'lucide-react';
// import VitalDetailModal from '../../Modal/VitalDetailsModal';

// import Calories from '../../../assets/icons/Calories.svg';
// import Location from '../../../assets/icons/Location.svg';
// import Steps from '../../../assets/icons/Steps-2.svg';
// import Time from '../../../assets/icons/Time.svg';
// import Download from '../../../assets/icons/Download.svg';

// const colors = {
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

// // Generate random data that follows a realistic pattern
// const generateMockChartData = (totalPoints, range) => {
//   return Array.from({ length: totalPoints }, (_, i) => ({
//     time: i + 1,
//     value: range.min + Math.random() * (range.max - range.min),
//   }));
// };

// // Generate realistic ECG data pattern (unchanged)
// const generateEcgData = (numPoints = 100) => {
//   const data = [];
//   let time = 0;
//   const generateCycle = (startIndex, cycleLength) => {
//     for (let i = 0; i < cycleLength * 0.1; i++) {
//       const progress = i / (cycleLength * 0.1);
//       data.push({
//         time: startIndex + i,
//         value: 0.2 * Math.sin(progress * Math.PI),
//       });
//     }
//     for (let i = 0; i < cycleLength * 0.05; i++) {
//       data.push({
//         time: startIndex + cycleLength * 0.1 + i,
//         value: 0,
//       });
//     }
//     data.push({ time: startIndex + cycleLength * 0.15, value: -0.1 });
//     data.push({ time: startIndex + cycleLength * 0.16, value: 1 });
//     data.push({ time: startIndex + cycleLength * 0.17, value: -0.2 });
//     for (let i = 0; i < cycleLength * 0.13; i++) {
//       data.push({
//         time: startIndex + cycleLength * 0.17 + i,
//         value: 0,
//       });
//     }
//     for (let i = 0; i < cycleLength * 0.15; i++) {
//       const progress = i / (cycleLength * 0.15);
//       data.push({
//         time: startIndex + cycleLength * 0.3 + i,
//         value: 0.3 * Math.sin(progress * Math.PI),
//       });
//     }
//     for (let i = 0; i < cycleLength * 0.55; i++) {
//       data.push({
//         time: startIndex + cycleLength * 0.45 + i,
//         value: 0,
//       });
//     }
//     return cycleLength;
//   };

//   while (time < numPoints) {
//     const cycleLength = Math.floor(30 + Math.random() * 5);
//     time += generateCycle(time, cycleLength);
//   }

//   return data.slice(0, numPoints);
// };

// const timeRanges = [
//   { label: '1 Day', days: 24 },
//   { label: '7 Days', days: 7 * 24 },
//   { label: '1 Month', days: 30 * 24 },
//   { label: '3 Months', days: 90 * 24 },
// ];

// const vitalChartConfig = {
//   'heart-rate': {
//     type: 'area',
//     color: colors.primary,
//     range: { min: 60, max: 100 },
//     title: 'Heart Rate',
//     unit: 'bpm',
//   },
//   temperature: {
//     type: 'area',
//     color: colors.primary,
//     range: { min: 97, max: 102 },
//     title: 'Temperature',
//     unit: '℉',
//   },
//   spo2: {
//     type: 'area',
//     color: colors.primary,
//     range: { min: 85, max: 100 },
//     title: 'SpO₂',
//     unit: '%',
//   },
//   respiration: {
//     type: 'area',
//     color: colors.primary,
//     range: { min: 10, max: 20 },
//     title: 'Respiration',
//     unit: 'rpm',
//   },
//   ecg: {
//     type: 'line',
//     color: '#EF4444',
//     range: { min: -1, max: 1 },
//     title: 'ECG',
//     unit: 'mV',
//   },
//   activities: {
//     type: 'bar',
//     color: colors.primary,
//     range: { min: 0, max: 100 },
//     title: 'Activities',
//   },
// };

// const activityMetrics = [
//   {
//     key: 'steps',
//     title: 'Steps',
//     color: colors.primary,
//     range: { min: 1000, max: 15000 },
//     icon: <img src={Steps} alt="Steps" className="w-7 h-7" />,
//   },
//   {
//     key: 'calories',
//     title: 'Calories',
//     color: colors.primary,
//     range: { min: 100, max: 1500 },
//     unit: 'kcal',
//     icon: <img src={Calories} alt="Calories" className="w-7 h-7" />,
//   },
//   {
//     key: 'distance',
//     title: 'Distance',
//     color: colors.primary,
//     range: { min: 1, max: 20 },
//     unit: 'km',
//     icon: <img src={Location} alt="Distance" className="w-8 h-8" />,
//   },
//   {
//     key: 'time',
//     title: 'Time',
//     color: colors.primary,
//     range: { min: 4, max: 15 },
//     unit: 'mins',
//     icon: <img src={Time} alt="Time" className="w-7 h-7" />,
//   },
// ];

// // Update getPointCount to also work for activities
// const getPointCount = (vital, rangeLabel) => {
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

// // For non-activities, use these ticks
// const getXAxisTicks = (vital, rangeLabel) => {
//   if (['heart-rate', 'temperature', 'spo2', 'respiration'].includes(vital)) {
//     if (rangeLabel === '1 Day') return [1, 4, 7, 10, 13, 16, 19, 22];
//     if (rangeLabel === '7 Days') return [1, 2, 3, 4, 5, 6, 7];
//     if (rangeLabel === '1 Month') return [1, 30];
//     if (rangeLabel === '3 Months') return [1, 90];
//   }
//   return undefined;
// };

// // For activities, define ticks as per instructions
// const getActivityXAxisTicks = (rangeLabel) => {
//   if (rangeLabel === '1 Day') return [1, 4, 7, 10, 13, 16, 19, 22];
//   if (rangeLabel === '7 Days') return [1, 2, 3, 4, 5, 6, 7];
//   if (rangeLabel === '1 Month') return [0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30];
//   if (rangeLabel === '3 Months')
//     return [0, 9, 18, 27, 36, 45, 54, 63, 72, 81, 90];
//   return undefined;
// };

// // Format X-Axis ticks; for activities, use full numbers (except for 1 Day use time format)
// const formatXAxisTick = (tick, vital, rangeLabel) => {
//   if (vital === 'activities') {
//     if (rangeLabel === '1 Day') {
//       const hour = tick - 1;
//       const period = hour < 12 ? 'am' : 'pm';
//       let displayHour = hour % 12;
//       if (displayHour === 0) displayHour = 12;
//       return `${displayHour}${period}`;
//     }
//     // For activities in other ranges, simply return the tick number
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
//   return tick;
// };

// // Y-Axis settings (axis line and tick labels)
// const getYAxisSettings = (vital) => {
//   if (vital === 'heart-rate') {
//     return { domain: [30, 100], ticks: [30, 40, 50, 60, 70, 80, 90, 100] };
//   } else if (vital === 'spo2') {
//     return { domain: [30, 100], ticks: [30, 40, 50, 60, 70, 80, 90, 100] };
//   } else if (vital === 'temperature') {
//     return { domain: [90, 104], ticks: [90, 92, 94, 96, 98, 100, 102, 104] };
//   } else if (vital === 'respiration') {
//     return { domain: [0, 21], ticks: [0, 3, 6, 9, 12, 15, 18, 21] };
//   }
//   return { domain: ['auto', 'auto'], ticks: undefined };
// };

// // Tooltip formatter (values rounded to 0 decimals)
// const customTooltipFormatter = (value, vital, unit) => {
//   return `${Math.round(value)} ${unit}`;
// };

// // Tooltip label formatter uses the same tick formatting as XAxis
// const customTooltipLabelFormatter = (label, vital, rangeLabel) => {
//   return formatXAxisTick(label, vital, rangeLabel);
// };

// const ActivityPanel = ({ metric, selectedRange }) => {
//   const [chartData, setChartData] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const stats = generateActivityStats(metric.key);

//   useEffect(() => {
//     const count = getPointCount('activities', selectedRange.label);
//     let data = generateMockChartData(count, metric.range);
//     // If the metric is steps, transform the data for stacked bars:
//     if (metric.key === 'steps') {
//       data = data.map((item) => ({
//         ...item,
//         normal: Math.min(item.value, 10000),
//         excess: item.value > 10000 ? item.value - 10000 : 0,
//       }));
//     }
//     setChartData(data);
//   }, [selectedRange, metric.key]);

//   return (
//     <>
//       <div className="rounded-lg bg-white shadow-[0px_0px_10px_rgba(0,0,0,0.05)] border border-gray-100 p-6">
//         <div className="flex justify-between items-center mb-4">
//           <div className="flex items-center">
//             <span className="text-2xl mr-2">{metric.icon}</span>
//             <h3 className="text-xl font-semibold">{metric.title}</h3>
//           </div>
//           <button
//             className="p-1.5 border border-gray-200 rounded hover:bg-gray-50 transition-colors"
//             onClick={() => setShowModal(true)}
//           >
//             <Maximize size={16} />
//           </button>
//         </div>

//         <div className="flex flex-row gap-4">
//           <div className="flex-1">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={chartData}>
//                 <CartesianGrid strokeDasharray="3 3" vertical={false} />
//                 <XAxis
//                   dataKey="time"
//                   ticks={getActivityXAxisTicks(selectedRange.label)}
//                   tickFormatter={(tick) =>
//                     formatXAxisTick(tick, 'activities', selectedRange.label)
//                   }
//                 />
//                 <YAxis
//                   tick={{ fill: '#333', fontSize: 12 }}
//                   axisLine={{ stroke: '#333' }}
//                 />
//                 <Tooltip
//                   formatter={(value) =>
//                     customTooltipFormatter(
//                       value,
//                       'activities',
//                       metric.unit || ''
//                     )
//                   }
//                   labelFormatter={(label) => `Hour ${label}`}
//                 />
//                 {metric.key === 'steps' ? (
//                   <>
//                     <Bar
//                       dataKey="normal"
//                       stackId="a"
//                       fill={metric.color}
//                       radius={[4, 4, 0, 0]}
//                       barSize={10}
//                     />
//                     <Bar
//                       dataKey="excess"
//                       stackId="a"
//                       fill="#EF4444"
//                       radius={[4, 4, 0, 0]}
//                       barSize={10}
//                     />
//                   </>
//                 ) : (
//                   <Bar
//                     dataKey="value"
//                     fill={metric.color}
//                     radius={[4, 4, 0, 0]}
//                     barSize={10}
//                   />
//                 )}
//               </BarChart>
//             </ResponsiveContainer>
//           </div>

//           <div className="flex flex-col gap-2 min-w-[100px]">
//             {stats.map((stat, idx) => (
//               <div
//                 key={idx}
//                 className="rounded-lg bg-[#CCFBF1] border border-[#b8e6d9] p-3 text-center"
//                 style={{
//                   boxShadow:
//                     '1px 1px 4px 0px rgba(0,0,0,0.25) inset, 1px 1px 4px 0px rgba(0,0,0,0.25)',
//                 }}
//               >
//                 <p className="text-[16px] text-gray-600 mb-1">{stat.title}</p>
//                 <p className="font-semibold text-[16px] flex justify-center items-baseline">
//                   {stat.value}
//                   {stat.unit && (
//                     <span className="text-xs ml-1">{stat.unit}</span>
//                   )}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <VitalDetailModal
//         isOpen={showModal}
//         onClose={() => setShowModal(false)}
//         vitalType="activity"
//         vitalInfo={metric}
//         chartData={generateMockChartData(
//           getPointCount('activities', selectedRange.label),
//           metric.range
//         )}
//         selectedTimeRange={
//           timeRanges.find((r) => r.label === '1 Month') || timeRanges[0]
//         }
//       />
//     </>
//   );
// };

// const generateActivityStats = (key) => {
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
//         metric.key === 'steps' ? `${(min / 1000).toFixed(0)}K` : min.toString(),
//       unit: metric.key === 'steps' ? '' : unit,
//     },
//     {
//       title: 'Average',
//       value:
//         metric.key === 'steps' ? `${(avg / 1000).toFixed(0)}K` : avg.toString(),
//       unit: metric.key === 'steps' ? '' : unit,
//     },
//     {
//       title: 'Maximum',
//       value:
//         metric.key === 'steps' ? `${(max / 1000).toFixed(0)}K` : max.toString(),
//       unit: metric.key === 'steps' ? '' : unit,
//     },
//   ];
// };

// const VitalChart = ({ selectedVital }) => {
//   const [selectedRange, setSelectedRange] = useState(timeRanges[0]);
//   const [chartData, setChartData] = useState([]);
//   const [ecgData, setEcgData] = useState([]);
//   const [showModal, setShowModal] = useState(false);

//   const config =
//     vitalChartConfig[selectedVital] || vitalChartConfig['heart-rate'];

//   useEffect(() => {
//     if (selectedVital === 'ecg') {
//       setEcgData(generateEcgData());
//     } else if (selectedVital !== 'activities') {
//       const count = getPointCount(selectedVital, selectedRange.label);
//       setChartData(generateMockChartData(count, config.range));
//     }
//   }, [selectedRange, selectedVital, config.range]);

//   const renderEcgChart = () => {
//     const smallBoxes = 25;

//     return (
//       <div className="bg-[#fff8f8] relative">
//         <div className="absolute inset-0 z-0">
//           <svg width="100%" height="100%" className="absolute inset-0">
//             {/* Horizontal Lines */}
//             {Array.from({ length: smallBoxes + 1 }).map((_, i) => {
//               const y = (i * 100) / smallBoxes;
//               // Every 5th line is thick.
//               const isThick = i % 5 === 0;
//               return (
//                 <line
//                   key={`h-${i}`}
//                   x1="0"
//                   y1={`${y}%`}
//                   x2="100%"
//                   y2={`${y}%`}
//                   stroke="#ffdddd"
//                   strokeWidth={isThick ? 3 : 1}
//                 />
//               );
//             })}
//             {/* Vertical Lines */}
//             {Array.from({ length: smallBoxes + 1 }).map((_, i) => {
//               const x = (i * 100) / smallBoxes;
//               const isThick = i % 5 === 0;
//               return (
//                 <line
//                   key={`v-${i}`}
//                   x1={`${x}%`}
//                   y1="0"
//                   x2={`${x}%`}
//                   y2="100%"
//                   stroke="#ffdddd"
//                   strokeWidth={isThick ? 3 : 1}
//                 />
//               );
//             })}
//           </svg>
//         </div>

//         <div className="relative z-10">
//           <ResponsiveContainer width="100%" height={200}>
//             <LineChart
//               data={ecgData}
//               margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
//             >
//               <XAxis dataKey="time" hide />
//               <YAxis domain={[-0.3, 1.1]} hide />
//               <Tooltip
//                 formatter={(value) => [
//                   `${Math.round(value)} ${config.unit || ''}`,
//                   config.title,
//                 ]}
//                 labelFormatter={(label) => `Time ${label}`}
//               />
//               <Line
//                 type="monotone"
//                 dataKey="value"
//                 stroke="#555555"
//                 strokeWidth={2}
//                 dot={false}
//                 isAnimationActive={true}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>

//         <div className="flex justify-between px-6 text-xs text-gray-500">
//           {Array.from({ length: smallBoxes / 5 + 1 }).map((_, i) => (
//             <div key={`time-${i}`}>{i}s</div>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   const renderRegularChart = () => {
//     const yAxisSettings = getYAxisSettings(selectedVital);
//     const xTicks = getXAxisTicks(selectedVital, selectedRange.label);

//     if (config.type === 'area') {
//       return (
//         <ResponsiveContainer width="100%" height={300}>
//           <AreaChart data={chartData}>
//             <CartesianGrid strokeDasharray="3 3" vertical={false} />
//             <XAxis
//               dataKey="time"
//               tickFormatter={(tick) =>
//                 formatXAxisTick(tick, selectedVital, selectedRange.label)
//               }
//               ticks={xTicks}
//             />
//             <YAxis
//               domain={yAxisSettings.domain}
//               ticks={yAxisSettings.ticks}
//               tick={{ fill: '#333', fontSize: 12 }}
//               axisLine={{ stroke: '#333' }}
//             />
//             <Tooltip
//               formatter={(value) =>
//                 customTooltipFormatter(value, selectedVital, config.unit)
//               }
//               labelFormatter={(label) =>
//                 customTooltipLabelFormatter(
//                   label,
//                   selectedVital,
//                   selectedRange.label
//                 )
//               }
//             />
//             <Area
//               type="monotone"
//               dataKey="value"
//               stroke={config.color}
//               fill={config.color + '33'}
//               strokeWidth={2}
//             />
//           </AreaChart>
//         </ResponsiveContainer>
//       );
//     } else if (config.type === 'line') {
//       return (
//         <ResponsiveContainer width="100%" height={300}>
//           <LineChart data={chartData}>
//             <CartesianGrid strokeDasharray="3 3" vertical={false} />
//             <XAxis
//               dataKey="time"
//               tickFormatter={(tick) =>
//                 formatXAxisTick(tick, selectedVital, selectedRange.label)
//               }
//               ticks={xTicks}
//             />
//             <YAxis
//               domain={yAxisSettings.domain}
//               ticks={yAxisSettings.ticks}
//               tick={{ fill: '#333', fontSize: 12 }}
//               axisLine={{ stroke: '#333' }}
//             />
//             <Tooltip
//               formatter={(value) =>
//                 customTooltipFormatter(value, selectedVital, config.unit)
//               }
//               labelFormatter={(label) =>
//                 customTooltipLabelFormatter(
//                   label,
//                   selectedVital,
//                   selectedRange.label
//                 )
//               }
//             />
//             <Line
//               type="monotone"
//               dataKey="value"
//               stroke={config.color}
//               strokeWidth={2}
//               dot={false}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       );
//     } else {
//       return (
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={chartData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis
//               dataKey="time"
//               tickFormatter={(tick) =>
//                 formatXAxisTick(tick, selectedVital, selectedRange.label)
//               }
//               ticks={xTicks}
//             />
//             <YAxis
//               domain={yAxisSettings.domain}
//               ticks={yAxisSettings.ticks}
//               tick={{ fill: '#333', fontSize: 12 }}
//               axisLine={{ stroke: '#333' }}
//             />
//             <Tooltip
//               formatter={(value) =>
//                 customTooltipFormatter(value, selectedVital, config.unit)
//               }
//               labelFormatter={(label) =>
//                 customTooltipLabelFormatter(
//                   label,
//                   selectedVital,
//                   selectedRange.label
//                 )
//               }
//             />
//             <Bar dataKey="value" fill={config.color} />
//           </BarChart>
//         </ResponsiveContainer>
//       );
//     }
//   };

//   return (
//     <div className="bg-white border border-gray-100 rounded-lg shadow-sm">
//       <div className="px-6 py-2">
//         <div className="flex justify-between items-center mb-4">
//           {selectedVital !== 'activities' && (
//             <h2 className="text-2xl font-bold capitalize">
//               {selectedVital.replace('-', ' ')}
//             </h2>
//           )}
//           <div className="ml-auto flex items-center gap-2">
//             {selectedVital !== 'activities' && (
//               <button
//                 className="p-1.5 border border-gray-200 rounded hover:bg-gray-50 transition-colors"
//                 onClick={() => setShowModal(true)}
//               >
//                 <Maximize size={16} />
//               </button>
//             )}
//             <Button variant="outline" size="sm" className="gap-2">
//               <img src={Download} alt="Download" className="w-6 h-6" />
//               <span className="text-[14px] text-[#18181B] font-bold">
//                 Export PDF
//               </span>
//             </Button>
//           </div>
//         </div>

//         <div className="flex justify-between items-center mb-6">
//           <div className="flex gap-2">
//             {timeRanges.map((range) => (
//               <button
//                 key={range.label}
//                 className={cn(
//                   'px-4 py-2 rounded-md transition-all text-sm font-medium',
//                   selectedRange.label === range.label
//                     ? 'bg-[#CCFBF1] text-teal-800'
//                     : 'bg-transparent hover:bg-gray-50'
//                 )}
//                 style={{
//                   border:
//                     selectedRange.label === range.label
//                       ? `1px solid ${colors.primary}`
//                       : 'none',
//                 }}
//                 onClick={() => setSelectedRange(range)}
//               >
//                 {range.label}
//               </button>
//             ))}
//           </div>
//         </div>

//         {selectedVital === 'activities' ? (
//           <div className="grid grid-cols-2 gap-6">
//             {activityMetrics.map((metric) => (
//               <ActivityPanel
//                 key={metric.key}
//                 metric={metric}
//                 selectedRange={selectedRange}
//               />
//             ))}
//           </div>
//         ) : (
//           <div className="flex">
//             <div className="flex-1">
//               {selectedVital === 'ecg'
//                 ? renderEcgChart()
//                 : renderRegularChart()}
//             </div>
//           </div>
//         )}
//       </div>

//       {selectedVital !== 'activities' && (
//         <VitalDetailModal
//           isOpen={showModal}
//           onClose={() => setShowModal(false)}
//           vitalType={selectedVital}
//           vitalInfo={{
//             title: config.title,
//             color: config.color,
//             range: config.range,
//             unit: config.unit,
//           }}
//           chartData={selectedVital === 'ecg' ? ecgData : chartData}
//           selectedTimeRange={selectedRange}
//         />
//       )}
//     </div>
//   );
// };

// export default VitalChart;



import React, { useEffect, useState } from "react";
import { 
  vitalChartConfig, 
  activityMetrics, 
  timeRanges, 
  generateMockChartData, 
  generateEcgData,
  EcgChart,
  AreaVitalChart,
  LineVitalChart,
  getPointCount,
} from '../../common/Chart/Charts';
import TimeRangeSelector from "../../common/TImeRangeSelector/TimeRangeSelector";
import ChartHeader from "../../common/VitalChartHeader/VitalChartHeader";
import VitalDetailModal from "@/components/Modal/VitalDetailsModal";
import ActivityPanel from "../../common/ActivityPanel/ActivityPanel";

const VitalChart = ({ selectedVital }) => {
  const [selectedRange, setSelectedRange] = useState(timeRanges[0]);
  const [chartData, setChartData] = useState([]);
  const [ecgData, setEcgData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const config = vitalChartConfig[selectedVital] || vitalChartConfig["heart-rate"];

  useEffect(() => {
    if (selectedVital === "ecg") {
      setEcgData(generateEcgData());
    } else if (selectedVital !== "activities") {
      const count = getPointCount(selectedVital, selectedRange.label);
      setChartData(generateMockChartData(count, config.range));
    }
  }, [selectedRange, selectedVital, config.range]);

  const renderChart = () => {
    if (selectedVital === "ecg") {
      return <EcgChart data={ecgData} vitalInfo={config} />;
    } else if (config.type === "area") {
      return (
        <AreaVitalChart 
          data={chartData} 
          vitalType={selectedVital} 
          timeRange={selectedRange} 
          vitalInfo={config} 
        />
      );
    } else if (config.type === "line") {
      return (
        <LineVitalChart 
          data={chartData} 
          vitalType={selectedVital} 
          timeRange={selectedRange} 
          vitalInfo={config} 
        />
      );
    }
    return null;
  };

  if (selectedVital === "activities") {
    return (
      <div className="bg-white border border-gray-100 rounded-lg shadow-sm p-6">
        <ChartHeader title="Activities" showMaximize={false} />
        <TimeRangeSelector selectedRange={selectedRange} setSelectedRange={setSelectedRange} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activityMetrics.map((metric) => (
            <ActivityPanel
              key={metric.key}
              metric={metric}
              selectedRange={selectedRange}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-100 rounded-lg shadow-sm">
      <div className="p-6">
        <ChartHeader 
          title={config.title} 
          onMaximize={() => setShowModal(true)} 
        />
        
        <TimeRangeSelector 
          selectedRange={selectedRange} 
          setSelectedRange={setSelectedRange} 
        />

        <div className="h-[300px] w-full pb-6">
          {renderChart()}
        </div>
        
        
      </div>
      
      <VitalDetailModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        vitalType={selectedVital}
        vitalInfo={config}
        chartData={selectedVital === "ecg" ? ecgData : chartData}
        selectedTimeRange={selectedRange}
      />
    </div>
  );
};

export default VitalChart;