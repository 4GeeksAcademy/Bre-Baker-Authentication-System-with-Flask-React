import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Signup = () => {
	const navigate = useNavigate();
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleClick = () => {
		const opts = {
		  method: "POST",
		  body: JSON.stringify({
			first_name: firstName,
			last_name: lastName,
			email: email,
			password: password
		  }),
		  headers: {
			"Content-Type": "application/json"
		  }
		};
	
		fetch("https://brennybaker-bookish-eureka-9vg7j65gx66f7pgw-3001.preview.app.github.dev/api/signup", opts)
		  .then(resp => {
			if (resp.status === 200) return resp.json();
			else console.log("ERROR");
		  })
		  .then(data => {
			navigate ('/login')
			console.log(data.message)
		  })
		  .catch(error => {
			console.error("There was an error", error);
		  });
	  };
	

	return (
		<div className="jumbotron">
			<h1>Sign up for an account:</h1>
			<input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
			<input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
			<input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
			<input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
			<button className="btn btn-secondary mr-4" onClick={handleClick}>Submit</button>
		</div>
	);
};