const express = require('express');
const cp = require('cookie-parser');
const chalk = require('chalk');
const mail = express.Router();
// const passport = require('passport');
// const sample = require('../Controllers/sample');

const sendMail = require('../controllers/sendMail');


// const process_memory = require('../utils/process_memory.js');
mail.use(cp());

//path: origin/api/trigger/mail/validate_token
// do i need this if the passportJWT is middleware in the api route? 
// A: yes this validate fn is the return validated message


mail.post('/sendMail', sendMail);



module.exports = mail;
