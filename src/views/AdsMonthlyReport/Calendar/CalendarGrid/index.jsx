import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { CalendarGridHeader } from '../CalendarGridHeader';
import { MonthDaysList } from '../MonthDaysList';

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 1px;
  margin-top: 10px;
  &:last-child {
    color: 'red';
  }
`;

const CalendarGrid = ({ startDay, endDay, today, totalDays, events, openFormHandler, setDisplayMode, data }) => {
  return (
    <>
      <GridWrapper isHeader>
        <CalendarGridHeader />
      </GridWrapper>
      <GridWrapper>
        <MonthDaysList
          totalDays={totalDays}
          openFormHandler={openFormHandler}
          events={events}
          startDay={startDay}
          endDay={endDay}
          today={today}
          setDisplayMode={setDisplayMode}
          dataCalendar={data}
        />
      </GridWrapper>
    </>
  );
};

export { CalendarGrid };
