const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

module.exports = router;


router.get("/", authorization, async (req,res) => {
    try {
        // req.user has the payload
       // res.json(req.user)
       const user = await pool.query("SELECT user_id,username,email FROM login_page WHERE user_id= $1", //everything but password. 
       [req.user] 
       );
       //res.json(req.user); from postman
       res.json(user.rows[0]);
        
    } catch (err) {
        console.log(error.message);
        res.status(500).json("Server Error");
    }
})