import React from 'react'
import EffectCubes from './EffectCubes'
import 'aos/dist/aos.css'
function FeaturedProducts() {
  return (
    <div data-aos='flip-down' data-aos-offset='-200' data-aos-duration='1300' data-aos-once='true'  style={{maxWidth:'100%',height:'100vh',backgroundColor:'rgb(242,242,242)'}}>
      <h1 style={{margin:'2.5rem',fontSize:'5rem'}}>Feautered Products</h1>
      <div style={{width:'50%',margin:'auto'}}>
        <EffectCubes></EffectCubes>
      </div>
    </div>
  )
}

export default FeaturedProducts