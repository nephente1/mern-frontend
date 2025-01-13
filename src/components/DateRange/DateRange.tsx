import React, { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { addDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, subMonths } from 'date-fns';
import { pl } from 'date-fns/locale';
import "./DateRange.styles.css"

interface DateRangeProps {
  setDateRange: (range: { start: string; end: string }) => void;
}

export const DateRange: React.FC<DateRangeProps> = ({ setDateRange }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showDateRange, setShowDateRange] = useState(false);

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
    setDateRange({
      start: date ? date.toLocaleDateString('en-CA') : '',
      end: endDate ? endDate.toLocaleDateString('en-CA') : '',
    });
  };

  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date);
    setDateRange({
      start: startDate ? startDate.toLocaleDateString('en-CA') : '',
      end: date ? date.toLocaleDateString('en-CA') : '',
    });
  };

  const handleResetStartDate = () => {
    setDateRange({start: null, end: endDate ? endDate.toLocaleDateString('en-CA') : ''});
    setStartDate(null)
  };

  const handleResetEndDate = () => {
    setDateRange({start: startDate ? startDate.toLocaleDateString('en-CA') : '', end: null});
    setEndDate(null)
  }

  const setCustomDateRange = () => {
    setDateRange({start: startDate ? startDate.toLocaleDateString('en-CA') : '', end: endDate ? endDate.toLocaleDateString('en-CA') : ''});
  }

  const shortcutsItems = [
    {
      label: 'All',
      onClick: (setDateRange) => {
        setDateRange({ start: null, end: null });
      },
    },
    {
      label: 'This Week',
      onClick: (setDateRange) => {
        const today = new Date();
        setDateRange({
          start:  startOfWeek(today, { weekStartsOn: 1 }).toLocaleDateString('en-CA'),
          end: endOfWeek(today, { weekStartsOn: 1 }).toLocaleDateString('en-CA'),
        });
      },
    },
    {
      label: 'Last Week',
      onClick: (setDateRange) => {
        const today = new Date();
        const prevWeek = addDays(today, -7);
        setDateRange({
          start: startOfWeek(prevWeek, { weekStartsOn: 1 }).toLocaleDateString('en-CA'),
          end: endOfWeek(prevWeek, { weekStartsOn: 1 }).toLocaleDateString('en-CA'),
        });
      },
    },
    {
      label: 'Last 7 Days',
      onClick: (setDateRange) => {
        const today = new Date();
        setDateRange({
          start: addDays(today, -7).toLocaleDateString('en-CA'),
          end: today.toLocaleDateString('en-CA'),                
        });
      },
    },
    {
      label: 'Current Month',
      onClick: (setDateRange) => {
        const today = new Date();
        setDateRange({
          start: startOfMonth(today).toLocaleDateString('en-CA'),
          end: endOfMonth(today).toLocaleDateString('en-CA'),
        });
      },
    },
    {
      label: 'Last Month',
      onClick: (setDateRange) => {
        const today = new Date();
        const firstDayOfLastMonth = startOfMonth(subMonths(today, 1)); // Początek poprzedniego miesiąca
        const lastDayOfLastMonth = endOfMonth(subMonths(today, 1));   // Koniec poprzedniego miesiąca
    
        setDateRange({
          start: firstDayOfLastMonth.toLocaleDateString('en-CA'), // Format 'YYYY-MM-DD'
          end: lastDayOfLastMonth.toLocaleDateString('en-CA'),    // Format 'YYYY-MM-DD'
        });
      },
    },
    {
      label: 'Set Custom Date Range',
      onClick: (setShowDateRange) => {
        setShowDateRange(!showDateRange);
      },
    },
  ];

  return (
    <>
      <div>
        <div>Show workouts by:</div>
        <div className="flex functional">
        {shortcutsItems.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                if (item.label === 'Set Custom Date Range') {
                  item.onClick(setShowDateRange);
                } else {
                  item.onClick(setDateRange);  setShowDateRange(false)
                }
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div>
      {showDateRange && <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={pl}>
        <div>Choose custom date range:</div>
        <div className="flex">
          <DatePicker className='custom-datepicker'
            format="dd/MM/yyyy"
            label="Start Date"
            value={startDate}
            onChange={handleStartDateChange}
            slotProps={{
              textField: {
                size: 'small',
              },
              actionBar: {
                actions: ['clear'],
              },
            }}
          />
          {startDate && (
              <div onClick={handleResetStartDate} className="material-symbols-outlined butonIconStyle">cancel</div>
          )}
          
          <DatePicker
            format="dd/MM/yyyy"
            className='custom-datepicker'
            label="End Date"
            value={endDate}
            onChange={handleEndDateChange}
            slotProps={{
              textField: {
                size: 'small',
              },
              actionBar: {
                actions: ['clear'],
              },
            }}
          />
          {endDate && (
              <div onClick={handleResetEndDate} className="material-symbols-outlined butonIconStyle">cancel</div>
          )}

          <button
            onClick={setCustomDateRange}
            disabled={!endDate}
          >
            Set
          </button>
        </div>
      </LocalizationProvider>}
      </div>
    </>
  );
};
