// Importing 'Student' and 'Company' models from their respective schema files
import Student from '../models/studentSchema.js';
import Company from '../models/companySchema.js';

// Controller function to render the company page
export const companyPage = async (req, res) => {
  try {
    // Fetching all students from the database
    const students = await Student.find({});

    // Rendering the 'company' view and passing the fetched students data to it
    return res.render('company', { students });
  } catch (error) {
    // Handling errors during the rendering process and redirecting back if there's an issue
    console.error(`Error rendering company page: ${error}`);
    return res.redirect('back');
  }
};

// Controller function to allocate interviews
export const allocateInterview = async (req, res) => {
  try {
    // Fetching all students from the database
    const students = await Student.find({});

    // Extracting unique batches from the fetched students
    const uniqueBatches = [...new Set(students.map(student => student.batch))];

    // Rendering the 'allocateInterview' view and passing the fetched students and unique batches data to it
    return res.render('allocateInterview', { students, uniqueBatches });
  } catch (error) {
    // Handling errors during the allocation process and redirecting back if there's an issue
    console.error(`Error allocating interviews: ${error}`);
    return res.redirect('back');
  }
};

// Controller function to schedule interviews
export const scheduleInterview = async (req, res) => {
  const { id, company, date } = req.body;
  try {
    // Checking if the company already exists in the database
    const existingCompany = await Company.findOne({ name: company });

    // Creating interview details object
    const interviewDetails = { student: id, company, date, result: 'Pending' };

    if (!existingCompany) {
      // Creating a new company if it doesn't exist
      const newCompany = new Company({ name: company });
      newCompany.students.push(interviewDetails);
      await newCompany.save();
    } else {
      // Adding the interview details to the existing company
      if (existingCompany.students.some(student => student.student.toString() === id)) {
        console.log('Interview with this student already scheduled');
        return res.redirect('back');
      }
      existingCompany.students.push(interviewDetails);
      await existingCompany.save();
    }

    // Adding the interview details to the student
    const student = await Student.findById(id);
    if (student) {
      student.interviews.push(interviewDetails);
      await student.save();
    }

    console.log('Interview Scheduled Successfully');
    return res.redirect('/company/home');
  } catch (error) {
    // Handling errors during the scheduling process and redirecting back if there's an issue
    console.error(`Error scheduling interview: ${error}`);
    return res.redirect('back');
  }
};

// Controller function to update the status of interviews
export const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { companyName, companyResult } = req.body;
  try {
    // Finding the student by ID
    const student = await Student.findById(id);

    // Checking if the student has interviews and updating the status
    if (student && student.interviews.length > 0) {
      const interviewToUpdate = student.interviews.find(company => company.company === companyName);
      if (interviewToUpdate) {
        interviewToUpdate.result = companyResult;
        await student.save();
      }
    }

    // Finding the company by name
    const company = await Company.findOne({ name: companyName });
    if (company) {
      // Checking if the company has students and updating the status
      const studentToUpdate = company.students.find(std => std.student.toString() === id);
      if (studentToUpdate) {
        studentToUpdate.result = companyResult;
        await company.save();
      }
    }

    return res.redirect('back');
  } catch (error) {
    // Handling errors during the update process and redirecting back if there's an issue
    console.error(`Error updating interview status: ${error}`);
    return res.redirect('back');
  }
};
