const bcrypt = require('bcryptjs');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/users');

const SECRET_KEY = process.env.SECRET_KEY;



// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, file.originalname.split('.')[0] + "-" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // 1MB limit
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png/;
        const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimeType = fileTypes.test(file.mimetype);

        if (extName && mimeType) {
            return cb(null, true);
        } else {
            cb(new Error('Only images (jpeg, jpg, png) are allowed!'));
        }
    }
});

// Upload Image Endpoint
router.post('/uploadImage', upload.single('profile_pic'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded!' });
    }
    res.json({ msg: 'File Uploaded Successfully', filePath: req.file.path });
});


//user login
// http://localhost:5000/api/user/userlogin

router.post('/userlogin',async(req,res)=>{
    const email=req.body.user_email
    const password=req.body.password

    try {
        const login= await User.findOne({user_email:email})
        if(!login){
            return res.json({'msg':'Email not found'})
        }else{
            if (await bcrypt.compare(password,login.password)){
                const token=jwt.sign({userId:login.id},SECRET_KEY,{expiresIn:'1hr'})
                return res.json({'msg':'login successfully',token})
            }else{
                return res.json({'msg':'Wrong Password'})
            }
        }
    } catch (error) {
        res.json(error)
    }
})


// Add User Endpoint
// http://localhost:5000/api/user/viewuser
router.post('/adduser', async (req, res) => {
    try {
        const newUser = new User({
            user_name: req.body.user_name,
            user_email:req.body.user_email,
            gender: req.body.gender,
            password:await bcrypt.hash(req.body.password,12)
        });

        const userSave = await newUser.save();
        res.status(201).json(userSave);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// View All Users Endpoint
router.get('/viewuser', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// View Single User by ID Endpoint
router.get('/singleuser/:userid', async (req, res) => {
    const uid = req.params.userid;

    if (!mongoose.Types.ObjectId.isValid(uid)) {
        return res.status(400).json({ error: 'Invalid user ID format' });
    }

    try {
        const user = await User.findById(uid);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update User by ID Endpoint
router.put('/updateuser/:userid', async (req, res) => {
    const uid = req.params.userid;

    try {
        const user = await User.findByIdAndUpdate(
            uid,
            { $set: req.body },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;