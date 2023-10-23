/* eslint-disable react/react-in-jsx-scope */
import { useContext } from 'react'
import { GlobalContext } from '../../components/Layout'
import { Outlet, Navigate } from 'react-router'

export const LoggeUserProtectedRoutes = () => {
  const { userLogged } = useContext(GlobalContext)

  if (userLogged) return <Navigate replace to='/host'></Navigate>

  return (
    <Outlet></Outlet>

  )
}
