import IconNext from 'components/CommonIcons/Icons/IconNext';
import IconPrev from 'components/CommonIcons/Icons/IconPrev';
import React, { Fragment, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Box from '@mui/material/Box';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { makeStyles } from '@mui/styles';

import { DISPLAY_MODE_DAY, DISPLAY_MODE_MONTH } from 'helpers/constants';

const useStyles = makeStyles((theme) => {
  return {
    desktopView: {
      position: 'absolute !important',
      top: '50% !important',
      left: '50% !important',
      transform: 'translate(-50%, -50%)',
      textTransform: 'capitalize',
    },
  };
});

const DivWrapper = styled('div')`
  display: flex;
  align-item: center;
  justify-content: center;
  background-color: #fff;
  color: #008638;
  // margin-right: 16px;
  position: relative;
`;

const DivWrapperIcon = styled('div')`
  display: flex;
  align-item: center;
  justify-content: center;
  width: 45px;
  height: 40px;
  border-radius: 8px;
  background-color: #f1f2f4;
  color: #008638;
  position: relative;
`;

const BoxWrapper = styled('div')`
  display: flex;
  align-item: center;
  justify-content: center;
`;

const TextWrapper = styled('span')`
  font-size: 16px;
  font-weight: 600;
  color: #008638;
`;

const TitleWrapper = styled(TextWrapper)`
  font-weight: 600;
  font-size: 16px;
  margin-right: 8px;
`;

const BoxTextWrapper = styled('div')`
  padding: 0 40px;
  margin-top: -2px;
`;

const BoxHeaderWrapper = styled('div')`
  display: flex;
  align-item: center;
  justify-content: center;
  background-color: #f1f2f4;
  padding: 10px;
  border-radius: 12px;
`;

const ButtonsWrapper = styled('div')`
  display: flex;
  align-items: center;
`;

const ButtonsCenterWrapper = styled(ButtonsWrapper)`
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
`;

const ButtonWrapper = styled('button')`
  border: none;
  background-color: #f1f2f4;
  color: #008638;
  outline: unset;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: 700;
`;

const TodayButton = styled(ButtonWrapper)`
  font-weight: bold;
`;

const BoxIcon = styled('div')`
  // width: 100%;
  // background-color: red;
  // & .MuiButtonBase-root: {
  //   background-color: red;
  // }
  position: absolute;
  top: 21px;
  left: -5px;
`;

const day = new Date();

const Monitor = ({ today, prevHandler, todayHandler, nextHandler, setDisplayMode, displayMode, setToday }) => {
  //! State
  const classes = useStyles();

  //! Render
  return (
    <BoxWrapper>
      <DivWrapper>
        {/* <ButtonsCenterWrapper>
          <ButtonWrapper unPressed={displayMode === DISPLAY_MODE_MONTH} onClick={() => setDisplayMode(DISPLAY_MODE_MONTH)}>Month</ButtonWrapper>
          <ButtonWrapper unPressed={displayMode === DISPLAY_MODE_DAY} onClick={() => setDisplayMode(DISPLAY_MODE_DAY)}>Day</ButtonWrapper>
        </ButtonsCenterWrapper> */}
        <BoxHeaderWrapper>
          {/* <ButtonWrapper onClick={prevHandler}>
            {' '}
            <IconPrev />{' '}
          </ButtonWrapper> */}
          <BoxTextWrapper>
            {displayMode === DISPLAY_MODE_DAY ? <TextWrapper>{today.format('DD')}</TextWrapper> : null}
            <TitleWrapper> {today.format('MM')}</TitleWrapper>
            <TextWrapper>{today.format('YYYY')}</TextWrapper>
          </BoxTextWrapper>
          {/* <TodayButton onClick={todayHandler}>Today</TodayButton> */}
          {/* <ButtonWrapper onClick={nextHandler}>
            {' '}
            <IconNext />{' '}
          </ButtonWrapper> */}
        </BoxHeaderWrapper>
      </DivWrapper>

      {/* <DivWrapperIcon>
        <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="vi">
          <DatePicker
            views={['year', 'month']}
            value={today}
            variant="dialog"
            PopperProps={{
              className: classes.desktopView,
            }}
            onChange={setToday}
            renderInput={({ inputRef, inputProps, InputProps }) => {
              return (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <BoxIcon>{InputProps?.endAdornment}</BoxIcon>
                </Box>
              );
            }}
          />
        </LocalizationProvider>
      </DivWrapperIcon> */}
    </BoxWrapper>
  );
};

export { Monitor };
