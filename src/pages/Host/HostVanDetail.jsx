/* eslint-disable react/react-in-jsx-scope */
import { Link, NavLink, Outlet, useLoaderData, useParams } from 'react-router-dom'
import '../../styles/Host-Vans-Detail.css'
import { useContext, useMemo } from 'react'
import { getVans } from '../../Utils/Hooks'
import { GlobalContext } from '../../components/Layout'

export function hostVansDetailLoader () {
  return getVans()
}

export const HostVansDetail = () => {
  const { userLogged } = useContext(GlobalContext)
  const vans = useLoaderData()
  const { id } = useParams()

  const myStyles = {
    color: 'black',
    textDecoration: 'underline 3px',
    fontWeight: 'bold'
  }

  const renderVan = useMemo(() => {
    if (!vans) return
    const hostVans = [...vans].filter(e => e.hostId === userLogged)
    return [...hostVans].filter(e => e.id === id)
  }, [vans])

  if (!renderVan.some(e => e.id === id)) {
    return
  }

  return (
        <div className={ vans ? '' : 'vans-detail-section-loading ' } style={{ padding: '1em' }}>
          {renderVan
            ? <>
          <Link style={{ textDecoration: 'none' }} to={'../'} relative='path' >{'<-' }
          <span className='go-back-link'>Back to all vans</span> </Link>
          <section className='host-vans-detail-section'>
             <div className='host-vans-detail-section-container' key={renderVan[0]?.id}>
               <img src={renderVan[0]?.imageUrl} alt="" />
               <div>
               <button style={{
                 background:
                 renderVan[0]?.type === 'luxury'
                   ? '#161616'
                   : renderVan[0]?.type === 'rugged'
                     ? '#115E59'
                     : renderVan[0]?.type === 'simple'
                       ? '#E17654'
                       : ''
               }}
                    className='buy-button'>{renderVan[0]?.type}</button>
                   <h3>{renderVan[0]?.name}</h3>
                   <span><strong>${renderVan[0]?.price}</strong>/day</span>
               </div>
             </div>
              <div className='detail-nav-links'>
                <NavLink
                style={ ({ isActive }) => isActive ? myStyles : null } to='.' end >Details</NavLink>
                <NavLink
                style={ ({ isActive }) => isActive ? myStyles : null } to='pricing' >Pricing</NavLink>
                <NavLink
                style={ ({ isActive }) => isActive ? myStyles : null } to='photos' >Photos</NavLink>
              </div>

              <Outlet context={{ id, vans }} ></Outlet>

          </section>
          </>
            : ''} </div>

  )
}
