const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			favorites: [],
			people: [],
			planets: [],
			isLogged: "false"
		},
		actions: {
			// Use getActions to call a function within a fuction

			loadPeople: () => {
				fetch("https://3000-purple-tick-m9my33f9.ws-us03.gitpod.io/people/")
					.then(response => {
						if (!response.ok) {
							throw Error(response.statusText);
						}
						return response.json();
					})
					.then(data => {
						setStore({ people: data });
					})
					.catch(err => console.error(err));
			},

			loadPlanets: () => {
				fetch("https://3000-purple-tick-m9my33f9.ws-us03.gitpod.io/planets/")
					.then(response => {
						if (!response.ok) {
							throw Error(response.statusText);
						}
						return response.json();
					})
					.then(data => {
						setStore({ planets: data });
					})
					.catch(err => console.error(err));
			},

			loadFavorites: () => {
				let user_token = sessionStorage.getItem("user_token");
				fetch("https://3000-purple-tick-m9my33f9.ws-us03.gitpod.io/favorites", {
					method: "GET",
					headers: {
						Authorization: "Bearer " + user_token
					}
				})
					.then(response => {
						if (!response.ok) {
							throw Error(response.statusText);
						}
						return response.json();
					})
					.then(data => {
						setStore({ favorites: data });
						console.log("favorites were added");
					})
					.catch(err => console.error(err));
			},

			addFavorites: variable => {
				let data = {
					fav_name: variable
				};

				let user_token = sessionStorage.getItem("user_token");
				fetch(`https://3000-purple-tick-m9my33f9.ws-us03.gitpod.io/favorites/${variable}`, {
					method: "POST",
					headers: {
						Authorization: "Bearer " + user_token
					},
					body: JSON.stringify(data)
				})
					.then(response => {
						if (!response.ok) {
							throw Error(response.statusText);
						}
						return response.json();
					})
					.then(datos => {
						setStore({ favorites: datos });
						console.log("Favorite added");
					})
					.catch(error => {
						console.error("Error:", error);
					});
			},

			deleteFav: variable => {
				let user_token = sessionStorage.getItem("user_token");
				fetch(`https://3000-purple-tick-m9my33f9.ws-us03.gitpod.io/favorites/${variable}`, {
					method: "DELETE",
					headers: {
						Authorization: "Bearer " + user_token
					}
				})
					.then(response => {
						if (!response.ok) {
							throw Error(response.statusText);
						}
						return response.json();
					})
					.then(data => {
						setStore({ favorites: data });
						console.log("Favorite deleted");
					})
					.catch(error => {
						console.error("Error:", error);
					});
			},

			deleteAll: () => {
				let user_token = sessionStorage.getItem("user_token");
				fetch("https://3000-purple-tick-m9my33f9.ws-us03.gitpod.io/favorites", {
					method: "DELETE",
					headers: {
						Authorization: "Bearer " + user_token
					}
				})
					.then(response => {
						if (!response.ok) {
							throw Error(response.statusText);
						}
						return response.json();
					})
					.then(data => {
						setStore({ favorites: data });
						console.log("Favorites deleted");
					})
					.catch(error => {
						console.error("Error:", error);
					});
			},

			logged: () => {
				let status = sessionStorage.getItem("is_logged");
				status != "true" ? setStore({ isLogged: "false" }) : setStore({ isLogged: status });
			},

			logOut: () => {
				sessionStorage.removeItem("user_token");
				sessionStorage.removeItem("is_logged");
				getActions().logged();
			}
		}
	};
};

export default getState;
