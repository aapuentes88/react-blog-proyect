/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useContext, useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox/MDBox.js";
import MDTypography from "components/MDTypography/MDTypography.js";
import MDInput from "components/MDInput/MDInput.js";
import MDButton from "components/MDButton/MDButton.js";

// Authentication layout components
import BasicLayout from "layouts/auth/components/BasicLayout.js";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import routes from "routes/routes";
import { API_URL, ENDPOINT_SIGNIN } from "constants/api";

import { helpHttp } from 'helpers/helpHttp'
import Cookies from 'js-cookie';
import AuthContext from 'context/components/AuthContext'
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {auth, setAuth, handleAuth} = useContext(AuthContext)
  const navigate = useNavigate();

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const handleChange = (e) => {
    if( e.target.name === 'email' )
       setEmail(e.target.value)
    else
       setPassword(e.target.value)
  }

  const handleSignIn = () => {

    console.log('------------handleSignIn-----------')

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        "username": email,
        "password": password
      }
    }

    
    // const response = fetch(`${API_URL}${ENDPOINT_SIGNIN}`, options);
    
    helpHttp().post(`${API_URL}${ENDPOINT_SIGNIN}`, options).then((res) => {
      if (!res.err && !(res instanceof TypeError)) {
        console.log('-----------------------AllItsOK-----------------------------')
      // Almacenar el token de autenticación en una cookie
      // Cookies.set('token', res.token, { sameSite: 'None', secure: true });
      // Establecer la cookie con el atributo SameSite=None
      // Opcional: Establecer la expiración de la cookie
      const cookieOptions = { sameSite: 'None', secure: true, expires: 7 };
      Cookies.set('token', res.token, cookieOptions);//No es lo mejor cambiar x localStorage o Memoria

      // Actualizar el estado de autenticación
      setAuth(true)

      // Redireccionar a la página principal
      navigate('/');

      } else {
        console.log('-----------------------SomeThingsIsBad-----------------------------')
      }
    })

  };
  

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <FacebookIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GitHubIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GoogleIcon color="inherit" />
              </MDTypography>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput type="email" label="Email" name="email" value={email} onChange={handleChange} fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Password" name="password" value={password} onChange={handleChange} fullWidth />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" onClick={handleSignIn} fullWidth>
                sign in
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to={routes.find(route => route.key === 'sign-up').route}
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

// export default SignIn;