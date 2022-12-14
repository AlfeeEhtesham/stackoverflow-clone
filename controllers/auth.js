import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

import users from '../models/auth.js'
import userEvent from '@testing-library/user-event';

export const signup = async (req,res) =>{
   const {name , email , password} = req.body;
   try {
       const existinguser = await users.findOne({ email });
       if(existinguser){
         res.status(400).json({message :"user already exists"})
       }
       const hashedPassword = await bcrypt.hash(password,12)
       const newUser = await users.create({name , email , password : hashedPassword})
       const token = jwt.sign({email:newUser.email , id:newUser._id} , "test" , {expiresIn:'1h'});
       res.status(200).json({result : newUser ,token})
    } 
    catch(error){
    res.status(5000).json("something went wrong...")
   }

}
export const login = async (req,res) =>{
   const {email , password} = req.body;
   try {
      const existinguser = await users.findOne({ email });     
      if(!existinguser){
         res.status(400).json({message :"user dont't exists"})
       }

       const isPasswordCrt = await bcrypt.compare(password,existinguser.password)
       if(!isPasswordCrt){
         return res.status(400).json({message:"invaid credentials"})
       }
       const token = jwt.sign({email:newUser.email , id:newUser._id} , "test" , {expiresIn:'1h'});
       res.status(200).json({result : newUser ,token})
   } catch (error) {
      res.status(500).json("something went wrong...")
   }
    
} 