'use strict';

const btnLogin = document.querySelector('.btn__login');
const inputUsernameEl = document.querySelector('#username');
const inputPasswordEl = document.querySelector('#password');
const bodyEl = document.body;
const ENDPOINT = 'http://localhost:3000/users';

const compareData = data => {
	const username = inputUsernameEl.value || '';
	const password = inputPasswordEl.value || '';
	const user = data.find(element => element.name === username && element.password === password);

	if(user) {
		window.location.href = '/registered.html';
	} else {
		createModal();
	}

};

const createModal = () => {
	const wrapperModalEl = document.createElement('div');
	wrapperModalEl.classList.add('modal_wrapper');

	const modalEl = document.createElement('div');
	modalEl.classList.add('alert');

	const titleEl = document.createElement('p');
	const textTitle = document.createTextNode('The user doesn\'t exist.');
	
	const closeEl = document.createElement('div');
	closeEl.classList.add('alert__close');
	const closeImg = document.createElement('i');
	closeImg.classList.add('fas');
	closeImg.classList.add('fa-times');
	closeImg.classList.add('alert__close--size');

	closeEl.appendChild(closeImg);
	titleEl.appendChild(closeEl);
	titleEl.appendChild(textTitle);
	modalEl.appendChild(titleEl);
	wrapperModalEl.appendChild(modalEl);
	bodyEl.appendChild(wrapperModalEl);

	closeEl.addEventListener('click', function() {
		closeModal(wrapperModalEl);
	})
}

const closeModal = element =>element.remove();

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
