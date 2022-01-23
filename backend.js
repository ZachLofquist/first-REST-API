const express = require('express');
const res = require('express/lib/response');
const app = express();
const port = 5000;
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hiya World!');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

const users = {
    users_list : 
    [
        {
            id : "xyz789",
            name : "Charlie",
            job: "Janitor",
        },
        {
            id : "abc123",
            name : "Mac",
            job: "Bouncer",
        },
        {
            id : "ppp222",
            name : "Mac",
            job: "Owner",
        },
        {
            id : "yat999",
            name : "Dee",
            job: "Aspiring actress",
        },
        {
            id : "zap555",
            name : "Dennis",
            job: "Bartender",
        }
    ]
}

// app.get('/users', (req, res) => {
//     res.send(users);
// });

app.get('/users', (req, res) => {
    const name = req.query.name;
    if (name != undefined){
        let result = findUserByName(name);
        result = {users_list: result};
        res.send(result);
    }
    else{
        res.send(users);
    }
});

function findUserByID(id) {
    return users['users_list'].find( (user) => user['id'] === id);
}

app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    let result = findUserByID(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        result = {users_list: result};
        res.send(result);
    }
});

function addUser(user) {
    users['users_list'].push(user);
}

// Very naive implementation.
function generateID() {
    const alphabet = "abcdefghijklmnopqrstuvwxyz"
    num_1 = Math.floor(Math.random() * 10);
    num_2 = Math.floor(Math.random() * 10);
    num_3 = Math.floor(Math.random() * 10);
    num_string = ((("" + num_1) + num_2) + num_3)
    char_1 = alphabet[Math.floor(Math.random() * alphabet.length)];
    char_2 = alphabet[Math.floor(Math.random() * alphabet.length)];
    char_3 = alphabet[Math.floor(Math.random() * alphabet.length)];
    word_string = ((("" + char_1) + char_2) + char_3)
    return (word_string + num_string)
}



app.post('/users', (req, res) => {
    const userToAdd = req.body;
    userToAdd.id = generateID()
    //console.log(userToAdd)
    addUser(userToAdd);
    res.status(201).send(userToAdd); // 200
});


function deleteUser(user) {
    const index = users['users_list'].indexOf(user)
    if (index > -1) {
        users['users_list'].splice(index, 1)
    }
}

app.delete('/users', (req, res) => {
    //console.log(req.params)
    const id = req.body.id;
    let result = findUserByID(id);
    if (result === undefined || result.length == 0)
        res.status(404).send("ID not found");
    else {
        deleteUser(result);
    }
    res.status(200).end();
});

app.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    let result = findUserByID(id);
    if (result === undefined || result.length == 0)
        res.status(404).send("ID not found");
    else {
        deleteUser(result);
    }
    res.status(204).end();
});

function findUserByIDJob(id, job) {
    return users['users_list'].find( (user) => (user['id'] === id && user['job'] === job));
}

app.get('/users/:id/:job', (req, res) => {
    const id = req.params.id;
    const job = req.params.job;
    let result = findUserByIDJob(id, job);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        result = {users_list: result};
        res.send(result);
    }
});








