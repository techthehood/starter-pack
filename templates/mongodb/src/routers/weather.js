const express = require('express');
const router = express.Router();
const cors = require('cors');// make sure not just anyone can use my post requests

const corsOptions = require('../utils/cors-options.js');

const forecast = require('../utils/forecast.js');
const getLocation = require('../utils/getLocation.js');

  router.get('/req/forecast', cors(corsOptions), (req, res) => {
    // console.log(req.query);
    // console.log(req.query.search);
    // req.query
    if(!req.query.address){
      // cant send twice so use return
      return res.send({
        error:'You must provide an address'
      })
    }//if

    getLocation(encodeURIComponent(req.query.address),(error, {url, place_name} = {}) => {
      if(error){
        console.log(chalk.red('an error occured'))
        return res.send({error})
      }

      forecast({url,place_name},(error,response) => {

        if(error){
          console.log(chalk.red({error}))
          return res.send(error)
        }

        res.send(response)
      })
    });

    // res.send(current_weather);

  })// forcast

  // if not external files use these get methods to return
  // request based on what if found in the urls pathname
  router.get('/req/weather', cors(corsOptions), (req, res) => {
    // res.send('Hello express!')
    console.log(`[top weather] running!`);
    res.render('index', {
      title:'Weather',
      name: 'Andrew Mead'
    })
  })


  router.get('/req/weather', cors(corsOptions), (req, res) => {
    // console.log(`[bottom weather] running!`);
    // express runs from top to bottom - using the 1st instance that fit the url path
    res.send({forecast:"sunny all day",location:"philadelphia"})
  })

module.exports = router;
