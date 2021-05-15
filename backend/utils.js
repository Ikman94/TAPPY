const jwt = require('jsonwebtoken');
const mg = require('mailgun-js');
const nodemailer = require('nodemailer')

const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (authorization) {
        const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
        jwt.verify(
            token,
            process.env.JWT_SECRET || 'somethingsecret',
            (err, decode) => {
                if (err) {
                    res.status(401).send({ message: 'Invalid Token' });
                } else {
                    req.user = decode;
                    next();
                }
            }
        );
    } else {
        res.status(401).send({ message: 'No Token' });
    }
};

const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401).send({ message: 'Invalid Admin Token' });
    }
};
// const mailgun = () =>
//     mg({
//         apiKey: process.env.MAILGUN_API_KEY,
//         domain: process.env.MAILGUN_DOMIAN,
//     });

// const newCustomerEmailTemplate = (user) =>{
//     return `
//         <h1> Account Login Details</h1>
//         <p>Howdy</p>
//         <p>Thank you for choosing TAP. Your login details has been attached to this mail below. Please use the information to login in</p>
//         <p> email: ${user.email}</p>
//         <p> password: ${user.password}</p>
//     `
// };
// const transport = nodemailer.createTransport({
//     host: "smtp.mailtrap.io",
//     port: 2525,
//     auth: {
//         user: "0912b0a6f8f443",
//         pass: "ef34a83d1cb47d"
//     }
// });
// const message = {
//     from: 'elonmusk@tesla.com',
//     to: 'to@email.com',
//     subject: 'Design Your Model S | Tesla',
//     html: '<h1>Have the most fun you can in a car!</h1><p>Get your <b>Tesla</b> today!</p>'
// };
module.exports = isAdmin;
module.exports = isAuth;
// module.exports = mailgun;
// module.exports = newCustomerEmailTemplate;
