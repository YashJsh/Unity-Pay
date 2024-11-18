const express = require('express');
const zod = require('zod');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {User, Account} = require("../db")
const {authMiddleware} = require("../middleware")
const {JWT_SECRET} = require("../config")

const signupSchema = zod.object({
    username : zod.string(),
    password : zod.string(),
    firstName : zod.string(),
    lastName : zod.string()
}) 

const signinSchema = zod.object({
    username : zod.string().email(),
    password : zod.string()
})

const updateSchema = zod.object({
    password : zod.string().min(8),
    firstName : zod.string(),
    lastName : zod.string()
})

router.post("/signup", async (req, res) => {
    const { success } = signupSchema.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const existingUser = await User.findOne({
        username: req.body.username
    })

    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken/Incorrect inputs"
        })
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })
    const userId = user._id;
    console.log(userId);
    await Account.create({
        userId,
        balance: (1 + Math.random() * 10000).toFixed(2)
    })

    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.json({
        message: "User created successfully",
        token: token
    })
})


router.post('/signin', async function (req, res) {
    // Validate request body
    const { success } = signinSchema.safeParse(req.body);
    if (!success) {
        return res.status(400).json({ message: "Invalid request data" }); // Send response if validation fails
    }

    try {
        // Use await here
        const user = await User.findOne({
            username: req.body.username,
            password: req.body.password 
        });

        // Check if user exists
        if (!user) {
            return res.status(401).json({ message: "User doesn't exist or incorrect password" }); // Only send one response
        }

        // Generate token if user is found
        const token = jwt.sign({ userId: user._id }, JWT_SECRET);
        return res.json({ token }); // Send response with token
    } catch (error) {
        console.error("Error during sign in:", error);
        return res.status(500).json({ message: "Internal server error" }); // Send response for unexpected errors
    }
});


// router.post('/signin', function (req, res){
//     const {success} = signinSchema.safeParse(req.body);
//     if(!success){
//         return res.status(411).json({
//             message: "Error while logging in"
//         })
//     }
//     const user =  User.findOne({
//         username : req.body.username,
//         password : req.body.password    
//     })
//     if(!user){
//         return res.status(411).json({
//             msg : "User doesn't exist"
//         })
//     }
//     else{
//         const token = jwt.sign({ 
//             userId : user._id 
//         }, JWT_SECRET)
//         return res.json({
//             token : token
//         })
//         return
//     }

// })     
router.get('/userdetail', authMiddleware, async function (req, res){
    try{
        const user = await User.findById(req.userId);
        res.send({
            firstname : user.firstName
        })
    }
    catch(err){
        res.send("Error in fetching user Details")
    }
})       

router.put('/update', authMiddleware ,async function (req, res){
    const {success} = updateSchema.safeParse(req.body);
    if(!success){
        res.status(411).json({
            msg : "Error while updating documents"
        })
    }

    await User.updateOne({
        _id : req.user.userId
    }, req.body)
    res.json({
        message: "Updated successfully"
    })  
})


router.get('/bulk', async (req, res) => {
    const filter = req.query.filter || "";

    try {
        const users = await User.find({
            $or: [
                { firstName: { "$regex": filter, "$options": "i" } },  // Case-insensitive
                { lastName: { "$regex": filter, "$options": "i" } }    // Case-insensitive
            ]
        });

        // Map the user data to send only relevant information
        res.json({
            users: users.map(user => ({
                username: user.username,
                firstName: user.firstName,  // Ensure correct casing
                lastName: user.lastName,    // Ensure correct casing
                _id: user._id
            }))
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});
module.exports = router;