const readlineSync = require('readline-sync');
//Importing User Functions
const user = require('./users');
const todos = require('./todos');

async function main() {
    console.clear();
    console.log("-------------------------");
    console.log("      Menu Options ");
    console.log("-------------------------");
    var options = [
        "Exit The Program",
        "Create a New User Account",
        "User Login",
        "Add a ToDo Item",
        "Get a ToDo Item",
        "Update a ToDo Item",
        "Delete a ToDo Item",
        "Get All ToDo Items",
        "Delete a User Account"
    ];
    options.forEach((ele, index) => console.log(`${index} To ${ele}`));
    console.log("-------------------------");
    var option = readlineSync.questionInt("Enter Your Option from the above Menu : ");
    if (option >= 0 && option <= options.length - 1) {
        switch (option) {
            case 0:
                console.log("Exiting the Program. Bye. Bye");
                return;
            case 1:
                console.log("Creating New User Account");
                await user.userRegister();
                break;
            case 2:
                console.log("Performing User Login");
                await user.userLogin();
                break;
            case 3:
                console.log("Adding a ToDo item");
                await todos.addItem();
                break;
            case 4:
                console.log("Getting a ToDo item");
                await todos.getToDo();
                break;
            case 5:
                console.log("Updating a ToDo item");
                break;
            case 6:
                console.log("Deleting a ToDo item");
                await todos.deleteItem();
                break;
            case 7:
                console.log("Getting all ToDo items");
                await todos.getAllToDos();
                break;
            case 8:
                console.log("Deleting a user Account");
                await user.userDelete();
                break;
        }
        var shouldContinue = readlineSync.question("Do you want to continue ? (y/n) : ");
        if (shouldContinue === 'y' || shouldContinue === 'Y' || shouldContinue === 'yes') {
            main();
        } else {
            console.log("Exiting the Program. Bye. Bye");
        }
    } else {
        console.log("Invalid Input. Please Try Again.");
        setTimeout(() => {
            main();
        }, 3000);
    }
}
main();