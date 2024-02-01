// Importing the 'node-fetch' library for making HTTP requests
import fetch from 'node-fetch';

// Controller function to render the job page and fetch job listings
export const jobPage = async (req, res) => {
  try {
    // Adzuna API credentials
    const appId = '517ef479';
    const appKey = 'a7b761b7cb5c1d9e77978cd180e02dcb';

    // Constructing the Adzuna API URL for job listings in India with a search for 'react'
    const apiUrl = `https://api.adzuna.com/v1/api/jobs/in/search/1?app_id=${appId}&app_key=${appKey}&results_per_page=10&what=react&where=india`;

    // Making an asynchronous HTTP GET request to the Adzuna API
    const response = await fetch(apiUrl);

    // Parsing the JSON response from the API
    const data = await response.json();

    // Rendering the 'jobListings' view and passing the job listings data to it
    res.render('jobListings', { jobs: data.results });
  } catch (error) {
    // Handling errors during the fetching process
    console.error('Error fetching job listings:', error);

    // Sending a 500 Internal Server Error response if there's an issue
    res.status(500).send('Internal Server Error');
  }
};
