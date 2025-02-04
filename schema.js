import mongoose from 'mongoose';
import User from './modal/user_detail.js';
import Faculty from './modal/Faculty_Detail.js';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
dotenv.config();


const hashPassword = async (password) => {
    const saltRounds = 10; // Cost factor for hashing (higher is more secure, but slower)
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log('Hashed Password:', hashedPassword);
    return hashedPassword;
  };

// MongoDB Atlas connection string (replace with actual values)
const uri = process.env.CONNECTING_STRING;
// Connect to MongoDB Atlas
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });


// const createUser = async () => {
//     const newUser = new User({
//       name: 'nivaas',
//       email: 'bob@exasdmple.com',
//       password: await hashPassword('nivaas'),
//       register_no: '22tk0034',
//       enrollment_no: '202208029',
//       linkedin_link:'linkedin.com',
//       github_link:'github.com',
//       leetcode_link:'leedcode.com',
//       profile_desc:'iam nivaas iam interested in machine learning and iam passionated about iot and learning data structures right now ',
//       role:'stud'
//     });

    
const adminUser = async () => {
  const newUser = new User({
    name: 'admin',
    password: await hashPassword('placement'),
    role:'Admin'
  });

// const createFaculty = async()=>{
//     const newFaculty = new Faculty({
//         name: 'nivaas',
//         degree : 'btech it',
//         role: 'ap',
//         description:'this is tesing',
//     })


// try {
//     const savedUser = await newUser.save();  // Save the new user to the database
//     console.log('New user saved:', savedUser);
//   } catch (error) {
//     console.error('Error saving user:', error);
//   }

try {
    const savedUser = await newUser.save();  // Save the new user to the database
    console.log('New user saved:', savedUser);
  } catch (error) {
    console.error('Error saving user:', error);
  } 
 
};

// Call the function to add the user
adminUser();