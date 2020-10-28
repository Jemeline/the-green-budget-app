const jwt =require('jsonwebtoken');
const sha256 = require('js-sha256');
const { request } = require("express");

function generateJWTToken(data) {
    return jwt.sign(data, process.env.SECRET_KEY, { expiresIn: '5' });
}
function verifyJWTToken(jwtToken) {
    let decoded = null
    try {
        decoded = jwt.verify(jwtToken, process.env.SECRET_KEY);
        return decoded;
    } catch(err) {
        return decoded
    }   
};

module.exports = {
    generateJWTToken,
    verifyJWTToken
}