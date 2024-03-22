import React from 'react';
import { isCurrentDay, isSelectedMonth } from '../../helpers';
import { CellWrapper, RowInCell } from '../../containers/StyledComponents';
import styled from 'styled-components';
import { DISPLAY_MODE_DAY } from '../../helpers/constants';

const DayWrapper = styled.div`
  height: 31px;
  width: 31px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2px;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    background-color: #eee;
  }
  font-weight: 400 !important; ;
`;

const CurrentDay = styled('div')`
  height: 100%;
  width: 100%;
  background: #f1fefd;
  border-radius: 50%;
  border: 1px solid #2bdcf4;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ShowDayWrapper = styled('div')`
  display: flex;
  justify-content: center;
  &:nth-child(2) {
    color: red !important;
  }
`;

const EventListWrapper = styled('ul')`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const EventListItemWrapper = styled('li')`
  padding-left: 2px;
  padding-right: 2px;
  margin-bottom: 2px;
  display: flex;
`;

const EventItemWrapper = styled('button')`
  position: relative;
  flex-grow: 1;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 114px;
  border: unset;
  color: #dddddd;
  cursor: pointer;
  margin: 0;
  padding: 0;
  text-align: left;
  background-color: #5d5f63;
  border: 1px solid #5d5f63;
  border-radius: 2px;
`;

const ScheduleWrapper = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #f81d1d;
`;

const TitleSchedule = styled('div')`
  padding: 3px 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: ${(data) => (data?.dataBook?.length > 10 ? '#F81D1D' : '#CC970F')};
  background-color: ${(data) => (data?.dataBook?.length > 10 ? '#FFF0F0' : '#FFFCEA')};
  font-weight: 700;
  border-radius: 2px;
`;

export const CalendarCell = ({ dayItem, today, openFormHandler, events, setDisplayMode, data }) => {
  return (
    <CellWrapper
      isWeekday={dayItem.day() === 6 || dayItem.day() === 0}
      key={dayItem.unix()}
      isSelectedMonth={isSelectedMonth(dayItem, today)}
    >
      <RowInCell justifyContent={'flex-end'}>
        <ShowDayWrapper>
          <DayWrapper onClick={() => openFormHandler('Create', null, dayItem)}>
            {isCurrentDay(dayItem) ? <CurrentDay>{dayItem.format('D')}</CurrentDay> : dayItem.format('D')}
          </DayWrapper>
        </ShowDayWrapper>
        {data?.dataBook?.length ? (
          <ScheduleWrapper>
            <TitleSchedule>{data?.dataBook?.length} appointment</TitleSchedule>
          </ScheduleWrapper>
        ) : (
          ''
        )}
        <EventListWrapper>
          {events.slice(0, 2).map((event) => (
            <EventListItemWrapper key={event.id}>
              <EventItemWrapper onDoubleClick={() => openFormHandler('Update', event)}>{event.title}</EventItemWrapper>
            </EventListItemWrapper>
          ))}
          {events.length > 2 ? (
            <EventListItemWrapper key="show more">
              <EventItemWrapper onClick={() => setDisplayMode(DISPLAY_MODE_DAY)}>show more...</EventItemWrapper>
            </EventListItemWrapper>
          ) : null}
        </EventListWrapper>
      </RowInCell>
    </CellWrapper>
  );
};
