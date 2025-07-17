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

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { backendUrl, setIsLoggedIn, getUserData } = useApp();

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();

      // to send cookies with request
      axios.defaults.withCredentials = true;

      const { data } = await axios.post(backendUrl + '/api/auth/login', { email, password });

      if (data.success) {
        setIsLoggedIn(true);
        getUserData();
        navigate('/')
      } else {
        toast.error(data.message);
        console.log(error.message);
      }
    } catch (error) {
      console.log("new error: ", error.message);
    }
  }

  return (
    <div className="min-vh-100 d-flex flex-column bg-c-gradient">
      <div className='mt-4' style={{ marginLeft: '3rem' }} onClick={() => navigate('/')}>
        <Image src={assets.logo} style={{ maxWidth: '200px' }} />
      </div>

      {/* Login form */}
      <Container fluid className="py-5 d-flex align-items-center justify-content-center flex-grow-1">
        <Row className="w-100 justify-content-center">
          <Col sm={10} md={8} lg={6} xl={5} xxl={4}>
            <div className="card bg-custom-card text-white p-4 rounded-4 shadow">
              <div className="card-body">
                <div className="text-center mb-3">
                  <h2>Login</h2>
                  <p>Login to your account</p>
                </div>

                <form onSubmit={onSubmitHandler}>
                  <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
                    <Form.Control
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-custom-dark text-white border-0"
                    />
                  </FloatingLabel>

                  <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-custom-dark text-white border-0"
                    />
                  </FloatingLabel>

                  <p className="my-3 text-primary cursor-pointer" onClick={() => navigate('/reset-password')}>
                    Forgot Password?
                  </p>

                  <Button type="submit" className="w-100 rounded-5 mb-3 bg-button-color border-0">
                    Login
                  </Button>
                </form>

                <p className="text-center">
                  Don't have an account?{' '}
                  <span className="text-primary text-decoration-underline cursor-pointer" onClick={() => navigate('/register')}>
                    Sign Up
                  </span>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>


    </div>
  )
}

export default Login