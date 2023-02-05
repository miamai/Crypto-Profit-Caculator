import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

import {
  Box,
  Toolbar,
  Typography,
  Button,
  Drawer,
  AppBar,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Divider,
} from '@mui/material';
import QueryStatsRoundedIcon from '@mui/icons-material/QueryStatsRounded';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import { onLogOut, isAuthStateChanged } from '../Login/auth';

const drawerWidth = 240;
const pages = [
  { label: '首頁', route: '/home' },
  { label: '最新消息', route: '/news' },
];
const style = {
  pageLink: {
    color: '#F5B041',
    textDecoration: 'none',
  },
  titleLink: {
    color: '#FFF',
    textDecoration: 'none',
  },
  titleTyp: {
    ml: 1,
    flexGrow: 1,
    display: { xs: 'block', sm: 'block' },
  },
  queryIcon: {
    color: 'primary.main',
    fontSize: '40px',
  },
  drawer: {
    display: { xs: 'block', sm: 'none' },
    '& .MuiDrawer-paper': {
      boxSizing: 'border-box',
      width: drawerWidth,
    },
  },
};

const HeaderBar = (props) => {
  const navigate = useNavigate();
  const logoutHandler = () => {
    onLogOut();
    isAuthStateChanged((user) => {
      if (user === null) {
        navigate('/');
      }
    });
  };

  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <QueryStatsRoundedIcon sx={{ ...style.queryIcon, my: 2 }} />
      <Divider />
      <List>
        {pages.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton sx={{ justifyContent: 'center' }}>
              <Link style={style.pageLink} to={item.route}>
                {item.label}
              </Link>
            </ListItemButton>
          </ListItem>
        ))}

        <Button onClick={logoutHandler}>
          <LogoutIcon />
          登出
        </Button>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <AppBar component='nav' style={{ position: 'relative' }}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ ml: -1, mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Link to='/home'>
            <QueryStatsRoundedIcon
              sx={{
                ...style.queryIcon,
                display: { xs: 'none', sm: 'block' },
              }}
              fontSize='large'
            />
          </Link>
          <Typography variant='h6' component='div' sx={style.titleTyp}>
            <Link style={style.titleLink} to='/home'>
              CRYPTO PROFITS
            </Link>
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {pages.map((item) => (
              <Button key={item.label} sx={{ color: 'primary' }}>
                <Link style={style.pageLink} to={item.route}>
                  {item.label}
                </Link>
              </Button>
            ))}
            <Button onClick={logoutHandler}>
              <LogoutIcon />
              登出
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component='nav'>
        <Drawer
          container={container}
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={style.drawer}
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
};

export default HeaderBar;
