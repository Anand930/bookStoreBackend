import User from "../model/user.model.js";
import bcryptjs from 'bcryptjs'

export const signUp = async (req,res) =>{
    try {
        const {fullName,email,password} = req.body
        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({message:"user already registered! Please login to continue"})
        }

        const hashedPassword = await bcryptjs.hash(password,10)
        const createdUser = new User({
            fullName,email,password:hashedPassword
        })

        const newUser = await createdUser.save();
        if(!newUser) console.log("User not created, something went wrong");
        res.status(201).json({user:newUser,message:"User Created Successfully"})
    } catch (error) {
        console.log(error.message)
    }
}

export const login = async(req,res)=>{
    try {
        const {email,password} = req.body
        const user = await User.findOne({email})
        if(user){
           const matchPassword = await bcryptjs.compare(password,user.password)  
           if(matchPassword) {res.status(200).json({user:user,message:"User authenticated successfully"})}
           else{
            res.send({message:"Please enter a valid password"})
           }
        }else{
            res.send({message:"user is not register "})
        }

    } catch (error) {
        console.log(error.message)
    }
}
