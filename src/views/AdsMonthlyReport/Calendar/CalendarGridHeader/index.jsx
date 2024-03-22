import React from 'react';
import moment from 'moment';
import 'moment/locale/vi';
import { CellWrapper, RowInCell, CellWrapperADS } from 'containers/StyledComponents';

export const CalendarGridHeader = () => (
  <>
    {[...Array(7)].map((_, i) => (
      <CellWrapperADS isSelectedMonth key={i}>
        <RowInCell pr={1}>
          {moment()
            .locale('vi')
            .day(i + 1)
            .format('ddd')
            .replace('T', 'T')}
        </RowInCell>
      </CellWrapperADS>
    ))}
  </>
);
