/* eslint-disable react/react-in-jsx-scope */
import { Outlet } from 'react-router'
import { NavLink } from 'react-router-dom'
import '../styles/NavLinks.css'

export const HostLayout = () => {
  return (
        <><section className='host-section'>
                <nav className='host-navbar'>
                    <NavLink
                    className={ ({ isActive }) => isActive ? 'current-host-link' : 'host-navlinks' }
                    to='.' end >Dashboard</NavLink>
                    <NavLink
                    className={ ({ isActive }) => isActive ? 'current-host-link' : 'host-navlinks' }
                    to='income' >Income</NavLink>
                    <NavLink
                    className={ ({ isActive }) => isActive ? 'current-host-link' : 'host-navlinks' }
                    to='reviews' >Reviews</NavLink>
                    <NavLink className={({ isActive }) => isActive ? 'current-host-link' : 'host-navlinks'}
                    to='vans'> Vans </NavLink>
                     <NavLink className={({ isActive }) => isActive ? 'current-host-link' : 'host-navlinks'}
                    to='list'> List Now ! </NavLink>

                </nav>
            <Outlet></Outlet>
            </section>
        </>

  )
}
