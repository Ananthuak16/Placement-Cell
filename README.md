
# Placement Cell Web Application

## Overview

This web application is designed to help Team Career Camp manage student interview data. It provides features for user authentication, student management, company interactions, external job listings, and CSV data download.

## Table of Contents

- [Installation](#installation)
- [Folder Structure](#folder-structure)
- [Features](#features)
- [Usage](#usage)
- [Bonus Features](#bonus-features)
- [External Jobs List](#external-jobs-list)
- [CSV Download](#csv-download)
- [Minimalistic Design](#minimalistic-design)
- [Video Demo](#VideoDemo)
- [Github Repository](#GithubRepository)
- [## Hosted Application](#HostedApplication)
- [Suggestions](#suggestions)
- [Contributing](#contributing)
)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/placement-cell-web-app.git
   cd placement-cell-web-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables:

   - Create a `.env` file in the root directory.
   - Define environment variables:

     ```env
     PORT=8000
     MONGO_URL=mongodb://localhost:27017/PlacementCell
     ```

## Folder Structure

```
|-- config
|   |-- mongoose.js
|   |-- passport-local-strategy.js
|-- controllers
|   |-- companyController.js
|   |-- studentController.js
|   |-- userControllers.js
|-- models
|   |-- companySchema.js
|   |-- studentSchema.js
|   |-- userSchema.js
|-- public
|   |-- css
|   |   |-- styles.css
|   |-- js
|   |   |-- script.js
|-- routes
|   |-- companyRoutes.js
|   |-- index.js
|   |-- studentRoutes.js
|   |-- userRoutes.js
|-- views
|   |-- _bootstrap_script.ejs
|   |-- _bootstrap_styles.ejs
|   |-- add_student.ejs
|   |-- allocate_interview.ejs
|   |-- company.ejs
|   |-- home.ejs
|   |-- job_listings.ejs
|   |-- signin.ejs
|   |-- signup.ejs
|-- .env
|-- .gitignore
|-- app.js
|-- package.json
|-- README.md
|-- video_submission.mp4
```

## Features

- **User Authentication:**
  - Sign up, sign in, and sign out for employees using Passport.

- **Student Management:**
  - Add, view, and delete student records with batch details, course scores, interviews, and results.

- **Company Interaction:**
  - View students, allocate interviews, and update interview status.

- **External Jobs List (Bonus):**
  - Fetch real available jobs in India for React/Node.js using open APIs.

- **CSV Download:**
  - Download CSV with specific student details and interview information.

- **Minimalistic Design:**
  - Use Bootstrap or other CSS frameworks for a clean UI.

## Usage

- Start the application:

  ```bash
  npm start
  ```

- Access the application in your browser: [http://localhost:8000](http://localhost:8000)

## Bonus Features

### External Jobs List

- Fetch real available jobs in India for React/Node.js using open APIs.

### CSV Download

- Download a CSV file with the following columns:
  - Student id, student name, student college, student status, DSA Final Score, WebD Final Score, React Final Score, interview date, interview company, interview student result.

### Minimalistic Design

- Use Bootstrap or other CSS frameworks for a clean and minimalistic design.


## Video Demo

Please watch the project demonstration video [here](<https://drive.google.com/file/d/1mjqHGL0DZzeWpzadOuHswwXE_fAW1r-u/view>).

## Github Repository

Explore the code on [GitHub](<https://github.com/Ananthuak16/Placement-Cell>).

## Hosted Application

Explore the Web app  on [Hosted](<https://placement-cell-rrlx.onrender.com>).


## Suggestions

- Use npm libraries like `csv-parser` for reading/parsing CSV and `fast-csv` for creating CSV.
- Consider using Bootstrap or another CSS framework for a clean UI.

## Contributing

If you'd like to contribute, please fork the repository and create a pull request.
