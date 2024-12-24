const bcrypt = require('bcryptjs');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/users');  // Ensure this path is correct for your User model
const Token=require('../models/token');
const { constrainedMemory } = require('process');

const SECRET_KEY = process.env.SECRET_KEY;  // Ensure the SECRET_KEY is set in your environment

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
    res.json({ msg: 'File uploaded successfully', filePath: req.file.path });
});

// User Login Endpoint
router.post('/userlogin', async (req, res) => {
    const { user_email, password } = req.body;

    try {
        // Find user by email
        const login = await User.findOne({ user_email });

        if (!login) {
            return res.status(404).json({ msg: 'Email not found' });
        }

        // Log the stored hash for debugging
        console.log('Stored password hash:', login.password);

        // Compare the password with the stored hash
        const isMatch = await bcrypt.compare(password, login.password);
        console.log('Password match:', isMatch); // Check if passwords match

        if (isMatch) {
            const token = jwt.sign({ userId: login.id }, SECRET_KEY, { expiresIn: '1hr' });
            const expireAt=new Date(Date.now()+60*60*1000)
            const tokenSave=new Token({
                userId:login._id,
                token,
                expireAt,
            })

            const uname=login.user_name
            await tokenSave.save()
            return res.json({ msg: 'Login successful',"uname":uname, token });
        } else {
            return res.status(400).json({ msg: 'Wrong password' });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});



//checktoken

router.post('/checktoken',async(req,res)=>{
    const token=req.body.token

    try {
        const tokencheck=await Token.findOne({token})
        if(!tokencheck){
            return res.json({'tokensts':1})
        }else{
            return res.json({'tokensts':0})
        }
    } catch (error) {
        console.error(error)
    }
})

//logout

router.post('/logout', async (req, res) => {
    const { token } = req.body;
  
    try {
      const logout = await Token.findOneAndDelete({ token });
      if (!logout) {
        return res.json({ logoutsts: 1 }); // Logout failed: Token not found
      }
      return res.json({ logoutsts: 0 }); // Logout successful
    } catch (error) {
      console.error('Error during logout:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
// Add User Endpoint
router.post('/adduser', async (req, res) => {
    const { user_name, user_email, gender, password } = req.body;

    try {
        const newUser = new User({
            user_name,
            user_email,
            gender,
            password: await bcrypt.hash(password, 12),  // Hash the password before saving
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
    const { userid } = req.params;

    // Check if the ID format is valid
    if (!mongoose.Types.ObjectId.isValid(userid)) {
        return res.status(400).json({ error: 'Invalid user ID format' });
    }

    try {
        const user = await User.findById(userid);

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
    const { userid } = req.params;

    try {
        const user = await User.findByIdAndUpdate(
            userid,
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
