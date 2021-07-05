/*
Author : Rhea 
Functionality: To delete the user
Description:We are deleting the user based on the email. If the email and the password are correct we are able to 
delete the user , otherwise the authentication fails.
*/

const readlineSync = require('readline-sync');
const bcrypt = require("bcrypt");
const { writeFile, readFile } = require('fs/promises');
const path = require('path');
const loadingSpinner = require('../helpers/loadingAnimation');

async function userDelete() {
    try {

        //ask for email and password
        let email = readlineSync.questionEMail("Enter your email : ");
        let password = readlineSync.question("Enter Password : ", {
            hideEchoBack: true
        });
        loadingSpinner.startLoading();
        //Step 1 : Access the DB to validate the entered email address
        //Access DB Logic
        let users = await readFile(path.resolve('data/users.json'));
        users = JSON.parse(users);
        //check if the email entered is correct 
        const userIndex = users.findIndex(user => user.email === email);
        if (userIndex < 0) {
            loadingSpinner.stopLoading();
            console.log("Authentication Failed");
            return;
        }
        //check if the password entered is correct 
        const match = await bcrypt.compare(password, users[userIndex].password)
        if (!match) {
            loadingSpinner.stopLoading();
            console.log("Authentication Failed");
            return;
        }

        //deleting the user 
        users = users.filter(user => user.email != email);
        await writeFile(path.resolve('data/users.json'), JSON.stringify(users));
        loadingSpinner.stopLoading();
        console.log("User is Deleted Successfully");


    } catch (err) {
        console.error(err);
    }
}

module.exports = userDelete;