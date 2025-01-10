import mongoose from 'mongoose';

// Define a schema for your data
const facultySchema = new mongoose.Schema({
    photo:{
        type:Buffer,
    },
    name:{
        type:String,
        required:true,
    },
    degree:{
        type:String,
    },
    role:{
        type:String,
    },
    joiningDate:{
        type:Date,
    },
    description: {
        type:String,
    }

});

// Create a model based on the schema
export default mongoose.model('Faculty_Detail', facultySchema);