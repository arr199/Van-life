import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import '../../styles/Login-Page.css'
import { useContext, useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
/* eslint-disable react/react-in-jsx-scope */
import { GlobalContext } from '../../components/Layout'

export const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()
  const [loginFirstMessage, setLoginFirstMessage] = useState(location.state?.message || '')
  const previousLocation = location.state?.location || '/host'

  const { userLogged, setUserLogged } = useContext(GlobalContext)
  // checking for the user email and passoword
  function handleSubmit (e) {
    e.preventDefault()
    setStatus('submitting')
    setLoginFirstMessage(null)
    async function loginUser (credentials) {
      const auth = getAuth()
      signInWithEmailAndPassword(auth, credentials.email, credentials.password)
        .then((userCredentials) => {
          const user = userCredentials.user

          localStorage.setItem('loggedIn', JSON.stringify(user?.uid || ''))
          setUserLogged(e => {
            return user.uid
          })
          navigate(previousLocation, { replace: true })
          setStatus('idle')
        })
        .catch(err => {
          setStatus('idle')
          setError(err)
        }).finally(() => setStatus('idle'))
    }
    loginUser(formData)
  }

  if (userLogged) {
    <Navigate replace to='/vans'></Navigate>
  }

  return (

          <div className="container">
         { userLogged && <h2>Successfully Authenticated</h2> }
         { loginFirstMessage && <h3 className='login-first-message' style={{ color: 'red' }}>{loginFirstMessage}</h3> }
          <form onSubmit={handleSubmit} className="login-form">
              <h1>Sign in to your account</h1>
              { error?.message && <h4 style={{ color: 'red', fontSize: '14px' }}>{error.message.split('Firebase:')[1]}</h4> }
              <input value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className='email' placeholder="Email address" type='email'/>
              <input value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value }) } className='password' placeholder="Password" type='password' />
              {error && <p style={{ marginBottom: '-20px' }}> <Link state={{ email: formData.email }} style={{ margin: 0 }} to='/resetpassword'>Forgot password ?</Link></p>}
              <button style={{ backgroundColor: status === 'submitting' ? 'gray' : '' }}
                      disabled={ status === 'submitting' || formData.email === '' || formData.password === ''} >
                {status === 'submitting' ? 'Loggin in...' : 'Sign in'}</button>
              <p style={{ margin: '0px' }}>Don&apos;t have an account? <Link style={{ margin: '0px' }} to='/signUp'>Create one now</Link></p>

          </form>
          </div>

  )
}
