import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import { MongoClient, ServerApiVersion,ObjectId } from 'mongodb';
import nodemailer from 'nodemailer';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import multer from 'multer';import mongoose from 'mongoose';
import journal from "./routes/journals.js"
import paper from "./routes/paper.js"
import patent from "./routes/patent.js"
import A_Calander from './routes/Single_File_upload/Single_file_upload.js';
import Major_Event_backend from './routes/Event_page/Major_Event_backend.js';

export { db }; // Export the `db` instance
dotenv.config();

//after solving error 
import User from './modal/user_detail.js';
import Faculty from './modal/Faculty_Detail.js';
// Your code logic here
// MongoDB connection URI and Database Name
const uri = process.env.CONNECTING_STRING;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  } 
});


async function run() {
  try {
    // Connect the client to the server (starting from MongoDB v4.7, this is optional)
    await client.connect();
    const result = await db.command({ ping: 1 });
    console.log("Ping successful:", result);

    console.log("Successfully connected to MongoDB!");

    return db; // Return the database instance for further use
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1); // Exit the process with a failure code
  }
}

// Run the connection test
let db1;
run()
  .then((database) => {
    db = database; // Assign the database instance globally for use in routes or other operations
  })
  .catch(console.dir);




let db = client.db(process.env.DB_NAME);
const app = express();
const PORT = process.env.PORT;
const fromemail=process.env.FROM_EMAIL;
const passemail=process.env.EMAIL_PASSWORD;


// Pass `db` to routes using middleware
app.use((req, res, next) => {
  req.db = db; // Attach `db` to the request object
  next();
});












// Secret key for JWT
const SECRET_KEY = process.env.SECRET_KEY;
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user:fromemail,
    pass:passemail,
  },
});
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // set max file size to 10MB
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




// Middleware
const corsOptions = {
  origin: 'http://localhost:3000', // Frontend URL (adjust if different)
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  credentials: true, // Allow cookies to be sent
};


app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true,limit:'100mb' }));
app.use(bodyParser.json({limit:'100mb'}));
app.use(cookieParser());




// routes set up
app.use("/journal",journal)
app.use("/paper",paper)
app.use("/patent",patent)
app.use("/file_upload",A_Calander)
app.use("/major_event",Major_Event_backend)





// MongoDB Atlas connection string (replace with actual values)

// Connect to MongoDB Atlas
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });
import validator from 'validator'

// Middleware to trim spaces and sanitize username and email
const sanitizeInput = (req, res, next) => {
  // Trim and sanitize `username` if present
  if (req.body.username) {
    req.body.username = validator.escape(req.body.username.trim());
  }

  // Trim, normalize, and sanitize `email` if present
  if (req.body.email) {
    req.body.email = validator.escape(validator.normalizeEmail(req.body.email.trim()));
  }

  // For login, handle `loginInput` dynamically as email or username
  if (req.body.loginInput) {
    const isEmail = validator.isEmail(req.body.loginInput);
    req.body.loginInput = isEmail
      ? validator.escape(validator.normalizeEmail(req.body.loginInput.trim())) // Treat as email
      : validator.escape(req.body.loginInput.trim()); // Treat as username
  }

  next();
};

const authMiddleware = (req, res, next) => {
  const token = req.cookies.jwtToken; // Ensure the token is named 'jwtToken'
  if (!token) {
    return res.status(401).send({ message: 'Unauthorized' });
  }

  try {
    const payload = jwt.verify(token, SECRET_KEY);
    req.user = payload;
     // Attach user data to the request object
     console.log(req.user);
    next();
  } catch (error) {
    return res.status(403).send({ message: 'Invalid or expired token' });
  }
};

app.get('/get-username', async(req, res) => {
  const token = req.cookies.jwtToken;  // Get the JWT token from cookies
  if (token) {
    try {
      const decoded = jwt.verify(token, SECRET_KEY);

      const loginInput = decoded.loginInput;
      
      const isEmail = validator.isEmail(loginInput);

      if (isEmail) {
        // Query the database to find the username using the email
        const user = await user.findOne({ email: loginInput }); // Adjust based on your DB structure
        if (user) {
          return res.status(200).json({ username: user.username }); // Send the username
        } else {
          return res.status(404).json({ message: 'User not found' });
        }
      } else {
        return res.status(400).json({ message: 'Invalid email format' });
      }

    } catch (error) {
      res.status(401).json({ message: 'Token is invalid or expired' });
    }
  } else {
    res.status(401).json({ message: 'No token provided' });
  }
});


// Login endpoint
app.post('/login', sanitizeInput, async (req, res) => {
  const { loginInput, password } = req.body;
  console.log(loginInput, password);

  const isEmail = validator.isEmail(loginInput); // Check if the input is an email
  const query = isEmail ? { email: loginInput } : { name: loginInput };

  const user = await db.collection("user_details").findOne(query);

  if (!user) {
    return res.status(401).send({ message: 'Username or email does not exist' });
  }

  // Check if the account is locked
  // const lockDuration = 10 * 60 * 1000; // 10 minutes in milliseconds
  // const currentTime = new Date().getTime();

  // if (user.failedAttempts >= 5) {
    
  //   if (currentTime - user.lastFailedAttempt < lockDuration) {
  //     return res.status(403).send({ message: 'Account locked. Please try again later or reset your password.' });
  //   } else {
  //     // Reset failed attempts after lock duration has passed
  //     await db.collection('user_details').updateOne(
  //       { _id: user._id },
  //       { $set: { failedAttempts: 0, lastFailedAttempt: null } }
  //     );
  //   }
  // }

  // Compare the password with the hashed password stored in the database
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    // await db.collection('user_details').updateOne(
    //   { _id: user._id },
    //   {
    //     $inc: { failedAttempts: 1 },
    //     $set: { lastFailedAttempt: currentTime }
    //   }
    // );
    return res.status(401).send({ message: 'Invalid credentials' });
  }

  // Reset failed attempts if login is successful
  // await db.collection('user_details').updateOne(
  //   { _id: user._id },
  //   { $set: { failedAttempts: 0, lastFailedAttempt: null } }
  // );

  if(user.role == 'admin'){
    var jwtPayload = {
      name : user.name,
      role : user.role,
      _id :user._id,
    }
  }else{
    var jwtPayload = {
      name : user.name,
      role : user.role,
      _id :user._id,
      reg:user.register_no
    }
    }
  
  // Create a JWT token
  const token = jwt.sign({ jwtPayload }, SECRET_KEY, { expiresIn: '1h' });

  // Send the token as the response
  res.cookie('jwtToken', token, {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Lax',
    maxAge: 3600000,
  });

  console.log('Set-Cookie:', res.getHeaders()['set-cookie']);

  res.status(200).send({ message: 'Login successful' });
});


//logout
app.post('/logout', (req, res) => {
  
  res.clearCookie('jwtToken'); // Clear the auth token cookie
  res.status(200).send({ message: 'Logged out successfully' });
});

//forget password
app.post('/forgot-password',sanitizeInput, async (req, res) => {
  const { email } = req.body;
  const user = await db.collection("users").findOne({email:email});
  console.log(user);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '5m' });
  const resetUrl = `http://localhost:3000/#reset-password?token=${token}`;
  // Send email with reset link
  const mailOptions = {
    from: fromemail,
    to: email,
    subject: 'Password Reset Request',
    text: `Click on the following link to reset your password: ${resetUrl}`,
  };
  console.log("email created");
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Password reset link sent' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error sending reset email' });
  }
})


// Reset Password Endpoint
app.post('/reset-password', async (req, res) => {
  const { token, password } = req.body;
  console.log(token, password);

  if (!token || !password ) {
    return res.status(400).send({ message: 'Token and new password are required' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, SECRET_KEY);
    const { email } = decoded; // Extract email from the token payload

    // Check if the email exists in the database
    const user = await db.collection("users").findOne({email });

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password , 10);

    // Update the user's password in the database
    const result = await db.collection("users").updateOne(
      { email },
      {
        $set: { password: hashedPassword },

      }
    );
console.log("sucessfully password reset");
   

    res.status(200).send({ message: 'Password reset successful' });
  } catch (err) {
    console.error('Error during reset:', err);
    res.status(400).send({ message: 'Invalid or expired token' });
  }
});

app.post('/editProfile', upload.fields([
  { name: 'profile_photo', maxCount: 1 },  // Profile photo upload
  { name: 'resume', maxCount: 1 },         // Resume (PDF) upload
]), async (req, res) => {
  try {
    // Handle the case when no file is uploaded
    const dataToUpdate = {
      profile_desc: req.body.profile_desc,
      linkedin_link: req.body.linkedin_link,
      github_link: req.body.github_link,
      email: req.body.email,
      leetcode_link: req.body.leetcode_link,
    };

    // Check if a new profile photo was uploaded
    if (req.files && req.files['profile_photo']) {
      dataToUpdate.profile_photo = req.files['profile_photo'][0].buffer;
    }

    // Check if a new resume was uploaded
    if (req.files && req.files['resume']) {
      dataToUpdate.resume = req.files['resume'][0].buffer;
    }

    // MongoDB update logic
    const filter = { _id: new ObjectId(req.body._id) };
    const update = {
      $set: dataToUpdate,
    };

    const result = await db.collection('user_details').updateOne(filter, update, { upsert: true });

    if (result.matchedCount > 0) {
      res.status(200).json({ message: "Profile updated successfully." });
    } else if (result.upsertedCount > 0) {
      res.status(201).json({ message: "Profile created successfully.", id: result.upsertedId });
    } else {
      res.status(500).json({ error: "No changes made to the profile." });
    }
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ error: "An error occurred while updating the profile." });
  }
});
const updateUser = async (registerNo, updatedData) => {
  try {
    const result = await User.findOneAndUpdate(
      { register_no: registerNo }, // Query condition
      updatedData, // Data to update
      { new: true, runValidators: true } // Return the updated document
    );

    console.log('Updated User:', result);
    return result;
  } catch (error) {
    console.error('Error updating user:', error.message);
    throw new Error('Update failed');
  }
};

app.post('/editProfile', upload.fields([
  { name: 'profile_photo', maxCount: 1 },  // Profile photo upload
  { name: 'resume', maxCount: 1 },         // Resume (PDF) upload
]), async (req, res) => {
  try {
    // Handle the case when no file is uploaded
    const dataToUpdate = {
      profile_desc: req.body.profile_desc,
      linkedin_link: req.body.linkedin_link,
      github_link: req.body.github_link,
      email: req.body.email,
      leetcode_link: req.body.leetcode_link,
    };

    // Check if a new profile photo was uploaded
    if (req.files && req.files['profile_photo']) {
      dataToUpdate.profile_photo = req.files['profile_photo'][0].buffer;
    }

    // Check if a new resume was uploaded
    if (req.files && req.files['resume']) {
      dataToUpdate.resume = req.files['resume'][0].buffer;
    }

    // MongoDB update logic
    const filter = { _id: new ObjectId(req.body._id) };
    const update = {
      $set: dataToUpdate,
    };

    const result = await db.collection('user_details').updateOne(filter, update, { upsert: true });

    if (result.matchedCount > 0) {
      res.status(200).json({ message: "Profile updated successfully." });
    } else if (result.upsertedCount > 0) {
      res.status(201).json({ message: "Profile created successfully.", id: result.upsertedId });
    } else {
      res.status(500).json({ error: "No changes made to the profile." });
    }
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ error: "An error occurred while updating the profile." });
  }
});



app.post('/fetchProfile', async (req, res) => {
  try {
      const idd = req.body.ids; // Extract 'reg' from the request body

      if (!idd) {
          return res.status(400).json({ error: "Missing required parameter: reg" });
      }

      // Fetch the user data from MongoDB
      const user = await db.collection("user_details").findOne({ _id:new ObjectId(idd) });

      if (!user) {
          return res.status(404).json({ error: "User not found" });
      }
      console.log(user._id)
      res.status(200).json(user); // Respond with the user data
  } catch (error) {
      console.error("Error fetching user profile:", error);
      res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/BufferToBase64", (req, res) => {
  console.log("Coming here in server");
  try {
    const { buffer } = req.body; // Extract 'buffer' key from req.body
    console.log("Received buffer array:", buffer);

    if (!Array.isArray(buffer)) {
      return res.status(400).json({ error: "Invalid buffer data. Expected an array." });
    }

    // Convert array back to Buffer
    const bufferData = Buffer.from(buffer);

    // Convert buffer to Base64
    const base64String = bufferData.toString("base64");

    res.status(200).json({ base64: base64String });
  } catch (error) {
    console.error("Error processing buffer:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});



app.post("/BufferToBase64", (req, res) => {
  try {
    const bufferArray = req.body;

    if (!Array.isArray(bufferArray)) {
      return res.status(400).json({ error: "Invalid buffer data" });
    }

    // Convert array back to Buffer
    const buffer = Buffer.from(bufferArray);

    // Convert buffer to Base64
    const base64String = buffer.toString("base64");

    res.status(200).json({ base64: base64String });
  } catch (error) {
    console.error("Error processing buffer:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
