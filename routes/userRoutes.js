import express from 'express';
import passport from 'passport';

const router = express.Router();

import * as userController from '../controllers/userControllers.js';

// ------------------------- Get Requests -----------------------

// Route for rendering the signup page
router.get('/signup', userController.signup);

// Route for rendering the signin page
router.get('/signin', userController.signin);

// Route for signing out, with authentication check using Passport
router.get('/signout', passport.checkAuthentication, userController.signout);

// Route for downloading CSV, with authentication check using Passport
router.get('/download-csv', passport.checkAuthentication, userController.downloadCsv);

// ------------------------- Post Request -----------------------

// Route for creating a new user
router.post('/create', userController.createUser);

// Route for creating a session (user login) using Passport local strategy
router.post('/create-session', passport.authenticate('local', { failureRedirect: '/users/signin' }), userController.createSession);

export default router;
