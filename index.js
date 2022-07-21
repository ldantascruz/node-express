const express = require('express'); // Iniciando o Express no meu projeto;
const bodyParser = require('body-parser'); // Responsável por fazer o parse da requisição POST que iremos receber;

const userRoute = require('./routes/userRoute'); // Importando a rota do usuário;

const app = express(); // Utilizando o Express para criar o nosso App;
const port = 3500; // Definindo a porta que iremos rodar o projeto;

app.use(bodyParser.urlencoded({ extended: false })); // Informando p Node que iremos usar o Middleware body-parser

userRoute(app);


// Criando a requisição GET
app.get('/', (req, res) => res.send("Olá mundo!"));


// Rodando o meu projeto, na porta selecionada;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});