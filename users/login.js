const readlineSync = require('readline-sync');
const bcrypt = require("bcrypt");
const { readFile } = require('fs/promises');
const path = require('path');
const jwt = require('jsonwebtoken');
const loadingSpinner = require('../helpers/loadingAnimation');

const SECRET_KEY = 'thehackingschoolprash';


async function userLogin() {
    try {
        let email = readlineSync.questionEMail("Enter your email : ");
        let password = readlineSync.question("Enter Password : ", {
            hideEchoBack: true
        });
        loadingSpinner.startLoading();
        //Step 1 : Access the DB to validate the entered email address
        //Access DB Logic
        let users = await readFile(path.resolve('data/users.json'));
        users = JSON.parse(users);
        const userData = users.find(user => user.email === email);
        if (!userData) {
            loadingSpinner.stopLoading();
            console.log("Authentication Failed");
            return;
        }
        const match = await bcrypt.compare(password, userData.password)
        if (!match) {
            loadingSpinner.stopLoading();
            console.log("Authentication Failed");
            return;
        }
        //Here Payload is email id
        const payload = {
            user: email
        }
        //Creating Access Token
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: 60 * 60 });
        loadingSpinner.stopLoading();
        console.log(token);
        console.log("Login is Success");
    } catch (err) {
        console.error(err.message);
    }
}

module.exports = userLogin;