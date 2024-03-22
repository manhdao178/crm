import React, { useEffect } from 'react';
import { isDayContainCurrentEvent } from '../../helpers';
import { CalendarCell } from '../CalendarCell';
import moment from 'moment';
import { useGetCalendar } from 'hooks/calendar/useGetCalendar';
import eventEmitter from 'helpers/eventEmitter';
import useFilters from 'hooks/useFilters';
import httpServices from 'services/httpServices';

export const MonthDaysList = ({ startDay, endDay, totalDays, events, openFormHandler, today, setDisplayMode }) => {
  const day = startDay.clone().subtract(1, 'day');

  const startDate = moment(startDay).toISOString();
  const endDate = moment(endDay).toISOString();

  const initialFilters = {
    startDate: startDate,
    endDate: endDate,
    searchText: '',
  };

  const { filters, setFilters, handleChangePage, handleSelect, handleSelectAll, handleSearch } =
    useFilters(initialFilters);

  const { data, isLoading, error, refetch } = useGetCalendar(filters);

  const daysMap = [...Array(totalDays)]
    .map(() => day.add(1, 'day').clone())
    .map((cur) => {
      const dataBook = data?.data?.data?.[moment(cur).toISOString()];
      return { date: cur, dataBook };
    });

  useEffect(() => {
    setFilters((prev) => {
      return {
        ...prev,
        project: httpServices.getServiceStorage(),
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
