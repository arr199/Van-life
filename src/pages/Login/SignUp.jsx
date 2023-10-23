/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import '../../styles/Login-SignUp.css'
import { Link } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

export const SignUp = () => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState(null)
  const location = useLocation()
  const message = location.state?.message || ''
  const previousLocation = location.state?.location || '/login'
  const navigate = useNavigate()

  function handleSubmit (e) {
    e.preventDefault()
    setStatus('submitting')
    const auth = getAuth()
    async function checkUserCredentials () {
      try {
        // all the new user data
        const userData = await createUserWithEmailAndPassword(auth, formData.email, formData.password) // eslint-disable-line no-unused-vars
        setError(null)
        setStatus('idle')
        navigate(previousLocation, { replace: true })
      } catch (err) {
        setStatus('idle')
        setError(err)
      } finally {
        setStatus('idle')
      }
    }
    checkUserCredentials()
  }

  return (

          <div className="sign-up-container">
         { message && <h3 style={{ color: 'red' }}>{message}</h3> }
          <form onSubmit={handleSubmit} className="sign-up-login-form">
              <h1>Sign up now !</h1>
              { error?.message && <h4 >{error.message.split('Firebase:')[1] }</h4> }
              <input value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className='sign-up-email' placeholder="Email address" type='email'/>
              <input value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value }) } className='sign-up-password' placeholder="Password" type='password' />
              <button style={{ backgroundColor: status === 'submitting' ? 'gray' : '' }}
                      disabled={ status === 'submitting' || formData.email === '' || formData.password === ''} >
                {status === 'submitting' ? 'Creating account...' : 'Sign up'}</button>
                <Link to='/login' className='sign-up-goback-btn'>{'<-'}Go back</Link>
          </form>
          </div>

  )
}
