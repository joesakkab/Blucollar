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
const { json } = require('express/lib/response.js');
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
		console.log(decoded);
		if (err)
			return res
				.status(500)
				.send({ auth: false, message: "Failed to authenticate token." });
		// if everything good, save to request for use in other routes
		if (decoded['obj'][0]['cust_id'] == null) {
			req.userID = decoded['obj'][0]['Service_ProviderID'];
			req.is_sr = true
		} else if (decoded['obj'][0]['Service_ProviderID'] == null) {
			req.userID = decoded['obj'][0]['cust_id'];
			req.is_sr = false
		}
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
  	const yearsExperience = req.body.yearsExperience;

	const pwdHashed = await bcrypt.hash(pwd, 10);

	connection.query(
		'SELECT cust_id, Null as Service_ProviderID, FirstName, LastName, Email, Password, PrimaryLocation, Null as Description, Null as ServiceType, Null as ExperienceYears FROM krajesh.`Customer` WHERE Email LIKE "?" UNION SELECT Null as cust_id, Service_ProviderID, FirstName, LastName, Email, Password, PrimaryLocation, Description, ServiceType, ExperienceYears FROM krajesh.`Service Provider` WHERE Email LIKE "?"', 
		[email, email], 
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

		sql = 'INSERT INTO krajesh.`Service Provider` (Email, Password, FirstName, LastName, PrimaryLocation, Description, ServiceType, ExperienceYears) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
		console.log(sql);
		data = [email, pwdHashed, first, last, location, description, serviceType, yearsExperience.substring(0,4)];
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
		}
	)
	connection.query(
		'SELECT cust_id, Null as Service_ProviderID FROM krajesh.`Customer` WHERE Email LIKE "?" UNION SELECT Null as cust_id, Service_ProviderID FROM krajesh.`Service Provider` WHERE Email LIKE "?"', 
		[email, email], 
		(error, results, fields) => {
			let string = JSON.stringify(results)
			let obj = JSON.parse(string);
      let tokenObj = {"cust_id": obj[0]["cust_id"], "Service_ProviderID": obj[0]['Service_ProviderID']}
			const token = jwt.sign({ tokenObj }, process.env.JWT_KEY, { expiresIn: 86400});
			console.log(token);
			res.status(200).send({ token: token });
		}
	);
	connection.end();
});

app.post("/api/login", async (req, res) => {
	let connection = mysql.createConnection(config);

	const email = req.body.email;
	const pwd = req.body.password;


	let sql = 'SELECT cust_id, Null as Service_ProviderID, FirstName, LastName, Email, Password, PrimaryLocation, Null as Description, Null as ServiceType, Null as ExperienceYears FROM krajesh.`Customer` WHERE Email = ? UNION SELECT Null as cust_id, Service_ProviderID, FirstName, LastName, Email, Password, PrimaryLocation, Description, ServiceType, ExperienceYears FROM krajesh.`Service Provider` WHERE Email = ?'
	console.log(sql);
	let data = [email, email];
	console.log(data);
	

	connection.query(
		sql, 
		data, 
		(error, results, fields) => {
			if (error) {
				return console.error(error.message);
			}

			if (results.length == 0) {
				res.status(403).send({ error: "User login failed (email does not exist)" });
				return // User already exists
		}

		console.log("results password is ", results[0].Password);
		console.log("pwd is ", pwd)
		bcrypt.compare(pwd, results[0].Password, (err, result) => {
		
		console.log(result)
		if (err) {
			console.log(err)
			return 
		} else {
			if (result) {
				let string = JSON.stringify(results)
				let obj = JSON.parse(string);
        let tokenObj = {"cust_id": obj[0]["cust_id"], "Service_ProviderID": obj[0]['Service_ProviderID']}
				const token = jwt.sign({ tokenObj }, process.env.JWT_KEY, { expiresIn: 86400});
				console.log(token);
				res.status(200).send({ token: token });
			} else {
				console.log(err)
				return res.status(401).send({ error: 'Incorrect password' });
			}
		}
	})
	});
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

app.post('/api/getproviderprofile', (req, res) => {
	let connection = mysql.createConnection(config);
	let id = req.body.id;
	let sql = "SELECT * FROM `Service Provider` WHERE Service_ProviderID = ?";
	let data = [id];

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		let obj = JSON.parse(string);
 		res.send({ results: obj });
    console.log({results: obj})
	});
	connection.end();
});

app.post('/api/getcustomerprofile', (req, res) => {
	let connection = mysql.createConnection(config);
	let id = req.body.id;
	let sql = "SELECT * FROM `Customer` WHERE cust_id = ?"
	let data = [id];
	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		let obj = JSON.parse(string);
 		res.send({ results: obj });
    console.log({results: obj})
	});
	connection.end();

})

app.put('/api/edituserprofile', (req, res) => {
	let connection = mysql.createConnection(config);
	let id = req.body.id;
	const first = req.body.firstName;
	const last = req.body.lastName;
  const email = req.body.email;
	const location = req.body.location;
	
	let sql = "UPDATE `Customer` SET `FirstName` = ?, `LastName` = ?, `Email` = ?, `PrimaryLocation` = ? WHERE (`cust_id` = ?)";
	let data = [first, last, email, location, id];

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		let obj = JSON.parse(string);
 		res.send({ results: obj });
    console.log({results: obj})
	});
	connection.end();
});

app.put('/api/editproviderprofile', (req, res) => {
	let connection = mysql.createConnection(config);
	let id = req.body.id;
  console.log(id)
	const first = req.body.firstName;
	const last = req.body.lastName;
  const email = req.body.email;
	const location = req.body.location;
  const description = req.body.description;
  const serviceType = req.body.serviceType;
  const experience = req.body.experience;

	let sql = "UPDATE `Service Provider` SET `FirstName` = ?, `LastName` = ?, `Email` = ?, `PrimaryLocation` = ?, `Description` = ?, `ServiceType` = ?, `ExperienceYears` = ? WHERE (`Service_ProviderID` = ?)";
	let data = [first, last, email, location, description, serviceType, experience, id];

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		let obj = JSON.parse(string);
 		res.send({ results: obj });
    console.log({results: obj})
	});
	connection.end();
});

app.post('/api/getcerts', (req, res) => {
	let connection = mysql.createConnection(config);
	let id = req.body.id;
	let sql = "SELECT certs.cert_id, certs.cert_name FROM `Service Provider` sp LEFT JOIN `Certifications` certs ON sp.Service_ProviderID = certs.service_provider_id WHERE sp.Service_ProviderID = ?";
	let data = [id];

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		let obj = JSON.parse(string);
 		res.send({ results: obj });
    //console.log({results: obj})
	});
	connection.end();
});

app.delete('/api/deletecert', (req, res) => {
	let connection = mysql.createConnection(config);
	let id = req.body.cert_id;

	let sql = "DELETE FROM `Certifications` WHERE (`cert_id` = ?)";
	let data = [id];

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		let obj = JSON.parse(string);
 		res.send({ results: obj });
    console.log({results: obj})
	});
	connection.end();
});

app.post('/api/addcert', (req, res) => {
	let connection = mysql.createConnection(config);
  let name = req.body.cert_name;
  let providerID = req.body.service_provider_id;

	let sql = "INSERT INTO `Certifications` (service_provider_id, cert_name) VALUES (?, ?)";
	let data = [providerID, name];

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		let obj = JSON.parse(string);
 		res.send({ results: obj });
    console.log({results: obj})
	});
	connection.end();
});

app.post('/api/initservicerequest', (req, res) => {
	auth(req, res, () => {
		let connection = mysql.createConnection(config);

		let cust_id = req.userID;
		let sp_id = req.body.sp_id;
		let location = req.body.location;
		let desc = req.body.desc;
		let type = req.body.type;
		let contact = req.body.contact_info;

		let sql = "INSERT INTO krajesh.`Service Request` (`cust_id`, `Service_ProviderID`, `Location`, `Description`, `Service Type`, `contact_info`, `status`) VALUES (?, ?, ?, ?, ?, ?, 'start')";
		console.log(sql);
		let data = [cust_id, sp_id, location, desc, type, contact];
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
});

app.post('/api/getservicerequests', (req, res) => {
	auth(req, res, () => {
		let connection = mysql.createConnection(config);

		let id = req.userID;
		let is_sr = req.is_sr;
		
		if (is_sr) {
			let sql = "SELECT * FROM krajesh.`Service Request` WHERE `service_providerID` = ?";
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
		} else {
			let sql = "SELECT * FROM krajesh.`Service Request` WHERE `cust_id` = ?";
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
		}
	});
});

app.post('/api/updateservicerequest', (req, res) => {
	let connection = mysql.createConnection(config);

	let sr_id = req.body.service_request_id;
	
	let sql = "SELECT * FROM krajesh.`Service Request` WHERE Service_ReqID = ?";
	console.log(sql);
	let data = [sr_id];
	console.log(data);

	var sr = {}
  
	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		sr = JSON.parse(string);
	});

	if (sr.status == 'start') {
		// provider contacts customer for extra details
		let button_status = req.body.status;

		if (button_status == 'accept') {
			let sql = "UPDATE krajesh.`Service Request` SET `status` = 'accepted'WHERE Service_ReqID = ?";
			console.log(sql);
			let data = [sr_id];
			console.log(data);

			var sr = {}

			connection.query(sql, data, (error, results, fields) => {
				if (error) {
					return console.error(error.message);
				}

				let string = JSON.stringify(results);
				let obj = JSON.parse(string);
				res.send({ results: obj });
			});
		} else if (button_status == 'decline') {
			let sql = "UPDATE krajesh.`Service Request` SET `status` = 'declined' WHERE Service_ReqID = ?";
			console.log(sql);
			let data = [sr_id];
			console.log(data);

			var sr = {}

			connection.query(sql, data, (error, results, fields) => {
				if (error) {
					return console.error(error.message);
				}

				let string = JSON.stringify(results);
				let obj = JSON.parse(string);
				res.send({ results: obj });
			});
		}
	} else if (sr.status == 'accepted') {
		// provider accepts request and completes the job
		let sql = "UPDATE krajesh.`Service Request` SET `status` = 'review' WHERE Service_ReqID = ?";
		console.log(sql);
		let data = [sr_id];
		console.log(data);

		var sr = {}

		connection.query(sql, data, (error, results, fields) => {
			if (error) {
				return console.error(error.message);
			}

			let string = JSON.stringify(results);
			let obj = JSON.parse(string);
			res.send({ results: obj });
		});
	} else if (sr.status == 'review') {
		// set status to 'completed'
		let review_score = req.body.score;
		let review_desc = req.body.review;

		let sql = "UPDATE krajesh.`Service Request` SET `status` = 'completed', `review_score` = ?, `review_desc` = ? WHERE Service_ReqID = ?";
		console.log(sql);
		let data = [review_score, review_desc, sr_id];
		console.log(data);

		var sr = {}

		connection.query(sql, data, (error, results, fields) => {
			if (error) {
				return console.error(error.message);
			}

			let string = JSON.stringify(results);
			let obj = JSON.parse(string);
			res.send({ results: obj });
		});
	}

	connection.end();
});

app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
//app.listen(port, '129.97.25.211'); //for the deployed version, specify the IP address of the server
