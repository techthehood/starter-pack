const chalk = require('chalk');
const nodemailer = require('nodemailer');
// const User = require('../../../models/user');
const { G_MAIL_USER, G_MAIL_PASS } = require('../../../utils/keys');

const display_console = false;

const sendMail = async function (req, res) {
  try {

    let processed_msg = `[sendMail] sendMail api accessed`;
    if (display_console || true) console.log(chalk.keyword('aquamarine')(processed_msg));
    // [w3schools colors](https://www.w3schools.com/tags/ref_colornames.asp)

    if (display_console || true) console.log(chalk.red("[sendMail] body"), req.body);
    // throw "testing stack";

    const format = req.body.format || "html";

    console.log("[sendMail] req.headers", req.headers);
    console.log("[sendMail] mail user", G_MAIL_USER, G_MAIL_PASS);
    // console.log(chalk.keyword('pink')("[sendMail] req.cookies", req.cookies));


    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      // port: 465,
      // secure: true, // use SSL
      auth: {
        user: G_MAIL_USER,
        pass: G_MAIL_PASS
      }
    });
    // NOTE: this setup sends directly to the gmail account i want to contact (send to self)

    // const transporter = nodemailer.createTransport(config);// 550 error
    // this setup uses yahoo as a third party to send to a different email i want to contact
    // sms_test.sunzao@yahoo.com > jobsnotguns@gmail.com (not working 550 Error)

    const mailOptions = {
      from: req.body.email,
      to: G_MAIL_USER,// 'jobsnotguns@gmail.com'
      subject: `Message from ${req.body.email}: ${req.body.subject}`,
      // text: req.body.message// for plain text
    }// mailOptions

    
    switch (format) {
      
      case "text":
          mailOptions.text = req.body.message;
        break;
        
      case "email":
        // email template
        mailOptions.html = req.body.message;
        break;
        
      default:
          mailOptions.html = req.body.message;
        break;
    }

    console.log("[sendMail] mail format", format);

    // res.json({
    //   sendMail: true,
    //   message: processed_msg,
    //   user: G_MAIL_USER
    // });
    // return; 

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.send('error');
      } else {
        console.log('Email sent:', info.response);
        res.send('success');

        // res.json({
        //   sendMail: true,
        //   message: processed_msg,
        //   user: req.user
        // });
      }// else 'success
    })


  } catch (e) {
    let err_msg = "[sendMail] an error occured";
    console.error(chalk.red(err_msg), e);
    res.status(500).json({
      message: err_msg,
      error: error
    });
  }
}// sendMail

module.exports = sendMail;
