require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors"); 
const pool = require ("./db");
const API_PORT = process.env.PORT || 4001; 

//Middleware 

app.use(cors());
app.use(express.json()); 

app.use((req, res, next) => {
	console.log("passing server/Index.js -> through middleware");
	next();
})


//ROUTES

//Register and login routes

app.use("/auth", require("./routes/jwtAuth"));


//dashboard route

app.use("/dashboard", require("./routes/dashboard"));



//create a user 
app.post ("/auth", async(req,res) => {
	try {
		const{username,password, email} = req.body;
		const newAuth = await pool.query("INSERT INTO Login_page (username, password, email) VALUES ($1, $2, $3) RETURNING *",
		[username, password, email]   // returning is used for updating, deleting data.
		);
		console.log(req.body); //this can check what was posted 
		console.log(username, password, email); 
		res.json(newAuth.rows[0]);
	} catch (err) {
		console.error(err.message);
	}
})
//get all users 

app.get("/auth", async(req,res) =>{
	try {
		const allAuths = await pool.query("SELECT * from login_page");
		res.json(allAuths.rows)
	} catch (err) {
		console.error(err.message);
	}
})

// get a user 

app.get ("/auth/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const auth = await pool.query("SELECT * from login_page WHERE user_id =$1",[id])
		res.json(auth.rows[0]);
	} catch (err) {
		console.error(err.message);
		
	}
})


//update a user 

app.put("/auth/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const { username, password, email } = req.body;
		const updateAuth = await pool.query("UPDATE login_page SET username = $1, password = $2, email = $3 WHERE user_id = $4",
		[username, password, email, id]
		);
		console.log(updateAuth);
		res.json("user was updated"); //ver was username or password
	} catch (err) {
		console.error(err.message);
	}
})

// delete a user 

app.delete("/auth/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const deleteAuth = await pool.query("DELETE FROM login_page WHERE user_id = $1", [ id ]
		);
		console.log(deleteAuth);
		res.json("user was deleted");

 	} catch (err) {
		 console.log(err.message);	
	}
});



app.listen(API_PORT, () => 
console.log(`console is listening in server/index.js port ${API_PORT} `));

