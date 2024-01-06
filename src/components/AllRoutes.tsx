import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import  routes   from 'routes/routes'
import { AuthProvider } from 'context/components/AuthContext'


const AllRoutes = () => {

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route  path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });


  return (
      <AuthProvider>
      <Routes>
      {getRoutes(routes)}
      <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      </AuthProvider>
  )
}

export default AllRoutes