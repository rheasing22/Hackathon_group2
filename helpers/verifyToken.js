const readlineSync = require('readline-sync');
const jwt = require('jsonwebtoken');

function verifyToken() {
    try {
        let token = readlineSync.question("Enter your access token : ");
        let decoded = jwt.verify(token, 'thehackingschoolprash');
        let userEmail = decoded.user;
        return userEmail;
    } catch (err) {
        return false;
    }
}

module.exports = verifyToken;