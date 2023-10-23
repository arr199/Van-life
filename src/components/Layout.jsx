import React, { createContext, useState } from 'react'
import { Outlet } from 'react-router'
import { Header } from './Header'
import { Footer } from './Footer'

export const GlobalContext = createContext()

export const Layout = () => {
  // manage the current user logged and save the UID to local storage
  // once the user sign out we delete the uid from local storage
  const [userLogged, setUserLogged] = useState(JSON.parse(localStorage.getItem('loggedIn')) ?? null)

  return (
           <GlobalContext.Provider value={{ userLogged, setUserLogged }}>
           <div className='pages'>
              <main className='main-content'>
                <Header></Header>

                <Outlet></Outlet>
              </main>
              <Footer></Footer>
           </div>
           </GlobalContext.Provider>
  )
}
