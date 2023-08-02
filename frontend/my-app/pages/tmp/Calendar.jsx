// https://mui.com/x/react-date-pickers/date-calendar/#dynamic-data

import * as React from 'react';
import dayjs from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
const today = dayjs(new Date());

function ServerDay(props) { // 各日付に対して回るループかも
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !props.outsideCurrentMonth && highlightedDays.includes(props.day.format('YYYY-MM-DD'));

  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={isSelected ? '😻' : undefined} //2つ以上だとはみ出す…最悪計画数を表す数字にするなど
    >
      <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
    </Badge>
  );
}

function DateCalendarServerRequest() {
  const requestAbortController = React.useRef(null);
  const [highlightedDays, setHighlightedDays] = React.useState([]);//ハイライトする日付


  React.useEffect(() => {
    setHighlightedDays(["2023-07-12", "2023-08-02", "2023-08-22"]); //ハイライトする日付を設定

    // abort request on unmount
    return () => requestAbortController.current?.abort();
  }, []);


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      カレンダーが小さすぎるよ～(;_;)
      <DateCalendar
        defaultValue={today}
        onMonthChange={
          console.log("onMonthChange invoked!")
        }
        slots={{
          day: ServerDay,
        }}
        slotProps={{
          day: {
            highlightedDays,
          },
        }}
      />
    </LocalizationProvider>
  );
}
export default DateCalendarServerRequest;