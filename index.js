import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import dotenv from 'dotenv';
import session from 'express-session';
import passport from 'passport';
import passportLocal from './config/passport-local-startegy.js';
import setAuthenticatedUser from './config/passport-local-startegy.js';
import router from './routes/index.js';
import { connectDB } from "./config/mongoose.js";

// Load environment variables from the .env file
dotenv.config({ path: 'config/.env' });

// Set up the express app
const port = process.env.PORT || 7000;
const app = express();

// Set ejs as the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Configure session middleware
app.use(
  session({
    secret: 'hello',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 100 }, // Session cookie configuration
  })
);

// Set up express-ejs-layouts middleware
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// Parse incoming requests with urlencoded payloads
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'assets' directory
app.use(express.static('./assets'));

// Initialize and configure Passport for authentication
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// Set up the main router for handling routes
app.use('/', router);

// Start the server
app.listen(port, async (err) => {
  if (err) {
    console.log(`Server failed with error ${err}`);
  } else {
    // Connect to the database upon successful server start
    await connectDB();
    console.log(`Server is running at http://localhost:${process.env.PORT}`);
  }
});
