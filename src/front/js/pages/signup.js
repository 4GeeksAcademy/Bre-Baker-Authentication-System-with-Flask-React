import React, { useState, useEffect, useContext } from "react";

export const Signup = () => {

	return (
		<div className="jumbotron">
			<h1>Sign up for an account:</h1>
			<input type = "text" placeholder = "First Name"></input>
			<input type = "text" placeholder = "Last Name"></input>
			<input type = "text" placeholder = "Email"></input>
			<input type = "password" placeholder = "Password"></input>
			<button class = "btn btn-secondary mr-4">Submit</button>
		</div>
	);
};
