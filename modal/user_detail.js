import mongoose from 'mongoose';

// Define a schema for your data
const userSchema = new mongoose.Schema({
  name: {
    type:String,
    required:true
  },
  // email: {
  //   type:String,
  //   required:true
  // },
  password: {
    type:String,
    required:true
  },
  // register_no:{
  //   type:String,
  //   required:true
  // },
  // enrollment_no:{
  //   type:String,
  //   required:true
  // },
  // linkedin_link:{
  //   type:String,
  // },
  // github_link:{
  //   type:String,
  // },
  // leetcode_link:{
  //   type:String,
  // },
  // resume:{
  //   type:Buffer,
  // },
  // profile_desc:{
  //   type:String,
  // },
  // profile_photo:{
  //   type:Buffer,
  // },
  role:{
    type:String
  }
});

// Create a model based on the schema
export default mongoose.model('user_details', userSchema);