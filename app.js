const express = require('express');
const app = express();
app.use(express.json());
const bodyParser = require('body-parser');

let users = [{
    email: "abc@abc.ca",
    firstName: "ABC",
    id: "5abf6783"
},
{
    email: "xyz@xyz.ca",
    firstName: "XYZ",
    id: "5abf674563"
}];

// GET API to retrieve all users
app.use("/users",(req, res, next) => {
    res.status(200).json({
        message : "Users retrieved",
        success : true,
        users : users
        }
        );
});

// PUT API to update a user
app.put('/update/:id', (req, res) => {
    debugger;
    const userId = req.params.id;
    console.log(userId);
    debugger
    let { email, firstName } = req.body;
    
     var user = users.find(u => u.id === userId);

    if (!user) {
        return res.status(404).json({
             message: "User not found",
              success: false 
            });
    }
    
    if (email) user.email = email;
    if (firstName) user.firstName = firstName;
    res.json({
         message: "User updated",
          success: true
        
         });
});

// POST API to add a new user
app.post('/add', (req, res) => {
    const { email, firstName } = req.body;
    if (!email || !firstName) {
        return res.status(400).json({
             message: "Both email and firstName are required",
             success: false 
            });
    }
    const newUser = {
        email,
        firstName,
        id: Math.random().toString(36).substr(2, 9) 
    };
    users.push(newUser);
    res.json({ 
        message: "User added",
         success: true 
        });
});

// GET API to retrieve a single user by ID
app.get('/user/:id', (req, res) => {
    debugger;
    const userId = req.params.id;
    const user = users.find(u => u.id === userId);
    debugger;
    if (!user) {
        return res.status(404).json({ message: "User not found", success: false });
    }
    res.json({ 
        success: true, user
     });
});


module.exports = app;