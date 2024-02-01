// Importing the 'Student' model from the 'studentSchema.js' file
import Student from '../models/studentSchema.js';

// Controller function to render the home page
export const homePage = async (req, res) => {
  try {
    // Fetching all students from the database
    const students = await Student.find({});

    // Rendering the 'home' view and passing the fetched students data to it
    res.render('home', { students });
  } catch (error) {
    // Handling errors during the rendering process
    console.error(`Error rendering home page: ${error}`);

    // Redirecting back if there's an issue
    res.redirect('back');
  }
};
