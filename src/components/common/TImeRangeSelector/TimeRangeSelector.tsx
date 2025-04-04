import { cn } from '@/lib/utils';
import { timeRanges } from '../Chart/Charts';
import { Button } from '@/components/ui/Button';
import Download from '../../../assets/icons/Download.svg';

interface TimeRangeSelectorProps {
  selectedRange: { label: string; days: number };
  setSelectedRange: (range: { label: string; days: number }) => void;
}

const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({
  selectedRange,
  setSelectedRange,
}) => {
  return (
    <div
      className="flex justify-between items-center mb-4"
      style={{ padding: '8px' }}
    >
      <div className="flex gap-2">
        {timeRanges.map((range) => (
          <button
            key={range.label}
            onClick={() => setSelectedRange(range)}
            className={cn(
              'px-4 py-2 rounded-md transition-all text-sm font-medium',
              selectedRange.label === range.label
                ? 'bg-[#CCFBF1] text-teal-800 border border-[#14B8A6]'
                : 'bg-transparent hover:bg-gray-50'
            )}
          >
            {range.label}
          </button>
        ))}
      </div>
      <Button
        variant="outline"
        className="!w-auto gap-2 px-2 py-1 bg-white hover:bg-gray-50 hover:border-gray-400"
        style={{
          borderRadius: '5px',
          border: '1px solid #9CA3AF',
        }}
      >
        <img src={Download} alt="Download" className="w-6 h-6" />
        <span className="font-bold text-sm">Export PDF</span>
      </Button>

    </div>
  );
};

export default TimeRangeSelector;
