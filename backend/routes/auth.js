const express = require('express');
const User = require('../models/User')
const router = express.Router();
const bcrypt=require('bcryptjs');
var fetchuser=require('../middleware/fetchuser')
var jwt=require('jsonwebtoken');
const JWT_SECREATE='tyagiharsh';
const { body, validationResult } = require('express-validator');
// const JWT_SECREATE='Harsht@tyagi';
router.post('/createuser', [
    body('name',).isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
],
    async (req, res) => {
        let success=false
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // console.log(req.body);
        // res.send(req.body);
        // res.send("Hello");
        // const user=User(req.body);
        // user.save();
        // check whether the user with this email exists or not
        try {
            let user = await User.findOne({ email: req.body.email });
        console.log(user);
        if (user) {
            return res.status(400).json({success, error: "Sorry user with this email already exist" });
        }
        const salt=await bcrypt.genSalt(10);
         const secPass= await bcrypt.hash(req.body.password,salt);


        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
         });
            // .then(user=>res.json(user))
            // .catch(err=>{console.log(err)
            // res.json({error:'Please entre a unique value for email'})})
        const data={
           user:{
            id:user.id
           } 
        }
        const authtoken=jwt.sign(data,JWT_SECREATE);
        
         const jwtData=jwt.sign(data,JWT_SECREATE);
         console.log(jwtData);
         success=true;
            res.json({success,authtoken});
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Some error occured");
        }
        
        })
          // Authentication a User using Post "/api/auth/login" No login require
          router.post('/login', [
  
            body('email','Entre a valid email').isEmail(),
            body('password','Password can not be blank').exists(),
        ],async (req,res)=>
        {
            let success = false;
            const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const{email,password}=req.body;
        try {
             let user= await User.findOne({email});
             if(!user)
             {
                success=false;
                return res.status(400).json({error:"Please try to login with correct credentials"});
             }
             const passwordCompare= await bcrypt.compare(password,user.password);
             if(!passwordCompare)
             {
                success=false;
                return res.status(400).json({success,error:"Please try to login with correct credentials"});
             }
             const data={
                user:{
                 id:user.id
                } 
             }
             const authtoken=jwt.sign(data,JWT_SECREATE);
             success=true;
             res.send({success,authtoken});
        } catch (error) {
             console.log(error.message) ;
             res.status(500).send("Some Error occured");
        }
        });

// Route 3: Get user loggedin User Details using Post  "/api/auth/get user " Login require

router.post('/getuser',fetchuser,async(req,res)=>
{
    try {
        userId=req.user.id;
        const user=await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.log(error.message) ;
        res.status(500).send("Some Error occured");
   }
})
    module.exports = router;