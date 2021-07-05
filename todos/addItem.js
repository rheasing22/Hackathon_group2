/*
Author : Prashanth
Functionality: To add the todo item
Description: We are adding a todo item. If the token is valid we can add the todo item to the file , otherwise we can't. 
*/


const readlineSync = require('readline-sync');
const verifyToken = require('../helpers/verifyToken');
const { writeFile, readFile } = require('fs/promises');
const loadingSpinner = require('../helpers/loadingAnimation');
const { v4: uuidv4 } = require('uuid');


const path = require('path');
const { read } = require('fs');

async function addItem() {
    try {
        const userEmail = verifyToken();
        if (!userEmail) {
            console.log("Invalid Token/ Token Expired");
            return;
        }
        console.log("Token Verified Successfully ", userEmail);
        const todoItem = readlineSync.question("Enter The ToDo Item : ");
        // create the unique id
        let id = uuidv4();
        const todoObj = { id, todoItem };
        let users = await readFile(path.resolve('data/users.json'));
        users = JSON.parse(users);

        const userIndex = users.findIndex(user => user.email === userEmail);

        if (!users[userIndex].todo) {
            users[userIndex].todo = [];
        }

        users[userIndex].todo.push(todoObj);

        await writeFile(path.resolve('data/users.json'), JSON.stringify(users));
        console.log("Added ToDo Item");
    } catch (err) {
        console.log(err);
    }
}

module.exports = addItem;