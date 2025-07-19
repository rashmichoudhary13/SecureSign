import React, { useState } from 'react'
import Image from 'react-bootstrap/Image';
import { assets } from '../assets/assets';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState('');

  const { backendUrl, setIsLoggedIn, getUserData } = useApp();

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();

      // to send cookies with request
      axios.defaults.withCredentials = true;

      const { data } = await axios.post(backendUrl + '/api/auth/register', { name, email, password, role});

      if (data.success) {
        setIsLoggedIn(true);
        getUserData();
        navigate('/')
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className="min-vh-100 d-flex flex-column bg-c-gradient">
      <div className='mt-3' style={{ marginLeft: '3rem' }} onClick={() => navigate('/')}>
        <Image src={assets.logo} style={{ maxWidth: '200px' }} />
      </div>

      {/* Register form */}
      {/* <div className='flex-grow-1 d-flex align-items-center justify-content-center' > */}
      <Container fluid className='d-flex flex-column align-items-center justify-content-center flex-grow-1'>
        <Row className='w-100 justify-content-center'>
          <Col sm={10} md={8} lg={6} xl={5} xxl={4}>
            <div className='card bg-custom-card text-white p-2 p-md-4 rounded-4'>
              <div className='card-body'>
                <div className='text-center'>
                  <h2> Create Account </h2>
                  <p>Create your account </p>
                </div>

                <form onSubmit={onSubmitHandler}>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Full Name"
                    className="mb-3"
                  >
                    <Form.Control type="text" placeholder="name@example.com" value={name} onChange={(e) => setName(e.target.value)} className='bg-custom-dark text-white border-0' />
                  </FloatingLabel>

                  <FloatingLabel
                    controlId="floatingInput"
                    label="Email address"
                    className="mb-3"
                  >
                    <Form.Control type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className='bg-custom-dark text-white border-0' />
                  </FloatingLabel>

                  <FloatingLabel controlId="floatingPassword" label="Password"  className="mb-3">
                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className='bg-custom-dark text-white border-0' />
                  </FloatingLabel>

                  <FloatingLabel controlId="floatingSelect" label="Select Role">
                    <Form.Select aria-label="Floating label select example" className='bg-custom-dark text-white border-0' value={role} onChange={(e) => setRole(e.target.value)}>
                      <option>Open this select menu</option>
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                      <option value="editor">Editor</option>
                    </Form.Select>
                  </FloatingLabel>

                  <p className='my-4 text-primary cursor-pointer' onClick={() => navigate('/reset-password')}> Forgot Password? </p>

                  <Button type="submit" className='w-100 rounded-5 mb-3 bg-button-color border-0'>Signup</Button>
                </form>


                <p className='text-center'> Already have an account? <span className='text-primary text-decoration-underline cursor-pointer' onClick={() => navigate('/login')}> Login here </span></p>
              </div>

            </div>
          </Col>
        </Row>
      </Container>


    </div>
  )
}

export default Register