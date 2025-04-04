import React, { useState } from 'react';
import {
  DateRangePicker,
  Range,
  createStaticRanges,
} from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

import { Button } from '../../ui/Button';
import RightArrow from '../../../assets/icons/arrow-right-black.svg';
import { enGB } from 'date-fns/locale';

interface PatientInfoProps {
  name: string;
  id: string;
  image: string;
  onDateChange?: (date: { startDate: Date; endDate: Date }) => void;
}

const PatientInfo: React.FC<PatientInfoProps> = ({
  name,
  id,
  image,
  onDateChange,
}) => {
  const [selection, setSelection] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });

  const [showCalendar, setShowCalendar] = useState(false);

  const today = new Date();
  const threeMonthsAgo = new Date(new Date().setMonth(new Date().getMonth() - 3));

  // Disable arrows if boundaries reached
  const disablePrevious = selection.startDate <= threeMonthsAgo;
  const disableNext = selection.endDate >= today;

  const handleDateChange = (ranges: { [key: string]: Range }) => {
    const newSelection = ranges.selection;
    setSelection(newSelection);
    onDateChange?.({
      startDate: newSelection.startDate || new Date(),
      endDate: newSelection.endDate || new Date(),
    });
  };

  const changeDateByDays = (days: number) => {
    const newStartDate = new Date(selection.startDate);
    newStartDate.setDate(newStartDate.getDate() + days);
    const newEndDate = new Date(selection.endDate);
    newEndDate.setDate(newEndDate.getDate() + days);

    // Prevent moving out of the allowed range
    if (newStartDate < threeMonthsAgo || newEndDate < threeMonthsAgo) return;
    if (newStartDate > today || newEndDate > today) return;

    setSelection({
      startDate: newStartDate,
      endDate: newEndDate,
      key: 'selection',
    });
  };

  const formattedDate =
    selection.startDate.getTime() === selection.endDate.getTime()
      ? selection.startDate.toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })
      : `${selection.startDate.toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })} - ${selection.endDate.toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })}`;

  return (
    <div className="inline-flex justify-start items-center gap-[100px] relative">
      {/* Patient Details */}
      <div className="h-[85px] flex justify-center items-end gap-4 ml-1">
        <img
          className="w-[85px] h-[85px] border border-gray-200"
          src={image || 'https://placehold.co/85x85'}
          alt={name}
        />
        <div className="flex flex-col justify-center items-start gap-[7px]">
          <div className="text-black text-3xl font-medium leading-9">
            {name}
          </div>
          <div className="text-gray-600 text-lg font-medium leading-7">
            Patient ID: #{id}
          </div>
        </div>
      </div>

      {/* Date Selector */}
      <div className="p-3 bg-white rounded-lg shadow-md flex justify-between items-center gap-6 relative">
        <Button
          variant="ghost"
          className="p-2"
          onClick={() => changeDateByDays(-1)}
          disabled={disablePrevious}
        >
          <img
            src={RightArrow}
            className="rotate-180 h-6 w-6"
            alt="Previous"
          />
        </Button>

        <div
          className={`flex flex-row justify-center items-center gap-1 
                      text-[#051b44] text-base font-semibold cursor-pointer 
                      text-center whitespace-nowrap transition-all 
                      ${formattedDate.includes('-') ? 'min-w-[180px]' : 'min-w-[100px]'}`}
          onClick={() => setShowCalendar(!showCalendar)}
        >
          {formattedDate}
        </div>

        <Button
          variant="ghost"
          className="p-2"
          onClick={() => changeDateByDays(1)}
          disabled={disableNext}
        >
          <img src={RightArrow} alt="Next" className="h-6 w-6" />
        </Button>

        {showCalendar && (
          <div className="absolute top-full left-[-50px] mt-2 z-50 bg-white shadow-2xl rounded-lg p-4 border border-gray-200 transform -translate-x-[10%]">
            <DateRangePicker
              className="custom-date-range-picker"
              locale={enGB}
              ranges={[selection]}
              onChange={handleDateChange}
              showSelectionPreview={true}
              moveRangeOnFirstSelection={false}
              rangeColors={['#14B8A6']}
              months={2}
              direction="horizontal"
              maxDate={today}
              minDate={threeMonthsAgo}
            />

            <div className="flex justify-end mt-4">
              <Button
                variant="primary"
                onClick={() => setShowCalendar(false)}
                className="px-4 py-2"
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientInfo;
