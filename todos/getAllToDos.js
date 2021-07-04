const readlineSync = require('readline-sync');
const verifyToken = require('../helpers/verifyToken');
const { writeFile, readFile } = require('fs/promises');
const path = require('path');

async function getAllToDos(){
	try {
		const userEmail = verifyToken();
		if (!userEmail) {
			console.log('Invalid Token / Token expired');
			return;
		}
		let users = await readFile(path.resolve('data/users.json'));
		users = JSON.parse(users);
		const userIndex = users.findIndex((user) => user.email === userEmail);
		if (!users[userIndex].todo) {
			console.log('No items to display');
		}
		console.log('These are all the ToDo items ', users[userIndex].todo);
	} catch (err) {
		console.log('error', err);
	}
}

module.exports = getAllToDos;
