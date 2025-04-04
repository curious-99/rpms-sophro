import React, { useState } from 'react';
import CustomReactTable from '@/components/common/CustomReactTable/CustomReactTable';
import { ColumnDef } from '@tanstack/react-table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Bell, Search } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import SearchIcon from '@/assets/icons/search.svg';

// Define a type for patient data
type Patient = {
  id: string;
  name: string;
  avatar: string;
  gender: string;
  age: number;
  alerts: number | string;
  lastUpdated: string;
  date: string;
  heartRate: {
    value: number;
    status: 'normal' | 'warning' | 'abnormal';
  };
  ecg: {
    value: string;
    status: 'normal' | 'warning' | 'abnormal';
  };
  temperature: {
    value: string;
    status: 'normal' | 'warning' | 'abnormal';
  };
  spo2: {
    value: number;
    status: 'normal' | 'warning' | 'abnormal';
  };
  respiration: {
    value: number;
    status: 'normal' | 'warning' | 'abnormal';
  };
};

// Status badge component
const StatusBadge = ({
  status,
}: {
  status: 'normal' | 'warning' | 'abnormal';
}) => {
  const variants = {
    normal: 'bg-green-100 text-green-800 hover:bg-green-100',
    warning: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
    abnormal: 'bg-red-100 text-red-800 hover:bg-red-100',
  };

  return (
    <Badge
      className={`${variants[status]} rounded-full text-xs font-medium px-2`}
    >
      {status === 'normal'
        ? 'Normal'
        : status === 'warning'
          ? 'Warning'
          : 'Abnormal'}
    </Badge>
  );
};

// columns data
const columns: ColumnDef<Patient>[] = [
  {
    accessorKey: 'name',
    header: 'Patient',
    cell: ({ row }) => {
      const patient = row.original;
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={patient.avatar} alt={patient.name} />
            <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-semibold">{patient.name}</div>
            <div className="text-sm text-muted-foreground">
              {patient.gender}, {patient.age} years
            </div>
            <div className="text-xs text-muted-foreground">
              Patient ID: #{patient.id}
            </div>
          </div>
        </div>
      );
    },
    enableSorting: true,
  },
  {
    accessorKey: 'alerts',
    header: 'No of Alerts',
    cell: ({ row }) => {
      const alerts = row.getValue('alerts');
      if (alerts === '-') {
        return <div className="text-center">-</div>;
      }
      return (
        <div className="flex items-center justify-center">
          <Bell className="h-5 w-5 text-orange-500 mr-1" />
          <span className="font-medium text-orange-500">{alerts}</span>
        </div>
      );
    },
    enableSorting: true,
  },
  {
    accessorKey: 'lastUpdated',
    header: 'Last Vitals Updated',
    cell: ({ row }) => {
      return (
        <div>
          <div>{row.original.lastUpdated}</div>
          <div className="text-xs text-muted-foreground">
            {row.original.date}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'heartRate',
    header: 'Heart Rate',
    cell: ({ row }) => {
      const { value, status } = row.original.heartRate;
      return (
        <div className="flex flex-col items-center gap-1">
          <div className="font-medium">{value} bpm</div>
          <StatusBadge status={status} />
        </div>
      );
    },
  },
  {
    accessorKey: 'ecg',
    header: 'ECG',
    cell: ({ row }) => {
      const { value, status } = row.original.ecg;
      return (
        <div className="flex flex-col items-center gap-1">
          <div className="font-medium">{value}</div>
          <StatusBadge status={status} />
        </div>
      );
    },
  },
  {
    accessorKey: 'temperature',
    header: 'Temperature',
    cell: ({ row }) => {
      const { value, status } = row.original.temperature;
      return (
        <div className="flex flex-col items-center gap-1">
          <div className="font-medium">{value}</div>
          <StatusBadge status={status} />
        </div>
      );
    },
  },
  {
    accessorKey: 'spo2',
    header: 'SpO2',
    cell: ({ row }) => {
      const { value, status } = row.original.spo2;
      return (
        <div className="flex flex-col items-center gap-1">
          <div className="font-medium">{value}%</div>
          <StatusBadge status={status} />
        </div>
      );
    },
  },
  {
    accessorKey: 'respiration',
    header: 'Respiration',
    cell: ({ row }) => {
      const { value, status } = row.original.respiration;
      return (
        <div className="flex flex-col items-center gap-1">
          <div className="font-medium">{value} rpm</div>
          <StatusBadge status={status} />
        </div>
      );
    },
  },
];

// patient data
const data: Patient[] = [
  {
    id: '213',
    name: 'Kailash Chaurasia',
    avatar: '/lovable-uploads/ea099213-a373-4bb3-9e4e-a1af3b5e459c.png',
    gender: 'Male',
    age: 71,
    alerts: 2,
    lastUpdated: '11:20:32 PM',
    date: '2 Feb',
    heartRate: { value: 85, status: 'normal' },
    ecg: { value: 'Sinus Rhythm', status: 'normal' },
    temperature: { value: '99.8°F', status: 'warning' },
    spo2: { value: 92, status: 'warning' },
    respiration: { value: 14, status: 'normal' },
  },
  {
    id: '100',
    name: 'Ramesh Gupta',
    avatar: '/lovable-uploads/ea099213-a373-4bb3-9e4e-a1af3b5e459c.png',
    gender: 'Male',
    age: 53,
    alerts: 2,
    lastUpdated: '05:30:21 PM',
    date: '16 Mar',
    heartRate: { value: 83, status: 'normal' },
    ecg: { value: 'Sinus Rhythm', status: 'warning' },
    temperature: { value: '98.2°F', status: 'normal' },
    spo2: { value: 93, status: 'warning' },
    respiration: { value: 14, status: 'normal' },
  },
  {
    id: '676',
    name: 'Akshitha B',
    avatar: '/lovable-uploads/ea099213-a373-4bb3-9e4e-a1af3b5e459c.png',
    gender: 'Female',
    age: 39,
    alerts: '-',
    lastUpdated: '10:58:12 PM',
    date: '4 Mar',
    heartRate: { value: 78, status: 'normal' },
    ecg: { value: 'Sinus Rhythm', status: 'normal' },
    temperature: { value: '98.6°F', status: 'normal' },
    spo2: { value: 96, status: 'normal' },
    respiration: { value: 18, status: 'normal' },
  },
  {
    id: '345',
    name: 'Salini Jain',
    avatar: '/lovable-uploads/ea099213-a373-4bb3-9e4e-a1af3b5e459c.png',
    gender: 'Female',
    age: 38,
    alerts: 3,
    lastUpdated: '05:58:11 AM',
    date: '16 Feb',
    heartRate: { value: 110, status: 'abnormal' },
    ecg: { value: 'Sinus Rhythm', status: 'normal' },
    temperature: { value: '98°F', status: 'normal' },
    spo2: { value: 89, status: 'abnormal' },
    respiration: { value: 9, status: 'warning' },
  },
  {
    id: '879',
    name: 'Leo Peter',
    avatar: '/lovable-uploads/ea099213-a373-4bb3-9e4e-a1af3b5e459c.png',
    gender: 'Female',
    age: 57,
    alerts: 4,
    lastUpdated: '06:09:09 PM',
    date: '6 Mar',
    heartRate: { value: 91, status: 'warning' },
    ecg: { value: 'Sinus Rhythm', status: 'normal' },
    temperature: { value: '99.1°F', status: 'warning' },
    spo2: { value: 92, status: 'warning' },
    respiration: { value: 7, status: 'abnormal' },
  },
  {
    id: '879',
    name: 'Leo Peter',
    avatar: '/lovable-uploads/ea099213-a373-4bb3-9e4e-a1af3b5e459c.png',
    gender: 'Female',
    age: 57,
    alerts: 4,
    lastUpdated: '06:09:09 PM',
    date: '6 Mar',
    heartRate: { value: 91, status: 'warning' },
    ecg: { value: 'Sinus Rhythm', status: 'normal' },
    temperature: { value: '99.1°F', status: 'warning' },
    spo2: { value: 92, status: 'warning' },
    respiration: { value: 7, status: 'abnormal' },
  },
  {
    id: '345',
    name: 'Salini Jain',
    avatar: '/lovable-uploads/ea099213-a373-4bb3-9e4e-a1af3b5e459c.png',
    gender: 'Female',
    age: 38,
    alerts: 3,
    lastUpdated: '05:58:11 AM',
    date: '16 Feb',
    heartRate: { value: 110, status: 'abnormal' },
    ecg: { value: 'Sinus Rhythm', status: 'normal' },
    temperature: { value: '98°F', status: 'normal' },
    spo2: { value: 89, status: 'abnormal' },
    respiration: { value: 9, status: 'warning' },
  },
  {
    id: '879',
    name: 'Leo Peter',
    avatar: '/lovable-uploads/ea099213-a373-4bb3-9e4e-a1af3b5e459c.png',
    gender: 'Female',
    age: 57,
    alerts: 4,
    lastUpdated: '06:09:09 PM',
    date: '6 Mar',
    heartRate: { value: 91, status: 'warning' },
    ecg: { value: 'Sinus Rhythm', status: 'normal' },
    temperature: { value: '99.1°F', status: 'warning' },
    spo2: { value: 92, status: 'warning' },
    respiration: { value: 7, status: 'abnormal' },
  },
  {
    id: '345',
    name: 'Salini Jain',
    avatar: '/lovable-uploads/ea099213-a373-4bb3-9e4e-a1af3b5e459c.png',
    gender: 'Female',
    age: 38,
    alerts: 3,
    lastUpdated: '05:58:11 AM',
    date: '16 Feb',
    heartRate: { value: 110, status: 'abnormal' },
    ecg: { value: 'Sinus Rhythm', status: 'normal' },
    temperature: { value: '98°F', status: 'normal' },
    spo2: { value: 89, status: 'abnormal' },
    respiration: { value: 9, status: 'warning' },
  },
  {
    id: '879',
    name: 'Leo Peter',
    avatar: '/lovable-uploads/ea099213-a373-4bb3-9e4e-a1af3b5e459c.png',
    gender: 'Female',
    age: 57,
    alerts: 4,
    lastUpdated: '06:09:09 PM',
    date: '6 Mar',
    heartRate: { value: 91, status: 'warning' },
    ecg: { value: 'Sinus Rhythm', status: 'normal' },
    temperature: { value: '99.1°F', status: 'warning' },
    spo2: { value: 92, status: 'warning' },
    respiration: { value: 7, status: 'abnormal' },
  },
  {
    id: '100',
    name: 'Ramesh Gupta',
    avatar: '/lovable-uploads/ea099213-a373-4bb3-9e4e-a1af3b5e459c.png',
    gender: 'Male',
    age: 53,
    alerts: 2,
    lastUpdated: '05:30:21 PM',
    date: '16 Mar',
    heartRate: { value: 83, status: 'normal' },
    ecg: { value: 'Sinus Rhythm', status: 'warning' },
    temperature: { value: '98.2°F', status: 'normal' },
    spo2: { value: 93, status: 'warning' },
    respiration: { value: 14, status: 'normal' },
  },
  {
    id: '676',
    name: 'Akshitha B',
    avatar: '/lovable-uploads/ea099213-a373-4bb3-9e4e-a1af3b5e459c.png',
    gender: 'Female',
    age: 39,
    alerts: '-',
    lastUpdated: '10:58:12 PM',
    date: '4 Mar',
    heartRate: { value: 78, status: 'normal' },
    ecg: { value: 'Sinus Rhythm', status: 'normal' },
    temperature: { value: '98.6°F', status: 'normal' },
    spo2: { value: 96, status: 'normal' },
    respiration: { value: 18, status: 'normal' },
  },
  {
    id: '879',
    name: 'Leo Peter',
    avatar: '/lovable-uploads/ea099213-a373-4bb3-9e4e-a1af3b5e459c.png',
    gender: 'Female',
    age: 57,
    alerts: 4,
    lastUpdated: '06:09:09 PM',
    date: '6 Mar',
    heartRate: { value: 91, status: 'warning' },
    ecg: { value: 'Sinus Rhythm', status: 'normal' },
    temperature: { value: '99.1°F', status: 'warning' },
    spo2: { value: 92, status: 'warning' },
    respiration: { value: 7, status: 'abnormal' },
  },
  {
    id: '879',
    name: 'Leo Peter',
    avatar: '/lovable-uploads/ea099213-a373-4bb3-9e4e-a1af3b5e459c.png',
    gender: 'Female',
    age: 57,
    alerts: 4,
    lastUpdated: '06:09:09 PM',
    date: '6 Mar',
    heartRate: { value: 91, status: 'warning' },
    ecg: { value: 'Sinus Rhythm', status: 'normal' },
    temperature: { value: '99.1°F', status: 'warning' },
    spo2: { value: 92, status: 'warning' },
    respiration: { value: 7, status: 'abnormal' },
  },
  {
    id: '879',
    name: 'Leo Peter',
    avatar: '/lovable-uploads/ea099213-a373-4bb3-9e4e-a1af3b5e459c.png',
    gender: 'Female',
    age: 57,
    alerts: 4,
    lastUpdated: '06:09:09 PM',
    date: '6 Mar',
    heartRate: { value: 91, status: 'warning' },
    ecg: { value: 'Sinus Rhythm', status: 'normal' },
    temperature: { value: '99.1°F', status: 'warning' },
    spo2: { value: 92, status: 'warning' },
    respiration: { value: 7, status: 'abnormal' },
  },
  {
    id: '879',
    name: 'Leo Peter',
    avatar: '/lovable-uploads/ea099213-a373-4bb3-9e4e-a1af3b5e459c.png',
    gender: 'Female',
    age: 57,
    alerts: 4,
    lastUpdated: '06:09:09 PM',
    date: '6 Mar',
    heartRate: { value: 91, status: 'warning' },
    ecg: { value: 'Sinus Rhythm', status: 'normal' },
    temperature: { value: '99.1°F', status: 'warning' },
    spo2: { value: 92, status: 'warning' },
    respiration: { value: 7, status: 'abnormal' },
  },
  {
    id: '879',
    name: 'Leo Peter',
    avatar: '/lovable-uploads/ea099213-a373-4bb3-9e4e-a1af3b5e459c.png',
    gender: 'Female',
    age: 57,
    alerts: 4,
    lastUpdated: '06:09:09 PM',
    date: '6 Mar',
    heartRate: { value: 91, status: 'warning' },
    ecg: { value: 'Sinus Rhythm', status: 'normal' },
    temperature: { value: '99.1°F', status: 'warning' },
    spo2: { value: 92, status: 'warning' },
    respiration: { value: 7, status: 'abnormal' },
  },
  {
    id: '879',
    name: 'Leo Peter',
    avatar: '/lovable-uploads/ea099213-a373-4bb3-9e4e-a1af3b5e459c.png',
    gender: 'Female',
    age: 57,
    alerts: 4,
    lastUpdated: '06:09:09 PM',
    date: '6 Mar',
    heartRate: { value: 91, status: 'warning' },
    ecg: { value: 'Sinus Rhythm', status: 'normal' },
    temperature: { value: '99.1°F', status: 'warning' },
    spo2: { value: 92, status: 'warning' },
    respiration: { value: 7, status: 'abnormal' },
  },
  {
    id: '879',
    name: 'Leo Peter',
    avatar: '/lovable-uploads/ea099213-a373-4bb3-9e4e-a1af3b5e459c.png',
    gender: 'Female',
    age: 57,
    alerts: 4,
    lastUpdated: '06:09:09 PM',
    date: '6 Mar',
    heartRate: { value: 91, status: 'warning' },
    ecg: { value: 'Sinus Rhythm', status: 'normal' },
    temperature: { value: '99.1°F', status: 'warning' },
    spo2: { value: 92, status: 'warning' },
    respiration: { value: 7, status: 'abnormal' },
  },
  {
    id: '879',
    name: 'Leo Peter',
    avatar: '/lovable-uploads/ea099213-a373-4bb3-9e4e-a1af3b5e459c.png',
    gender: 'Female',
    age: 57,
    alerts: 4,
    lastUpdated: '06:09:09 PM',
    date: '6 Mar',
    heartRate: { value: 91, status: 'warning' },
    ecg: { value: 'Sinus Rhythm', status: 'normal' },
    temperature: { value: '99.1°F', status: 'warning' },
    spo2: { value: 92, status: 'warning' },
    respiration: { value: 7, status: 'abnormal' },
  },
];

export function PatientsTableExample() {
  const [globalFilter, setGlobalFilter] = useState('');

  return (
    <div className="container mx-auto py-10">
      {/* Header Section with flex container */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-semibold">Patient Panel</h2>

        <div className="relative w-full max-w-sm flex px-[14px] py-[10px] items-center gap-2 rounded-[40px] border border-[#DCE3E8] bg-[#F2F5F7] shadow-[0px_1px_2px_rgba(16,24,40,0.05)]">
          <img src={SearchIcon} alt="search" className="w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search Patient..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="!space-y-0 bg-transparent focus:outline-none"
          />
        </div>
      </div>
      <CustomReactTable
        data={data}
        columns={columns}
        showSearch={false} // Disable built-in search
        globalFilter={globalFilter}
        onGlobalFilterChange={setGlobalFilter}
      />
    </div>
  );
}

export default PatientsTableExample;
