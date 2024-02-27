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

// react-routers components
import { Link } from "react-router-dom";

// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox/MDBox";
import MDTypography from "components/MDTypography/MDTypography";

// Material Dashboard 2 React base styles
import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";
import React, { useContext, useState } from "react";
import MDButton from "components/MDButton/MDButton";
import MDInput from "components/MDInput/MDInput";

import Cookies from 'js-cookie';
import { API_URL, ENDPOINT_PROFILE } from "constants/api";
import { helpHttp } from "helpers/helpHttp";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import AuthContext from "context/components/AuthContext";

// TO-DO ts files typing
// interface ProfileInfo {  
//     fullname: string;
//     company: string;
//     charge: string;
//     description: string;
//     location: string;
//     social: string[];  
// }

const profileInfo =  {  
  fullname: '',
  company: '',
  charge: '',
  description: '',
  location: '',
  social: [] 
}

const socialIconList = [ <FacebookIcon/>, <TwitterIcon />, <InstagramIcon />]
const socialColorList = [ 'facebook', 'twitter', 'instagram']

function ProfileInfoCard({ title, action, shadow }) {
  console.log('ProfileInfoCar1')

  const labels = [];
  const values = [];
  const { socialMediaColors } = colors;
  const { size } = typography;

  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState(profileInfo)
  const [formChanges, setFormChanges] = useState({})
  const {profile, setProfile} = useContext(AuthContext)

  console.log('ProfileInfoCar2')

  const {id, description, social, ...info} = form

  const handleEditing = () => {
    if(editing){
       save()
       setFormChanges({})
       const p = {fullname: form.fullname, company: form.company, charge: form.charge}
       let {fullname, company, charge} = formChanges
       if(fullname) p.fullname = fullname
       if(company) p.company = company
       if(charge) p.charge = charge
       setProfile(p)
    }
    console.log("--------------handleEditing---------")
    setEditing(!editing)
  }

  const save = () => {
    const token = Cookies.get('token');  // token almacenado previamente

    const {...updatedProfile} = {...formChanges }
    if (token) {
      const options = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: {
          ...updatedProfile
        }
      }
      
      helpHttp()
      .patch(`${API_URL}${ENDPOINT_PROFILE}`, options)
      .then((response) => {
         console.log('Patch success')
         console.log(response)
      })
    
    }
  }

  const handleChange = (e) => { 
    setForm({...form, [e.target.name]: e.target.value})
    setFormChanges({...formChanges, [e.target.name]: e.target.value})
  }
  // Convert this form `objectKey` of the object key in to this `object key`
  Object.keys(info).forEach((el) => {
    if (el.match(/[A-Z\s]+/)) {
      const uppercaseLetter = Array.from(el).find((i) => i.match(/[A-Z]+/));
      const newElement = el.replace(uppercaseLetter, ` ${uppercaseLetter.toLowerCase()}`);

      labels.push(newElement);
    } else {
      labels.push(el);
    }
  });

  // Push the object values into the values array
  Object.values(info).forEach((el) => values.push(el));

  // Render the card info items
  const renderItems = labels.map((label, key) => {
    console.log(label, key)
    const iT = label !== 'profile photo' ? (
    <MDBox key={label} display="flex" py={1} pr={2} >
      <MDTypography variant="button" fontWeight="bold" textTransform="capitalize" /*style={{border: '2px solid red'}}*/>
        {label}: {'  '}
      </MDTypography>
      <MDInput  type="text" name={label} value={`${values[key]}`} style={{ marginTop: '-2px', marginLeft: '10px' }}
                onChange={handleChange} variant="standard" fullWidth 
                InputProps={{
                  readOnly: !editing,
                }}
                sx={{
                  "& .MuiInput-underline:before": {
                    borderBottom: "none",
                  },
                  "& .MuiInput-underline:after": {
                    borderBottom: "none",
                  },
                }}>
      </MDInput>
    </MDBox>
  ) : (<></>)
  return iT
});

  // Render the card social media icons
  const renderSocial = social.map(({ link, icon, color }) => (
    <MDBox
      key={color}
      component="a"
      href={link}
      target="_blank"
      rel="noreferrer"
      fontSize={size.lg}
      color={socialMediaColors[color].main}
      pr={1}
      pl={0.5}
      lineHeight={1}
    >
      {icon}
    </MDBox>
  ));
  // Adjust social information to render
  const prepareSocialInfo = (social) => (social?.map(element => {
    const index = socialColorList.findIndex(color => element.includes(color));
    
    if (index !== -1) {
      return {
        link: element,
        icon: socialIconList[index],
        color: socialColorList[index],
      };
    }
    
    return [];
  }) ?? []);
  
  React.useEffect(() => {
    const token = Cookies.get('token');  // token almacenado previamente
    console.log('ProfileInfoCard useEffect profile', profile)

    setEditing(!profile.fullname)
    // if( !profile.fullname ){
    //   setEditing(true)
    //   console.log("--------------ESTOY CAMBIANDO A EDICIONNNNNNNN USEEFFECT---------")
    // } else {
    //   setEditing(false)
    // }

    if (token) {
      const options = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
      }
  
      helpHttp()
      .get(`${API_URL}${ENDPOINT_PROFILE}`, options)
      .then((response) => {
         let {social} = response
         social = prepareSocialInfo(social)
         setForm({...response, social })
      })
    
    }

  }, [profile]);

  return (
    <Card sx={{ width: "100%", height: "100%", boxShadow: !shadow && "none" }}>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          {title}
        </MDTypography>
        <MDTypography component={MDButton} onClick={handleEditing}/*component={Link} to={action.route}*/ variant="body2" color="secondary">
          {!editing ? <Tooltip title={action.tooltip} placement="top">
            <Icon>edit</Icon>
          </Tooltip> :
          <Tooltip title="Save Profile" placement="top">
          <Icon>save</Icon>
        </Tooltip>
          }
        </MDTypography>
      </MDBox>
      <MDBox p={2}>
        <MDBox mb={2} lineHeight={1}>
          <MDInput  id="outlined-multiline-static" multiline rows={4}
                    type="text" name="description" value={form.description}
                    onChange={handleChange} variant="standard" fullWidth 
                    InputProps={{
                      readOnly: !editing,
                    }}
                    sx={{
                      "& .MuiInput-underline:before": {
                        borderBottom: "none",
                      },
                      "& .MuiInput-underline:after": {
                        borderBottom: "none",
                      },
                    }}>
          </MDInput>
        </MDBox>
        <MDBox opacity={0.3}>
          <Divider />
        </MDBox>
        <MDBox>
          {renderItems}
          <MDBox display="flex" py={1} pr={2}>
            <MDTypography variant="button" fontWeight="bold" textTransform="capitalize">
              social: &nbsp;
            </MDTypography>
            {renderSocial}
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
}

// Setting default props for the ProfileInfoCard
ProfileInfoCard.defaultProps = {
  shadow: true,
};

// Typechecking props for the ProfileInfoCard
ProfileInfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  info: PropTypes.objectOf(PropTypes.string).isRequired,
  social: PropTypes.arrayOf(PropTypes.object).isRequired,
  action: PropTypes.shape({
    route: PropTypes.string.isRequired,
    tooltip: PropTypes.string.isRequired,
  }).isRequired,
  shadow: PropTypes.bool,
};

export default ProfileInfoCard;
