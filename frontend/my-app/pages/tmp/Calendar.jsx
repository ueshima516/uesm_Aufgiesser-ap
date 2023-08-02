// https://mui.com/x/react-date-pickers/date-calendar/#dynamic-data
// http://localhost:3000/tmp/Calendar/

import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

const today = dayjs(new Date());

function EachDay(props) { // 各日付に対して回るループ
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !props.outsideCurrentMonth && highlightedDays.includes(props.day.format('YYYY-MM-DD'));

  const handleDayClick = () => {
    if (!outsideCurrentMonth) {
      console.log(props.day.format('YYYY-MM-DD'));
    }
  };

  return (
    <Grid container alignItems='center' direction="column">
      <Grid item>
        < PickersDay
          {...other}
          outsideCurrentMonth={outsideCurrentMonth}
          day={day}
          onClick={handleDayClick}
        />
      </Grid>
      <Grid item minHeight={20}>
        {isSelected ? '😻' : undefined}
      </Grid>
    </Grid>
    // </Badge>
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
      <Box sx={{ height: "auto", overflow: "visible" }}>
        <DateCalendar
          defaultValue={today}
          onMonthChange={
            console.log("onMonthChange invoked!")
          }
          slots={{
            day: EachDay,
          }}
          slotProps={{
            day: {
              highlightedDays,
            },
          }}
          // sx={{
          //   width: 500,
          // }}
          // overflow: 'visible', height: 700
          //   , "&.MuiDateCalendar-root": {
          //     height: "100%",
          //     overflow: 'visible',
          //   }
          //   , "&.MuiDateCalendar-viewTransitionContainer": {
          //     height: "100%",
          //     overflow: 'visible',
          //   }
          // }}
        />
      </Box>
    </LocalizationProvider>
  );
}
export default DateCalendarServerRequest;