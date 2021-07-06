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
const verifyToken = require('../helpers/verifyToken');
async function userDelete() {
    try {

        const userEmail = verifyToken();
        if (!userEmail) {
            console.log("Invalid Token/ Token Expired");
            return;
        }
        console.log("Token Verified Successfully ", userEmail);

        //Access DB Logic
        let users = await readFile(path.resolve('data/users.json'));
        users = JSON.parse(users);

        //deleting the user 
        users = users.filter(user => user.email != userEmail);
        await writeFile(path.resolve('data/users.json'), JSON.stringify(users));
        console.log("User is Deleted Successfully");


    } catch (err) {
        console.error(err);
    }
}

module.exports = userDelete;