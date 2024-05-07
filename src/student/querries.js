//Getting all students
const getStudents = "SELECT * FROM students"; 

//Getting a student by id
const getStudentById = "SELECT * FROM students WHERE id = $1"; //id from the url

const checkEmailExists = "SELECT s FROM students s WHERE s.email = $1";//check if the email is already in the database

const addStudent = "INSERT INTO students (name, email, age, dob) VALUES ($1, $2, $3, $4)"

const removeStudent = "DELETE FROM students WHERE id = $id"


module.exports = {
    getStudents,
    getStudentById,
    checkEmailExists,
    addStudent,
    removeStudent,
};