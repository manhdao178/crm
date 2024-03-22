import React, { memo } from 'react';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/system';
import { useGetStatusOptions } from 'hooks/status/useGetStatusOptions';
import { useMemo } from 'react';
import TabButton from './TabButton';
import { checkActiveContactTab } from 'helpers';

const useStyles = makeStyles((theme) => {
  return {
    buttonGroup: {
      display: 'flex',
      gap: '8px',
    },
  };
});

const Tabs = ({ onClickStatus, filters, paging }) => {
  //! State
  const classes = useStyles();
  const { t } = useTranslation();
  const listStatusDefault = useMemo(() => {
    return [
      {
        label: 'ALL',
        value: '',
      },
      {
        label: 'New customer',
        value: 'NEW',
      },
      {
        label: 'In take care',
        value: 'isInTakeCare',
      },
      {
        label: 'Potential ',
        value: 'POTENTIAL',
      },
      {
        label: 'Unpromising',
        value: 'UNPROMISING',
      },
      {
        label: 'Booked',
        value: 'Booked',
      },
      {
        label: 'Finished',
        value: 'FINISHED',
      },
    ];
  }, []);

  const listItem = useMemo(() => {
    return listStatusDefault.map((item) => {
      return {
        ...item,

        isActive: checkActiveContactTab(filters, item),
        label: item?.label,
        onClick: onClickStatus(
          item.value === 'isInTakeCare' ? 'isInTakeCare' : item.value === 'isFinish' ? 'isFinish' : 'status',
          item?.value,
        ),
      };
    });
  }, [listStatusDefault, filters]);

  //! Function

  //! Render

  return (
    <Box className={classes.buttonGroup}>
      {listItem.map((el, index) => (
        // <TabButton key={el?.label} item={el} status={listStatus[index]?.value} paging={paging} />
        <TabButton key={el?.label} item={el} status={el?.value} paging={paging} />
      ))}
    </Box>
  );
};

export default memo(Tabs);
