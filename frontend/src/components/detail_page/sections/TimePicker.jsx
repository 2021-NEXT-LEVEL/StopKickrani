import 'date-fns';
import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

function TimePicker(props) {

  const [datePath, setDatePath] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());

  const sendDate = (date) => {
    props.getSelectedDate(date);
  }

  const handleDateChange = (date) => {
    setSelectedDate(date);
    sendDate(date)
  };

  const convertId2Date = (dateObject) => {
    const year = dateObject.substring(0, 4)
    const month = dateObject.substring(4, 6)
    const date = dateObject.substring(6, 8)
    const result = new Date(year + "/" + month + "/" + date);

    handleDateChange(result)
  }

  useEffect(() => {
    setDatePath(props.datePath)
    convertId2Date(props.datePath)

  }, [datePath])

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justifyContent="space-around">
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Choose a date"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}

export default TimePicker;