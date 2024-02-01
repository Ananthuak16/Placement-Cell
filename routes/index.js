import express from 'express';
import passport from 'passport';
import  userRoutes from './userRoutes.js';
import  studentrouter from './studentRoute.js'; 
import * as homeController from '../controllers/homeController.js';
import * as jobController from '../controllers/jobController.js';
import  companyRoutes from './companyRoute.js'; 

const router = express.Router();

// Home page route: Requires user authentication to access.
router.get('/', passport.checkAuthentication, homeController.homePage);

// User routes: Routes related to user authentication and account management.
router.use('/users', userRoutes);

// Student routes: Routes related to student data and operations.
router.use('/students', studentrouter);

// Company routes: Routes related to company data and operations.
router.use('/company', companyRoutes);

// Job page route: Routes related to Job Listing.
router.use('/job-listings', jobController.jobPage);

export default router;
