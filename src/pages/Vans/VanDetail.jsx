/* eslint-disable react/react-in-jsx-scope */
import { useGetVans } from '../../Utils/Hooks'
import { Link, useParams, useLocation } from 'react-router-dom'
import '../../styles/VansDetail.css'

export const VansDetail = () => {
  const { vans, isLoading, error } = useGetVans()
  const { id } = useParams()

  const loadingClass = vans ? 'vans-detail-section' : 'vans-detail-section-loading'
  const urlParam = useLocation()
  const search = urlParam.state?.search || ''
  const backBtnText = urlParam.state?.type || 'all'

  if (isLoading) {
    return <h1 className='loading'>Loading...</h1>
  }
  if (error) {
    return <h1 className='error'>{error.message}</h1>
  }
  return (
    <section className={loadingClass}>
      {vans
        ? (<><span>{'<-'}</span><Link className='links go-back-link ' relative='path'
        to={`..?${search}`}>Back to  {backBtnText} vans </Link>
          {vans.map(e => {
            return (
              e.id === id &&
              <div className='vans-detail-container' key={e.id}>
                <img className='vans-detail-image' src={e.imageUrl} alt="" />
                <button style={{
                  alignSelf: 'start',
                  background: e.type === 'luxury'
                    ? '#161616'
                    : e.type === 'rugged'
                      ? '#115E59'
                      : e.type === 'simple' ? '#E17654' : ''
                }}
                  className='buy-button vans-detail-button'>{e.type}</button>
                <h1>{e.name}</h1>
                <p style={{ fontSize: '16px' }}><strong>${e.price}</strong><small>/day</small></p>
                <p>{e.description}</p>
                <button className='rent-van-btn'>Rent this van</button>
              </div>
            )
          })

          }</>)
        : <h1 className='loading'>Loading ...</h1>}
    </section>
  )
}
