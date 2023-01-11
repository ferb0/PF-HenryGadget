import React from 'react'
import { Box,Divider, Typography } from '@mui/material'
import shipping from '../../Assets/shipping.png'
import Cards from '../../Assets/Cards.png'
import GooglePay from '../../Assets/GooglePay.png'
import Attention from '../../Assets/Attention.png'

function Services() {
  return (
    <section style={{
      marginTop:'7rem',
      marginBottom:'8rem'
    }}>
      <Box
        sx={{
          width:'90%',
          height:'15rem',
          backgroundColor:'rgb(242,242,242)',
          margin:'auto',
          borderRadius:'10px',
          boxShadow:'0px 0px 2px rgb(180,180,180)',
          display:'flex'
        }}
      >
        <Box
          sx={{
            width:'33%',
            display:'flex',
            placeItems:'center',
            justifyContent:'center',
            gap:'4rem'
          }}
        >
         <img 
          src={shipping} 
          alt='shipping' 
          style={{
            width:'13rem',
            height:'13rem',
            objectFit:'contain'
          }}
          />
         <Box sx={{
          display:'flex',
          flexDirection:'column'

         }}>
          <Typography variant='h3'sx={{fontWeight:'bold'}}>Free</Typography>
          <Typography variant='h4'>Shipping</Typography>
         </Box>
        </Box>

        <Divider orientation="vertical" variant='middle' flexItem sx={{width:'1rem',backgroundColor:'rgb(0,0,232)'}} />
        <Box
          sx={{
            width:'33%',
            display:'flex',
            flexDirection:'column',
            height:'100%'
          }}
        >
          <Typography variant='overline' sx={{fontSize:'1.1rem',marginTop:'10px'}}>
             Pay width credit, debit or cash
          </Typography>
          <Box sx={{display:'flex',placeItems:'center',justifyContent:'center',width:'100%'}}>
            <img 
              src={Cards} 
              alt='PaymentsCards' 
              style={{
                width:'13rem',
                height:'13rem',
                objectFit:'contain'
              }}
            />
            <img 
              src={GooglePay} 
              alt='PaymentsCards' 
              style={{
                width:'4rem',
                height:'4rem',
                objectFit:'contain'
              }}
            />

          </Box>

        </Box>
        <Divider orientation="vertical" variant='middle' flexItem sx={{width:'1rem',backgroundColor:'rgb(0,0,232)'}} />
        <Box
          sx={{
            width:'33%',
            // backgroundImage:`url(${Attention})`,
            // backgroundRepeat:'no-repeat',
            // backgroundSize:'contain',
            // backgroundPosition:'center'
            height:'100%'
          }}
        >
          <img 
              src={Attention} 
              alt='CustomerServices' 
              style={{
                width:'50%',
                height:'80%',
                objectFit:'contain'
              }}
          />
          <Typography variant='h4' sx={{color:'white',textShadow:'1px 1px 7px rgba(0,0,0,0.4)',fontWeight:'bold'}}>Customer support</Typography>
        </Box>
      </Box>
    </section>
  )
}

export default Services