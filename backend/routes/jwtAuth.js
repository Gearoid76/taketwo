const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");

//Registering

router.post("/register", validInfo, async (req,res) => {
    try {
        // 1. destructure of the req.body(name, password, email)

        const { name, password, email } = req.body;

        //2. Check if error exists ( if user exists then throw an error)

        const user = await pool.query("SELECT * FROM login_page WHERE email = $1",
        [email]
        );
        if (user.rows.length !== 0) {
            return res.status(401).json("User already exists");
        }
        
        //3. Bcrypt the user password

        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);

        const bcryptPassword = await bcrypt.hash(password,salt);

        //4. Enter the new user inside our database

        const newUser = await pool.query ("INSERT INTO login_page (username, password, email) VALUES ($1, $2, $3) RETURNING *", 
        [name, bcryptPassword, email]
        );
        
        //5. generate the jwt token Works as far as here then into jwtGenerator 

        const token = jwtGenerator(newUser.rows[0].user_id);
        res.json({ token });
    

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
        
    }
})

//Login route 

router.post("/login", validInfo, async (req,res) => {
    try {
        // 1. destructure the req.body

        const { email, password } = req.body;  // later will be changed to username. 

        // 2. check if user doesn't exist (if not then we throw error)

        const user = await pool.query("SELECT * FROM login_page WHERE email = $1", 
        [email]
        );
        if (user.rows.length === 0) {
            return res.status(401).json("Password or email is incorrect"); //.send can be .json
        }
        
        // 3. check if written password is the same at the database password

        const validPassword = await bcrypt.compare(password, user.rows[0].password);

        if (!validPassword) {
            return res.status(401).json("Password or email is incorrect");
        }
        

        //4. give jwt token 

        const token = jwtGenerator(user.rows[0].user_id);
        
        res.json({ token });    
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
        
    }
})

//Verify User Token 
router.get("/is-verify", authorization, async (req,res) => { // can be post as we are not getting anything
    try {
        res.status(200).json(true);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
      
    }
})   

module.exports = router;