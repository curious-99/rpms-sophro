// import React, { useState } from 'react';

// import Lungs from '../../assets/icons/Lungs.svg';
// import BloodPressure from '../../assets/icons/Blood-pressure.svg';
// import HeartIconSolid from '../../assets/icons/Heart-Icon-Solid.svg';
// import HeartRate from '../../assets/icons/Heart-Rate.svg';
// import Temperature from '../../assets/icons/Temperature.svg';
// import WalkIcon from '../../assets/icons/Walk-icon.svg';
// import ProfilePhoto from '../../assets/icons/Profile.svg';

// import Header from '../../components/layout/header-dashboard';
// import Sidebar from '../../components/layout/sidebar';
// import PatientInfo from '../../components/dashboard/patient-info/Patient-info';
// import PatientStats from '../../components/dashboard/patient-stats/Patient-stats';
// import VitalCard from '../../components/dashboard/vital-card/Vital-Card';
// import VitalChart from '../../components/dashboard/vital-chart/VitalChart.tsx';
// import VitalStatsPanel from '../../components/dashboard/vital-stats-panel/VitalStatsPanel.tsx';

// const vitals = [
//   {
//     key: 'heart-rate',
//     title: 'Heart Rate',
//     unit: 'bpm',
//     icon: HeartRate,
//     value: 110,
//     status: 'Normal',
//   },
//   {
//     key: 'ecg',
//     title: 'ECG',
//     unit: '',
//     icon: HeartIconSolid,
//     value: 'Sinus Rhytm',
//     status: 'Normal',
//   },
//   {
//     key: 'temperature',
//     title: 'Temperature',
//     unit: '°F',
//     icon: Temperature,
//     value: 99.8,
//     status: 'Warning',
//   },
//   {
//     key: 'spo2',
//     title: 'SpO2',
//     unit: '%',
//     icon: BloodPressure,
//     value: 90,
//     status: 'Normal',
//   },
//   {
//     key: 'respiration',
//     title: 'Respiration',
//     unit: 'rpm',
//     icon: Lungs,
//     value: 16,
//     status: 'Abnormal',
//   },
//   {
//     key: 'activities',
//     title: 'Activities',
//     unit: '',
//     icon: WalkIcon,
//     value: 'Normal',
//     status: 'Normal',
//   },
// ];

// const Dashboard = () => {
//   const [selectedVital, setSelectedVital] = useState('heart-rate');
//   const [currentDate, setCurrentDate] = useState('06 Feb 2025');

//   return (
//     <div className="min-h-screen bg-[#FAFAFB] dark:bg-gray-900">
//       {/* Fixed Header */}
//       <header className="fixed top-0 left-0 w-full bg-white dark:bg-gray-900 shadow-md z-50">
//         <Header />
//       </header>

//       <div className="flex">
//         {/* Fixed Sidebar */}
//         <aside className="fixed top-[4rem] left-0 w-64 h-[calc(100vh-4rem)] bg-white dark:bg-gray-900 shadow-md z-40">
//           <Sidebar />
//         </aside>
//         {/* Scrollable Main Content */}
//         <main className="flex-1 p-6 ml-64 mt-12 overflow-y-auto h-[calc(100vh-4rem)] bg-grey-800 dark:bg-gray-900 text-black dark:text-white">
//           <PatientInfo
//             name="John Doe"
//             id="123"
//             image={ProfilePhoto}
//             date={currentDate}
//           />

//           <div className="flex mt-4 mb-6">
//             {/* Vital Signs Grid */}
//             <div className="m-2 p-6 w-7/12 grid gap-4 grid-cols-2 md:grid-cols-3 shadow-md rounded-lg bg-[#F3F4F6] dark:bg-gray-800">
//               {vitals.map(({ key, title, unit, icon, value, status }) => (
//                 <VitalCard
//                   key={key}
//                   title={title}
//                   value={value}
//                   unit={unit}
//                   status={status}
//                   icon={icon}
//                   selected={selectedVital === key}
//                   onClick={() => setSelectedVital(key)}
//                 />
//               ))}
//             </div>

//             {/* Patient Stats */}
//             <div className="m-2 w-5/12 shadow-md rounded-lg bg-[#F3F4F6] dark:bg-gray-800">
//               <PatientStats
//                 age={34}
//                 weight={64}
//                 bmi={24}
//                 gender="Male"
//                 height={175}
//                 bloodGroup="B+"
//               />
//             </div>
//           </div>

//           {/* Vital Chart and Stats Panel */}
//           <div className="flex gap-6">
//             <div className="flex-1">
//               <VitalChart selectedVital={selectedVital} />
//             </div>
//             <div className="flex items-center justify-center">
//               <VitalStatsPanel selectedVital={selectedVital} />
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;



// DashboardHome.jsx
import React, { useState } from 'react';

import Lungs from '../../assets/icons/Lungs.svg';
import BloodPressure from '../../assets/icons/Blood-pressure.svg';
import HeartIconSolid from '../../assets/icons/Heart-Icon-Solid.svg';
import HeartRate from '../../assets/icons/Heart-Rate.svg';
import Temperature from '../../assets/icons/Temperature.svg';
import WalkIcon from '../../assets/icons/Walk-icon.svg';
import ProfilePhoto from '../../assets/icons/Profile.svg';

import Header from '../../components/layout/header-dashboard';
import Sidebar from '../../components/layout/sidebar';
import PatientInfo from '../../components/dashboard/patient-info/Patient-info';
import PatientStats from '../../components/dashboard/patient-stats/Patient-stats';
import VitalCard from '../../components/dashboard/vital-card/Vital-Card';
import VitalChart from '../../components/dashboard/vital-chart/VitalChart.tsx';
import VitalStatsPanel from '../../components/dashboard/vital-stats-panel/VitalStatsPanel.tsx';

const vitals = [
  {
    key: 'heart-rate',
    title: 'Heart Rate',
    unit: 'bpm',
    icon: HeartRate,
    value: 110,
    status: 'Normal',
  },
  {
    key: 'ecg',
    title: 'ECG',
    unit: '',
    icon: HeartIconSolid,
    value: 'Sinus Rhytm',
    status: 'Normal',
  },
  {
    key: 'temperature',
    title: 'Temperature',
    unit: '°F',
    icon: Temperature,
    value: 99.8,
    status: 'Warning',
  },
  {
    key: 'spo2',
    title: 'SpO2',
    unit: '%',
    icon: BloodPressure,
    value: 90,
    status: 'Normal',
  },
  {
    key: 'respiration',
    title: 'Respiration',
    unit: 'rpm',
    icon: Lungs,
    value: 16,
    status: 'Abnormal',
  },
  {
    key: 'activities',
    title: 'Activities',
    unit: '',
    icon: WalkIcon,
    value: 'Normal',
    status: 'Normal',
  },
];

const DashboardHome = () => {
  const [selectedVital, setSelectedVital] = useState('heart-rate');
  const [currentDate] = useState('06 Feb 2025');

  return (
    <>
      {/* Patient Info Section */}
      <PatientInfo
        name="John Doe"
        id="123"
        image={ProfilePhoto}
        date={currentDate}
      />

      {/* Vital Signs & Patient Stats Section */}
      <div className="flex mt-4 mb-6">
        {/* Vital Signs Grid */}
        <div className="m-2 p-6 w-7/12 grid gap-4 grid-cols-2 md:grid-cols-3 shadow-md rounded-lg bg-[#F3F4F6] dark:bg-gray-800">
          {vitals.map(({ key, title, unit, icon, value, status }) => (
            <VitalCard
              key={key}
              title={title}
              value={value}
              unit={unit}
              status={status}
              icon={icon}
              selected={selectedVital === key}
              onClick={() => setSelectedVital(key)}
            />
          ))}
        </div>

        {/* Patient Stats */}
        <div className="m-2 w-5/12 shadow-md rounded-lg bg-[#F3F4F6] dark:bg-gray-800">
          <PatientStats
            age={34}
            weight={64}
            bmi={24}
            gender="Male"
            height={175}
            bloodGroup="B+"
          />
        </div>
      </div>

      {/* Vital Chart & Stats Panel Section */}
      <div className="flex gap-6">
        <div className="flex-1">
          <VitalChart selectedVital={selectedVital} />
        </div>
        <div className="flex items-center justify-center">
          <VitalStatsPanel selectedVital={selectedVital} />
        </div>
      </div>
    </>
  );
};

export default DashboardHome;
