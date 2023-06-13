// import React, { useState } from 'react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

// interface DateTimePickerProps {
//   onButtonClick: (date: Date, time: Date) => void;
// }

// const DateTimePicker: React.FC<DateTimePickerProps> = ({ onButtonClick }) => {
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [selectedTime, setSelectedTime] = useState(new Date());

//   const handleDateChange = (date: Date) => {
//     setSelectedDate(date);
//   };

//   const handleTimeChange = (time: Date) => {
//     setSelectedTime(time);
//   };

//   const handleClick = () => {
//     onButtonClick(selectedDate, selectedTime);
//   };

//   return (
//     <div className='flex gap-2 w-52 justify-start'>
//       <DatePicker
//         selected={selectedDate}
//         onChange={handleDateChange}
//         dateFormat="MMMM d, yyyy"
//         className=''
//       />
//       <DatePicker
//         selected={selectedTime}
//         onChange={handleTimeChange}
//         showTimeSelect
//         showTimeSelectOnly
//         timeIntervals={15}
//         timeCaption="Time"
//         dateFormat="h:mm aa"
//       />

//     </div>
//   );
// };

// export default DateTimePicker;
