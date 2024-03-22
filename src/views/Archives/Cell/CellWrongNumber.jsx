import React, { useCallback, useEffect, useState } from 'react';
import CommonStyles from 'components/CommonStyles';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => {
  return {
    CellWrongNumber: {
      maxWidth: '80px',
      minWidth: '80px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  };
});

const CellWrongNumber = ({ data, disabled = false }) => {
  //! State
  const classes = useStyles();
  const { t } = useTranslation();
  const [check, setCheck] = useState(data);

  //! Effect
  useEffect(() => {
    setCheck(data);
  }, [data]);

  //! Function
  const handleCheck = useCallback(() => {
    setCheck((prevCheck) => !prevCheck);
  }, []);

  //! Render
  return (
    <div className={classes.CellWrongNumber}>
      <CommonStyles.Checkbox checked={check} onClick={handleCheck} disabled={disabled} />
    </div>
  );
};

export default CellWrongNumber;
