import React, { useEffect } from 'react'
import Image from 'react-bootstrap/Image';
import { assets } from '../assets/assets';
import Button from 'react-bootstrap/Button';
import { useApp } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import OtpForm from '../components/OtpForm';

const EmailVerify = () => {

  axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  const inputRefs = React.useRef([])

  const {backendUrl, isLoggedIn, userData, getUserData} = useApp();

  const onSubmitHandler = async (e) => {
    try{
      e.preventDefault();
      const otpArray = inputRefs.current.map(e => e.value)
      const otp = otpArray.join('');

      const {data} = await axios.post(backendUrl + '/api/auth/verify-account', {otp});

      if(data.success){
        toast.success(data.message)
        getUserData()
        navigate('/')
      }else{
        toast.error(data.message);
      }

    }catch(error){
      toast.error(error.message);
    }
  }

  useEffect(() => {
    isLoggedIn && userData && userData.isAccountVerified && navigate('/')
  },[isLoggedIn, userData])

  return (
    <div className="min-vh-100 d-flex flex-column bg-c-gradient">
      <div className='mt-3' style={{ marginLeft: '4rem' }} onClick={() => navigate('/')}>
        <Image src={assets.logo} />
      </div>

      {/* OTP box */}
      <div className='flex-grow-1 d-flex align-items-center justify-content-center' >
        <div className='card bg-custom-card text-white rounded-2 p-4 rounded-4' style={{ width: '30%' }}>
          <div className='card-body'>
            <div className='text-center'>
              <h2> Email verify OTP </h2>
              <p> Enter the 6-digit code sent to your email id. </p>
            </div>

            <form onSubmit={onSubmitHandler}>

              <OtpForm inputRefs = {inputRefs}/>

              <Button type="submit" className='w-100 rounded-5 mb-3 bg-button-color border-0 py-2'>Login</Button>
            </form>
          </div>

        </div>
      </div>
    </div> 
  )
}

export default EmailVerify