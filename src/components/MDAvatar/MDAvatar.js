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

import { forwardRef, useState } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Custom styles for MDAvatar
import MDAvatarRoot from "components/MDAvatar/MDAvatarRoot";

// //Edith photo
// import IconButton from "@mui/material/IconButton";
// import AddPhotoIcon from "@mui/icons-material/AddPhotoAlternate";
// import DeleteIcon from "@mui/icons-material/Delete";

const MDAvatar = forwardRef(({ bgColor, size, shadow, /*src, alt,*/ ...rest }, ref) => (
  <MDAvatarRoot ref={ref} ownerState={{ shadow, bgColor, size }} {...rest} />
  // const [isEditMode, setIsEditMode] = useState(false); // Estado para controlar el modo de edición
  // const [selectedImage, setSelectedImage] = useState(null); // Estado para almacenar la imagen seleccionada

  // const handleImageChange = (event) => {
  //   const file = event.target.files[0];
  //   setSelectedImage(URL.createObjectURL(file));
  //   setIsEditMode(false);
  // };

  // const handleEditMode = () => {
  //   setIsEditMode(true);
  // };

  // const handleCancelEditMode = () => {
  //   setIsEditMode(false);
  // };

  // const handleRemoveImage = () => {
  //   setSelectedImage(null);
  // };

  // return (
  //   <>
  //     <MDAvatarRoot ref={ref} ownerState={{ shadow, bgColor, size }} src={selectedImage || src} alt={alt} {...rest} />
  //     {isEditMode ? (
  //       <>
  //         <input type="file" accept="image/*" onChange={handleImageChange} />
  //         <IconButton onClick={handleCancelEditMode}>
  //           Cancel
  //         </IconButton>
  //       </>
  //     ) : (
  //       <>
  //         {!src && <IconButton onClick={handleEditMode}><AddPhotoIcon /></IconButton>}
  //         {src && <IconButton onClick={handleRemoveImage}><DeleteIcon /></IconButton>}
  //       </>
  //     )}
  //   </>
  // );
));

// Setting default values for the props of MDAvatar
MDAvatar.defaultProps = {
  bgColor: "transparent",
  size: "md",
  shadow: "none",
};

// Typechecking props for the MDAvatar
MDAvatar.propTypes = {
  bgColor: PropTypes.oneOf([
    "transparent",
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  size: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl", "xxl"]),
  shadow: PropTypes.oneOf(["none", "xs", "sm", "md", "lg", "xl", "xxl", "inset"]),
};

export default MDAvatar;
