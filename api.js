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
app.post('/send', upload.single('file'), (req, res, next) => { 
   console.log("re",req);
    const name = req.body.name;
    const email = req.body.email;
    const tel = req.body.tel;
    const message = req.body.message;
    const file = req.file;

    console.log("nome",name);
    require("./nodemail")(name,email, tel, message, file)
        .then(response => res.json(response))
        .catch(error => res.json(error));
})

const server = http.createServer(app); 
server.listen(3030);
console.log("Servidor escutando na porta 3030...")