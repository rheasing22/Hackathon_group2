/*
Author : Harsh 
Functionality: Update the todo item given the id
Description: We are updating a todo list item. If the token is valid and the id of the item is valid we can update the todo item 
otherwise we can't. 
*/

const readlineSync = require('readline-sync');
const verifyToken = require('../helpers/verifyToken');
const { writeFile, readFile } = require('fs/promises');
const path = require('path');



async function updateToDo() {
    try {
        // we first check if the token is valid
        const userEmail = verifyToken();
        if (!userEmail) {
            console.log("Invalid Token/ Token Expired");
            return;
        }
        console.log("Token Verified Successfully ", userEmail);

        //read the file
        let users = await readFile(path.resolve('data/users.json'));
        users = JSON.parse(users);

        //find the user and then the array of todos
        const userIndex = users.findIndex(user => user.email === userEmail);
        let todos = users[userIndex].todo

        //check if todo list is empty
        if (!todos.length) {
            console.log("Todo list empty, Nothing To Update");
            return;
        }

        const id = readlineSync.question("Enter Id of Todo List Item To Update: ");
        // if not found it will return undefined -> wrong id 
        let todoIndex = todos.findIndex((ele) => id === ele.id);
        console.log(todoIndex);
        if (todoIndex < 0) {
            console.log('Wrong Id Entered');
            return;
        }

        //updating todo list item 
        let updatedItem = readlineSync.question("Enter ToDo: ");
        users[userIndex].todo[todoIndex].todoItem = updatedItem;

        //write new todo list to the file
        await writeFile(path.resolve('data/users.json'), JSON.stringify(users));
        console.log('We have updated :', updatedItem);

    } catch (err) {
        throw (err);
    }


}
module.exports = updateToDo;