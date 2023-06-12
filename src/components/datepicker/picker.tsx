'use client'

import { Fragment, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import CalendarComponent from "./calender";
import { format } from "date-fns";
import TimePicker from "./timepicker";


function formatDate(date: Date): string {
    return format(date, 'dd MMMM yyyy');
  }


  
 
export default function Picker() {
  const [open, setOpen] = useState(false);
  const [date,setDate] = useState<Date>();
  const [minutes, setminutes] = useState<number>();
  const [hours, sethours] = useState<number>();
 
  const handleOpen = () => {
    setOpen(!open)
    
};

  const handleConfirm = () => {
    console.log(`scheduled for ${formatDate(date || new Date())} at ${hours}:${minutes}`)
    handleOpen()
  }
  
 
  return (
    <Fragment>
      <span onClick={handleOpen} >
        {date ? formatDate(date) : "Pick Date"}
      </span>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Scheduled for {date ? formatDate(date):""} at </DialogHeader>
        <DialogBody divider>
          <CalendarComponent handleDate={setDate} />
          <TimePicker 
          Date={date || new Date()}
            onMinuteChange={setminutes}
            onHourChange={sethours}
          />
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleConfirm}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
}