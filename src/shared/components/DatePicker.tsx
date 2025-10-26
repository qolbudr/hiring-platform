import { Icon } from "@iconify/react";
import classNames from "classnames";
import React, { useState } from "react";

interface DatePickerProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  date?: Date;
  error?: string;
  disabled?: boolean;
  onChangeDate?: (date: Date) => void;
}

export const DatePicker: React.FC<DatePickerProps> = ({ date, onChangeDate, ...props }) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(date);
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState<number>(
    date ? date.getMonth() : new Date().getMonth(),
  );
  const [currentYear, setCurrentYear] = useState<number>(
    date ? date.getFullYear() : new Date().getFullYear(),
  );

  const className = classNames({
    'border-red-500 hover:border-red-600 focus:border-red-500': props.error,
    'bg-neutral-30 cursor-not-allowed': props.disabled,
  },
    `w-full flex items-center text-m cursor-pointer border-2 bg-white border-neutral-40 rounded-md py-2 px-4 outline-none hover:border-primary-focus focus:border-primary transition-colors duration-200`
  )

  const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];

  const daysInMonth = (month: number, year: number) =>
    new Date(year, month + 1, 0).getDate();

  const firstDayOfMonth = (month: number, year: number) =>
    new Date(year, month, 1).getDay();

  const handleDateClick = (day: number) => {
    const newDate = new Date(currentYear, currentMonth, day);
    setSelectedDate(newDate);
    onChangeDate?.(newDate);
    setShowCalendar(false);
  };

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const prevYear = () => setCurrentYear(currentYear - 1);
  const nextYear = () => setCurrentYear(currentYear + 1);

  const renderCalendarDays = () => {
    const totalDays = daysInMonth(currentMonth, currentYear);
    const startDay = firstDayOfMonth(currentMonth, currentYear);
    const blanks = Array(startDay).fill(null);
    const days = Array.from({ length: totalDays }, (_, i) => i + 1);

    return [...blanks, ...days].map((day, idx) => {
      if (day === null)
        return <div key={idx} className="text-gray-400 text-center p-2" />;
      const isSelected =
        selectedDate &&
        day === selectedDate.getDate() &&
        currentMonth === selectedDate.getMonth() &&
        currentYear === selectedDate.getFullYear();
      return (
        <div
          key={idx}
          className={`justify-center p-2 size-10 flex items-center rounded-full cursor-pointer hover:bg-primary/30 ${isSelected ? "bg-primary hover:bg-primary/90 text-white" : ""
            }`}
          onClick={() => handleDateClick(day)}
        >
          {day}
        </div>
      );
    });
  };

  return (
    <div className="relative inline-block w-full">
      {props.label && <label className="block mb-2 text-s font-normal">{props.label} {props.required ? <span className="text-red-500">*</span> : null} </label>}

      <div
        className={className}
        onClick={() => setShowCalendar(!showCalendar)}
      >
        <span className="mr-2">
          <Icon icon="uil:calendar-alt" className="size-4 inline mb-1 text-gray-600" />
        </span>
        <span className="text-gray-600">
          {selectedDate
            ? selectedDate.toLocaleString("default", { month: "long", day: "2-digit", year: "numeric" })
            : "Select your date of birth"}
        </span>
      </div>

      {showCalendar && (
        <div className="absolute mt-2 p-4 bg-white border border-neutral-40 rounded-xl shadow-md z-50">
          <div className="flex justify-between items-center mb-2">
            <div className="flex space-x-2">
              <button onClick={prevYear} className="size-6 cursor-pointer">
                <Icon className="size-6" icon="uil:angle-double-left" />
              </button>
              <button onClick={prevMonth} className="size-6 cursor-pointer">
                <Icon className="size-6" icon="uil:angle-left" />
              </button>
            </div>
            <div className="font-bold text-l">
              {new Date(currentYear, currentMonth).toLocaleString("default", {
                month: "short",
              })}{" "}
              {currentYear}
            </div>
            <div className="flex space-x-2">
              <button onClick={nextMonth} className="size-6 cursor-pointer">
                <Icon className="size-6" icon="uil:angle-right" />
              </button>
              <button onClick={nextYear} className="size-6 cursor-pointer">
                <Icon className="size-6" icon="uil:angle-double-right" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 text-m font-medium text-gray-600 mb-1 mt-6">
            {daysOfWeek.map((d, index) => (
              <div key={index} className="text-m text-center font-bold">
                {d}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1 text-m">
            {renderCalendarDays()}
          </div>
        </div>
      )}
    </div>
  );
};
