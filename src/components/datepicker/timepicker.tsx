'use client'

import React, { useState } from 'react';

interface TimePickerProps {
  // Add any additional props you may need
}

const TimePicker: React.FC<TimePickerProps> = () => {
  const [time, setTime] = useState<string>('');

  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const formattedHour = hour.toString().padStart(2, '0');
        const formattedMinute = minute.toString().padStart(2, '0');
        options.push(
          <option key={`${formattedHour}:${formattedMinute}`} value={`${formattedHour}:${formattedMinute}`}>
            {`${formattedHour}:${formattedMinute}`}
          </option>
        );
      }
    }
    return options;
  };

  return (
    <div className="flex bg-black items-center">
      <input
        className="border-2 border-gray-300 p-2 rounded-md"
        type="text"
        placeholder="hh:mm"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
      <select
        className="ml-4 border-2 border-gray-300 p-2 rounded-md"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      >
        <option value="" disabled>
          Select time
        </option>
        {generateTimeOptions()}
      </select>
    </div>
  );
};

export default TimePicker;
