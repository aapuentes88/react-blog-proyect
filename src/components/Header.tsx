import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Box, ClickAwayListener, Grow, /*Icon, Menu,*/ MenuItem, MenuList, Paper, Popper, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { Navigate, Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import  routes   from 'routes/routes'
import AuthContext from 'context/components/AuthContext'
import Cookies from 'js-cookie';
import { helpHttp } from 'helpers/helpHttp';
import { API_URL, ENDPOINT_LOGOUT, ENDPOINT_USER } from "constants/api";
import HomeIcon from '@mui/icons-material/Home'

interface HeaderProps {
  sections: ReadonlyArray<{
    title: string;
    url: string;
  }>;
  title: string;
}
export default function Header(props: HeaderProps) {
  const { sections, title } = props;
  const [openAccountMenu, setOpenAccountMenu] = React.useState(false);
  const [userData, setUserData] = React.useState(null);
  const {auth, setAuth, handleAuth, setProfile} = React.useContext(AuthContext)
  const navigate = useNavigate()

  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleOpenAccountMenu = (/*event*/) => setOpenAccountMenu(/*event.currentTarget*/true);
  const handleCloseAccountMenu = () => setOpenAccountMenu(false);

  const handleLogout = () => {
    const token = Cookies.get('token');  // token almacenado previamente

    if(token) {
      const options = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      }

      helpHttp().get(`${API_URL}${ENDPOINT_LOGOUT}`, options)
      .then((response) => {
         setUserData(null);
         // Borrar la cookie con el nombre 'token'
         Cookies.remove('token');
         setAuth(false)
         setProfile({fullname: '', company: '',charge: '',})
         navigate('/')
        //  console.log(response.message, response.user.username);
         
      })
      .catch((error) => {
        // Manejar el error y mostrar una notificación al usuario
      // console.error('Error al hacer logout:', error);
      alert('Ha ocurrido un error durante el cierre de seccion. Por favor, inténtalo nuevamente.');
      });
    } else {
     // No había usuario logeado
    // console.log('No había una seccion de usuario');
    }

  }

  React.useEffect(() => {
    const token = Cookies.get('token');  // token almacenado previamente

    if (token) {
      const options = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      }
  
      helpHttp()
        .get(`${API_URL}${ENDPOINT_USER}`, options)
        .then((response) => {
          setUserData(response);
          setAuth(true); // Establecer el estado de autenticación a true
        })
        .catch((error) => {
          // Manejar el error
        });
    } else {
      // Si no hay token, establece el estado de autenticación a false o realiza alguna otra acción necesaria
      setAuth(false);
    }


  }, []);

  const handleListKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpenAccountMenu(false);
    } else if (event.key === 'Escape') {
      setOpenAccountMenu(false);
    }
  }

  const renderAccountMenu = () => (
     
    auth ? (      
      <Stack direction="row" spacing={2}>
       <div>
        <IconButton
          size="large"
          disableRipple
          color="inherit"
          ref={anchorRef}
          id="composition-button"
          aria-controls={openAccountMenu ? 'composition-menu' : undefined}
          aria-expanded={openAccountMenu ? 'true' : undefined}
          aria-haspopup="true"

          onClick={handleOpenAccountMenu}
        >
          <AccountCircleIcon />
        </IconButton>
        <Popper
        open= {openAccountMenu}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
        style={{ zIndex: 1 }} 
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom-start' ? 'left top' : 'left bottom',
            }}
          >
            <Paper
            sx={{
              filter: 'drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.32))',
              '::before': {
                content: '""',
                position: 'absolute',
                top: '-10px',
                left: '84%',
                transform: 'translateX(-50%)',
                width: '0',
                height: '0',
                borderLeft: '10px solid transparent',
                borderRight: '10px solid transparent',
                borderBottom: '10px solid white',
              },
            }}
            >
              <Box  sx={{
              position: 'relative',
              p: { xs: 1, md: 1 },
              pr: { md: 0 },
            }}>
              <Typography variant="h6" fontWeight="small" color="white" /*mt={1}*/>
                {userData ? userData.username : 'loading ...' }
              </Typography> 
              </Box>
              <ClickAwayListener onClickAway={handleCloseAccountMenu}>
                <MenuList
                  autoFocusItem={openAccountMenu}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem component={ReactRouterLink} to='/profile'>Profile</MenuItem>
                  <MenuItem onClick={handleCloseAccountMenu}>My account</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
         </Popper>
        </div>
       </Stack>
       )
     : 
     <ReactRouterLink to={routes.find(route => route.key === 'sign-in').route}>
     <Button variant="text" size="small" /*style={{ color: 'inherit' }}*/>
      Sign in
     </Button>
    </ReactRouterLink>
     
  );

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        {/* <Button size="small">Subscribe</Button> */}
        <ReactRouterLink to={routes.find(route => route.key === 'blog').route}>
        <IconButton
          size="large"
          disableRipple
          color="inherit"
          ref={anchorRef}><HomeIcon /></IconButton></ReactRouterLink>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
          {title}
        </Typography>
        <IconButton>
          <SearchIcon />
        </IconButton>
        {renderAccountMenu()}
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: 'space-between', overflowX: 'auto' }}
      >
        {sections?.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            href={section.url}
            sx={{ p: 1, flexShrink: 0 }}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
  );
}