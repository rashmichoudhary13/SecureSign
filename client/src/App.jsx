import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import EmailVerify from './pages/EmailVerify';
import ResetPassword from './pages/ResetPassword';
import Register from './pages/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Admin from './pages/Admin';
import Editor from './pages/Editor';
import Product from './pages/Product';
import AdminDashboard from './pages/AdminDashboard';
import EditorDashboard from './pages/EditorDashboard';
import ProtectedRoute from './context/ProtectedRoute';
import { useApp } from './context/AppContext'
import { Navigate } from 'react-router-dom';


const App = () => {
  const { isLoggedIn } = useApp();

  return (
    <div>
      <ToastContainer />

      <Routes>

        {!isLoggedIn && (
          <>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/email-verify' element={<EmailVerify />} />
            <Route path='/reset-password' element={<ResetPassword />} />
            <Route path='/register' element={<Register />} />
          </>
        )}


        <Route element={<ProtectedRoute />}>
         <Route path='/' element={<Home />} />
          <Route path='/login' element={<Navigate to="/" />} />
          <Route path='/email-verify' element={<EmailVerify />} />
          <Route path='/reset-password' element={<Navigate to="/" />} />
          <Route path='/register' element={<Navigate to="/" />} />

          
          <Route path='/admin' element={<Admin />} />
          <Route path='/editor' element={<Editor />} />
          <Route path='/product' element={<Product />} />
          <Route path='/adashboard' element={<AdminDashboard />} />
          <Route path='/edashboard' element={<EditorDashboard />} />
        </Route>
      </Routes>

    </div>
  )
}

export default App