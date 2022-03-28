import { Button } from "@chakra-ui/react";
import { CalendarIcon } from "@heroicons/react/solid";
import { forwardRef } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePicker = ({
  selectedDate,
  onChange,
  isClearable = false,
  showPopperArrow = false,
  ...props
}) => {
  const CustomInputButton = forwardRef(({ value, onClick }, ref) => (
    <Button
      leftIcon={<CalendarIcon className="w-5 h-5" />}
      onClick={onClick}
      ref={ref}
      variant="outline"
    >
      {value}
    </Button>
  ));
  return (
    <ReactDatePicker
      selected={selectedDate ?? new Date()}
      todayButton="Today"
      onChange={onChange}
      minDate={new Date()}
      showTimeSelect
      showTimeInput
      dateFormat={"MM/dd/yyyy h:mm aa"}
      isClearable={isClearable}
      showPopperArrow={showPopperArrow}
      customInput={<CustomInputButton />}
      {...props}
    />
  );
};

export default DatePicker;
