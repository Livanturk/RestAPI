//Importing express framework
const express = require("express");

//Import router from student routes
const studentRoutes = require('./src/student/routes');

//Creating an instance of express
const app = express();

//port number
const port = 3000;


app.use(express.json());//middleware that parses incoming requests with JSON payloads


//Route handler that responds to GET request on the root URL of your server
app.get("/", (req, res) =>{
    res.send("Hello World");
}) //http://localhost:3000/

//Mounts a middleware function at the specified path
app.use('/api/v1/students', studentRoutes); 


//Starts the express server and makes it listen for incoming HTTP requests on the specified port
app.listen(port, () => console.log(`app listening on port ${port}`)); 



