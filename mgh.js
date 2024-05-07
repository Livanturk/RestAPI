// Import required modules
const Joi = require('joi'); // For input validation
const express = require('express'); // Express.js framework
const app = express(); // Create an instance of the Express application
const jwt = require('jsonwebtoken'); // For handling JSON Web Tokens
const privateKey = require("./constant"); // Private key for JWT
const middleware = require('./middlewares/middleware'); // Custom middleware
app.use(express.json()); // Middleware to parse incoming JSON data

// Some sample data for courses and posts
const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'},
]

const posts = [
    {
        username: 'Kyle',
        title: 'Post 1'
    },
]

const loginData =
    {
        username: 'SuatCan',
        password: '123456'
    }

// Route to get all posts
app.get('/api/posts', (req, res) => {
    res.json(posts)
})

// Route to handle user login
app.post('/api/login', (req, res) => {
    // Authenticate User
    const username = req.body.username
    const pass = req.body.password
    const user = { name: username, password: pass }
    if(username === 'suat' && pass === '1234') {
        // If the login is successful, generate a JWT and send it along with the user data
        const access_token = jwt.sign(user, privateKey, {expiresIn: '1h'})
        res.json({ access_token: access_token, ...user })
    } else {
        // If the login fails, send a 403 status with an error message
        res.sendStatus(403).send("kullanici yok")
    }
})

// Default route
app.get('/', (req, res) => {
    res.send('Hello World');
})

// Route to get all courses with a middleware called "kamuran"
function getCourses() {
    return (req, res) => {
        res.send(courses);
    };
}
app.get('/api/courses', middleware, getCourses())

// Route to get a specific course by ID
app.get('/api/courses/:id', (req, res) => {
    let course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) return res.status(404).send('The course with the given ID was not found')
    res.send(course);
})

// Route to add a new course
app.post('/api/courses', (req, res) => {
    // Validate the input data for the new course
    const { error } = validateCourse(req.body)
    // If the input data is not valid, send a 400 status with the error message
    if (error) return res.status(400).send(error.details[0].message)

    // If the input data is valid, create a new course and add it to the courses array
    const course = {
        id: courses.length +1,
        name: req.body.name
    }
    courses.push(course)
    res.send(courses);
})

// Route to get posts filtered by year and month parameters
app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.params) // Send route parameters (year and month) in the response
    res.send(req.query) // Send query parameters in the response (if any)
})

// Route to update an existing course by ID
app.put('/api/courses/:id', (req, res) => {
    let course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) return res.status(404).send('The course with the given ID was not found')
    const { error } = validateCourse(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    course.name = req.body.name
    res.send(course)
})

// Route to delete an existing course by ID
app.delete('/api/courses/:id', (req, res) => {
    let course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) return res.status(404).send('The course with the given ID was not found')
    const index = courses.indexOf(course)
    courses.splice(index, 1)
    res.send(course)
})

// Function to validate the course data before adding/updating
function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(course, schema);
}

// Specify the port for the server to listen on
const port = process.env.PORT || 3000;
// Start the server and listen on the specified port
app.listen(port, () => console.log(`Listening on port ${port}...`));
