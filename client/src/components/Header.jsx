import React from 'react'
import { assets } from '../assets/assets';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { useApp } from '../context/AppContext';

const Header = () => {

  const {userData} = useApp();
  return (
    <Container className='d-flex flex-column align-items-center justify-content-center text-center mt-5' >
      <Image src={assets.header_img} className='h-auto image-c-width' roundedCircle/>
        <h1 className=' h3 fw-semibold mt-4'> Hey {userData ? userData.name : 'Developer'}! <Image src={assets.hand_wave} width={35} /></h1>
        <h2 className='display-4 fw-bold mb-3'> Welcome to our app</h2>
        <p className='fs-4 ps-2 mb-4 custom-width'> Let's start with a quick product tour and we will have you up and running in no time!</p>
        <Button variant="outline-dark" className='fs-4 px-5 rounded-5'>Get Started</Button>
    </Container>
  )
}

export default Header