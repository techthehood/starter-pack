const { HOSTNAME, DOMAIN_NAME, SERVER_PORT, LOCAL_PORT, NODE_ENV } = require('./keys');
const chalk = require('chalk');

// var whitelist = ['http://sample1.com', 'http://sample2.com'];
const whitelist = [
  `https://${DOMAIN_NAME}`,
  `https://www.${DOMAIN_NAME}`,
  `https://beta.${DOMAIN_NAME}`,
  `https://www.beta.${DOMAIN_NAME}`,
  `https://events.${DOMAIN_NAME}`
];

console.log(`[cors-options] NODE_ENV`, NODE_ENV, NODE_ENV.includes('development'));

if (NODE_ENV.includes('development')) {
  console.log(chalk.bgCyan(`[cors-options] updating whitelist`));
  whitelist.push(`http://localhost:${LOCAL_PORT}`);
}

console.log(`[cors-options] whitelist`, whitelist);
// this works
// var corsOptions = {
//   origin: 'https://${DOMAIN_NAME}',
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }

//GOTCHA: v8::internal::Heap::PerformGarbageCollection
// learn node perform garbage collection

const corsOptions = {
  methods: "GET,POST",
  origin: function (origin, callback) {
    console.log("[cors origin]", origin);//sometimes its undefined
    if (!origin) return callback(null, true);

    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback('Not allowed by CORS')
    }//else
  }
}//corsOptions

module.exports = corsOptions;
