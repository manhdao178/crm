import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Title } from '../Title';
import { Monitor } from '../Monitor';
import { CalendarGrid } from '../CalendarGrid';
import styled from 'styled-components';
import { DISPLAY_MODE_DAY, DISPLAY_MODE_MONTH } from '../../helpers/constants';
import { DayShowComponent } from '../DayShowComponent';
import { ButtonsWrapper, ButtonWrapper, EventBody, EventTitle } from '../../containers/StyledComponents';
import { useNavigate } from 'react-router-dom';

const ShadowWrapper = styled('div')`
  //   min-width: 850px;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const FormPositionWrapper = styled('div')`
  position: absolute;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.35);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FormWrapper = styled(ShadowWrapper)`
  width: 320px;
  min-width: 320px;
  height: 132px;
  background-color: #fff;
  color: #dddddd;
  box-shadow: unset;
`;

const url = 'http://localhost:3001';
const totalDays = 42;
const defaultEvent = {
  title: '',
  description: '',
  date: moment().format('X'),
};
function BigCalendar({ setIsShowTable, handleDateInCalendar }) {
  const [displayMode, setDisplayMode] = useState(DISPLAY_MODE_MONTH);
  moment.updateLocale('en', { week: { dow: 1 } });
  // const today = moment();
  const [today, setToday] = useState(moment());
  const startDay = today.clone().startOf('month').startOf('week');
  const endDay = today.clone().endOf('month').endOf('week');
  const navigate = useNavigate();

  // window.moment = moment;

  const prevHandler = () => setToday((prev) => prev.clone().subtract(1, displayMode));
  const todayHandler = () => setToday(moment());
  const nextHandler = () => setToday((prev) => prev.clone().add(1, displayMode));

  const [method, setMethod] = useState(null);
  const [isShowForm, setShowForm] = useState(false);
  const [event, setEvent] = useState(null);

  const [events, setEvents] = useState([]);
  const startDayQuery = startDay.clone().format('X');
  const endDayQuery = startDay.clone().add(totalDays, 'days').format('X');
  // useEffect(() => {
  //   fetch(`${url}/events?date_gte=${startDayQuery}&date_lte=${endDayQuery}`)
  //     .then(res => res.json())
  //     .then(res => setEvents(res));
  // }, [today]);

  const openFormHandler = (methodName, eventForUpdate, dayItem) => {
    setEvent(eventForUpdate || { ...defaultEvent, date: dayItem.format('X') }); // todo
    setMethod(methodName);
  };

  const openModalFormHandler = (methodName, eventForUpdate, dayItem) => {
    navigate({
      pathname: '/receptionist',
      search: `${dayItem.format()}`,
    });
    // setShowForm(true);
    // openFormHandler(methodName, eventForUpdate, dayItem);
    handleDateInCalendar(dayItem.format());
  };

  const cancelButtonHandler = () => {
    setShowForm(false);
    setEvent(null);
  };

  const changeEventHandler = (text, field) => {
    setEvent((prevState) => ({
      ...prevState,
      [field]: text,
    }));
  };

  const eventFetchHandler = () => {
    const fetchUrl = method === 'Update' ? `${url}/events/${event.id}` : `${url}/events`;
    const httpMethod = method === 'Update' ? 'PATCH' : 'POST';
  };

  const removeEventHandler = () => {
    const fetchUrl = `${url}/events/${event.id}`;
    const httpMethod = 'DELETE';

    fetch(fetchUrl, {
      method: httpMethod,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setEvents((prevState) => prevState.filter((eventEl) => eventEl.id !== event.id));
        cancelButtonHandler();
      });
  };

  return (
    <>
      {isShowForm ? (
        <FormPositionWrapper onClick={cancelButtonHandler}>
          <FormWrapper onClick={(e) => e.stopPropagation()}>
            <EventTitle
              value={event.title}
              onChange={(e) => changeEventHandler(e.target.value, 'title')}
              placeholder="Title"
            />
            <EventBody
              value={event.description}
              onChange={(e) => changeEventHandler(e.target.value, 'description')}
              placeholder="Description"
            />
            <ButtonsWrapper>
              <ButtonWrapper onClick={cancelButtonHandler}>Cancel</ButtonWrapper>
              <ButtonWrapper onClick={eventFetchHandler}>{method}</ButtonWrapper>
              {method === 'Update' ? (
                <ButtonWrapper danger onClick={removeEventHandler}>
                  Remove
                </ButtonWrapper>
              ) : null}
            </ButtonsWrapper>
          </FormWrapper>
        </FormPositionWrapper>
      ) : null}
      <ShadowWrapper>
        <Monitor
          today={today}
          prevHandler={prevHandler}
          todayHandler={todayHandler}
          nextHandler={nextHandler}
          setDisplayMode={setDisplayMode}
          displayMode={displayMode}
          setToday={(day) => {
            setToday(moment(day));
          }}
        />
        {displayMode === DISPLAY_MODE_MONTH ? (
          <CalendarGrid
            startDay={startDay}
            endDay={endDay}
            today={today}
            totalDays={totalDays}
            events={events}
            openFormHandler={openModalFormHandler}
            setDisplayMode={setDisplayMode}
          />
        ) : null}
        {displayMode === DISPLAY_MODE_DAY ? (
          <DayShowComponent
            events={events}
            today={today}
            selectedEvent={event}
            setEvent={setEvent}
            changeEventHandler={changeEventHandler}
            cancelButtonHandler={cancelButtonHandler}
            eventFetchHandler={eventFetchHandler}
            method={method}
            removeEventHandler={removeEventHandler}
            openFormHandler={openFormHandler}
          />
        ) : null}
      </ShadowWrapper>
    </>
  );
}

export default BigCalendar;
