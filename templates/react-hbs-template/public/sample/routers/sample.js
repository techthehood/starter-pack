const express = require('express');
const chalk = require('chalk');
const router = express.Router();
const cors = require('cors');// make sure not just anyone can use my post requests
const keys = require('../../../utils/keys');
const production = false;

// console.log(chalk.cyan(`[sample] keys`),keys);

const corsOptions = require('../../../utils/cors-options.js');

  // if not external files use these get methods to return
  // request based on what if found in the urls pathname
  router.get('/sample', cors(corsOptions), (req, res) => {
    // res.send('Hello express!')
    console.log(`[top sample] running!`);
    res.render('sample', {
      title:'Rocket',
      name: 'Author Name'
    })
  });

  router.get('/full', cors(corsOptions), (req, res) => {
    // res.send('Hello express!')
    console.log(`[top sample] running!`);
    res.render('full', {
      title:'Rocket',
      name: 'Author Name'
    })
  });

  router.get('/main', cors(corsOptions), (req, res) => {
    // res.send('Hello express!')
    console.log(`[top sample] running!`);
    res.render('sample', {
      title:'Rocket',
      name: 'Author Name',
      use_local_files: keys.use_local_files,
      production,
    })
  });

  router.get('/soon', cors(corsOptions), (req, res) => {
    // res.send('Hello express!')
    console.log(`[top sample] running!`);
    res.render('jsoon', {
      title: 'Rocket',
      name: 'Author Name',
      use_local_files: keys.use_local_files,
    })
  });

  router.get('/', cors(corsOptions), (req, res) => {
    // res.send('Hello express!')
    console.log(`[top sample] running!`);
    res.render('sample', {
      title: 'Rocket',
      name: 'Author Name',
      use_local_files: keys.use_local_files,
      production,// works
    })
  });

module.exports = router;
