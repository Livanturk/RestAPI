//Importing the database connection
const pool = require('../../db') //pool is an object that represents the connection to the database

// Importing the querries
const querries = require('./querries');

// Get all students
const getStudents = (req,res )=>{
    pool.query(querries.getStudents,(error, results) =>{
        if(error) throw error;
        res.status(200).json(results.rows)
    });
};

// Get a student by id
const getStudentById = async (req,res) => {
    const id = parseInt(req.params.id);//We use parseInt to convert the id from string to integer
    try {
        const results =  await pool.query(querries.getStudentById,[id])
        res.success(results)
        
    }catch {
        res.status(200).json(results.rows)
    }
};

// Add a new student
const addStudent = (req, res) =>{
    const {name, email, age, dob} = req.body; //data from the body
    //check if the email is already in the database
    pool.query(querries.checkEmailExists, [email], (error, results) => {
        if (results.rows.length) { //if the email exists
            res.send("Email already exists");
        }
    
        //Add student to the database    
        pool.query(querries.addStudent, 
            [name, email, age, dob], 
            (error, results) => {
            if (error) throw error;
            res.status(201).send("Student added successfully")   
            console.log("Student created successfully") 
        });

    });
};

const removeStudent = (req, res) => {
    const id = parseInt(req.params.id);//req.params.id is a reference to a URL parameter named id
    pool.query(querries.removeStudent, [id], (error, results)=> {
        const noStudentFound = !results.rows.length;
        if (noStudentFound) {
            res.send("Student does not exists in the database, could not remove.")
        };
    });
};


// Exporting the model
module.exports = {
    getStudents,
    getStudentById,
    addStudent,
    removeStudent,
};// Path: src\student\controller.js
