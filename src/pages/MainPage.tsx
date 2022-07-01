import React, { FC } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ConstructionIcon from '@mui/icons-material/Construction';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import BarChartIcon from '@mui/icons-material/BarChart';
import { useAuth } from '../provider';
import { Outlet, useNavigate } from 'react-router-dom';
import { doLogout } from '../services/AuthService';
import { ListItemButton } from '@mui/material';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

const MainPage: FC = () => {
  const anchorSide = 'left';
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const providerAuth = useAuth();
  const navigate = useNavigate();  

  const logout = () => {
    providerAuth.signout(() => {
      doLogout();
      navigate('/login', { replace: true });
    });    
  }

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }

        setState({ ...state, [anchor]: open });
      };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItemButton key={'Parameters'} onClick={() => {navigate('/parameters', { replace: true })}}>
            <ListItemIcon>
              <ConstructionIcon />
            </ListItemIcon>
            <ListItemText primary={'Parameters'} />
        </ListItemButton>
        <ListItemButton key={'Bot Parameters'} onClick={() => {navigate('/bot-parameters', { replace: true })}}>
            <ListItemIcon>
              <PrecisionManufacturingIcon />
            </ListItemIcon>
            <ListItemText primary={'Bot Parameters'} />
        </ListItemButton>
        <ListItemButton key={'View Chart'} onClick={() => {navigate('/chart', { replace: true })}}>
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary={'View Chart'} />
        </ListItemButton>
      </List>
      <Divider />
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(anchorSide, true)}
          >
            <MenuIcon />           
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Jarvis Trading Bot
          </Typography>
          <Button color="inherit" onClick={logout}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor={anchorSide}
        open={state[anchorSide]}
        onClose={toggleDrawer(anchorSide, false)}
      >
        {list(anchorSide)}
      </Drawer>
      <Outlet />
    </Box>
  );
}

export default MainPage;