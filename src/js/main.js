'use strict';

const btnLogin = document.querySelector('.btn__login');
const inputUsernameEl = document.querySelector('#username');
const inputPasswordEl = document.querySelector('#password');
const ENDPOINT = 'http://localhost:3000/users';

const compareData = data => {
	const username = inputUsernameEl.value || '';
	const password = inputPasswordEl.value || '';
	const user = data.find(element => element.name === username && element.password === password);

	if(user) {
		window.location.href = '/registered.html';
	} else {
		alert('The user doesn\'t exist');
	}

};

function getUsers() {
	fetch(ENDPOINT)
		.then(response => {
			if(!response.ok){
				throw Error(response.statusText);
			}

			return response.json();
		})
		.then(data => compareData(data))
		.catch(error => console.log(`Error: ${error}`));
}

function handleButtonClick(e) {
	e.preventDefault();
	getUsers();
}

btnLogin.addEventListener('click', handleButtonClick);
