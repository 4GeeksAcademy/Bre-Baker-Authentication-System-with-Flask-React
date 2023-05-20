import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import { Link } from "react-router-dom";
import "../../styles/home.css";

export const Home = () => {

	return (
		<div className="text-center mt-5">
			<h1>Welcome to this super cool authenticator!</h1>
		</div>
	);
};
