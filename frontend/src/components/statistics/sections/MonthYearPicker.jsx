import React, { useState, useEffect } from 'react';
import TextField from "@material-ui/core/TextField";
import DatePicker from "@material-ui/lab/DatePicker";
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';

function MonthYearPicker(props) {

  const [datePath, setDatePath] = useState("");
  const [value, setValue] = useState(new Date());

  const sendDate = (date) => {
    props.getSelectedDate(date);
  }

  const handleDateChange = (newValue) => {
    setValue(newValue);
    sendDate(newValue);
  }

  const convertId2Date = (dateObject) => {
    const year = dateObject.substring(0, 4)
    const month = dateObject.substring(4, 6)
    const result = new Date(year + "/" + month);

    handleDateChange(result)
  }

  useEffect(() => {
    setDatePath(props.datePath)
    convertId2Date(props.datePath)

  }, [datePath])

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          views={["year", "month"]}
          label="Year and Month"
          minDate={new Date("2012-03-01")}
          maxDate={new Date()}
          value={value}
          onChange={(newValue) => {
            handleDateChange(newValue);
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} helperText={null} />}
        />
    </LocalizationProvider>
  );
}

export default MonthYearPicker;