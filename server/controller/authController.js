import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import transporter from '../config/nodemailer.js';
import {EMAIL_VERIFY_TEMPLATE, PASSWORD_RESET_TEMPLATE} from '../config/emailTemplates.js';

export const register = async(req,res) => {
    const {name, email, password, role} = req.body;

    if(!name || !email || !password || !role ){
        return res.json({success: false, message: "Missing Details" })
    }

    try{

        const existingUser = await userModel.findOne({email});

        if(existingUser){
            return res.json({success: false, message: "User already exists" })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new userModel({name, email, password: hashedPassword, role});
        await user.save();

        const token = jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET, {expiresIn: '7d'});

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        //Sending welcome email
        const mailOption = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Welcome to SecureSign',
            text:` Welcome to SecureSign Website. Your account has been created with the email id: ${email}`
        }

         try{
            await transporter.sendMail(mailOption);
            console.log("email sent successfully");
        }catch(err){
            console.log("Error while sending mail: ", err.message)
        }
        return res.json({success: true});
    }catch(err){
        return res.json({success: false, message: err.message})
    }
}

export const login = async(req, res) => {
    const {email, password} = req.body;

    if(!email || !password){
         return res.json({success: false, message: "Email and Password are required." })
    }

    try{
        const user = await userModel.findOne({email})

        if(!user){
            return res.json({success: false, message: "Invalid Email"})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.json({success: false, message: "Invalid Credentials"})
        }

        const token = jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET, {expiresIn: '7d'});

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.json({success: true, message: "logged in"});
    }catch(err){
        return res.json({success: false, message: err.message})
    }
}

export const logout = async(req, res) => {
    try{
        res.clearCookie('token',{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        })

        return res.json({success: true, message: "Successfully logged out"});
    }catch(err){
        return res.json({success: false, message: err.message}) 
    }
}

//Send Verification OTP to users Email
export const sendVerifyOtp = async(req, res) => {
    try{
        const userId = req.user.id;

        const user = await userModel.findById(userId);

        if(user.isAccountVerified){
            return res.json({success: false, message: "Account already Verified"}) 
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));

        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;

        await user.save();

        //Send otp to user email
        const mailOption = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Account Verification OTP',
            // text:`Your OTP is ${otp}. Verify your account using this otp.`
            html: EMAIL_VERIFY_TEMPLATE.replace("{{otp}}", otp).replace("{{email}}",user.email)
        }

         try{
            await transporter.sendMail(mailOption);
            console.log("Verification Otp sent successfully");
        }catch(err){
            console.log("Error while sending mail: ", err.message)
        }

        return res.json({success: true, message: "OTP sent successfully"}); 
    }catch(err){
        return res.json({success: false, message: err.message}) 
    }
}

export const verifyEamil = async(req, res) => {
    const {otp} = req.body;
    const userId = req.user.id;

    if(!otp || !userId){
        return res.json({success: false, message: "Missing Details"}); 
    }

    try{
        const user = await userModel.findById(userId);

        if(!user){
            return res.json({success: false, message: 'user not found'}); 
        }

        if(user.verifyOtp === '' || user.verifyOtp != otp){
            return res.json({success: false, message:'Invalid OTP'}) 
        }

        if(user.verifyOtpExpireAt < Date.now()){
            return res.json({success: false, message: 'OTP Expired'}) 
        }

        user.isAccountVerified = true;
        user.verifyOtp = "";
        user.verifyOtpExpireAt = 0;

        await user.save();

        return res.json({success: true, message: "Email Verified Successfully."}) 
    }catch(err){
        return res.json({success: false, message: err.message}) 
    }
}

// Checks if user is authenticated or not  
export const isAuthenticated = async(req, res) => {
    try{
        return res.json({success: true})
    }catch(err){
        return res.json({success: false, message: err.message})
    }
}

//Sending Reset OTP
export const sendResetOtp = async(req, res) => {
    const {email} = req.body;

    if(!email){
        return res.json({success: false, message: 'Email is required'});
    }

    try{
        const user = await userModel.findOne({email});

        if(!user){
            return res.json({success: false, message: 'user not found'});
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));

        user.resetOtp = otp;
        user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000;

        await user.save();

        //Send otp to user email
        const mailOption = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Password Reset OTP',
            // text:`Your OTP for resetting your password is ${otp}. Use this OTP to proceed with resetting your password.`
            html: PASSWORD_RESET_TEMPLATE.replace("{{otp}}", otp).replace("{{email}}",user.email)
        }

         try{
            await transporter.sendMail(mailOption);
            console.log("Password reset Otp sent successfully");
        }catch(err){
            console.log("Error while sending mail: ", err.message)
        }

        return res.json({success: true, message: "Reset OTP sent successfully"}); 


    }catch(err){
        return res.json({success: false, message: err.message})
    }
}

export const resetPassword = async(req, res) => {
    const {email, otp, newPassword} = req.body;

    if(!email || !otp || !newPassword){
        return res.json({success: false, message: 'Email, OTP, and new password are required'});
    }

    try{
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success: false, message: 'user not found'})
        }

        if(user.resetOtp === "" || user.resetOtp != otp){
            return res.json({success: false, message: 'Invalid OTP'});
        }

        if(user.resetOtpExpireAt < Date.now()){
            return res.json({success: false, message: 'OTP Expired'});
        }

        const hashedPassword = await bycrypt.hash(newPassword, 10);
        
        user.password = hashedPassword;
        user.resetOtp = "";
        user.resetOtpExpireAt = 0;

        await user.save();

        return res.json({success: true, message: 'Password has been reset successfully.'})

    }catch(err){
        return res.json({success: false, message: err.message});
    }
}