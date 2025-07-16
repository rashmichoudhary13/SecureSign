import React, { useState } from 'react'
import Image from 'react-bootstrap/Image';
import { assets } from '../assets/assets';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import OtpForm from '../components/OtpForm';
import { useApp } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const navigate = useNavigate();

  const inputRefs = React.useRef([])

  const {backendUrl} = useApp();
  axios.defaults.withCredentials = true;

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);

  const onSubmitEmail = async(e) => {
    e.preventDefault();
    try{
      const {data} = await axios.post(backendUrl + '/api/auth/send-reset-otp', {email})

      if(data.success){
        toast.success(data.message);
        setIsEmailSent(true)
      }else{
        toast.error(data.message);
      }
    }catch(error){
      toast.error(error.message);
    }
  }

  const onSubmitOtp = async(e) => {
    e.preventDefault();
    const otpArray = inputRefs.current.map((e) => e.value);
    const otp = otpArray.join('');
    setOtp(otp);
    setIsOtpSubmitted(true);
  }

  const onSubmitNewPassword = async(e) => {
    e.preventDefault();
    try{
      const {data} = await axios.post(backendUrl + '/api/auth/reset-password', {email, otp, newPassword});

      data.success ? toast.success(data.message) : toast.error(data.message);
      data.success && navigate('/login');

    }catch(error){
      toast.error(error.message);
    }
  }

  return (
    <div className="min-vh-100 d-flex flex-column bg-c-gradient">
      <div className='mt-3' style={{ marginLeft: '4rem' }} onClick={() => navigate('/')}>
        <Image src={assets.logo} />
      </div>

      {/* Enter email id form */}
      {!isEmailSent &&

        <div className='flex-grow-1 d-flex align-items-center justify-content-center' >
          <div className='card bg-custom-card text-white rounded-2 p-4 rounded-4' style={{ width: '30%' }}>
            <div className='card-body'>
              <div className='text-center'>
                <h2> Reset Password </h2>
                <p> Enter your registered email address </p>
              </div>

              <form onSubmit={onSubmitEmail}>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Email address"
                  className="my-4"
                >
                  <Form.Control type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className='bg-custom-dark text-white border-0' />
                </FloatingLabel>

                <Button type="submit" className='w-100 rounded-5 bg-button-color border-0 py-2'>Submit</Button>
              </form>
            </div>
          </div>
        </div>}

      {/* Enter otp form  */}
      {isEmailSent && !isOtpSubmitted &&

        <div className='flex-grow-1 d-flex align-items-center justify-content-center' >
          <div className='card bg-custom-card text-white rounded-2 p-4 rounded-4' style={{ width: '30%' }}>
            <div className='card-body'>
              <div className='text-center'>
                <h2> Reset Password OTP </h2>
                <p> Enter the 6-digit code sent to your email id </p>
              </div>

              <form onSubmit={onSubmitOtp}>
                <OtpForm inputRefs={inputRefs} />

                <Button type="submit" className='w-100 rounded-5 bg-button-color border-0 py-2'>Submit</Button>
              </form>
            </div>
          </div>
        </div>}

      {/* Enter newPassword form  */}
      {isEmailSent && isOtpSubmitted &&
        <div className='flex-grow-1 d-flex align-items-center justify-content-center' >
          <div className='card bg-custom-card text-white rounded-2 p-4 rounded-4' style={{ width: '30%' }}>
            <div className='card-body'>
              <div className='text-center'>
                <h2> New Password </h2>
                <p> Enter the new password below </p>
              </div>

              <form onSubmit={onSubmitNewPassword}>
                <FloatingLabel
                  controlId="floatingInput"
                  label="New Password"
                  className="my-4"
                >
                  <Form.Control type="password" placeholder="name@example.com" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className='bg-custom-dark text-white border-0' />
                </FloatingLabel>

                <Button type="submit" className='w-100 rounded-5 bg-button-color border-0 py-2'>Submit</Button>
              </form>
            </div>
          </div>
        </div>}

    </div>
  )
}

export default ResetPassword