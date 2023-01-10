import React, { useEffect } from 'react';
import Slider from '../Slider/Slider';
import styles from './LandingPage.module.css';
import Aos from 'aos'
import 'aos/dist/aos.css'
import OurServices from '../OurServices/OurServices';
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts';
import DiscountProducts from '../DiscountProducts/DiscountProducts';



const LandingPage = () => {
  // const featured = useSelector(state => state.featured); // para cuando haya productos destacados

  useEffect(()=>{
    Aos.init({
    })
  },[])

  return (
    <section className={ styles.container }>   
      <Slider/> 
      <DiscountProducts/>
      <FeaturedProducts />

      <section  id='anchor-services' style={{height:'100vh'}} >
        <OurServices/>
      </section>
      
    </section>
  )
}

export default LandingPage;