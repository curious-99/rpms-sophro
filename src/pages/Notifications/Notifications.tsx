import React, { useState, useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import CustomReactTable from "@/components/common/CustomReactTable/CustomReactTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/Button";
import { ArrowUpDown, BarChart2 } from "lucide-react";
import HeartRate from '../../assets/icons/Heart-Rate.svg';
import ECG from '../../assets/icons/Heart-Icon-Solid.svg';
import Respiration from '../../assets/icons/Lungs.svg';
import Temperature from '../../assets/icons/Temperature.svg';
import SpO2 from '../../assets/icons/Blood-pressure.svg'; 

type VitalType = 'Heart Rate' | 'ECG' | 'Respiration' | 'Temperature' | 'SpO2';
type Category = 'Abnormal' | 'Warning' | 'Normal';

interface Notification {
  id: string;
  patientName: string;
  patientId: string;
  gender: 'Male' | 'Female';
  age: number;
  vitalType: VitalType;
  vitalValue: string;
  message: string;
  category: Category;
  timestamp: string;
  date: string;
}

// Generate demo notification data
const generateNotificationData = (): Notification[] => {
  const notifications: Notification[] = [
    {
      id: '1',
      patientName: 'Kailash Chaurasia',
      patientId: '213',
      gender: 'Male',
      age: 71,
      vitalType: 'SpO2',
      vitalValue: '83 %',
      message: 'SpO2 lower than the normal range.',
      category: 'Abnormal',
      timestamp: '10:20:32 PM',
      date: '2 Feb'
    },
    {
      id: '2',
      patientName: 'Ramesh Gupta',
      patientId: '100',
      gender: 'Male',
      age: 53,
      vitalType: 'Respiration',
      vitalValue: '5 rpm',
      message: 'Respiration Rate lower than the normal range.',
      category: 'Abnormal',
      timestamp: '10:20:32 PM',
      date: '2 Feb'
    },
    {
      id: '3',
      patientName: 'Rita Gupta',
      patientId: '216',
      gender: 'Female',
      age: 39,
      vitalType: 'Heart Rate',
      vitalValue: '160 bpm',
      message: 'Heart Rate higher than the normal range.',
      category: 'Abnormal',
      timestamp: '10:20:32 PM',
      date: '2 Feb'
    },
    {
      id: '4',
      patientName: 'Renuka Gupta',
      patientId: '321',
      gender: 'Female',
      age: 65,
      vitalType: 'Temperature',
      vitalValue: '102 °F',
      message: 'Temperature higher than the normal range.',
      category: 'Warning',
      timestamp: '10:20:32 PM',
      date: '2 Feb'
    },
    {
      id: '5',
      patientName: 'Jeevan Keshari',
      patientId: '526',
      gender: 'Male',
      age: 54,
      vitalType: 'SpO2',
      vitalValue: '92 %',
      message: 'SpO2 lower than the normal range.',
      category: 'Abnormal',
      timestamp: '10:20:32 PM',
      date: '2 Feb'
    },
    // Add more sample data
    {
      id: '6',
      patientName: 'Sunil Kumar',
      patientId: '433',
      gender: 'Male',
      age: 48,
      vitalType: 'ECG',
      vitalValue: 'Irregular',
      message: 'ECG showing irregular pattern.',
      category: 'Abnormal',
      timestamp: '09:45:12 PM',
      date: '2 Feb'
    },
    {
      id: '7',
      patientName: 'Priya Sharma',
      patientId: '621',
      gender: 'Female',
      age: 42,
      vitalType: 'Heart Rate',
      vitalValue: '135 bpm',
      message: 'Heart Rate higher than the normal range.',
      category: 'Warning',
      timestamp: '11:10:24 PM',
      date: '2 Feb'
    },
    {
      id: '8',
      patientName: 'Mohan Raj',
      patientId: '315',
      gender: 'Male',
      age: 67,
      vitalType: 'ECG',
      vitalValue: 'ST Elevation',
      message: 'ECG showing ST elevation.',
      category: 'Abnormal',
      timestamp: '08:30:46 PM',
      date: '2 Feb'
    },
    {
      id: '9',
      patientName: 'Anita Verma',
      patientId: '542',
      gender: 'Female',
      age: 59,
      vitalType: 'Respiration',
      vitalValue: '8 rpm',
      message: 'Respiration Rate lower than the normal range.',
      category: 'Warning',
      timestamp: '07:15:38 PM',
      date: '2 Feb'
    }
  ];
  
  return notifications;
};

const NotificationsPanel: React.FC = () => {
  // Filter state
  const [selectedVitalType, setSelectedVitalType] = useState<string | null>(null);
  
  // Get notifications data
  const allNotifications = useMemo(() => generateNotificationData(), []);
  
  // Filter notifications based on selected vital type
  const filteredNotifications = useMemo(() => {
    if (!selectedVitalType || selectedVitalType === 'ALL') {
      return allNotifications;
    }
    return allNotifications.filter(notification => notification.vitalType === selectedVitalType);
  }, [allNotifications, selectedVitalType]);

  // Count notifications by type for the filter buttons
  const notificationCounts = useMemo(() => {
    const counts = {
      ALL: allNotifications.length,
      'Heart Rate': 0,
      ECG: 0,
      Respiration: 0,
      Temperature: 0,
      SpO2: 0
    };
    
    allNotifications.forEach(notification => {
      counts[notification.vitalType] += 1;
    });
    
    return counts;
  }, [allNotifications]);

  // Define columns for the table
  const columns = useMemo<ColumnDef<Notification>[]>(() => [
    {
      id: 'patient',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="whitespace-nowrap"
        >
          Patient
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const notification = row.original;
        return (
          <div className="flex flex-col">
            <div className="font-medium">{notification.patientName}</div>
            <div className="text-sm text-muted-foreground">
              {notification.gender}, {notification.age} years
            </div>
            <div className="text-sm text-muted-foreground">
              Patient ID: # {notification.patientId}
            </div>
          </div>
        );
      },
      sortingFn: (rowA, rowB) => {
        return rowA.original.patientName.localeCompare(rowB.original.patientName);
      },
    },
    {
      id: 'notification',
      header: 'Notifications',
      cell: ({ row }) => {
        return (
          <div className="text-center">{row.original.message}</div>
        );
      },
    },
    {
      id: 'category',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="whitespace-nowrap"
        >
          Categories
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const category = row.original.category;
        const colorMap = {
          'Abnormal': 'bg-red-100 text-red-800',
          'Warning': 'bg-amber-100 text-amber-800',
          'Normal': 'bg-green-100 text-green-800'
        };
        const dotColor = {
          'Abnormal': 'text-red-600',
          'Warning': 'text-amber-600',
          'Normal': 'text-green-600'
        };

        return (
          <Badge variant="outline" className={`${colorMap[category]} border-none`}>
            <span className={`mr-1 ${dotColor[category]}`}>●</span> {category}
          </Badge>
        );
      },
      sortingFn: (rowA, rowB) => {
        return rowA.original.category.localeCompare(rowB.original.category);
      },
    },
    {
      id: 'vitalValue',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="whitespace-nowrap"
        >
          Vital Value
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const notification = row.original;
        return (
          <div className="flex flex-col items-center justify-center">
            <div className="font-medium">{notification.vitalType}</div>
            <div className="text-lg font-semibold">{notification.vitalValue}</div>
          </div>
        );
      },
      sortingFn: (rowA, rowB) => {
        return rowA.original.vitalType.localeCompare(rowB.original.vitalType);
      },
    },
    {
      id: 'recordingTime',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="whitespace-nowrap"
        >
          Recording Time
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const notification = row.original;
        return (
          <div className="flex flex-col items-center justify-center">
            <div className="font-medium">{notification.timestamp}</div>
            <div className="text-sm text-muted-foreground">{notification.date}</div>
          </div>
        );
      },
    },
    {
      id: 'vitalTrend',
      header: 'Vital Trendline',
      cell: () => {
        return (
          <div className="flex justify-center">
            <BarChart2 className="h-8 w-8 text-teal-500" />
          </div>
        );
      },
    },
  ], []);

  const filterButtons = [
    { id: 'ALL', label: 'ALL', count: notificationCounts.ALL, icon: null },
    { id: 'Heart Rate', label: 'Heart Rate', count: notificationCounts['Heart Rate'], icon: HeartRate },
    { id: 'ECG', label: 'ECG', count: notificationCounts.ECG, icon: ECG },
    { id: 'Respiration', label: 'Respiration', count: notificationCounts.Respiration, icon: Respiration },
    { id: 'Temperature', label: 'Temperature', count: notificationCounts.Temperature, icon: Temperature },
    { id: 'SpO2', label: 'SpO2', count: notificationCounts.SpO2, icon: SpO2 }
  ];  

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-semibold mb-6">Notification Panel</h1>
      
      {/* Filter buttons */}
      {/* <div className="flex flex-wrap gap-3 mb-8">
        <Button 
          variant={selectedVitalType === null || selectedVitalType === 'ALL' ? "default" : "outline"}
          onClick={() => setSelectedVitalType('ALL')}
          className={`rounded-full ${selectedVitalType === null || selectedVitalType === 'ALL' ? 'bg-teal-500 hover:bg-teal-600' : ''} px-6`}
        >
          ALL ({notificationCounts.ALL})
        </Button>
        <Button 
          variant={selectedVitalType === 'Heart Rate' ? "default" : "outline"}
          onClick={() => setSelectedVitalType('Heart Rate')}
          className={`rounded-full ${selectedVitalType === 'Heart Rate' ? 'bg-teal-500 hover:bg-teal-600' : ''}`}
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 12H18L15 21L9 3L6 12H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Heart Rate [{notificationCounts['Heart Rate']}]
        </Button>
        <Button 
          variant={selectedVitalType === 'ECG' ? "default" : "outline"}
          onClick={() => setSelectedVitalType('ECG')}
          className={`rounded-full ${selectedVitalType === 'ECG' ? 'bg-teal-500 hover:bg-teal-600' : ''}`}
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 12H6L9 3L15 21L18 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          ECG [{notificationCounts.ECG}]
        </Button>
        <Button 
          variant={selectedVitalType === 'Respiration' ? "default" : "outline"}
          onClick={() => setSelectedVitalType('Respiration')}
          className={`rounded-full ${selectedVitalType === 'Respiration' ? 'bg-teal-500 hover:bg-teal-600' : ''}`}
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C16.9706 22 21 17.9706 21 13C21 8.02944 16.9706 4 12 4C7.02944 4 3 8.02944 3 13C3 17.9706 7.02944 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 14C9.10457 14 10 12.8807 10 11.5C10 10.1193 9.10457 9 8 9C6.89543 9 6 10.1193 6 11.5C6 12.8807 6.89543 14 8 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 14C17.1046 14 18 12.8807 18 11.5C18 10.1193 17.1046 9 16 9C14.8954 9 14 10.1193 14 11.5C14 12.8807 14.8954 14 16 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M15.5 17C15.5 17 14.5 18 12 18C9.5 18 8.5 17 8.5 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Respiration [{notificationCounts.Respiration}]
        </Button>
        <Button 
          variant={selectedVitalType === 'Temperature' ? "default" : "outline"}
          onClick={() => setSelectedVitalType('Temperature')}
          className={`rounded-full ${selectedVitalType === 'Temperature' ? 'bg-teal-500 hover:bg-teal-600' : ''}`}
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 9V14M12 14L14 12M12 14L10 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 4C11.4477 4 11 4.44772 11 5V14.6972C9.7983 15.3478 9 16.4881 9 17.7C9 19.5225 10.4775 21 12.3 21C14.1225 21 15.6 19.5225 15.6 17.7C15.6 16.4881 14.8017 15.3478 13.6 14.6972V5C13.6 4.44772 13.1523 4 12.6 4H12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Temperature [{notificationCounts.Temperature}]
        </Button>
        <Button 
          variant={selectedVitalType === 'SpO2' ? "default" : "outline"}
          onClick={() => setSelectedVitalType('SpO2')}
          className={`rounded-full ${selectedVitalType === 'SpO2' ? 'bg-teal-500 hover:bg-teal-600' : ''}`}
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
            <path d="M8 12C8 9.79086 9.79086 8 12 8V16C9.79086 16 8 14.2091 8 12Z" stroke="currentColor" strokeWidth="2"/>
          </svg>
          SpO2 [{notificationCounts.SpO2}]
        </Button>
      </div> */}


      <div className="flex gap-3 mb-8">
        {filterButtons.map((button) => (
          <Button 
            key={button.id}
            variant="outline"
            onClick={() =>
              setSelectedVitalType(button.id === 'ALL' ? null : button.id)
            }
            className={`
              rounded-[100px] bg-[#F5F5F5] shadow-inner-sm border px-5 py-2 flex items-center gap-2
              ${(selectedVitalType === button.id || (button.id === 'ALL' && selectedVitalType === null))
                ? 'bg-teal-500 text-white border-teal-500 hover:bg-teal-600 hover:text-white hover:border-teal-600'
                : 'text-gray-700 border-gray-200 hover:bg-gray-100'}
            `}
          >
            {button.icon && (
              <img
                src={button.icon}
                alt={button.label}
                className={`w-6 h-6 ${(selectedVitalType === button.id || (button.id === 'ALL' && selectedVitalType === null)) ? 'bg-white rounded' : ''}`}
              />
            )}
            {button.label} ({button.count})
          </Button>
        ))}
      </div>


      
      {/* Table */}
      <CustomReactTable
        data={filteredNotifications}
        columns={columns}
        showSearch={false}
        searchPlaceholder="Search notifications..."
      />
    </div>
  );
};

export default NotificationsPanel;