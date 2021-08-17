import React, { useState, useEffect } from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
import "antd/dist/antd.css";

function MonthYearPicker(props) {

    const monthFormat = 'YYYY/MM';

    const [datePath, setDatePath] = useState("");
    const [selectedDate, setSelectedDate] = useState("");

    const sendDate = (date) => {
        props.getSelectedDate(date);
      }
    
      const handleDateChange = (date, dateString) => {

        setSelectedDate(dateString);
        sendDate(dateString)
      };

      const convertDate2Id = (dateObject) => {
        const year = dateObject.getFullYear() + "";
        const month = dateObject.getMonth() < 9 ? "0" + ((dateObject.getMonth() + 1) + "") : (dateObject.getMonth() + 1) + "";
        const result = year + '/' + month;

        return result
    }
    
      const convertId2Date = (dateObject) => {
        const year = dateObject.substring(0, 4)
        const month = dateObject.substring(4, 6)
        const result = year + "/" + month;

        handleDateChange(dateObject, result)
      }

      useEffect(() => {
        let date = convertDate2Id(new Date())
        setSelectedDate(date)
      }, [])
    
      useEffect(() => {
        setDatePath(props.datePath)
        convertId2Date(props.datePath)
      }, [datePath])

    return (
        <div>
            <DatePicker 
            value={moment(selectedDate, monthFormat)}
            // value={moment(selectedDate, monthFormat)}
            format={monthFormat} 
            picker="month" 
            onChange={handleDateChange} />
        </div>
    )
}

export default MonthYearPicker