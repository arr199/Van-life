/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import { Link } from 'react-router-dom'
import '../styles/Home.css'
import { motion } from 'framer-motion'
import { slideAnimation, headContentAnimation, headTextAnimation, fadeAnimation } from '../assets/motion/motions'
import { useEffect } from 'react'
import img1 from '../assets/images/dino-reichmuth-A5rCN8626Ck-unsplash.jpg'
import img2 from '../assets/images/hello.jpg'
import img3 from '../assets/images/jairph-9dHHtSjVmpk-unsplash.jpg'
import img4 from '../assets/images/khamkeo-vilaysing-HD9P-xw2pEE-unsplash.jpg'

export const Home = () => {
  useEffect(() => {
    const images = Array.from(document.querySelectorAll('.home-container > div > img'))

    images.forEach((e, index) => {
      setTimeout(() => {
        e.style.opacity = '1'
        e.style.transition = '1s'
      }, index * 300)
    })
  }, [])

  return (
       <>
       <div className="home-container">

          <div className='home-hero' >
              <motion.div {...headContentAnimation}>
              <h1 >You got the travel plans, we got the travel vans.</h1>
              </motion.div>
              <motion.div {...slideAnimation('left', 0.5)}>
              <p>Add adventure to your life by joining the #vanlife movement. Rent the perfect van to make your perfect road trip.</p>
              </motion.div>
              <motion.div {...slideAnimation('right', 0.7)}>
              <Link to="vans">Find your van</Link>
              </motion.div>
              <motion.div style={{ height: '100%' }}{...slideAnimation('left', 1)} >
              <h1 className='background-h1'>Vanlife</h1>
              </motion.div>
          </div>
          <div className='home-container-image-container'>
            <img className='home-bg-image1 img' src={img1} loading='lazy' alt="" />
            <img className='home-bg-image2 img' src={img2} loading='lazy' alt="" />
            <img className='home-bg-image3 img' src={img3} loading='lazy' alt="" />
            <img className='home-bg-image4 img' src={img4} loading='lazy' alt="" />
          </div>

        </div>

        </>
  )
}
