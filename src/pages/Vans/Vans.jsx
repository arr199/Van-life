/* eslint-disable react/react-in-jsx-scope */
// eslint-disable-next-line no-unused-vars
import '../../styles/Vans.css'
import { Link, useSearchParams, useLoaderData } from 'react-router-dom'
import { getVans } from '../../Utils/Hooks'
import { motion } from 'framer-motion'
import { hoverEffect } from '../../assets/motion/motions'

export function vansLoader () {
  return getVans()
}

export const Vans = () => {
  const vans = useLoaderData()
  const loadingClass = vans ? 'vans-section' : 'vans-detail-section-loading'
  const [searchParams, setSearchParams] = useSearchParams()

  function handleFilterChange (key, value) {
    setSearchParams(oldParams => {
      if (value === null) {
        oldParams.delete(key)
      } else {
        oldParams.set(key, value)
      }
      return oldParams
    })
  }

  // creating the filters url paramaters (type , page etc)
  const typeFilterParam = searchParams.get('type')
  const pageFilterParam = searchParams.get('page')
  let typeFilter = typeFilterParam ? [...vans].filter(e => e.type === typeFilterParam) : vans
  // adding pagination here //
  typeFilter = pageFilterParam ? [...typeFilter].filter((e, index) => index < pageFilterParam) : typeFilter

  return (
    <>
      <section className='header-section' >
        <header className='vans-header'>
          <h1 className='title'>Explore our van options</h1>
          <div className='filter-options'>
            <button
            onClick={() => handleFilterChange('type', 'simple') } className={typeFilterParam === 'simple' ? 'simple simple-selected' : 'simple'}>Simple</button >
            <button
            onClick={() => handleFilterChange('type', 'luxury') } className={typeFilterParam === 'luxury' ? 'luxury luxury-selected' : 'luxury'}>Luxury</button >
            <button
            onClick={() => handleFilterChange('type', 'rugged') } className={typeFilterParam === 'rugged' ? 'rugged rugged-selected' : 'rugged'}>Rugged</button >
           { typeFilterParam ? <button onClick={() => handleFilterChange('type', null)} className='clear-filters'>ClearFilters</button > : null}
          </div>
        </header>
      </section>
      <section className={loadingClass}>
        {typeFilter
          ? typeFilter.map((e, index) => {
            return (

             <div className='vans-container' key={e.id} >
                <Link onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} state={{ search: searchParams.toString(), type: typeFilterParam }}
                className='vans-link' to={e.id}>

                    <motion.div {...hoverEffect} >
                       <img className='van-image' src={e.imageUrl} alt="a van image" loading='lazy'/>
                    </motion.div>

                  <div className='vans-info'>
                    <h3>{e.name}</h3>
                    <h3 className='vans-price'>${e.price}<br /><small className='day'>/day</small></h3>
                  </div>
                  <button style={{
                    background:
                      e.type === 'luxury'
                        ? '#161616'
                        : e.type === 'rugged'
                          ? '#115E59'
                          : e.type === 'simple'
                            ? '#E17654'
                            : ''
                  }}
                    className='buy-button'>{e.type}</button>
                </Link>
              </div>

            )
          })
          : ''}

      </section>
    </>

  )
}
