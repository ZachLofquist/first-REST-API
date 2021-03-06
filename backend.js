const express = require('express');
const res = require('express/lib/response');
const app = express();
const port = 5000;

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

const findUserByName = (name) => {
    return users['users_list'].filter( (user) => user['name'] === name);
}





