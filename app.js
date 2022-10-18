 //Requerimos el paquete
 var nodemailer = require('nodemailer');
 require('dotenv').config();

 //Creamos el objeto de transporte
 var transporter = nodemailer.createTransport({
   service: 'gmail',
   auth: {
     user: 'luisrrleal@gmail.com',
     pass: process.env.PASS
   }
 });
 
 var mensaje = "Hola desde nodejs... si estás viendo esto es porque la prueba funcionó.";
 
 var mailOptions = {
   from: 'tucorreo@gmail.com',
   to: 'visualcenter.mkt@gmail.com',
   subject: 'Esta es una prueba',
   text: mensaje
 };
 
 transporter.sendMail(mailOptions, function(error, info){
   if (error) {
     console.log(error);
   } else {
     console.log('Email enviado: ' + info.response);
   }
 });