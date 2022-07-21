const fs = require('fs'); // Importando o módulo 'file system' para permitir operações de I/O;

const { join } = require('path'); // Join é um método para unir vários caminhos;




// __dirname é o nome de onde está o diretório para a rota 'usuário';
// "users.json" é o arquivo onde vai ser simulado o banco de dados;
const filePath = join(__dirname, "users.json");




// Criação da função getUsers para BUSCAR os dados do nosso banco de dados;
const getUsers = () => {
    const data = fs.existsSync(filePath)
        ? fs.readFileSync(filePath)
        : [];

        try{
            return JSON.parse(data);
        } catch (error){
            return [];
        }
};


// Criação da função saveUsers para SALVAR os dados do nosso banco de dados;
const saveUsers = (users) => {
    fs.writeFileSync(filePath, JSON.stringify(users, null, '\t'));
};



const userRoute = (app) => {
    app.route('/users/:id?')
    .get((req, res) => {
        const users = getUsers();

        res.send({ users });
    })
    .post((req, res) => {
        const users = getUsers();

        users.push(req.body);
        saveUsers(users);

        res.status(201).send('OK');
    })
    .put((req, res) => {
        const users = getUsers();

        saveUsers(users.map(user => {
            if(user.id === req.params.id){
                return {
                    ...user,
                    ...req.body,
                }                
            }
            return user;
        }));
        res.status(200).send('OK'); 
    })
    .delete((req, res) => {
        const users = getUsers();

        saveUsers(users.filter(user => user.id !== req.params.id));

        res.status(200).send('OK');
    });
};

module.exports = userRoute; 