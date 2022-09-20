const mailer = require("nodemailer");
 
module.exports = (email, nome, mensagem, anexo) => {
    const smtpTransport = mailer.createTransport({
        host:'smtp.office365.com',
        port:587,
        secure:false,
        auth:{
            user:"fiapo.assistente@hotmail.com",
            pass:"Fia123321."
        }
    })
    
    const mail = {
        from: "Assistente <fiapo.assistente@hotmail.com>",
        to:'fiapotech@gmail.com',
        subject: `${nome} te enviou uma mensagem`,
        text: mensagem,
        //html: "<b>Opcionalmente, pode enviar como HTML</b>"
    }
    
    if(anexo){
        console.log(anexo);
        mail.attachments = [];
        mail.attachments.push({
            filename: anexo.originalname,
            content: anexo.buffer
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