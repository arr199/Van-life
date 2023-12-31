import { NavLink } from 'react-router-dom'
import React, { useContext } from 'react'
import { AccountIcon } from '../assets/Icons/AccountIcon'
import { GlobalContext } from './Layout'

export const Header = () => {
  const { userLogged, setUserLogged } = useContext(GlobalContext)

  function handleLogout () {
    localStorage.removeItem('loggedIn')
    setUserLogged(null)
  }

  return (
        <header className='main-header'>
            <NavLink className="site-logo" to="/"> #VanLife </NavLink>
            <nav className='main-navbar'>
                <NavLink
                className={({ isActive }) => isActive ? 'current-home-link' : ''}
                to="/host">Host</NavLink>
                <NavLink
                className={({ isActive }) => isActive ? 'current-home-link' : ''}
                to="/about">About</NavLink>
                <NavLink
                className={({ isActive }) => isActive ? 'current-home-link' : ''}
                to="/vans">Vans</NavLink>
               {!userLogged
                 ? <NavLink to='/login' className='account-icon'>
                  <AccountIcon/>
                </NavLink>
                 : <NavLink to='/login' onClick={handleLogout}>Log out</NavLink>}
            </nav>
        </header>

  )
}
