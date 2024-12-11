const bcrypt=require('bcryptjs')
const express=require('express')
const mongoose=require('mongoose')
const router=express.Router()

const User=require('../models/users')

router.post('/adduser',async(req,res)=>{
    
    try {
        const newUser=new User({
            user_name:req.body.user_name,
            user_email:bcrypt.hashSync(req.body.user_email,12),
            gender:req.body.gender
        })

        const userSave=await newUser.save()
        res.json(userSave)
    } catch (error) {
        res.status(500).json({'error':error})
    }
    
})

//http://localhost:5000/api/user/viewuser
router.get('/viewuser',async(req,res)=>{
    
    try {
        const users=await User.find()
        res.json(users)
    } catch (error) {
        res.status(500).json({'error':error})
    }
    
})


http://localhost:5000/api/user/singleuser/5565
router.get('/singleuser/:userid', async (req, res) => {
    const uid = req.params.userid;

    // Validate ObjectId
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


module.exports=router;