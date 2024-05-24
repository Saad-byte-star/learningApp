const {mongoose, SchemaTypes } = require("mongoose")

const moduleSchema = new mongoose.Schema({
    Title:{
        type: SchemaTypes.String,
        required:true
    },
    Content:{
        type: String,
        required:true        
    }, 
    Course:{
        type:SchemaTypes.ObjectId,
        ref : "Course",
        required:true
    },    
    Assignments:[{
        type: SchemaTypes.ObjectId,
        ref : "Assignment",
        required:true
    }]
})

const Module = mongoose.model("Module",moduleSchema)

module.exports = Module