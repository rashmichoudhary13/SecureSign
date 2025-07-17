import React, {useState} from 'react'
import { assets } from '../assets/assets';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const Nav = () => {
    const navigate = useNavigate();

    const { backendUrl, userData, setUserData, setIsLoggedIn } = useApp();
    const [dropDown, setDropDown] = useState(false);

    const sendVerificationOtp = async() => {
        try{
            axios.defaults.withCredentials = true;

            const {data} = await axios.post(backendUrl + '/api/auth/send-verify-otp');

            if(data.success){
                navigate('/email-verify');
                toast.success(data.message);
            }else{
                toast.error(data.message);
            }

        }catch(error){
            toast.error(error.message);
        }
    }

    const logOutHandler = async() => {
        try{
            axios.defaults.withCredentials = true;

            const {data} = await axios.post(backendUrl + '/api/auth/logout');

            if(data.success){
                setIsLoggedIn(false)
                setUserData(false)
                navigate('/')
            }else{
                toast.error(data.message);
            }

        }catch(error){
            toast.error(error.message);
        }
    }
    
    return (
        <div>
            <Navbar className="bg-body-tertiary py-3" >
                <Container>
                    <Image src={assets.logo} style={{maxWidth: '140px'}}/>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        {userData ? (
                            <div className='position-relative' >
                                <div onMouseEnter={() => setDropDown(true)} className='bg-black text-white px-3 py-2 rounded-circle fs-5 d-flex align-items-center justify-content-center'>
                                    {userData.name[0].toUpperCase()}
                                </div>

                                <div onMouseLeave={() => setDropDown(false)} className={`position-absolute end-0 bg-c-color text-black mt-2 p-2 rounded shadow ${dropDown ? 'd-block' : 'd-none'}`}>
                                    <ul className='list-unstyled m-0'>
                                        { !userData.isAccountVerified && <li onClick={sendVerificationOtp} className='px-2 py-1 cursor-pointer bg-c-hover' style={{ whiteSpace: 'nowrap' }}>Verify Email</li>}
                                        <li className='px-2 py-1 cursor-pointer bg-c-hover' onClick={logOutHandler}>Logout</li>
                                    </ul>
                                </div>
                            </div>
                        ) : <Button variant="outline-dark" className='rounded-5 ps-4' onClick={() => navigate('/login')}>Login <Image className='px-2 hover-color' src={assets.arrow_icon} /> </Button>
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Nav