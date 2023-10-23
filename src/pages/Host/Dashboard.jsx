/* eslint-disable react/react-in-jsx-scope */
import { useGetHostVans } from '../../Utils/Hooks'
import { Link } from 'react-router-dom'
import { BsStarFill } from 'react-icons/bs'
import '../../styles/Host-Dashboard.css'

export const Dashboard = () => {
  const { hostVans, isLoading, error } = useGetHostVans()

  if (error) {
    return <h1>Error: {error.message}</h1>
  }

  return (
      <>
      <section className="host-dashboard-earnings">

        <div className="info">
          <h1>Welcome!</h1>
          <p>Income last <span>30 days</span></p>
          <h2>$2,260</h2>
        </div>

        <Link to="income">Details</Link>
      </section>
      <section className="host-dashboard-reviews">
        <h2>Review score</h2>

        <BsStarFill className="star" />

        <p>
          <span>5.0</span>/5
        </p>
        <Link to="reviews">Details</Link>
      </section>

      <section className="host-dashboard-vans">
      <Link to='list' className='list-now-btn'>List Now!</Link>
                <div className="top">

                    <h2 >Your listed vans</h2>
                    <Link to="vans">View all</Link>
                </div>
                {
                    isLoading && !hostVans
                      ? <h1>Loading...</h1>
                      : (
                        <div className='host-vans-list'>
                                {hostVans && hostVans.map((van) => (
            <div className="host-van-single" key={van.id}>
                <img className='dashboard-van-image' src={van.imageUrl} alt={`Photo of ${van.name}`} />
                <div className="host-van-info">
                    <h3>{van.name}</h3>
                    <p>${van.price}/day</p>
                </div>
                <Link to={`vans/${van.id}`}>View</Link>
            </div>
                                )) }
                         </div>
                        )
                }

            </section>

    </>
  )
}
