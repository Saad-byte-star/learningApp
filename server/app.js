// ------------------------LIBRARIES / DEPENDENCIES------------------------
const dotenv = require('dotenv').config();
const express = require('express');
const cors=require("cors");
const cookieParser = require('cookie-parser');


// ------------------------METHODS------------------------
const {  connectDB , initUsers , initCourses , initModules , initAssignments } = require('./util/utils.js');
const courseRouter=require("./routes/course.route.js");
const moduleRouter=require("./routes/module.route.js");
const userRouter=require("./routes/user.route.js");
const assignmentRouter=require("./routes/assignment.route.js");
const submissionRouter=require("./routes/submission.route.js");


// ------------------------ENVIROMENT VARS------------------------
const app = express();
const port = process.env.PORT

// ------------------------CROSS ORIGIN SOURCES  ,  JSON , URL ENCODING------------------------ 

const corsOptions = {
    origin: 'http://localhost:5173', // Your frontend's origin
    credentials: true, // Allow cookies to be sent
  };

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());


// ------------------------ ROUTES SETUP ------------------------
app.use("/api/courses", courseRouter)
app.use("/api/modules", moduleRouter)
app.use("/api/users", userRouter)
app.use("/api/assignments", assignmentRouter)
app.use("/api/submissions",submissionRouter)    
app.all("*", (req, res) => {
    return res.status(404).send("not found");
})


// ------------------------APP LAUNCHING------------------------
connectDB().then(() => {
        app.listen( port , () => {
            console.log(`Server Running on PORT : ${port}`);
            // initUsers();
            // initCourses();
            // initModules();
            // initAssignments();
        });
    }
)