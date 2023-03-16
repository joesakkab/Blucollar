let mysql = require('mysql');
let config = require('./config.js');
const fetch = require('node-fetch');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const { response } = require('express');
const cors = require('cors');
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, "client/build")));

// Auth middleware for JWT authenticated 
const auth = async (req, res, next) => {
	const token = req.headers.authorization.split(" ")[1];
	if (!token)
		return res.status(403).send({ auth: false, message: "No token provided." });
	await jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
		if (err)
			return res
				.status(500)
				.send({ auth: false, message: "Failed to authenticate token." });
		// if everything good, save to request for use in other routes
		req.userID = decoded.userID;
		next();
	});
};

app.get('/api/ping', (req, res) => {
	res.send({ express: "pong" });
});

app.post("/api/signup", async (req, res) => {
	let connection = mysql.createConnection(config);

	const email = req.body.email;
	const pwd = req.body.password;
	const first = req.body.firstName;
	const last = req.body.lastName;
	const location = req.body.location;
	const serviceType = req.body.serviceType;
	const description = req.body.description;
	const isServiceProvider = req.body.isServiceProvider;

	const pwdHashed = await bcrypt.hash(pwd, 10);

	connection.query(
		'SELECT * FROM krajesh.`Service Provider` WHERE Email LIKE "%?%"', 
		[email], 
		(error, results, fields) => {
			if (error) {
				return console.error(error.message);
			}

			if (results.length > 0) {
				res.status(403).send({ error: "User already exists!" });
				return // User already exists
			}
		}
	);
	// check if service providor then add into service providor table, else, add to user table
	let sql, data;
	if (isServiceProvider) {
		sql = 'INSERT INTO krajesh.`Service Provider` (Email, Password, FirstName, LastName, PrimaryLocation, Description, ServiceType) VALUES (?, ?, ?, ?, ?, ?, ?)';
		console.log(sql);
		data = [email, pwdHashed, first, last, location, description, serviceType];
		console.log(data);
	} else {
		sql = 'INSERT INTO krajesh.`Customer` (Email, Password, FirstName, LastName, PrimaryLocation) VALUES (?, ?, ?, ?, ?)';
		console.log(sql);
		data = [email, pwdHashed, first, last, location];
		console.log(data);
	}
	
	connection.query(
		sql, 
		data, 
		(error, results, fields) => {
			if (error) {
				return console.error(error.message);
			}
	
			let string = JSON.stringify(results);
			//let obj = JSON.parse(string);
			res.status(200).send({ express: string });
		}
	);
	connection.end();
});

app.post("/api/login", async (req, res) => {
	let connection = mysql.createConnection(config);

	const email = req.body.email;
	const pwd = req.body.password;
	const isServ = req.body.isServiceProvider;

	const pwdHashed = await bcrypt.hash(pwd, 10);

	if (isServ) {
		sql = 'SELECT * FROM krajesh.`Service Provider` WHERE Email = ? AND Password = ?';
		console.log(sql);
		data = [email, pwdHashed];
		console.log(data);
	} else {
		sql = 'SELECT * FROM krajesh.`Customer` WHERE Email = ? AND Password = ?';
		console.log(sql);
		data = [email, pwdHashed];
		console.log(data);
	}

	connection.query(
		sql, 
		data, 
		(error, results, fields) => {
			if (error) {
				return console.error(error.message);
			}

			if (results.length == 0) {
				res.status(403).send({ error: "User login failed (email and pwd pair don't match)" });
				return // User already exists
			} else {
				let string = JSON.stringify(results);
				let obj = JSON.parse(string);
				const token = jwt.sign({ obj }, process.env.JWT_KEY, {
					expiresIn: 86400 // expires in 24 hours
				});
				console.log(token);
				res.status(200).send({ token: token });
			}
		}
	);
	connection.end();
});

app.post('/api/searchbyservice', (req, res) => {
	let connection = mysql.createConnection(config);

	let service = req.body.serviceType;

	let sql = 'SELECT * FROM krajesh.`Service Provider` WHERE ServiceType LIKE ?';
	console.log(sql);
	let data = ['%' + service + '%'];
	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		let obj = JSON.parse(string);
		res.send({ results: obj });
	});
	connection.end();
});

app.post('/api/load', (req, res) => {
	let connection = mysql.createConnection(config);

	let sql = 'SELECT * FROM krajesh.`Service Provider`';
	// console.log(sql);
	let data = []

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		let obj = JSON.parse(string);
		res.send({ results: obj });
		// console.log("Objects are ", obj)
	});
	connection.end();
});

app.post('/api/getprofile', (req, res) => {
	let connection = mysql.createConnection(config);

	let id = req.body.id;
	let sql = "SELECT * FROM `Service Provider` WHERE Service_ProviderID = ?";
	console.log(sql);
	let data = [id];
	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		let obj = JSON.parse(string);
		res.send({ results: obj });
	});
	connection.end();
});

app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
//app.listen(port, '129.97.25.211'); //for the deployed version, specify the IP address of the server
