import React, { useState } from "react";
import styled from "styled-components";
import moment from "moment";
import { isDayContainCurrentEvent } from "../../helpers";
import {
  ButtonsWrapper, ButtonWrapper,
  EventBody,
  EventItemWrapper,
  EventListItemWrapper,
  EventListWrapper,
  EventTitle
} from "../../containers/StyledComponents";
import { ITEMS_PER_DAY } from "../../helpers/constants";

const DayShowWrapper = styled('div')`
  display: flex;
  flex-grow: 1;
  border-top: 1px solid #464648;;
`;

const EventsListWrapper = styled('div')`
  background-color: #fff;
  color: #DDDDDD;
  flex-grow: 1;
`;

const EventFormWrapper = styled('div')`
  background-color: #27282A;
  color: #DDDDDD;
  width: 300px;
  position: relative;
  border-left: 1px solid #464648;;
`;
const NoEventMsg = styled('div')`
  color: #565759;
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%,-50%);
`;

const ScaleWrapper = styled('div')`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 4px;
`;

const ScaleCellWrapper = styled('div')`
  flex-grow: 1;
  position: relative;
  &:not(:last-child){
    border-bottom: 1px solid #464648;
  }
  margin-left: 32px;
`;

const ScaleCellTimeWrapper = styled('div')`
  position: absolute;
  left: -26px;
  top: -6px;
  font-size: 8px;
`;

const ScaleCellEventWrapper = styled('div')`
  min-height: 16px;
`;

const EventItemButton = styled(EventItemWrapper)`
  min-width: 50px;
  width: unset;
  margin-left: 4px;
`;

const SelectEventTimeWrapper = styled('div')`
  padding: 8px 14px;
  border-bottom: 1px solid #464648;
  display: flex;
`;

const ListOfHours = styled('ul')`
  list-style-type: none;
  margin: 0;
  padding: 0;
  height: 60px;
  overflow-y: scroll;
  color: #000;
  position: absolute;
  left: 2px;
  background-color: rgb(239, 239, 239);
`;

const PositionRelative = styled('div')`
  position: relative;
`;

const HoursButton = styled('button')`
  border: none;
  background-color: unset;
  cursor: pointer;
`;

export const DayShowComponent = ({
  events, today, selectedEvent, changeEventHandler, cancelButtonHandler, eventFetchHandler, method, removeEventHandler, openFormHandler
}) => {
  const eventList = events.filter(event => isDayContainCurrentEvent(event, today));
  const [showTimePicker, setShowTimePicker] = useState(false);
  const cells = [... new Array(ITEMS_PER_DAY)].map((_, i) => {
    const temp = [];
    eventList.forEach(event => {
      // event.date -> '1661295600' -> moment -> timestamp -> H  ? -> 0
      if (+moment.unix(+event.date).format('H') === i) {
        temp.push(event);
      }
    })
    return temp;
  });

  const setTimeForEvent = (i) => {
    setShowTimePicker(false);
    const time = moment.unix(+selectedEvent.date).hour(i).format('X')
    changeEventHandler(time, 'date');
  };

  return (
    <DayShowWrapper>
      <EventsListWrapper>
        <ScaleWrapper>
          {
            cells.map((eventsList, i) => (
              <ScaleCellWrapper key={i}>
                <ScaleCellTimeWrapper>
                  {
                    i ? (
                      <>
                        {`${i}`.padStart(2, '0')}:00
                      </>
                    ) : null
                  }
                </ScaleCellTimeWrapper>
                <ScaleCellEventWrapper>
                  {
                    eventsList.map((event, index) => (
                      <EventItemButton key={index} onClick={() => openFormHandler('Update', event)}>
                        {event.title}
                      </EventItemButton>
                    ))
                  }
                </ScaleCellEventWrapper>
              </ScaleCellWrapper>
            ))
          }
        </ScaleWrapper>
      </EventsListWrapper>
      <EventFormWrapper>
        {
          selectedEvent ? (
            <div>
              <EventTitle
                value={selectedEvent.title}
                onChange={e => changeEventHandler(e.target.value, 'title')}
                placeholder="Title"
              />
              <SelectEventTimeWrapper>
                <PositionRelative>
                  <button>
                    {moment.unix(+selectedEvent.date).format('dddd, D MMMM')}
                  </button>
                </PositionRelative>
                <PositionRelative>
                  <button onClick={() => setShowTimePicker(prevState => !prevState)}>
                    {moment.unix(+selectedEvent.date).format('HH:mm')}
                  </button>
                  {
                    showTimePicker ? (
                      <ListOfHours>
                        {
                          [...new Array(ITEMS_PER_DAY)].map((_, i) => (
                            <li key={i}>
                              <HoursButton onClick={() => setTimeForEvent(i)}>
                                {`${i}`.padStart(2, '0')}:00
                              </HoursButton>
                            </li>
                          ))
                        }
                      </ListOfHours>
                    ) : null
                  }
                </PositionRelative>
              </SelectEventTimeWrapper>
              <EventBody
                value={selectedEvent.description}
                onChange={e => changeEventHandler(e.target.value, 'description')}
                placeholder="Description"
              />
              <ButtonsWrapper>
                <ButtonWrapper onClick={cancelButtonHandler} >Cancel</ButtonWrapper>
                <ButtonWrapper onClick={eventFetchHandler}>{method}</ButtonWrapper>
                {
                  method === 'Update' ? (
                    <ButtonWrapper danger onClick={removeEventHandler}>Remove</ButtonWrapper>
                  ) : null
                }
              </ButtonsWrapper>
            </div>
          ) : (
            <>
              <div>
                <button onClick={() => openFormHandler('Create', null, today)}>Create new event</button>
              </div>
              <NoEventMsg>No event selected</NoEventMsg>
            </>
          )
        }
      </EventFormWrapper>
    </DayShowWrapper>
  )
}