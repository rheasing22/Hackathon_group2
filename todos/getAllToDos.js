/*
Author : Ansh
Functionality: To get all todo items
Description: We are getting all the todo items. If the token is valid we can get all the todo items, otherwise we can't.  
*/

const readlineSync = require('readline-sync');
const verifyToken = require('../helpers/verifyToken');
const { writeFile, readFile } = require('fs/promises');
const path = require('path');

async function getAllToDos() {
	try {
		const userEmail = verifyToken();
		if (!userEmail) {
			console.log('Invalid Token / Token expired');
			return;
		}
		let users = await readFile(path.resolve('data/users.json'));
		users = JSON.parse(users);
		const userIndex = users.findIndex((user) => user.email === userEmail);


		if (!users[userIndex].todo.length) {
			console.log('No items to display');
			return;
		}

		const todos = users[userIndex].todo;
		console.log('These are all the ToDo items: ');
		todos.forEach((item, index) => console.log(`${index + 1}.${item.todoItem}`));
	} catch (err) {
		console.log('error', err);
	}
}

module.exports = getAllToDos;
