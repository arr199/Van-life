/* eslint-disable react/react-in-jsx-scope */
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { About } from './pages/About/About.jsx'
import { Vans, vansLoader } from './pages/Vans/Vans'
import { VansDetail } from './pages/Vans/VanDetail'
import { Layout } from './components/Layout'
import { Dashboard } from './pages/Host/Dashboard'
import { Income } from './pages/Host/Income'
import { Reviews } from './pages/Host/Reviews'
import { HostLayout } from './components/HostLayout'
import { HostVans, hostVansLoader } from './pages/Host/HostVans'
import { HostVansDetail, hostVansDetailLoader } from './pages/Host/HostVanDetail'
import { Details } from './pages/Host/HostVanDetails/Details'
import { Pricing } from './pages/Host/HostVanDetails/Pricing'
import { Photos } from './pages/Host/HostVanDetails/Photos'
import { PageNotFound } from './pages/PageNotFound'
import { LoginPage } from './pages/Login/LoginPage'
import { Auth } from './pages/Login/Auth'
import { SignUp } from './pages/Login/SignUp'
import { ResetPassword } from './pages/Login/ResetPassword'
import { LoggeUserProtectedRoutes } from './pages/Login/LoggedUserProtected'
import { VansError } from './pages/Vans/VanError'
import { ListNow } from './pages/Host/ListVans'

export const App = () => {
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Layout />}>

            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="vans" element={<Vans />} loader={vansLoader} errorElement={<VansError></VansError>} />

            <Route path='resetpassword' element={<ResetPassword></ResetPassword>} ></Route>
            <Route path="vans/:id" element={<VansDetail />} />

            {/* ///    PROTECTED ROUTES  FOR LOGGED  USERS   //// */ }
            <Route element={<LoggeUserProtectedRoutes></LoggeUserProtectedRoutes>} >
              <Route path='login' element={<LoginPage></LoginPage>}></Route>
              <Route path='signUp' element={<SignUp></SignUp>} ></Route>
            </Route>

             {/* ///    PROTECTED ROUTES  FOR LOGGED OUT USERS   //// */ }
            <Route element={<Auth></Auth>}>
              <Route path='host' element={<HostLayout/>} >
                  <Route index element={<Dashboard />}/>
                  <Route path="income" element={<Income />} />
                  <Route path="reviews" element={<Reviews />} />
                  <Route path='vans' element={<HostVans></HostVans>} loader={hostVansLoader}/>
                  <Route path="list" element={<ListNow />} />
                  <Route path='vans/:id' element={<HostVansDetail></HostVansDetail>} loader={hostVansDetailLoader} >
                        <Route index element={<Details></Details>}></Route>
                        <Route path="pricing" element={<Pricing></Pricing>}></Route>
                        <Route path="photos" element={<Photos></Photos>}></Route>
                  </Route>
              </Route>
            </Route>
            <Route path='*' element={<PageNotFound></PageNotFound>}></Route>
        </Route>
  ))

  return (
    <RouterProvider router={router}></RouterProvider>

  )
}
