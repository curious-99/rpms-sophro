import React from 'react';
import { Card, CardContent } from '../../ui/Card';

interface PatientStatsProps {
  age: number;
  weight: number;
  bmi: number;
  gender: string;
  height: number;
  bloodGroup: string;
}

const PatientStats: React.FC<PatientStatsProps> = ({
  age,
  weight,
  bmi,
  gender,
  height,
  bloodGroup,
}) => {
  return (
    <div className="grid gap-1 md:grid-cols-3 bg-gray-100 p-4 rounded-lg">
      {[
        { label: 'Age', value: `${age} years` },
        { label: 'Weight', value: `${weight} kg` },
        { label: 'BMI', value: bmi },
        { label: 'Gender', value: gender },
        { label: 'Height', value: `${height} cm` },
        { label: 'Blood Group', value: bloodGroup },
      ].map((item, index) => (
        <Card
          key={index}
          className="transition-shadow duration-300 hover:shadow-xl"
          style={{
            boxShadow: '1px 1px 20px 0px rgba(0, 0, 0, 0.10)',
          }}
        >
          <CardContent className="p-2">
            <p className="text-sm text-[#4B5563] font-bold">{item.label}</p>
            <p className="text-lg font-medium">{item.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PatientStats;
