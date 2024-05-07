//Creating Router Class
const { Router } = require("express");

//Importing the controller
const controller = require('./controller')


//Creating Router Object
const router = Router();

//Adding Routes
router.get('/', controller.getStudents);//http://localhost:3000/api/v1/students
router.post('/',controller.addStudent);//http://localhost:3000/api/v1/students  
router.get('/:id',controller.getStudentById);//http://localhost:3000/api/v1/students/1
router.delete("/:id",controller.removeStudent);//http://localhost:3000/api/v1/students/1


//Exporting Router
module.exports = router;