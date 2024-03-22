import React, { Fragment, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import CommonStyles from 'components/CommonStyles';
import { useAuthentication } from 'providers/AuthenticationProvider';
import {
  Badge,
  Box,
  Divider,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';
import CommonIcons from 'components/CommonIcons';

const useStyles = makeStyles((theme) => {
  return {
    footer: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    right: {
      color: theme.custom.colors.black,
      '& .user-info': {
        display: 'flex',
        gap: '10px',
        alignItems: 'center',

        fontWeight: 'bold',
        '& .img': {
          width: 26,
          height: 26,
          borderRadius: '50%',
        },
      },
      '& .btn-icon': {
        padding: 0,
        fontSize: 20,
        backgroundColor: theme.custom.colors.gray,
        color: theme.custom.colors.black,
        marginRight: '6px',
        boxShadow: 'none',
        '&:hover': {
          backgroundColor: '#d9d9d9 ',
          boxShadow: 'none',
        },
      },
      '& .btn-active': {
        backgroundColor: '#d9d9d9 ',
      },
    },
  };
});

const Header = (props) => {
  //! State
  const { logout } = useAuthentication();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openPopper = Boolean(anchorEl);
  const [contentPopper, setContentPopper] = useState();

  const handleOpenPopper = (event, value) => {
    setAnchorEl(event.currentTarget);
    setContentPopper(value);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setContentPopper();
  };

  const btnHeader = [
    {
      name: 'noti',
      children: (
        <Badge badgeContent={4} color="primary">
          <CommonIcons.Bell />
        </Badge>
      ),
      onClick: (e) => {
        handleOpenPopper(e, 'noti');
      },
    },
    {
      name: 'setting',
      children: <CommonIcons.Setting />,
      onClick: (e) => {
        handleOpenPopper(e, 'setting');
      },
    },
  ];
  //! Function
  const renderContentPopper = () => {
    switch (contentPopper) {
      case 'noti':
        return (
          <Box
            sx={{
              width: 200,
            }}
          >
            <div style={{ width: '100%', height: '40px', display: 'flex', alignItems: 'center', paddingLeft: 16 }}>
              Notifi
            </div>
            <Divider />
            <List component="nav" aria-label="secondary mailbox folder">
              <ListItemButton>
                <ListItemText primary="Thong bao 1" />
              </ListItemButton>
              <ListItemButton>
                <ListItemText primary="Thong bao 2" />
              </ListItemButton>
            </List>
          </Box>
        );
      case 'user':
        return (
          <Box
            sx={{
              width: 200,
            }}
          >
            <List>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <CommonIcons.User />
                  </ListItemIcon>
                  <ListItemText primary="Trang ca nhan" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding onClick={logout}>
                <ListItemButton>
                  <ListItemIcon>
                    <CommonIcons.Logout />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        );
      case 'setting':
        return (
          <Box
            sx={{
              width: 200,
            }}
          >
            <div>setting</div>
          </Box>
        );
    }
  };
  //! Render
  return (
    <div className={classes.footer}>
      <div className={classes.left}>
        <CommonStyles.TextField
          size="small"
          placeholder="Tim kiem"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlined />
              </InputAdornment>
            ),
          }}
        />
      </div>
      <div className={classes.right}>
        {btnHeader.map((item) => (
          <CommonStyles.Button
            className={`btn-icon ${contentPopper === item.name ? 'btn-active' : ''}`}
            key={item.name}
            onClick={item.onClick}
          >
            {item.children}
          </CommonStyles.Button>
        ))}
        <CommonStyles.Button
          variant="outline"
          className={` ${contentPopper === 'user' ? 'btn-active' : ''}`}
          onClick={(e) => {
            handleOpenPopper(e, 'user');
          }}
        >
          <div className="user-info">
            {/* <img
              className="img"
              src="data:image/png;base64,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"
              alt=""
            /> */}
            <div>Manh Dao</div>
          </div>
        </CommonStyles.Button>
      </div>
      <CommonStyles.PopoverMui open={openPopper} anchorEl={anchorEl} handleClose={handleClose}>
        {renderContentPopper()}
      </CommonStyles.PopoverMui>
    </div>
  );
};

export default Header;
