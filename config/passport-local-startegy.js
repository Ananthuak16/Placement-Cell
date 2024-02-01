// Importing required modules and the User model
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../models/userSchema.js';

// Configure local strategy for user authentication
const local = new LocalStrategy({ usernameField: 'email' }, async (
  email,
  password,
  done
) => {
  try {
    // Find the user in the database by email
    const user = await User.findOne({ email });

    // If the user is not found or password is incorrect
    if (!user || !user.isPasswordCorrect(password)) {
      console.log('Invalid Username/Password');
      return done(null, false);
    }
    return done(null, user); // User authenticated successfully
  } catch (error) {
    console.log(`Error in finding user: ${error}`);
    return done(error);
  }
});

// Using the local strategy for authentication
passport.use('local', local);

// Serialize user for session storage
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    // Find user by ID in the database
    const user = await User.findById(id);
    return done(null, user);
  } catch (err) {
    console.log('Error in finding user--> Passport');
    return done(err);
  }
});

// Middleware to check if the user is authenticated
passport.checkAuthentication = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect('/users/signin');
};

// Middleware to set authenticated user for views
passport.setAuthenticatedUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  next();
};

export default passport;
