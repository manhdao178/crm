import React, { useEffect, useState } from 'react';
import { CalendarCell } from '../CalendarCell';
import moment from 'moment';
import { useGetCalendar } from 'hooks/calendar/useGetCalendar';
import eventEmitter from 'helpers/eventEmitter';
import useFilters from 'hooks/useFilters';
import { isDayContainCurrentEvent } from 'helpers';

export const MonthDaysList = ({
  startDay,
  endDay,
  totalDays,
  events,
  openFormHandler,
  today,
  setDisplayMode,
  dataCalendar,
}) => {
  const [dataCalen, setDataCalen] = useState([]);

  useEffect(() => {
    setDataCalen(dataCalendar);
  }, [dataCalendar]);

  const day = startDay.clone().subtract(1, 'day');
  const daysMap = (dataCalen || []).map((e) => {
    const date = moment(e.label, 'DD/MM/YY');
    const dataBook = Array(e.value);
    return { date, dataBook };
  });

  const startDate = moment(startDay).toISOString();
  const endDate = moment(endDay).toISOString();

  const initialFilters = {
    startDate: startDate,
    endDate: endDate,
    searchText: '',
  };

  const { filters, setFilters, handleChangePage, handleSelect, handleSelectAll, handleSearch } =
    useFilters(initialFilters);

  // const { data, isLoading, error, refetch } = useGetCalendar(filters);
  // const daysMapw = [...Array(totalDays)]
  //   .map(() => day.add(1, 'day').clone())
  //   .map((cur) => {
  //     const dataBook = data?.data?.data?.[moment(cur).toISOString()];
  //     return { date: cur, dataBook };
  //   });

  useEffect(() => {
    setFilters((prev) => {
      return {
        ...prev,
        project: localStorage.getItem('service'),
      };
    });
  }, []);

  useEffect(() => {
    eventEmitter.addListener('refetchCalendar', (data) => {
      refetch();
    });

    return () => {
      eventEmitter.removeAllListeners(['refetchCalendar']);
    };
  }, []);

  // return null;

  return daysMap.map((dayItem, index) => (
    <CalendarCell
      key={index}
      today={today}
      events={events.filter((event) => isDayContainCurrentEvent(event, dayItem))}
      openFormHandler={openFormHandler}
      dayItem={dayItem?.date}
      setDisplayMode={setDisplayMode}
      data={dayItem}
    />
  ));
};
