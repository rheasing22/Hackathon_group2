/*
Author: Prashanth
Functionality: We are registering the user 
Description: Reistering a new user .If the email is present in the data it is not added to the file otherwise email is added. 
*/

const readlineSync = require('readline-sync');
const bcrypt = require("bcrypt");
const { writeFile, readFile } = require('fs/promises');
const path = require('path');
const loadingSpinner = require('../helpers/loadingAnimation');


async function userRegister() {
    try {
        let firstName = readlineSync.question("Name : ");
        let email = readlineSync.questionEMail("Email : ");
        let password = readlineSync.question("Password : ", {
            hideEchoBack: true
        });
        let confirmPasswd = readlineSync.question("Confirm Password : ", {
            hideEchoBack: true
        });
        if (password !== confirmPasswd) {
            console.log("Passwords are not same. Try Again.")
            return userRegister();
        }
        loadingSpinner.startLoading();
        const saltRounds = 12;
        const salt = await bcrypt.genSalt(saltRounds);
        password = await bcrypt.hash(password, salt);
        // Data for users.json
        const userData = { firstName, email, password };
        let users = await readFile(path.resolve('data/users.json'));
        users = JSON.parse(users);
        // Data for todo.json
        const onlyEmail = {email};
        let dataFile  = await readFile(path.resolve('data/todo.json'));
        dataFile = JSON.parse(dataFile);

        const userFound = users.find(user => user.email === userData.email);
        if (userFound) {
            loadingSpinner.stopLoading();
            console.log("User Already Exists ! Please Use Different Email Address");
            return userRegister();
        }
        users.push(userData);
        await writeFile(path.resolve('data/users.json'), JSON.stringify(users));
        dataFile.push(onlyEmail);
        await writeFile(path.resolve('data/todo.json'), JSON.stringify(dataFile));
        
        loadingSpinner.stopLoading();
        console.log("User is Registered Successfully");
    } catch (err) {
        console.error(err);
    }
}

module.exports = userRegister;