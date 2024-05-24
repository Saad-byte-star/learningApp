# Learning App

A full-stack web application for managing and enrolling in courses. Built with the MERN stack (MongoDB, Express.js, React, Node.js) and Bootstrap for styling.

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This application allows users to sign up, log in, and enroll in various courses. It supports user authentication and displays enrolled courses based on individual users. Also features an Admin Dashboard to manage all the Admin Functionalities

## Features

- User authentication and authorization
- Role-based access control
- Course enrollment
- Responsive design using Bootstrap
- Context API for state management
- HTTP Cookies
- Admin Dashboard Functionality 

## Installation

### Prerequisites

- Node.js (v14 or above)
- MongoDB
- Express
- React

### Backend Setup

1. Clone the repository:

    
    git clone https://github.com/Saad-byte-star/learning-app.git
    cd learning-app


2. Install backend dependencies:

    cd server
    npm install
    npm i express mongoose dotenv cors json-web-token cookie-parser
    npm i bcrypt@3.0.4-napi


4. Set up environment variables. Create a `.env` file in the `server` directory with the following contents:

    MONGODB_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    PORT=8000


5. Start the backend server:

    npm start // make sure to add a start script before in package.json

   IMPORTANT NOTE : U may use the initData Functions in the util.js file to initiliaze the data in the db.


### Frontend Setup

1. Navigate to the `client` directory:

    cd ../client

2. Install frontend dependencies:

    
    npm install
    npm i react react-router-dom react-bootstrap bootstrap axios 

4. Start the frontend development server:

    
    npm run dev // make sure to add a dev script in package.json before
    

## Usage

1. Open your browser and navigate to `http://localhost8000`.
2. Sign up as a new user.
3. Log in using your credentials.
4. Enroll in courses and view your enrolled courses.

ADMIN SIDE :

1. Open your browser and navigate to `http://localhost:8000/admin`.
2. Log in using your credentials.
4. Use the Dashboard to manage Stuff.

## API Endpoints

### User Endpoints

- `POST /api/users`: Create a new user
- `POST /api/users/login`: Authenticate a user and retrieve a token
- `GET /api/users`: Get all users (Admin only)

### Course Endpoints

- `GET /api/courses`: Get all courses
- `POST /api/courses`: Create a new course (Admin only)

## Folder Structure


learning-app/
├── client/                   # Frontend
│   ├── public/               # Public files
│   ├── src/                  # Source files
│   │   ├── components/       # React components
│   │   ├── services/         # API services
│   │   ├── App.jsx           # Main App component
│   │   ├── index.js          # Entry point
│   │   └── ...
│   └── ...
└── server/                   # Backend
    ├── controllers/          # Controllers
    ├── models/               # Mongoose models
    ├── routes/               # Express routes
    ├── index.js              # Entry point
    └── ...

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add new feature'`)
5. Push to the branch (`git push origin feature-branch`)
6. Open a pull request

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Feel free to replace placeholder URLs and add more details as necessary.
