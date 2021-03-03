import React from "react";
import { Link } from "react-router-dom";
import { Favorites } from "../views/favorite";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-expand-lg mb-3 pr-0 flex-nowrap">
			<div className="container-fluid row">
				<Link to="/">
					<span className="navbar-brand mb-0">
						<img
							src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Star_Wars_Logo.svg/640px-Star_Wars_Logo.svg.png"
							alt="star wars logo"
							className="logo-nav ml-2"
						/>
					</span>
				</Link>

				<Favorites />
			</div>
		</nav>
	);
};
