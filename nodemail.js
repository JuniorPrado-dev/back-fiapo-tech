const mailer = require("nodemailer");
const SMTP_CONFIG=require('./config/smtp.js') 
module.exports = (name,email,tel,message,file) => {
    const smtpTransport = mailer.createTransport({
        // host:'smtp.office365.com',
        // port:587,
        // secure:false,
        host:SMTP_CONFIG.host,
        port:SMTP_CONFIG.port,
        secure:false,
        auth:{
            user:SMTP_CONFIG.user,
            pass:SMTP_CONFIG.pass,
        },
        // tls:{
        //     rejectUnauthorized:false,
        // },
    });
    
    const mail = {
        //username:'fiapotech@gmail.com',
        from:`Assistente Fiapo <${SMTP_CONFIG.user}>`,
        to:'fiapotech@gmail.com',
        subject: `${name} Fez um pedido!`,
        text: `
        Cliente: ${name}
        Email: ${email}
        Telefone: ${tel}
        _________________________________________
        
        Decrição do pedido: ${message}
        _________________________________________
        `,
        //html: "<b>Opcionalmente, pode enviar como HTML</b>"
    }
    
    if(file){
        console.log(file);
        mail.attachments = [];
        mail.attachments.push({
            filename: file.originalname,
            content: file.buffer
        })
    }
    
    return new Promise((resolve, reject) => {
        smtpTransport.sendMail(mail)
            .then(response => {
                smtpTransport.close();
                return resolve(response);
            })
            .catch(error => {
                smtpTransport.close();
                return reject(error);
            });
    })
}