import { Box, Tooltip } from '@mui/material';
import { getBranchesNames, getBranchNames, toAcronym } from 'helpers/userlistHelpers';
import { React } from 'react';
import HeadLabel from './Head/HeadLabel';

export const columns = [
  {
    label: <HeadLabel label="branch" />,
    id: 'branches',
    Cell: (row) => {
      return (
        <Box
        // className={classes.user_code}
        >
          <Tooltip
            title={<span style={{ whiteSpace: 'pre-line' }}>{getBranchesNames(row?.branchDetails)}</span>}
            followCursor
            arrow
          >
            <div className="branchBox">
              {row?.branchDetails?.map((item, index) => {
                if (index >= 2) return;
                return (
                  <Box
                    key={item.id}
                    // className={classes.department}
                  >
                    {toAcronym(item?.name)}
                  </Box>
                );
              })}
            </div>
          </Tooltip>
        </Box>
      );
    },
  },
  {
    label: <HeadLabel label="data_service_code" />,
    id: 'code',
  },
  {
    label: <HeadLabel label="data_service_name" />,
    id: 'name',
  },
  {
    label: <HeadLabel label="serivce_funnel" />,
    id: 'funnel',
  },
  {
    label: <HeadLabel label="data_note" />,
    id: 'note',
  },
];
