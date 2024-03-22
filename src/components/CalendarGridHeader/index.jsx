import React from 'react';
import moment from 'moment';
import 'moment/locale/vi';
import { CellWrapper, RowInCell } from '../../containers/StyledComponents';

export const CalendarGridHeader = () => (
  <>
    {[...Array(7)].map((_, i) => (
      <CellWrapper isHeader isSelectedMonth key={i}>
        <RowInCell pr={1}>
          {moment()
            .day(i + 1)
            .format('ddd')}
        </RowInCell>
      </CellWrapper>
    ))}
  </>
);
