import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Login = () => {
	const { store, actions } = useContext(Context);
	const {email, setEmail} = useState("");
	const {password, setPassword} = useState("");

	const handleClick = () => {
		const opts = {
			method: 'POST',
			body: JSON.stringify({
				"email":email,
				"password":password
			})
		}
		fetch ('https://brennybaker-bookish-eureka-9vg7j65gx66f7pgw-3001.preview.app.github.dev/api/login', opts)
			.then(resp => {
				if(resp.staus === 200) return resp.json();
				else console.log ("ERROR")
			})
			.then()
			.catch(error => {
				console.error ("there was an error", error)
			})
	return (
		<div className="text-center mt-5">
			<input type="text" placeholder="email"></input>
			<input type="password" placeholder="password"></input>
			<button className = "btn btn-secondary mr-4">Submit</button>
			<div className="alert alert-info">
				{store.message || "Loading message from the backend (make sure your python backend is running)..."}
			</div>
		</div>
	);
};
};
