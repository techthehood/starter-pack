const express = require('express');
const cp = require('cookie-parser');
const chalk = require('chalk');
const router = express.Router();
const cors = require('cors');// make sure not just anyone can use my post requests

// DOCS: the redirect doesn't help, its better to just throw a 401 error and catch it then do something
// const items = require("./items");
const mail = require("./mail");
// const arc = require("./arc");

const corsOptions = require('../../../utils/cors-options');// use the main one in landing-pages src dir
// const cookie_monster = require('../Controllers/cookie_monster');
// const process_memory = require('../utils/process_memory.js');

router.use(cp());// why do i need cookie-parser?

// router.all('/*', cors(corsOptions), cookie_monster);

// origin/api/
router.all('/*', cors(corsOptions), /*passportJWT,*/ async (req, res, next) => {
  console.log('[jng] api - cors/passport passed');
  next();
  // next(new Error("Permission denied."));
})

// router.use("/items", items);
// '/api/trigger/items/'

router.use("/mail", mail);
// router.use("/arc", arc);
//path: user/
// '/api/trigger/mail/'

// router.post('/', async (req, res) => {
//   //i need this protected by the new jw_token
//   console.log("[trigger api] / api accessed");
//   console.log("[req.body]", req.body);

//   let task = req.body.task;
// });// push

module.exports = router;

  //app.use('/api/alight', arcAPIRouter)// server side auth
