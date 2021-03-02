const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			favorites: [],
			people: [],
			planets: []
		},
		actions: {
			// Use getActions to call a function within a fuction

			loadPeople: () => {
				fetch("https://3000-purple-tick-m9my33f9.ws-us03.gitpod.io/people/")
					.then(res => res.json())
					.then(data => {
						setStore({ people: data });
					})
					.catch(err => console.error(err));
			},

			loadPlanets: () => {
				fetch("https://3000-purple-tick-m9my33f9.ws-us03.gitpod.io/planets/")
					.then(res => res.json())
					.then(data => {
						setStore({ planets: data });
					})
					.catch(err => console.error(err));
			},

			addFavorites: variable => {
				let favoritos = getStore().favorites;
				favoritos = favoritos.concat(variable);
				setStore({ favorites: [...favoritos] });
			},

			deleteFav: variable => {
				let favoritos = getStore().favorites;
				let borrar = favoritos.find(el => el === variable);
				let index = favoritos.indexOf(borrar);
				favoritos.splice(index, 1);
				setStore({ favorites: [...favoritos] });
			},

			deleteAll: () => {
				setStore({ favorites: [] });
			}
		}
	};
};

export default getState;
