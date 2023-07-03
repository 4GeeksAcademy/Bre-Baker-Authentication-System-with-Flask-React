import { Link } from 'react-router-dom'

const getState = ({ getStore, getActions, setStore }) => {
	return {
	  store: {
		token: null,
		message: null,
		userData: null,
	  },
	  actions: {
		// Use getActions to call a function within a function
		exampleFunction: () => {
		  getActions().changeColor(0, "green");
		},
		// LOGIN
		login: async (email, password) => {
		  const opts = {
			method: 'POST',
			body: JSON.stringify({
			  email: email,
			  password: password
			}),
			headers: {
			  'Content-Type': 'application/json'
			}
		  };
  
		  try {
			const resp = await fetch('https://brennybaker-bookish-eureka-9vg7j65gx66f7pgw-3001.preview.app.github.dev/api/login', opts);
			if (resp.status === 200) {
			  const data = await resp.json();
			  console.log(data.access_token);
			  sessionStorage.setItem('token', data.access_token);
			  setStore({ token: data.access_token });

			  window.location.href = '/private';
			} else {
			  console.log('ERROR');
			}
		  } catch (error) {
			console.error('There was an error', error);
		  }
		},
		// LOGOUT
		logout: async () => {
		  try {
			await fetch('https://brennybaker-bookish-eureka-9vg7j65gx66f7pgw-3001.preview.app.github.dev/api/logout', {
			  method: 'POST',
			  headers: {
				Authorization: `Bearer ${getStore.token}`
			  }
			});
			sessionStorage.removeItem('token');
			setStore({ token: null });
  
			// Redirect programmatically to /login
			window.location.href = '/login';
		  } catch (error) {
			console.error('Error:', error);
		  }
		},
		private: async (access_token) => {
			try {
			  const resp = await fetch("https://brennybaker-bookish-eureka-9vg7j65gx66f7pgw-3001.preview.app.github.dev/api/protected", {
				headers: {
				  Authorization: `Bearer ${access_token}`,
				},
			  });
			  if (resp.ok) {
				const data = await resp.json();
				setStore({ userData: data }); // Update userData in the store
			  } else {
				throw new Error("Failed to fetch protected data");
			  }
			} catch (error) {
			  console.error("Error:", error);
			}
		  },
		getMessage: async () => {
		  try {
			// fetching data from the backend
			const resp = await fetch("https://brennybaker-bookish-eureka-9vg7j65gx66f7pgw-3001.preview.app.github.dev/api/hello");
			const data = await resp.json();
			setStore({ message: data.message });
			// don't forget to return something, that is how the async resolves
			return data;
		  } catch (error) {
			console.log("Error loading message from backend", error);
		  }
		},
		changeColor: (index, color) => {
		  // get the store
		  const store = getStore();
  
		  // we have to loop the entire demo array to look for the respective index
		  // and change its color
		  const demo = store.demo.map((elm, i) => {
			if (i === index) elm.background = color;
			return elm;
		  });
  
		  // reset the global store
		  setStore({ demo: demo });
		}
	  }
	};
  };
  
  export default getState;