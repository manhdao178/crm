import React from 'react';
import { makeStyles } from '@mui/styles';
import { Chip, Stack } from '@mui/material';
import Cancel from '@mui/icons-material/Close';
import FormControl from '@mui/material/FormControl';
import { Box } from '@mui/material';
import { useFormikContext } from 'formik';
import { cloneDeep } from 'lodash';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => {
  return {
    rootInput: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: 14,
    },
    placeholder: {
      color: theme.custom.colors.lightgray,
    },
    iconDelete: {
      color: `${theme.custom.colors.darkblue} !important`,
      backgroundColor: '#F1F2F4',
      borderRadius: '5px',
      // backgroundColor: 'red',
      width: '20px !important',
      height: '20px !important',
      padding: 5,
      float: 'right',
    },
    listProj: {
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      minWidth: '70vh',
      marginBottom: ' 30px',
      '& > .m-r-35 > span': {
        marginBottom: 8,
        fontWeight: 600,
      },
    },
    labelHeaderColorPrimary: {
      color: `${theme.custom.colors.green} !important`,
    },
    stackBox: {
      width: '100%',
    },
    projectList: {
      display: 'flex',
      gap: '10px',
      flexWrap: 'wrap',
      width: '60vw',
    },
  };
});

const ArrayProjects = () => {
  //! State
  const classes = useStyles();
  const { t } = useTranslation();
  const formik = useFormikContext();
  const projects = formik?.values?.projects || [];

  //! Function
  const onRemove = (item) => {
    const tempProjects = cloneDeep(projects);
    const projectFound = tempProjects.find((el) => el.value === item.value);
    if (projectFound) {
      projectFound.branches = [];
      projectFound.isOwned = false;
    }

    const projectSelecting = tempProjects.filter((el) => el.isOwned);

    formik.setFieldValue('projectSelecting', projectSelecting[projectSelecting.length - 1]?.value);
    formik.setFieldValue('projects', tempProjects);
  };

  //! Render
  return (
    <FormControl fullWidth className={classes.rootInput}>
      <div className={classes.listProj}>
        <div className="m-r-35">
          <span className={classes.labelHeaderColorPrimary}>{t('common:userlist_project')}</span>
        </div>
        <Box className={classes.stackBox}>
          <div className={classes.projectList}>
            {(projects || []).map((item) => {
              if (item.isOwned) {
                return (
                  <Chip
                    key={item.value}
                    label={item?.label}
                    variant="filled"
                    onDelete={() => onRemove(item)}
                    deleteIcon={<Cancel className={classes.iconDelete} />}
                  />
                );
              }

              return null;
            })}
          </div>
        </Box>
      </div>
    </FormControl>
  );
};

export default ArrayProjects;
