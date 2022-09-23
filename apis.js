const fs = require('fs'); 
const https = require('https'); 
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(require("cors")()); 
app.use(bodyParser.json());

// Instância express
app.get("/", (req, res) => {
  var remoteIp = (req.headers['x-forwarded-for'] || '').split(',').pop() || // Recupera o IP de origem, caso a fonte esteja utilizando proxy
                 req.connection.remoteAddress || // Recupera o endereço remoto da chamada
                 req.socket.remoteAddress || // Recupera o endereço através do socket TCP
                 req.connection.socket.remoteAddress // Recupera o endereço através do socket da conexão
  res.send("Hello world using HTTPS! ip:",remoteIp);

});

// Carrega o certificado e a key necessários para a configuração.
const options = {
  key: fs.readFileSync("/etc/letsencrypt/live/api.fiapotech.com/privkey.pem"),
  cert: fs.readFileSync("/etc/letsencrypt/live/api.fiapotech.com/fullchain.pem")
  // key: fs.readFileSync("server.key"),
  // cert: fs.readFileSync("server.cert")
};

const upload = require("multer")();
app.post('/send', upload.single('file'), (req, res, next) => { 
  //  console.log("re",req);
    const name = req.body.name;
    const email = req.body.email;
    const tel = req.body.tel;
    const message = req.body.message;
    const file = req.file;

    // console.log("nome",name);
    require("./nodemail")(name,email, tel, message, file)
        .then(response => res.json(response))
        .catch(error => res.json(error));
})

const server = https.createServer(options,app); 
server.listen(3030);
console.log("Servidor escutando na porta 3030.")