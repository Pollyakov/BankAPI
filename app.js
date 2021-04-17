const express = require("express");
const app = express();
const {findUsers, findUser, createUser, deposit} = require ("./utils");

//makes express to understand json:
app.use(express.json());

app.get("/api/users", (req,res)=> {
    const users = findUsers();
    res.status(200).send(users);
});

//getting specific user
app.get("/api/users/:id/", (req,res) => {
    //how to get params
    const {id} = req.params;
    const user = findUser(id);
    res.sendStatus(200).send(user);
});
//creating an user
app.post("/api/users", (req,res)=> {
    const newUser = createUser(req.body);
    res.status(201).send(newUser);
});
//update user- DEPOSITING
app.put("/api/users/:id", (req,res)=> {
   //reading the sum for depositing from request.body 
   //taking id from request params(from url)
   const {id} = req.params;
   const cash = req.body;
    const editedUser = deposit(id, cash);
    res.status(201).send(editedUser);
})
//QUERY 
app.get("/api/users/query", (req,res)=> {
    console.log("query");
});


const PORT = 3000;
app.listen(PORT, ()=> {
    console.log("Listening");
});

