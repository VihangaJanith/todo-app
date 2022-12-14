const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');


const register = async (req, res) => {
    const { name, email, password } = req.body;

    if(!name || !email || !password) {
        res.status(400)
        throw new Error('Please provide all fields')
    }

    const userExists = await User.findOne({email: email});
    if(userExists) {
        res.status(400)
        throw new Error('Email Exist')
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        name: name,
        email: email,
        password: hashedPassword
    });

    if(user) {
        res.status(201)
        res.json({_id: user.id ,
            name: user.name,
             email: user.email, 
            token : generateToken(user._id)})
    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }

}

const login = async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email: email});

    if(user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token : generateToken(user._id),
            
        })
    }
    else{
        res.status(401)
        throw new Error('Invalid Details')
    }

   


}

const getUser = async (req, res) => {
   const {_id, name, email} = await User.findById(req.user._id);

    res.status(200).json({
        id: _id,
        name,
        email
    })


}


const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn: '30d',
    })
}



module.exports = {register, login, getUser}