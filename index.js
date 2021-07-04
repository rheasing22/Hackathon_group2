const readlineSync = require('readline-sync');
//Importing User Functions
const user = require('./users');
const todos = require('./todos');
const colors = require('colors');

colors.setTheme({
    info: 'blue',
    error: 'red',
    heading: 'cyan',
    options: 'green',
    lines: 'yellow',
    question: 'blue',
    exit: 'magenta',
    display: 'cyan'
});

async function main() {
    console.clear();
    console.log("+----------------------------------------+".lines);
    console.log("           Menu Options                   ".heading.bold);
    console.log("+----------------------------------------+".lines);
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
    options.forEach((ele, index) => console.log(`\t${index}. To ${ele}`.options));
    console.log("+----------------------------------------+".lines);
    var option = readlineSync.questionInt("Enter Your Option from the above Menu : ".question);
    if (option >= 0 && option <= options.length - 1) {
        switch (option) {
            case 0:
                console.log("Exiting the Program. Bye. Bye".exit);
                return;
            case 1:
                console.log("Creating New User Account".display);
                await user.userRegister();
                break;
            case 2:
                console.log("Performing User Login".display);
                await user.userLogin();
                break;
            case 3:
                console.log("Adding a ToDo item".display);
                await todos.addItem();
                break;
            case 4:
                console.log("Getting a ToDo item".display);
                await todos.getToDo();
                break;
            case 5:
                console.log("Updating a ToDo item".display);
                await todos.updateToDo()
                break;
            case 6:
                console.log("Deleting a ToDo item".display);
                await todos.deleteItem();
                break;
            case 7:
                console.log("Getting all ToDo items".display);
                await todos.getAllToDos();
                break;
            case 8:
                console.log("Deleting a user Account".display);
                await user.userDelete();
                break;
        }
        var shouldContinue = readlineSync.question("Do you want to continue ? (y/n) : ".yellow);
        if (shouldContinue === 'y' || shouldContinue === 'Y' || shouldContinue === 'yes') {
            main();
        } else {
            console.log("Exiting the Program. Bye. Bye".exit);
        }
    } else {
        console.log("Invalid Input. Please Try Again.".error);
        setTimeout(() => {
            main();
        }, 3000);
    }
}
main();