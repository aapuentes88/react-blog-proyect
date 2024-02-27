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

// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { Container } from '@mui/material';

// Material Dashboard 2 React components
import MDBox from "components/MDBox/MDBox";
import MDTypography from "components/MDTypography/MDTypography";

// Material Dashboard 2 React example components
import Footer from 'components/Footer';
import ProfileInfoCard from "components/Cards/InfoCards/ProfileInfoCar";

// Overview page components
import Header from "components/Header";
import ProfileHeader from "layouts/profile/Header/ProfileHeader";

import PageLayout from "layouts/containers/PageLayout";
import React, { useContext, useRef, useState } from "react";

import burceMars from "assets/images/bruce-mars.jpg";
import MDAvatar from "components/MDAvatar/MDAvatar";
import AuthContext from "context/components/AuthContext";

//Edith photo
import IconButton from "@mui/material/IconButton";
import AddPhotoIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

import Cookies from 'js-cookie';
import { API_URL, ENDPOINT_PROFILE_PHOTO } from "constants/api";
import { helpHttp } from "helpers/helpHttp";

import { sections } from 'constants/objects';

const profileInfo =  {  
  fullname: '',
  company: '',
  charge: '',
}

function Profile() {
  console.log('Profile')

  const [isEditMode, setIsEditMode] = useState(false); // Estado para controlar el modo de edición
  const [selectedImage, setSelectedImage] = useState(null); // Estado para almacenar la imagen seleccionada
  const [photo, setPhoto] = useState(null); // Estado para almacenar la imagen seleccionada
  const fileInputRef = useRef(null);
  const {profile} = useContext(AuthContext)

  console.log(profile)
  
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
    setPhoto(file);
  };

  const handlePhotoUpload = (event) => {
    const token = Cookies.get('token');  // token almacenado previamente

    const formData = new FormData();
    formData.append('photo', photo);
    
    //Muchos cambios a realizar en el helper para que funcione mejor hacerlo asi
    fetch(`${API_URL}${ENDPOINT_PROFILE_PHOTO}`, {
      method: "POST",
      body: formData, //Cdo se envia un archivo no se serializa con JSON.stringify y en el header se obvia el content-type
      headers: {
         'Authorization': `Bearer ${token}`
         //Esto se obvia para que el navegdor lo haga automatico
        // 'Content-Type': `multipart/form-data; boundary=-WebKitFormBoundaryfgtsKTYLsT7PNUVD`,
      }
    })
    .then(response => response.json()) 
    .then(json => {
      console.log('json')
      setIsEditMode(false);
    })
    .catch(err => console.log(err))    
  }

  const handleAddAvatar = () => {
    fileInputRef.current.click();
    setIsEditMode(true);
  };

  React.useEffect(() => {
    const token = Cookies.get('token');  // token almacenado previamente
    console.log('Profile useEffect profile')

    if (token) {
      const options = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      }
  
      helpHttp()
      .get(`${API_URL}${ENDPOINT_PROFILE_PHOTO}`, options)
      .then((response) => {
         console.log('aquiiiii ----> ', response.photoUrl)
         setSelectedImage(response.photoUrl)
      })
    
    }

  }, []);

  return (
      <PageLayout>
      <Container maxWidth="lg">
      {/* <MDBox mb={2} /> */}
      <Header title="Profile"  sections={sections}/>
      <ProfileHeader>
          <Grid container spacing={2} >
          
            <Grid item xs={8} md={8} xl={8} sx={{ display: "flex" }}>
              <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
              <ProfileInfoCard
                title="profile information"
                action={{ route: "", tooltip: "Edit Profile" }}
                shadow={false}
              />
              <Divider orientation="vertical" sx={{ mx: 0 }} />
            </Grid>
           
          <Grid item xs={4} md={4} xl={4}  >
            <MDBox height="100%" mt={3} lineHeight={1} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <Grid item sx={{ position: 'relative'}}>
                <MDAvatar src={selectedImage} alt="profile-image" size="xxl" shadow="sm"
                sx={{ cursor: 'pointer', position: 'relative', zIndex: '1 !important'}} > 
                </MDAvatar>

                <input type="file" accept="image/*" onChange={handleImageChange} ref={fileInputRef} hidden/>
                  <MDBox
                  sx={{
                    position: 'absolute',
                    bottom: '-8%',
                    right: '-8%',
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    padding: '4px',
                    zIndex: '2 !important'
                   
                  }}
                > 
                  {!selectedImage && <IconButton onClick={handleAddAvatar}><AddPhotoIcon /></IconButton>}
                  {selectedImage && isEditMode && (<IconButton onClick={handlePhotoUpload}><SaveIcon /></IconButton>)} 
                  {selectedImage && !isEditMode && (<IconButton onClick={handleAddAvatar}><EditIcon /></IconButton>)}
                </MDBox>
              </Grid>
              <MDTypography variant="h5" mt={2} fontWeight="medium">
                {profile?.fullname?.split(' ')[0].concat(' ').concat(profile?.fullname?.split(' ')[1])}
              </MDTypography>
              <MDTypography variant="button" mt={1} color="text" fontWeight="regular">
                {`${profile?.company} / ${profile?.charge}`}
              </MDTypography>
              <MDTypography variant="button" verticalAlign="bottom" textTransform="capitalize" mt={3} color="text" fontWeight="regular">
              “Take risks now and do something bold. You won’t regret it.” – Elon Musk 
              </MDTypography>
            </MDBox>
          </Grid>
          </Grid>
      </ProfileHeader>
      <Footer />
      </Container>
      </PageLayout>
  );
}

export default Profile;




                {/* 
                
                  const handleCancelEditMode = () => {
    // setIsEditMode(false);
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setPhoto(null)
  };
                
                {isEditMode ? (
                <>
                 <input type="file" accept="image/*" onChange={handleImageChange} />
                   <IconButton onClick={handleCancelEditMode}>
                   Cancel
                  </IconButton>
                </>
                ) : (
                  <MDBox
                  sx={{
                    position: 'absolute',
                    bottom: '-7%',
                    right: '-8%',
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    padding: '4px',
                    zIndex: '2 !important'
                   
                  }}
                > 
                  {!selectedImage && <IconButton onClick={handleEditMode}><AddPhotoIcon /></IconButton>}
                  {selectedImage && (<IconButton onClick={handleRemoveImage}><AddPhotoIcon /></IconButton>)} 
                  {{selectedImage && (<><IconButton onClick={handleRemoveImage}><DeleteIcon /></IconButton>
                                    <button onClick={handlePhotoUpload}>Guardar</button></>)}}
                </MDBox>
                )}  */}