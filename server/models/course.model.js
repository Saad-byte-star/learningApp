    const {mongoose, SchemaTypes } = require("mongoose")

    const courseSchema = new mongoose.Schema({
        Title:{
            type: SchemaTypes.String,
            required:true
        },
        Description:{
            type: String,
            required:true        
        }, 
        Instructor:{
            type:SchemaTypes.ObjectId,
            ref : "User",
            required:true
        },    
        EnrolledStudents:[{
            type: SchemaTypes.ObjectId,
            ref : "User",
        }],
        Modules:[{
            type: SchemaTypes.ObjectId,
            ref : "Module",
            required:true
        }]
    })

    const Course = mongoose.model("Course",courseSchema)

    module.exports = Course