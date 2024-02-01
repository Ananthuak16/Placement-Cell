import express from 'express';
import passport from 'passport';
import * as companyController from '../controllers/companyController.js';

const router = express.Router();

// ------ GET Requests ------

// Get company home page: Requires user authentication to access.
router.get('/home', passport.checkAuthentication, companyController.companyPage);

// Get allocate interview page: Requires user authentication to access.
router.get('/allocate', passport.checkAuthentication, companyController.allocateInterview);

// ------ POST Requests ------

// Schedule interview: Requires user authentication to access.
router.post('/schedule-interview', passport.checkAuthentication, companyController.scheduleInterview);

// Update interview status: Requires user authentication to access.
router.post('/update-status/:id', passport.checkAuthentication, companyController.updateStatus);

export default router;
