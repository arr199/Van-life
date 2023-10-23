/* eslint-disable react/react-in-jsx-scope */
import '../styles/PageNotFound.css'
import { Link } from 'react-router-dom'

export const PageNotFound = () => {
  return (
        <main className="not-found-main-container">
            <h1>Sorry, the page you were looking for was not found.</h1>
            <Link to='/' className='return-btn'>Return Home</Link>
        </main>
  )
}
