const readlineSync = require('readline-sync');
const bcrypt = require("bcrypt");
const { writeFile, readFile } = require('fs/promises');
const path = require('path');
const loadingSpinner = require('../helpers/loadingAnimation');


async function userRegister() {
    try {
        let firstName = readlineSync.question("Enter your name : ");
        let email = readlineSync.questionEMail("Enter your email : ");
        let password = readlineSync.question("Enter Password : ", {
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
        const userData = { firstName, email, password };
        let users = await readFile(path.resolve('data/users.json'));
        users = JSON.parse(users);
        const userFound = users.find(user => user.email === userData.email);
        if (userFound) {
            loadingSpinner.stopLoading();
            console.log("User Already Exists ! Please Use Different Email Address");
            return userRegister();
        }
        users.push(userData);
        await writeFile(path.resolve('data/users.json'), JSON.stringify(users));
        loadingSpinner.stopLoading();
        console.log("User is Registered Successfully");
    } catch (err) {
        console.error(err);
    }
}

module.exports = userRegister;