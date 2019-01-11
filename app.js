const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const nodemailer = require('nodemailer');
const path = require('path');


const app = express();

//View engine Setup
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars')

//Body parser Middleware
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

//static files
app.use('/public', express.static(path.join(__dirname, 'public')));

//Routes
app.get('/', (req, res) => {
  res.render('contact');
});

app.post('/send', (req, res) => {
  const output = `<p> Tienes una nueva petición </p>
  <h3>Detalles del contacto </h3>
  <ul>
    <li>Name ${req.body.name} </li>
    <li>Company ${req.body.company} </li>
    <li>Email ${req.body.email} </li>
    <li>Phone ${req.body.phone} </li>

  </ul>
  <h3>Mensaje </h3>
  ${req.body.message}`;

  let transporter = nodemailer.createTransport( {
    service: 'gmail',
      auth: {
          user: "",
          pass: ""
      }
  });

    let mailOptions = {
      from: '"Enoc NodeEmail 👻" <enocpinedaa@gmail.com>', // sender address
      to: "enocpinedaa@gmail.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: output // html body
    };

    transporter.sendMail(mailOptions, (error, info) =>{
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

      res.render('constact', {msg: 'El Mensaje ha sido enviado '});
    });



});

app.listen('3000', () => {
  console.log('Servidor corriendo en el puerto 3000');
});
