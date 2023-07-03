import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Login = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState(""); 
	const [password, setPassword] = useState(""); 
	const navigate = useNavigate();

	const handleClick = () => {
		actions.login(email,password);
		navigate('/private')
	};

	return (
		<div className="text-center mt-5">
			<input type="text" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} /> 
			<input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} /> 
			<button className="btn btn-secondary mr-4" onClick={handleClick}>Submit</button>
			<div className="alert alert-info">
				{store.message || "Loading message from the backend (make sure your python backend is running)..."}
			</div>
		</div>
	);
};