/* eslint-disable react/react-in-jsx-scope */
import '../../styles/Host-Vans.css'
import { Link, useLoaderData } from 'react-router-dom'
import { getVans } from '../../Utils/Hooks'
import { GlobalContext } from '../../components/Layout'
import { useContext, useMemo } from 'react'

export function hostVansLoader () {
  return getVans()
}

export const HostVans = () => {
  const vans = useLoaderData()
  const { userLogged } = useContext(GlobalContext)

  const hostVans = useMemo(() => {
    if (!vans) return
    return [...vans].filter(e => e.hostId === userLogged)
  }, [])

  return (
     <section className={ hostVans ? 'host-vans-section' : 'vans-detail-section-loading ' } >

          {hostVans
            ? hostVans.map(e =>
            <Link onClick={ () => window.scrollTo({ top: 0, behavior: 'smooth' })} relative='path' to={e.id} className='host-vans-section-container' key={e.id}>
                <img className='host-vans-image' src={e.imageUrl} alt="" />
                <div>
                    <h3 >{e.name}</h3>
                    <span>${e.price}/day</span>
                </div>
            </Link>
            )
            : '' }
            {hostVans.length === 0 && <h1>You have no vans for rent</h1>}
     </section>
  )
}
