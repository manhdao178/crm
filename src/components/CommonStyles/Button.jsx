import React, { Fragment, useRef, useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { makeStyles } from '@mui/styles';
import classNames from 'classnames';
import { IconButton, styled } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const LoadingButtonStyled = styled(LoadingButton)((props) => {
  const { variant, color, theme } = props;
  if (variant === 'text') {
    if (color === 'error') {
      return {};
    }
  }
  if (variant === 'contained') {
    if (color === 'error') {
      return {
        backgroundColor: theme.custom.colors.red,
      };
    }
    return {
      backgroundColor: theme.custom.colors.green,
    };
  }
  if (variant === 'outlined') {
    return {
      color: theme.custom.colors.green,
      borderColor: theme.custom.colors.lightgreen,
    };
  }

  return {};
});

const StyledButton = (props) => {
  const { children, style, secondary, className, isSmallBtn, isUpload, isIconButton, accept, onChangeFile, ...rest } =
    props;
  const classes = useStyles();
  const refUpload = useRef();
  const [isUploading, setUploading] = useState(false);

  //! Function
  const onClickUpload = () => {
    refUpload.current.click();
  };

  //! Render
  if (isUpload) {
    return (
      <Fragment>
        <input
          ref={refUpload}
          accept={accept}
          style={{ display: 'none' }}
          type="file"
          onChange={(e) => onChangeFile(e, { ref: refUpload, setUploading })}
        />

        {isIconButton ? (
          <IconButton onClick={onClickUpload}>{children}</IconButton>
        ) : (
          <LoadingButtonStyled
            loading={isUploading}
            variant="contained"
            sx={{
              textTransform: 'initial',
              minWidth: 36,
              minHeight: 36,
              boxShadow: 'none',
              padding: '12px 24px',
              ...style,
            }}
            className={classNames(classes.root, className)}
            {...rest}
            onClick={onClickUpload}
          >
            {children}
          </LoadingButtonStyled>
        )}
      </Fragment>
    );
  }

  return (
    <LoadingButtonStyled
      variant="contained"
      sx={{
        textTransform: 'initial',
        minWidth: 36,
        minHeight: 36,
        boxShadow: 'none',
        padding: '12px 24px',
        ':hover': {
          bgcolor: '#00CD00',
        },
        ...style,
      }}
      className={classNames(classes.root, className)}
      {...rest}
    >
      {children}
    </LoadingButtonStyled>
  );
};

export default StyledButton;
