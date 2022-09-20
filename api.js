const http = require('http'); 
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(require("cors")()); 
app.use(bodyParser.json());

app.get('/', (req, res, next) => {
    res.json({message: "Tudo ok por aqui!"});
})
// app.post('/send', (req, res, next) => { 
//     res.json(req.body);
// }) 

const upload = require("multer")();
app.post('/send', upload.single('anexo'), (req, res, next) => { 
   console.log("re",req);
    const nome = req.body.nome;
    const email = req.body.email;
    const mensagem = req.body.mensagem;
    const anexo = req.file;

    console.log("nome",nome);
    require("./nodemail")(email, nome, mensagem, anexo)
        .then(response => res.json(response))
        .catch(error => res.json(error));
})

const server = http.createServer(app); 
server.listen(3030);
console.log("Servidor escutando na porta 3030...")