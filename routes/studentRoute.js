import express from 'express';
import passport from 'passport';
import * as studentController from '../controllers/studentController.js';

const studentrouter = express.Router();

// ------------------ Get requests ------------

// Route for rendering the create student page, protected by Passport authentication
studentrouter.get('/create', passport.checkAuthentication, studentController.createStudentPage);

// Route for deleting a student, protected by Passport authentication
studentrouter.get('/delete/:id', passport.checkAuthentication, studentController.deleteStudent);

// ------------------- Posts Requests ----------

// Route for creating a new student, protected by Passport authentication
studentrouter.post('/create-student', passport.checkAuthentication, studentController.createStudent);

export default studentrouter;
