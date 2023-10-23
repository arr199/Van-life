/* eslint-disable react/react-in-jsx-scope */
import { Outlet, Navigate, useLocation } from 'react-router'
import { GlobalContext } from '../../components/Layout'
import { useContext } from 'react'

export const Auth = () => {
  const location = useLocation()
  const { userLogged } = useContext(GlobalContext)
  // protect all the routes under protected routes
  if (userLogged) return <Outlet></Outlet>
  return <Navigate replace to='/login' state={{ message: 'You must log in first', location: location.pathname }}></Navigate>
}
