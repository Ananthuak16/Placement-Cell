// Importing required modules and models
import User from '../models/userSchema.js';
import Student from '../models/studentSchema.js';
import { promises as fsPromises } from 'fs';
import fastcsv from 'fast-csv';

// Render sign up page: Display the 'signup' view for user registration if the user is not authenticated.
export const signup = (req, res) => {
  // Redirect back if the user is already authenticated
  if (req.isAuthenticated()) return res.redirect('back');
  // Render the 'signup' view
  res.render('signup');
};

// Render sign in page: Display the 'signin' view for user login if the user is not authenticated.
export const signin = (req, res) => {
  // Redirect back if the user is already authenticated
  if (req.isAuthenticated()) return res.redirect('back');
  // Render the 'signin' view
  res.render('signin');
};

// Create session: Redirect the user to the homepage after successfully creating the session.
export const createSession = (req, res) => {
  console.log('Session created successfully');
  // Redirect to the homepage
  return res.redirect('/');
};

// Sign out: Log out the user and redirect to the sign-in page.
export const signout = (req, res) => {
  // Log out the user using Passport's logout method
  req.logout((err) => {
    if (err) return next(err);
  });
  // Redirect to the sign-in page
  return res.redirect('/users/signin');
};

// Create user: Validate and create a new user account based on the provided details.
export const createUser = async (req, res) => {
  // Extracting user details from the request body
  const { name, email, password, confirmPassword } = req.body;
  try {
    // Check if passwords match
    if (password !== confirmPassword) {
      console.log(`Passwords don't match`);
      return res.redirect('back');
    }

    // Check if the email is already taken
    const user = await User.findOne({ email });
    if (user) {
      console.log(`Email already exists`);
      return res.redirect('back');
    }

    // Create a new user using the User model
    const newUser = await User.create({
      name,
      email,
      password,
    });

    // Check if user creation was successful
    if (!newUser) {
      console.log(`Error creating user`);
      return res.redirect('back');
    }

    // Redirect to the sign-in page after successful user creation
    return res.redirect('/users/signin');
  } catch (error) {
    console.error(`Error creating user: ${error}`);
    // Redirect back in case of an error
    res.redirect('back');
  }
};

// Download report: Generate and download a CSV report containing student data, including their interviews if available.
export const downloadCsv = async (req, res) => {
  try {
    // Fetch all students from the database
    const students = await Student.find({});
    // Initialize CSV data with headers
    const csvData = [['S.No', 'Name', 'Email', 'College', 'Placement', 'Contact Number', 'Batch', 'DSA Score', 'WebDev Score', 'React Score', 'Interview', 'Date', 'Result']];

    let no = 1;

    // Iterate through each student and their interviews
    for (const student of students) {
      // Prepare student data for CSV
      const studentData = [
        no++,
        student.name,
        student.email,
        student.college,
        student.placement,
        student.contactNumber,
        student.batch,
        student.dsa,
        student.webd,
        student.react,
      ];

      // If the student has interviews, add interview data to the CSV
      if (student.interviews.length > 0) {
        for (const interview of student.interviews) {
          studentData.push(interview.company, interview.date.toString(), interview.result);
        }
      }
      // Add student data to the CSV
      csvData.push(studentData);
    }

    // Specify the CSV file path
    const csvFilePath = 'report/data.csv';
    // Write CSV data to the file using fast-csv
    await fastcsv.writeToPath(csvFilePath, csvData, { headers: true });

    // Log success message
    console.log('Report generated successfully');
    // Download the generated CSV file
    return res.download(csvFilePath);
  } catch (error) {
    // Log error message and redirect back in case of an error
    console.error(`Error downloading file: ${error}`);
    return res.redirect('back');
  }
};
