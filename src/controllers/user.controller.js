const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const register = async (req, res, next) => {

    const newUser = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 8),
        
    })

    try{
       const user = await newUser.save();
        res.status(201).send({message: 'Signup successful', user: user})
        
    } 
    catch(err){
        next(err)
    }
}

const login = async(req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email})
        if(user){
            const password_valid = await bcrypt.compare(req.body.password, user.password)
            if(password_valid){
                const token = jwt.sign({
                    _id: user._id.toString()
                },process.env.JWT_KEY, {expiresIn: '1h'})
                const { password, ...others} = user._doc
                res.status(200).send({ token, ...others})
            }
            else{
                res.status(400).send({ error: "Incorrect password"})
            }
        }
        else{
            res.status(400).send({ error: "User does not exist"})
        }
    } catch (err) {
        next(err)
    }
    
}




module.exports = {register, login}