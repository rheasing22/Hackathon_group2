/*
Author : Ansh Bindal
Functionality: To get a todo item based on its id
Description:We are getting a todo list item. If the token and the id of the item is valid we can get the todo item , otherwise we can't. 
*/

const readlineSync = require("readline-sync");
const verifyToken = require("../helpers/verifyToken");
const { writeFile, readFile } = require("fs/promises");
const path = require("path");

async function getToDo() {
	try {
		const userEmail = verifyToken();
		if (!userEmail) {
			console.log("Invalid Token / Token expired");
			return;
		}
		let users = await readFile(path.resolve("data/users.json"));
		users = JSON.parse(users);
		const userIndex = users.findIndex((user) => user.email === userEmail);
		if (!users[userIndex].todo.length) {
			console.log("No items to display");
			return;
		}
		const todos = users[userIndex].todo;
		const id = readlineSync.question(
			`You have a total of ${todos.length} todo items, \nPlease enter the id of the ToDo you want to view : `
		);
		try {
			let todoFound = todos.find((ele) => id === ele.id).todoItem;
			console.log('The todo item is:', todoFound);
		} catch {
			console.log("Wrong ID entered");
		}
	} catch (err) {
		console.log("error", err);
	}
}

module.exports = getToDo;
