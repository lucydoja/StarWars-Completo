import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export function Favorites() {
	const { store, actions } = useContext(Context);
	let logged = store.isLogged;
	let contador = store.favorites.length;
	if (logged != "true") {
		return (
			<div>
				{" "}
				<Link to={"/register"}>
					<span className="btn btn-outline-light mr-2" href="#" role="button">
						Register
					</span>
				</Link>
				<Link to={"/login"}>
					<span className="btn btn-outline-light" href="#" role="button">
						Log in
					</span>
				</Link>{" "}
			</div>
		);
	} else {
		return (
			<div className="dropdown " id="dropdownDiv">
				<Link to={"/"}>
					<span
						className="btn btn-outline-light mr-2"
						onClick={() => {
							actions.logOut();
						}}
						href="#"
						role="button">
						Log out
					</span>
				</Link>
				<button
					className="btn btn-light dropdown-toggle"
					data-boundary="window"
					type="button"
					id="dropdownMenuButton"
					data-toggle="dropdown"
					aria-haspopup="true"
					aria-expanded="false">
					Favorites {""} {contador}
				</button>
				<div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
					{contador == 0 ? (
						<div id="dropdown" className="d-flex ml-4">
							Empty
						</div>
					) : (
						store.favorites.map((item, index) => {
							return (
								<div key={index} id="dropdown" className="d-flex flex-row">
									<Link className="d-flex flex-grow-1" to={"/info/" + item}>
										<span className="dropdown-item">{item}</span>
									</Link>
									<i className="fas fa-trash-alt mt-2 mr-2" onClick={() => actions.deleteFav(item)} />
								</div>
							);
						})
					)}
					<div>
						<div className="dropdown-divider" />
						<Link to={"/list"}>
							<span className="dropdown-item">View list</span>
						</Link>
					</div>
				</div>
			</div>
		);
	}
}
