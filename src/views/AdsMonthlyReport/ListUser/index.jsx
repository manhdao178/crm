import { Box } from '@mui/system';
import React, { Fragment } from 'react';
import { makeStyles } from '@mui/styles';
import SimpleBarReact from 'simplebar-react';

const useStyles = makeStyles((theme) => {
  return {
    header: {
      fontSize: '20px',
      marginBottom: '10px',
      fontWeight: 500,
      color: '#708090',
    },
    wrapper: {
      border: '1px solid #ccc',
      padding: '10px',
    },
    valueDate: {
      backgroundColor: '#ddd',
      padding: '0 20px',
      border: '1px solid #ccc',
      padding: '0 20px',
      borderRight: '1px solid #ccc',
    },
    wrapperHeader: {
      display: 'flex',
      backgroundColor: '#008638',
      textAlign: 'center',
      color: '#fff',
    },
    wrapper1: {
      maxWidth: '225px',
    },
    wrapperData: {
      display: 'flex',
      textAlign: 'center',
      overflowX: 'hidden',
      backgroundColor: '#ddd',
    },
    valueQuantity: {
      padding: '0 52.5px',
      border: '1px solid #ccc',
    },
    valueQuantity: {
      padding: '0 52.5px',
      borderLeft: '1px solid #ccc',
    },
  };
});

const ListUser = ({ data }) => {
  const classes = useStyles();

  // const dataFake = [
  //   { label: '01/11/22', value: 1 },
  //   { label: '02/11/22', value: 3 },
  //   { label: '03/11/22', value: 2 },
  //   { label: '04/11/22', value: 5 },
  //   { label: '05/11/22', value: 4 },
  //   { label: '06/11/22', value: 6 },
  //   { label: '07/11/22', value: 1 },
  //   { label: '02/11/22', value: 3 },
  //   { label: '03/11/22', value: 2 },
  //   { label: '04/11/22', value: 5 },
  //   { label: '05/11/22', value: 4 },
  //   { label: '06/11/22', value: 6 },
  // ];
  return (
    <Fragment>
      <Box className={classes.wrapper}>
        <div className={classes.header}>Khách hàng</div>
        <Box className={classes.wrapper1}>
          <Box className={classes.wrapperHeader}>
            <div style={{ padding: '0 34px', borderRight: '1px solid #ccc' }}>Ngày</div>
            <div style={{ padding: '0 23px', minWidth: '115px', flexWrap: 'nowrap', borderLeft: '1px solid #ccc' }}>
              Số lượng
            </div>
          </Box>
          <SimpleBarReact style={{ maxHeight: '300px' }}>
            <Box className={classes.wrapperData}>
              <Box className={classes.valueDate}>
                {data?.map((item, index) => (
                  <Box sx={{ padding: '3px 0' }} key={index}>
                    {item.label}
                  </Box>
                ))}
              </Box>
              <Box className={classes.valueQuantity}>
                {data?.map((item, index) => (
                  <Box sx={{ padding: '3px 0' }} key={index}>
                    {item.value}
                  </Box>
                ))}
              </Box>
            </Box>
          </SimpleBarReact>
        </Box>
      </Box>
    </Fragment>
  );
};

export default ListUser;
