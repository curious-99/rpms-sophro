// import React from "react";

// interface VitalCardProps {
//   title: string;
//   value: string | number;
//   unit?: string;
//   status: "Normal" | "Warning" | "Abnormal";
//   icon?: React.ReactNode;
//   onClick?: () => void;
//   selected?: boolean;
// }

// const VitalCard: React.FC<VitalCardProps> = ({
//   title,
//   value,
//   unit,
//   status,
//   icon: Icon,
//   onClick,
//   selected,
// }) => {
//   const getStatusStyle = (status: string) => {
//     switch (status) {
//       case "Normal":
//         return "bg-green-100 text-green-800";
//       case "Warning":
//         return "bg-yellow-100 text-yellow-800";
//       case "Abnormal":
//         return "bg-red-100 text-red-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   return (
//     <div
//       onClick={onClick}
//       className={`
//         cursor-pointer rounded-md p-3 shadow-sm transition-colors hover:shadow-md
//         ${selected ? "bg-teal-500 text-white" : "bg-white text-gray-900"}
//       `}
//     >
//       {/* Top row: Icon/Title on the left */}
//       <div className="mb-2 flex items-center">
//         {Icon && (
//           <div
//             className="
//               flex h-10 w-10 items-center justify-center rounded bg-[#F9FAFB] p-1
//               shadow-[1px_1px_12px_0px_rgba(0,0,0,0.10)]
//             "
//           >
//             <img className="h-8 w-8" src={Icon} alt={title} />
//           </div>
//         )}
//         <span className="ml-2 font-lato font-bold text-[16px] leading-[24px] text-[#2A3F4D]">
//           {title}
//         </span>
//       </div>

//       {/* Bottom row: Value & Status side by side */}
//       <div className="flex justify-between items-center">
//         <div className="text-[15px] font-bold text-[#2A3F4D]">
//           {value}
//           {unit && <span className="ml-1 text-[15px] text-[#2A3F4D]">{unit}</span>}
//         </div>
//         <span
//           className={`
//             rounded-full px-2 py-1 text-xs
//             ${selected
//               ? "bg-white/20 text-white"
//               : getStatusStyle(status)
//             }
//           `}
//         >
//           {status}
//         </span>
//       </div>
//     </div>
//   );
// };

// export default VitalCard;

import React from 'react';

interface VitalCardProps {
  title: string;
  value: string | number;
  unit?: string;
  status: 'Normal' | 'Warning' | 'Abnormal';
  icon?: React.ReactNode;
  onClick?: () => void;
  selected?: boolean;
}

const VitalCard: React.FC<VitalCardProps> = ({
  title,
  value,
  unit,
  status,
  icon: Icon,
  onClick,
  selected,
}) => {
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Normal':
        return 'bg-green-100 text-green-800';
      case 'Warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'Abnormal':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div
      onClick={onClick}
      className={`
        cursor-pointer rounded-md p-3 shadow-sm transition-colors hover:shadow-md 
        ${selected ? 'bg-teal-500 text-white' : 'bg-white text-gray-900'}
      `}
      style={{
        boxShadow: `1px 1px 4px 0px rgba(0, 0, 0, 0.25) inset, 1px 1px 4px 0px rgba(0, 0, 0, 0.25)`,
      }}
    >
      {/* Top row: Icon/Title on the left */}
      <div className="mb-2 flex items-center">
        {Icon && (
          <div
            className="
              flex h-10 w-10 items-center justify-center rounded bg-[#F9FAFB] p-1 
              shadow-[1px_1px_12px_0px_rgba(0,0,0,0.10)]
            "
          >
            <img className="h-8 w-8" src={Icon} alt={title} />
          </div>
        )}
        <span
          className={`ml-2 font-lato font-bold text-[16px] leading-[24px] ${selected ? 'text-white' : 'text-[#2A3F4D]'}`}
        >
          {title}
        </span>
      </div>

      {/* Bottom row: Value & Status side by side */}
      <div className="flex justify-between items-center">
        <div
          className={`text-[15px] font-bold ${selected ? 'text-white' : 'text-[#2A3F4D]'}`}
        >
          {value}
          {unit && (
            <span
              className={`ml-1 text-[15px] ${selected ? 'text-white' : 'text-[#2A3F4D]'}`}
            >
              {unit}
            </span>
          )}
        </div>
        <span
          className={`
            rounded-full px-2 py-1 text-xs
            ${selected ? 'bg-white/20 text-white' : getStatusStyle(status)}
          `}
        >
          {status}
        </span>
      </div>
    </div>
  );
};

export default VitalCard;
