import express from "express";
import {v4 as uuidv4} from "uuid";

const router=express.Router();

let users = [
    // {
    //     "firstName": "John",
    //     "lastName": "Doe",
    //     "age": 25
    // },
    // {
    //     "firstName" : "Jane",
    //     "lastName" : "Doe",
    //     "age": 30        
    // }
]

// all routes in here are starting with /users
router.get('/', (req,res) =>{
    console.log(users);
    res.send("Hello");
});


// sending data from client to server

router.post('/', (req,res) => { // post request
    console.log("POST ROUTE REACHED"); 
    const user = req.body;
    const userId= uuidv4();

    const userWithId = { ...user, id: userId};

    users.push(userWithId);
    res.send(`User with the name ${user.firstName} added to the database.`);
});


// get request with id

router.get('/:id', (req,res) => {
    const {id} =req.params;

    const founderUser = users.find((user) => user.id === id);
    res.send('The Get id route');
});

// delete request with id

router.delete(':/id', (req,res) => {
    const{id} =req.params;
    users=users.filter((user) => user.id != id);
    res.send('User with the ${id} deleted from the database.');
});

// update request with id

router.patch(':/id', (req,res) => {
    const{id} =req.params;
    const {firstName, lastName, age} = req.body;
    const userToBeUpdated = users.find((user) => user.id === id);

    if(firstName){
        userToBeUpdated.firstName = firstName;
    }

    if(lastName){
        userToBeUpdated.lastName = lastName;
    }

    if(age){
        userToBeUpdated.age = age;
    }

    res.send(`User with the ${id} has been updated.`);
});

export default router;
