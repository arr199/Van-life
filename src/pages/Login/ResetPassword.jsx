/* eslint-disable no-unused-vars */
import { Link, useLocation, useNavigate } from 'react-router-dom'
import '../../styles/Login-Reset-Password.css'
import { useState } from 'react'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'

const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for
  // this URL must be whitelisted in the Firebase Console.
  url: 'http://localhost:5173/login'
  // This must be true for email link sign-in.

}

/* eslint-disable react/react-in-jsx-scope */
export const ResetPassword = () => {
  const [formData, setFormData] = useState({ email: useLocation().state?.email || '' })
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState(null)

  // reseting the user password
  function handleSubmit (e) {
    setError('')
    setStatus('submitting')
    e.preventDefault()
    const auth = getAuth()
    async function resetPassword () {
      try {
        const res = await sendPasswordResetEmail(auth, formData.email)
      } catch (err) {
        console.log(err)
        setError(err)
        setStatus('idle')
      } finally {
        setStatus('idle')
      }
    }
    resetPassword()
  }

  return (

          <div className="reset-password-container">
          <form onSubmit={handleSubmit} className="reset-password-login-form">
              <h1>Reset your Password</h1>
              { error?.message && <h4 >{error.message.split('Firebase:')[1] }</h4> }
              <input value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className='reset-password-email' placeholder="Email address" type='email'/>
              <button style={{ backgroundColor: status === 'submitting' ? 'gray' : '' }}
                      disabled={ status === 'submitting' || formData.email === '' } >
                {status === 'submitting' ? 'Sending Email...' : 'Send Email'}</button>
                <Link to='/login' className='reset-password-goback-btn'>{'<-'}Go back</Link>
          </form>
          </div>

  )
}
