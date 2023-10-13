import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const Private = () => {
    const {userInfo} = useSelector((state) => state.auth)
  return (
    <div>
       {
            userInfo ? 
            <Outlet />
            :
            <Navigate to={'/login'} replace/> 

        
        } 


    </div>
  )
}

export default Private