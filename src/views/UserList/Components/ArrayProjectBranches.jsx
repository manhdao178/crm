import React from 'react';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { useFormikContext } from 'formik';
import EachProjects from './EachProjects';

const useStyles = makeStyles((theme) => {
  return {
    projectBox: {
      display: 'flex',
      position: 'relative',
      height: '100px',
    },
  };
});

const ArrayProjectBranches = () => {
  //! State
  const classes = useStyles();
  const formik = useFormikContext();
  const { projects } = formik?.values;

  //! Function

  //! Render
  return (
    <Box className={classes.projectBox}>
      {projects.map((item, index) => {
        return <EachProjects key={item?.id} item={item} index={index} />;
      })}
    </Box>
  );
};

export default ArrayProjectBranches;
