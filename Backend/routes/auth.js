const express = require('express');
const router = express.Router();
const User = require('../models/User'); // importing user model/schema -> req.body.email
// req.body -> by using middlewere
const { query, validationResult, body } = require('express-validator');
const bcrypt = require('bcryptjs'); // storing hashed password
const jwt = require('jsonwebtoken'); //  
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "MyNameIsOptimu$Prime"; // secret key for auth token

// POST can not avalilble on borwser -> http://127.0.0.1:5000/api/auth/createuser try this on chrome

// ROUTE 1: Creating a user using: POST /api/auth/createuser -> No login required
// sign up field
router.post('/createuser', [
    body('name', 'Name should have minium length of 5').isLength({ min: 5 }), // These are the validations form express validator site
    body('email', 'Email must be the type of EMail').isEmail(),
    body('password', "Password should have minium length of 5").isLength({ min: 5 })
], async (req, res) => {
    // obj = {
    //     name : "DEXETR", 
    //     Age : 56
    // }
    // res.json(obj)

    // console.log(req.body);
    // const user = User(req.body);
    // user.save();
    // res.send(req.body);

    const result = validationResult(req); // result will create after you send a json from thunderClient
    let sucess = true;
    if (!result.isEmpty()) {
        sucess = false;
        return res.status(400).json({ sucess, errors: result.array() }); // In models/schema we assign all branches as required 
    }

    // Try catch because -> any external error like db errors or any syntex errors
    try {
        let user = await User.findOne({ email: req.body.email }); // findone -> find that email from all branches
        if (user) {
            sucess = false;
            return res.status(400).json({ sucess, error: "User with the same email already exist" });
        }
        console.log(user);

        const salt = bcrypt.genSaltSync(10); // Creating a salt
        console.log(salt);
        const secPass = await bcrypt.hash(req.body.password, salt);

        // if email is not used before then Create a user
        // We can add more checks just like this based on requirements -> based in that we creats an user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        })

        const data = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET) // Synchronous method so no need to await it
        console.log(authToken);
        res.json({sucess, authToken});

        // res.json(user); // Output in thunder client

    }
    catch (error) {
        console.log(error.message);
        res.status(500).send("Some Error Occured")
    }

    // This code is at the time of promise function not async function -> after creation of user
    // .then((user) => {
    //     res.json(user);
    // }).catch((error) => {
    //     console.log(error);
    //     res.json({
    //         error: "Plaese Enter a unique email"
    //     })
    // }) // When you are trying to use email which is already used then catch will run
})




// ROUTE 2: Login a user using: POST /api/auth/login -> No login required
// sign in field
router.post('/login', [ // endpoint is login
    body('email', "Enter a valid email").isEmail(),
    body('password', "Password cannot be blank").exists() // Mtthods check blank or not
], async (req, res) => {

    const result = validationResult(req); // result will create after you send a json from thunderClient
    if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() }); // In models/schema we assign all branches as required 
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email }); // findone -> find that email from all branches
        let sucess = true;
        if (!user) {
            sucess = false
            return res.status(400).json({sucess: sucess, error: "Enter valid cerdentials" });
        }
        // console.log(user); // null or already exist

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            sucess = false;
            return res.status(400).json({sucess: sucess, error: "Enter valid cerdentials" });
        }

        // sending the datain token format
        const data = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET) // Synchronous method so no need to await it
        console.log(authToken);
        res.json({sucess, authToken});

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some Error Occured")
    }
})


// ROUTE 3: Get all data of user (i.e. Notes) -> POST: /api/auth/getuser : Login Requiresd

router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id; // What is user here | harry bhai did only id but here _id required
        // console.log(userId);
        // I got an error here -> finOne(UserId) -> findOne({}) takes object as an argument

        //It looks like the issue might be with the way you're using findOne in Mongoose. The findOne function expects a query object, but you are passing only the userId, which might not be in the correct format.
        
        const user = await User.findOne({ _id: userId }).select("-password"); // When User fetched we can select all data except password (Syntex)
        res.json(user);
        console.log(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some Error Occured due to internal issues")
    }
})

module.exports = router;