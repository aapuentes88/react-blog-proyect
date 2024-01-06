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

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 React components
import MDBox from "components/MDBox/MDBox";
import MDTypography from "components/MDTypography/MDTypography";
import MDInput from "components/MDInput/MDInput";
import MDButton from "components/MDButton/MDButton";

// Authentication layout components
import CoverLayout from "layouts/auth/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";
import routes from "routes/routes";
import { useContext, useState } from "react";
import { helpHttp } from "helpers/helpHttp";
import { API_URL, ENDPOINT_SIGNIN, ENDPOINT_SIGNUP } from "constants/api";
import Cookies from 'js-cookie';
import AuthContext from "context/components/AuthContext";
import { useNavigate } from 'react-router-dom';


function SignUp() {

  const [form, setForm] = useState({})
  const {auth, setAuth, handleAuth} = useContext(AuthContext)
  const navigate = useNavigate();
  // const {setProfile} = useContext(AuthContext)
  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
  }

  const handleSignIn = () => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        "username": form.name,
        "password": form.password
      }
    }    
    helpHttp().post(`${API_URL}${ENDPOINT_SIGNIN}`, options).then((res) => {
      if (!res.err && !(res instanceof TypeError)) {
      const cookieOptions = { sameSite: 'None', secure: true, expires: 7 };
      Cookies.set('token', res.token, cookieOptions);
      setAuth(true)
      // setProfile({fullname: '', company: '',charge: '',})
      navigate('/');
      } else {
      }
    })

  };

  const handleSignUp = () => {

    console.log('------------handleSignUp-----------')

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        "username": form.name,
        "email": form.email,
        "password": form.password
      }
    }
    
    console.log(options)
    
    // const response = fetch(`${API_URL}${ENDPOINT_SIGNIN}`, options);
    
    helpHttp().post(`${API_URL}${ENDPOINT_SIGNUP}`, options).then((res) => {
      if (!res.err && !(res instanceof TypeError)) {
        console.log('-----------------------AllItsOK-----------------------------', res)
        handleSignIn()
      } else {
        console.log('-----------------------SomeThingsIsBad-----------------------------')
      }
    })

  };

  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Join us today
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your email and password to register
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput type="text" label="Name" name="name" value={form.name} onChange={handleChange} variant="standard" fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="email" label="Email" name="email" value={form.email} onChange={handleChange} variant="standard" fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Password" name="password" value={form.password} onChange={handleChange} variant="standard" fullWidth />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Checkbox name="terms" value={form.terms} onChange={handleChange}/>
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;I agree the&nbsp;
              </MDTypography>
              <MDTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                color="info"
                textGradient
              >
                Terms and Conditions
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" onClick={handleSignUp} fullWidth>
                sign up
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Already have an account?{" "}
                <MDTypography
                  component={Link}
                  to={routes.find(route => route.key === 'sign-in').route}
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  
                  textGradient
                >
                  Sign In
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default SignUp;
