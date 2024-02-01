// Importing required models
import Company from '../models/companySchema.js';
import Student from '../models/studentSchema.js';

// Render create student page: Display the 'add_student' view for creating a new student.
export const createStudentPage = async (req, res) => {
  // Render the 'add_student' view
  res.render('add_student');
};

// Create student: Create a new student with the provided details and save it to the database.
export const createStudent = async (req, res) => {
  // Extracting student details from the request body
  const { name, email, batch, college, placement, contactNumber, dsa, webd, react } = req.body;
  try {
    // Check if a student with the same email already exists
    const existingStudent = await Student.findOne({ email });

    if (existingStudent) {
      console.log('Email already exists');
      return res.redirect('back');
    }

    // Create a new student using the Student model
    const newStudent = await Student.create({
      name,
      email,
      college,
      batch,
      placement,
      contactNumber,
      dsa,
      webd,
      react,
    });

    // Save the new student to the database
    await newStudent.save();

    // Redirect to the homepage after successful student creation
    return res.redirect('/');
  } catch (error) {
    console.error(`Error in creating student: ${error}`);
    // Redirect back in case of an error
    return res.redirect('back');
  }
};

// Delete student: Delete a student with the specified ID and remove them from any scheduled interviews with companies.
export const deleteStudent = async (req, res) => {
  // Extracting student ID from the request parameters
  const { id } = req.params;
  try {
    // Find the student by ID
    const student = await Student.findById(id);

    // If the student exists and has scheduled interviews, remove them from the associated companies
    if (student && student.interviews.length > 0) {
      for (const item of student.interviews) {
        // Find the company associated with the interview
        const company = await Company.findOne({ name: item.company });

        if (company) {
          // Find the index of the student in the company's students array and remove them
          const studentIndex = company.students.findIndex(stud => stud.student.toString() === id);
          if (studentIndex !== -1) {
            company.students.splice(studentIndex, 1);
            // Save the updated company details
            await company.save();
          }
        }
      }
    }

    // Delete the student from the database by ID
    await Student.findByIdAndDelete(id);

    // Redirect back after successful student deletion
    return res.redirect('back');
  } catch (error) {
    console.error('Error in deleting student:', error);
    // Redirect back in case of an error
    return res.redirect('back');
  }
};
