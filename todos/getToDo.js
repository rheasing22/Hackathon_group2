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
		if (!users[userIndex].todo) {
			console.log("No items to display");
			return;
		}
		const todos = users[userIndex].todo;
		const id = readlineSync.question(
			`You have a total of ${todos.length} todo items, \nPlease enter the id of the ToDo you want to view : `
		);
		try {
			 let todoFound = todos.find((ele) => id === ele.id).todoItem;
			 console.log(todoFound);
		} catch {
			console.log("Wrong ID entered");
		}
	} catch (err) {
		console.log("error", err);
	}
}

module.exports = getToDo;
