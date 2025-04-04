import { AxisDomain } from "recharts";
import Steps from '../../../assets/icons/Steps-2.svg';
import Calories from '../../../assets/icons/Calories.svg';
import Distance from '../../../assets/icons/Location.svg';
import Time from '../../../assets/icons/Time.svg';

// Chart color configuration
export const chartColors = {
  primary: '#14B8A6',
  secondary: '#EF4444',
  background: '#fff',
  border: '#f0f0f0',
  tooltipText: '#333',
  tooltipBackground: '#fff8f8',
  grid: '#ffdddd',
  gridHighlight: '#ffcccc',
  highlight: '#CCFBF1',
  highlightBorder: '#b8e6d9',
  ecgLine: '#555555',
  textPrimary: '#155e75',
  textSecondary: '#4B5563',
  textWhite: '#ffffff',
};

// Vital types configuration
export const vitalChartConfig = {
  'heart-rate': { 
    type: 'area', 
    color: chartColors.primary, 
    range: { min: 60, max: 100 },
    title: 'Heart Rate',
    unit: 'bpm' 
  },
  temperature: { 
    type: 'area', 
    color: chartColors.primary, 
    range: { min: 97, max: 102 },
    title: 'Temperature',
    unit: '°F' 
  },
  spo2: { 
    type: 'area', 
    color: chartColors.primary, 
    range: { min: 85, max: 100 },
    title: 'SpO2',
    unit: '%' 
  },
  respiration: { 
    type: 'area', 
    color: chartColors.primary, 
    range: { min: 10, max: 20 },
    title: 'Respiration',
    unit: 'rpm' 
  },
  ecg: { 
    type: 'line', 
    color: chartColors.secondary, 
    range: { min: -1, max: 1 },
    title: 'ECG',
    unit: 'mV' 
  },
  activities: { 
    type: 'bar', 
    color: chartColors.primary, 
    range: { min: 0, max: 100 },
    title: 'Activities' 
  },
};

// Time ranges configuration
export const timeRanges = [
  { label: '1 Day', days: 24 },
  { label: '7 Days', days: 7 * 24 },
  { label: '1 Month', days: 30 * 24 },
  { label: '3 Months', days: 90 * 24 },
];

// Activity metrics configuration
export const activityMetrics = [
  { 
    key: 'steps', 
    title: 'Steps', 
    color: chartColors.primary, 
    range: { min: 1000, max: 15000 }, 
    icon: Steps
  },
  { 
    key: 'calories', 
    title: 'Calories', 
    color: chartColors.primary, 
    range: { min: 100, max: 1500 }, 
    unit: 'kcal', 
    icon : Calories
  },
  { 
    key: 'distance', 
    title: 'Distance', 
    color: chartColors.primary, 
    range: { min: 1, max: 20 }, 
    unit: 'km', 
    icon: Distance
  },
  { 
    key: 'time', 
    title: 'Time', 
    color: chartColors.primary, 
    range: { min: 4, max: 15 }, 
    unit: 'mins', 
    icon: Time
  },
];

// Generate random chart data
export const generateMockChartData = (totalPoints: number, range: { min: number, max: number }) => {
  return Array.from({ length: totalPoints }, (_, i) => ({
    time: i + 1,
    value: range.min + Math.random() * (range.max - range.min),
  }));
};

// Generate ECG data
export const generateEcgData = (numPoints = 100) => {
  const data = [];
  let time = 0;
  
  // Function to generate one ECG cycle
  const generateCycle = (startIndex: number, cycleLength: number) => {
    // P wave (atrial depolarization)
    for (let i = 0; i < cycleLength * 0.1; i++) {
      const progress = i / (cycleLength * 0.1);
      data.push({
        time: startIndex + i,
        value: 0.2 * Math.sin(progress * Math.PI)
      });
    }
    
    // PR segment (flat)
    for (let i = 0; i < cycleLength * 0.05; i++) {
      data.push({
        time: startIndex + cycleLength * 0.1 + i,
        value: 0
      });
    }
    
    // QRS complex (ventricular depolarization)
    data.push({ time: startIndex + cycleLength * 0.15, value: -0.1 }); // Q wave
    data.push({ time: startIndex + cycleLength * 0.16, value: 1 });    // R wave (peak)
    data.push({ time: startIndex + cycleLength * 0.17, value: -0.2 }); // S wave
    
    // ST segment (flat)
    for (let i = 0; i < cycleLength * 0.13; i++) {
      data.push({
        time: startIndex + cycleLength * 0.17 + i,
        value: 0
      });
    }
    
    // T wave (ventricular repolarization)
    for (let i = 0; i < cycleLength * 0.15; i++) {
      const progress = i / (cycleLength * 0.15);
      data.push({
        time: startIndex + cycleLength * 0.3 + i,
        value: 0.3 * Math.sin(progress * Math.PI)
      });
    }
    
    // TP segment (rest)
    for (let i = 0; i < cycleLength * 0.55; i++) {
      data.push({
        time: startIndex + cycleLength * 0.45 + i,
        value: 0
      });
    }
    
    return cycleLength;
  };
  
  // Generate multiple cycles to fill the chart
  while (time < numPoints) {
    // Vary the cycle length slightly to create natural heart rate variability
    const cycleLength = Math.floor(30 + Math.random() * 5);
    time += generateCycle(time, cycleLength);
  }
  
  // Trim to exact length
  return data.slice(0, numPoints);
};

// Helper functions for chart axis and formatting
export const getPointCount = (vital: string, rangeLabel: string) => {
  if (['heart-rate', 'temperature', 'spo2', 'respiration', 'activities'].includes(vital)) {
    if (rangeLabel === '1 Day') return 24;
    if (rangeLabel === '7 Days') return 7;
    if (rangeLabel === '1 Month') return 30;
    if (rangeLabel === '3 Months') return 90;
  }
  return 24;
};

export const getXAxisTicks2 = (vital: string, rangeLabel: string) => {
  if (['heart-rate', 'temperature', 'spo2', 'respiration'].includes(vital)) {
    if (rangeLabel === '1 Day') return [1, 4, 7, 10, 13, 16, 19, 22];
    if (rangeLabel === '7 Days') return [1, 2, 3, 4, 5, 6, 7];
    if (rangeLabel === '1 Month') return [1, 30];
    if (rangeLabel === '3 Months') return [1, 90];
  }
  return undefined;
};

export const getXAxisTicks = (vital: string, rangeLabel: string): number[] => {
  if (rangeLabel === '1 Day') {
    // For 1 Day: generate ticks every 2 hours, e.g. [0, 2, 4, …, 22]
    return Array.from({ length: 12 }, (_, i) => i * 2);
  } else if (rangeLabel === '7 Days') {
    // For 7 Days: one tick per day (0 through 6)
    return Array.from({ length: 7 }, (_, i) => i);
  } else if (rangeLabel === '1 Month') {
    // Only show first and last tick, for 30 data points: tick positions [0, 29]
    return [0, 29];
  } else if (rangeLabel === '3 Months') {
    // For 90 points, show ticks at [0, 89]
    return [0, 89];
  }
  return [];
};


export const getActivityXAxisTicks = (rangeLabel: string) => {
  if (rangeLabel === '1 Day') {
    // For 1 Day: generate ticks every 2 hours, e.g. [0, 2, 4, …, 22]
    return Array.from({ length: 12 }, (_, i) => i * 2);
  } else if (rangeLabel === '7 Days') {
    // For 7 Days: one tick per day (0 through 6)
    return Array.from({ length: 7 }, (_, i) => i);
  } else if (rangeLabel === '1 Month') {
    // Only show first and last tick, for 30 data points: tick positions [0, 29]
    return [0, 29];
  } else if (rangeLabel === '3 Months') {
    // For 90 points, show ticks at [0, 89]
    return [0, 89];
  }
  return [];
};

export const formatXAxisTick2 = (tick: number, vital: string, rangeLabel: string): string => {
  if (vital === 'activities') {
    if (rangeLabel === '1 Day') {
      const hour = tick - 1;
      const period = hour < 12 ? 'am' : 'pm';
      let displayHour = hour % 12;
      if (displayHour === 0) displayHour = 12;
      return `${displayHour}${period}`;
    }
    return tick.toString();
  } else if (['heart-rate', 'temperature', 'spo2', 'respiration'].includes(vital)) {
    if (rangeLabel === '1 Day') {
      const hour = tick - 1;
      const period = hour < 12 ? 'am' : 'pm';
      let displayHour = hour % 12;
      if (displayHour === 0) displayHour = 12;
      return `${displayHour}${period}`;
    } else if (rangeLabel === '1 Month' || rangeLabel === '3 Months') {
      if (tick === 1) return 'Min';
      if (tick === (rangeLabel === '1 Month' ? 30 : 90)) return 'Max';
      return '';
    } else if (rangeLabel === '7 Days') {
      return `${tick}`;
    }
  }
  return tick.toString();
};

export const formatXAxisTick = (tick: number, vital: string, rangeLabel: string): string => {
  if (rangeLabel === '1 Day') {
    // For 1 Day, tick represents the hour (e.g. 0, 2, 4, …); show as "0h", "2h", etc.
    return `${tick}h`;
  } else if (rangeLabel === '7 Days') {
    // For 7 Days, assume tick 0 represents 6 days ago and tick 6 represents today.
    const today = new Date();
    const daysAgo = 7 - tick;
    const date = new Date(today);
    date.setDate(today.getDate() - daysAgo);
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  } else if (rangeLabel === '1 Month' || rangeLabel === '3 Months') {
    // Only two ticks are provided.
    const today = new Date();
    if (tick === 0) {
      // For the start tick: subtract 1 month (or 3 months) from today, then set date = today's date + 1.
      let pastDate = new Date(today);
      if (rangeLabel === '1 Month') {
        pastDate.setMonth(today.getMonth() - 1);
      } else {
        pastDate.setMonth(today.getMonth() - 3);
      }
      // Set the past date's day to one more than today's date
      pastDate.setDate(today.getDate() + 1);
      return pastDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    } else {
      // Last tick: show today's date.
      return today.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    }
  }
  return tick.toString();
};

export const getDateForDataPoint = (
  index: number,
  rangeLabel: string
): Date => {
  const today = new Date();
  if (rangeLabel === "1 Month") {
    // For 30 points, startDate = today - 29 days so that index 29 = today
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 30);
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + index);
    return date;
  } else if (rangeLabel === "3 Months") {
    // For 90 points, startDate = today - 89 days so that index 89 = today
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 90);
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + index);
    return date;
  } else if (rangeLabel === "7 Days") {
    // For 7 points, startDate = today - 6 days so that index 6 = today
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 7);
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + index);
    return date;
  }
  return today;
};

export const getYAxisSettings = (vital: string): { domain: AxisDomain, ticks?: number[] } => {
  if (vital === 'heart-rate') {
    return { domain: [30, 100], ticks: [30, 40, 50, 60, 70, 80, 90, 100] };
  } else if (vital === 'spo2') {
    return { domain: [30, 100], ticks: [30, 40, 50, 60, 70, 80, 90, 100] };
  } else if (vital === 'temperature') {
    return { domain: [90, 104], ticks: [90, 92, 94, 96, 98, 100, 102, 104] };
  } else if (vital === 'respiration') {
    return { domain: [0, 21], ticks: [0, 3, 6, 9, 12, 15, 18, 21] };
  }
  return { domain: [0, 'auto'], ticks: undefined };
};

// Formatted tooltip values
export const customTooltipFormatter = (value: number, vital: string, unit: string) => {
  return `${Math.round(value)} ${unit}`;
};


export const customTooltipLabelFormatter = (
  label: number,
  vital: string,
  rangeLabel: string
): string => {
  if (rangeLabel === "1 Month" || rangeLabel === "3 Months" || rangeLabel === "7 Days") {
    const date = getDateForDataPoint(label, rangeLabel);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } else {
    // For 1 Day, assume label is hour
    return `${label}h`;
  }
};

// export const customTooltipLabelFormatter = (label: number, vital: string, rangeLabel: string) => {
//   return formatXAxisTick(label, vital, rangeLabel);
// };

// Generate activity stats
export const generateActivityStats = (key: string) => {
  const metric = activityMetrics.find(m => m.key === key);
  if (!metric) return [];
  
  const min = Math.round(metric.range.min * 1.2);
  const max = Math.round(metric.range.max * 0.9);
  const avg = Math.round((min + max) / 2);
  
  const unit = metric.key === 'steps' ? 'K' : 
             metric.key === 'calories' ? 'kcal' : 
             metric.key === 'distance' ? 'km' : 'mins';
              
  return [
    { title: "Minimum", value: metric.key === 'steps' ? `${(min / 1000).toFixed(1)}K` : min.toString(), unit: metric.key === 'steps' ? "" : unit },
    { title: "Average", value: metric.key === 'steps' ? `${(avg / 1000).toFixed(1)}K` : avg.toString(), unit: metric.key === 'steps' ? "" : unit },
    { title: "Maximum", value: metric.key === 'steps' ? `${(max / 1000).toFixed(1)}K` : max.toString(), unit: metric.key === 'steps' ? "" : unit },
  ];
};
