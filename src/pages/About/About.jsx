/* eslint-disable react/react-in-jsx-scope */
import bgImg from '../../assets/images/about-hero.png'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { slideAnimation } from '../../assets/motion/motions'
export const About = () => {
  return (
      <div className="about-page-container">
        <motion.div {...slideAnimation('left', 0.1)}>
      <img src={bgImg} className="about-hero-image" />
        </motion.div>
    <motion.div {...slideAnimation('right', 0.3)}>
    <div className="about-page-content">
          <h1>Don’t squeeze in a sedan when you could relax in a van.</h1>
          <p>Our mission is to enliven your road trip with the perfect travel van rental. Our vans are recertified before each trip to ensure your travel plans can go off without a hitch. (Hitch costs extra 😉)</p>
      </div>
    </motion.div>
    <motion.div {...slideAnimation('left', 0.4)}>
      <div className="about-page-cta">
          <h2>Your destination is waiting.<br />Your van is ready.</h2>
          <Link className="link-button" to="/vans">Explore our vans</Link>
      </div>
    </motion.div>
  </div>
  )
}
