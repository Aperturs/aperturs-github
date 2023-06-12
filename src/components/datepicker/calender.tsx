'use client'
import { type FC, useEffect, useState } from 'react'
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';

interface CalendarProps {
// as ISO strings
}

const CalendarComponent: FC<CalendarProps> = ({ }) => {

    const [date, setDate] = useState<Date | undefined>()

    
  return (
    <div className='flex h-screen flex-col items-center justify-center'>

        <Calendar
          minDate={new Date()}
          className='REACT-CALENDAR p-2'
          view='month'
          onClickDay={(value) => {
            console.log(value)
            setDate(value)
          }}
          
        />
      
    </div>
  )
}

export default CalendarComponent