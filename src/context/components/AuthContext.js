import React, { createContext, useState } from "react";
import Cookies from 'js-cookie';
import { API_URL, ENDPOINT_PROFILE } from "constants/api";
import { helpHttp } from "helpers/helpHttp";

const AuthContext = createContext()

const initialAuth = null
//Aqui podria ademas traer cierta informacion del usuario para tenerla lista para su uso
const profileInfo =  {  
    fullname: '',
    company: '',
    charge: '',
}

const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState(initialAuth)
    const [profile, setProfile] = useState(profileInfo)

    console.log('AuthProvider')

    React.useEffect(() => {
        const token = Cookies.get('token');  // token almacenado previamente
        console.log('AuthProvider React.useEffect')

    
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
             let {fullname, company, charge} = response
             console.log('AuthProvider React.useEffect', fullname, company, charge)
             setProfile({fullname, company, charge})
          })
        
        }
    
      }, [auth]);

    const handleAuth = (e) =>  auth ? setAuth(null) : setAuth(true)

    const data = { auth, profile, setAuth, handleAuth, setProfile }

    return (
        <AuthContext.Provider value={data} >{children}</AuthContext.Provider>
    )
}

export { AuthProvider }
export default AuthContext 