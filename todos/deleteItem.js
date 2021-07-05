/*
Author : Rhea
Functionality: To delete the todo item
Description: We are deleting a todo list item. If the token is valid and the id of the item is valid 
we can delete the todo item , otherwise we can't. 
*/


const readlineSync = require('readline-sync');
const verifyToken = require('../helpers/verifyToken');
const { writeFile, readFile } = require('fs/promises');
const path = require('path');
const { read } = require('fs');


async function deleteItem() {
    try {
        // we first check if the token is valid
        const userEmail = verifyToken();
        if (!userEmail) {
            console.log("Invalid Token/ Token Expired");
            return;
        }
        console.log("Token Verified Successfully ", userEmail);

        //enter the id and read the file


        let users = await readFile(path.resolve('data/users.json'));
        users = JSON.parse(users);

        //find the user and then the array of todos
        const userIndex = users.findIndex(user => user.email === userEmail);
        let todos = users[userIndex].todo

        //check if todo list is empty

        if (!todos.length) {
            console.log("Todo list empty, Nothing To Delete");
            return;
        }

        const id = readlineSync.question("Enter Id of Todo List Item To Delete: ");
        // if not found it will return undefined -> wrong id 
        let todoFound = todos.find((ele) => id === ele.id);
        if (!todoFound) {
            console.log('Wrong Id Entered');
            return;
        }

        //deleting todo list item 
        let itemDeleted = todoFound.todoItem;
        todos = todos.filter(ele => id != ele.id);
        users[userIndex].todo = todos;

        //write new todo list to the file
        await writeFile(path.resolve('data/users.json'), JSON.stringify(users));
        console.log('We have deleted :', itemDeleted);

    } catch (err) {
        throw (err);
    }
}
module.exports = deleteItem;

