import mongoose from 'mongoose';
import User from './modal/user_detail.js';
import Faculty from './modal/Faculty_Detail.js';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
dotenv.config();


const student_year_3 = [
  {
      "name": "Parthasarathy.A",
      "email": "parthasarathy48623@gmail.com",
      "reg_no": "22TK0037",
      "enroll_no": "202208031",
      "year": "3"
  },
  {
      "name": "PRAVEEN.R",
      "email": "sivapraveen339@gmail.com",
      "reg_no": "22TK0039",
      "enroll_no": "202208033",
      "year": "3"
  },
  {
      "name": "B.Kaderavan",
      "email": "kaderavan101@gmail.com",
      "reg_no": "22TK0018",
      "enroll_no": "202208016",
      "year": "3"
  },
  {
      "name": "Nitthiyanantham K",
      "email": "nitthiyananthamcseicb@gmail.com",
      "reg_no": "22TK0033",
      "enroll_no": "202208028",
      "year": "3"
  },
  {
      "name": "GUGAN KARTHIKEYAN",
      "email": "Gugankarthikeyan23@gmail.com",
      "reg_no": "22TK0010",
      "enroll_no": "202208008",
      "year": "3"
  },
  {
      "name": "OVIYA K",
      "email": "oviyakarthikeyan29@gmail.com",
      "reg_no": "22TK0035",
      "enroll_no": "202208030",
      "year": "3"
  },
  {
      "name": "P.Vishnuprya",
      "email": "vishnuprya2915@gmail.com",
      "reg_no": "22TK0036",
      "enroll_no": "202208057",
      "year": "3"
  },
  {
      "name": "Sidhaaarthane P",
      "email": "sidhaarthsidhu2004@gmail.com",
      "reg_no": "22TK0048",
      "enroll_no": "202208043",
      "year": "3"
  },
  {
      "name": "J.Sheerin Farhana",
      "email": "sheerinfarhana@yahoo.com",
      "reg_no": "22TK0046",
      "enroll_no": "202208041",
      "year": "3"
  },
  {
      "name": "SK.Kishore",
      "email": "kishoresenthamarai2004@gmail.com",
      "reg_no": "22TK0022",
      "enroll_no": "202204041",
      "year": "3"
  },
  {
      "name": "GOKUL.A",
      "email": "goks20112004@gmail.com",
      "reg_no": "22tk0009",
      "enroll_no": "202208007",
      "year": "3"
  },
  {
      "name": "Aathisswaran.V",
      "email": "aathisswaranv@gmail.com",
      "reg_no": "22TK0001",
      "enroll_no": "202208001",
      "year": "3"
  },
  {
      "name": "Vignesh M",
      "email": "muruganvignesh1973@gmail.com",
      "reg_no": "22TK0054",
      "enroll_no": "202208049",
      "year": "3"
  },
  {
      "name": "Janani.E",
      "email": "jeni25348@gmail.com",
      "reg_no": "22tk0013",
      "enroll_no": "202208011",
      "year": "3"
  },
  {
      "name": "Vishwa.k",
      "email": "vv356052@gmail.com",
      "reg_no": "22TK0056",
      "enroll_no": "202208051",
      "year": "3"
  },
  {
      "name": "Vijayalayan.K",
      "email": "vijayalayank26@gmail.com",
      "reg_no": "22TK0055",
      "enroll_no": "202208050",
      "year": "3"
  },
  {
      "name": "Jayaprakash.S",
      "email": "jayaprakashsjjj@gmail.com",
      "reg_no": "22TK0014",
      "enroll_no": "202208012",
      "year": "3"
  },
  {
      "name": "Selva shyam sundar.S",
      "email": "selvashyamsundar2005@gmail.com",
      "reg_no": "22tk0042",
      "enroll_no": "202208038",
      "year": "3"
  },
  {
      "name": "Hariharan.V",
      "email": "haran8113@gmail.com",
      "reg_no": "22TK0011",
      "enroll_no": "202208055",
      "year": "3"
  },
  {
      "name": "PAVITHRAN.E",
      "email": "pavithran2730@gmail.com",
      "reg_no": "22TK0038",
      "enroll_no": "202208032",
      "year": "3"
  },
  {
      "name": "Abishaa",
      "email": "abiramdil@gmail.com",
      "reg_no": "22tk0002",
      "enroll_no": "202208053",
      "year": "3"
  },
  {
      "name": "Santhosh Kumar.A",
      "email": "santhoshasokan568@gmail.com",
      "reg_no": "22tk0044",
      "enroll_no": "202208037",
      "year": "3"
  },
  {
      "name": "Yogasri.R",
      "email": "yogasri.r2005@gmail.com",
      "reg_no": "22TK0057",
      "enroll_no": "202208052",
      "year": "3"
  },
  {
      "name": "Roshni.J.P",
      "email": "roshniprakashjp21@gmail.com",
      "reg_no": "22TK0041",
      "enroll_no": "202208034",
      "year": "3"
  },
  {
      "name": "R.SABARINATHAN",
      "email": "sabarinathan2004@gmail.com",
      "reg_no": "22TK0040",
      "enroll_no": "202208035",
      "year": "3"
  },
  {
      "name": "Dhanalaxmi.A",
      "email": "laxmidhanam2004@gmail.com",
      "reg_no": "22TK0007",
      "enroll_no": "202208006",
      "year": "3"
  },
  {
      "name": "K.Sharan kumar",
      "email": "sharansharan7950@gmail.com",
      "reg_no": "22TK0045",
      "enroll_no": "202208040",
      "year": "3"
  }
]

const student_year_2 = [
  {
      "name": "Mohanakumar.S",
      "email": "mohansunder35@gmail.com",
      "reg_no": "23TK0023",
      "enroll_no": "202308043",
      "year": "2"
  },
  {
      "name": "Samhita.V",
      "email": "samhita342@gmail.com",
      "reg_no": "23TK0033",
      "enroll_no": "202308031",
      "year": "2"
  },
  {
      "name": "Kalaiselvan.I",
      "email": "ks210820051@gmail.com",
      "reg_no": "23tk0014",
      "enroll_no": "202308015",
      "year": "2"
  },
  {
      "name": "Nidheshwar.P",
      "email": "13328nidheshwar@gmail.com",
      "reg_no": "23TK0027",
      "enroll_no": "202308026",
      "year": "2"
  },
  {
      "name": "Madhankumar.L",
      "email": "mathan21122005@gmail.com",
      "reg_no": "23TK0020",
      "enroll_no": "202308020",
      "year": "2"
  },
  {
      "name": "G.KEERTHANA",
      "email": "gkeerthi341@gmail.com",
      "reg_no": "23TK0017",
      "enroll_no": "202308017",
      "year": "2"
  },
  {
      "name": "Syed riasuddin.S.S",
      "email": "syedriasuddin.s.s@gmail.com",
      "reg_no": "23TK0041",
      "enroll_no": "202308044",
      "year": "2"
  },
  {
      "name": "Karunya",
      "email": "karunyaramesh4@gmail.com",
      "reg_no": "23TK0016",
      "enroll_no": "202308016",
      "year": "2"
  },
  {
      "name": "Mohamed Thanveer.I",
      "email": "mohamedthanveer644@gmail.com",
      "reg_no": "23TK0022",
      "enroll_no": "20230822",
      "year": "2"
  },
  {
      "name": "DEEPIKA.B",
      "email": "deepgirija8@gmail.com",
      "reg_no": "23TK0009",
      "enroll_no": "202308008",
      "year": "2"
  },
  {
      "name": "Vaishnavi.E",
      "email": "vaishnaviezhumalai364@gmail.com",
      "reg_no": "23TK0042",
      "enroll_no": "202308039",
      "year": "2"
  },
  {
      "name": "BHARATHI.M",
      "email": "mrblackpearl12345@gmail.com",
      "reg_no": "23TK005",
      "enroll_no": "20230085",
      "year": "2"
  },
  {
      "name": "M.K.Mukesh",
      "email": "mugavithan2@gmail.com",
      "reg_no": "23TK0024",
      "enroll_no": "202308023",
      "year": "2"
  },
  {
      "name": "Shivendran.P",
      "email": "shivendranp05@gmail.com",
      "reg_no": "23TK0035",
      "enroll_no": "202308033",
      "year": "2"
  },
  {
      "name": "Subalakshmi.k",
      "email": "subha302005@gmail.com",
      "reg_no": "23tk0039",
      "enroll_no": "202308037",
      "year": "2"
  },
  {
      "name": "Dhineshkumar",
      "email": "dhineshkumar272005@gmail.com",
      "reg_no": "23TK0032",
      "enroll_no": "202308009",
      "year": "2"
  },
  {
      "name": "Rithikka.V.T",
      "email": "vtrithikka44@gmail.com",
      "reg_no": "23TK0031",
      "enroll_no": "202308030",
      "year": "2"
  },
  {
      "name": "Govindaraj.A",
      "email": "govindamgd2005@gmail.com",
      "reg_no": "23TK0010",
      "enroll_no": "202308011",
      "year": "2"
  },
  {
      "name": "S.Raghavi sree",
      "email": "raghavisree92@gmail.com",
      "reg_no": "23tk0030",
      "enroll_no": "202308029",
      "year": "2"
  },
  {
      "name": "C.SOMASUNDARAM",
      "email": "somusomasundram97@gmail.com",
      "reg_no": "23TK0038",
      "enroll_no": "20238036",
      "year": "2"
  },
  {
      "name": "Angel Rani.A",
      "email": "angelblashberry@gmail.com",
      "reg_no": "23TK0002",
      "enroll_no": "202308002",
      "year": "2"
  },
  {
      "name": "Surendar khadan",
      "email": "surendarkhadav76@gmail.com",
      "reg_no": "23tk0040",
      "enroll_no": "2023008038",
      "year": "2"
  },
  {
      "name": "Shyam sundar.k",
      "email": "shyamkumaran2023@gmail.com",
      "reg_no": "23tk0036",
      "enroll_no": "202308034",
      "year": "2"
  },
  {
      "name": "Priyadarshan",
      "email": "darshadarsha148@gmail.com",
      "reg_no": "23TK0029",
      "enroll_no": "202308028",
      "year": "2"
  },
  {
      "name": "Harshini.B",
      "email": "harshinibala123@gmail.com",
      "reg_no": "23TK0012",
      "enroll_no": "202308013",
      "year": "2"
  },
  {
      "name": "CHARUKESH",
      "email": "charukesh080@gmail.com",
      "reg_no": "23TK0006",
      "enroll_no": "202306005",
      "year": "2"
  },
  {
      "name": "Sivagnanam",
      "email": "sgnanam473@gmail.com",
      "reg_no": "23TK0037",
      "enroll_no": "202308035",
      "year": "2"
  },
  {
      "name": "B.Karthik",
      "email": "karthikbala0105@gmail.com",
      "reg_no": "23TK0015",
      "enroll_no": "202308042",
      "year": "2"
  },
  {
      "name": "V.lakshmipriya",
      "email": "lakshvpriya@gmail.com",
      "reg_no": "23tk0019",
      "enroll_no": "202308019",
      "year": "2"
  },
  {
      "name": "VEDHANTH.R",
      "email": "vedh286@gmail.com",
      "reg_no": "23TK0043",
      "enroll_no": "202308040",
      "year": "2"
  },
  {
      "name": "Harish.S",
      "email": "harishhawk3@gmail.com",
      "reg_no": "23TK0011",
      "enroll_no": "202308012",
      "year": "2"
  },
  {
      "name": "ABHINAYAA.S",
      "email": "abhinayaasundarrajan@gmail.com",
      "reg_no": "23TK0001",
      "enroll_no": "202308001",
      "year": "2"
  },
  {
      "name": "Pavithra.P",
      "email": "pavithraperumal2020@gmail.com",
      "reg_no": "23TK0028",
      "enroll_no": "202308027",
      "year": "2"
  },
  {
      "name": "R.Kishorekumar",
      "email": "2104kishorekumar@gmail.com",
      "reg_no": "23Tk0018",
      "enroll_no": "202308018",
      "year": "2"
  },
  {
      "name": "SANNIYASI.S",
      "email": "sanniyasi1754@gmail.com",
      "reg_no": "23TK0034",
      "enroll_no": "202308032",
      "year": "2"
  },
  {
      "name": "NARENKUMAR.P",
      "email": "narenkumar421@gmail.com",
      "reg_no": "23TK0026",
      "enroll_no": "202308025",
      "year": "2"
  },
  {
      "name": "Dayanithi.V",
      "email": "dayanithi062@gmail.com",
      "reg_no": "23TK0008",
      "enroll_no": "202308007",
      "year": "2"
  },
  {
      "name": "S.BALAMURALIKRISHNA",
      "email": "bala56350@gmail.com",
      "reg_no": "23TK0004",
      "enroll_no": "202308041",
      "year": "2"
  },
  {
      "name": "JAGANATHAN.M",
      "email": "jackjagan75888@gmail.com",
      "reg_no": "23TK0013",
      "enroll_no": "202308014",
      "year": "2"
  },
  {
      "name": "Vishnu.M",
      "email": "vishnumourougane06@gmail.com",
      "reg_no": "23TK0044",
      "enroll_no": "202301025",
      "year": "2"
  },
  {
      "name": "Mohana.B",
      "email": "sweerchandy727@gmail.com",
      "reg_no": "23TKL001",
      "enroll_no": "2024L08001",
      "year": "2"
  },
  {
      "name": "Mohamed fawaz",
      "email": "ansarifawaz02@gmail.com",
      "reg_no": "23TK0021",
      "enroll_no": "202308021",
      "year": "2"
  },
  {
      "name": "Ashwin.A",
      "email": "ashwinashwin19409@gmail.com",
      "reg_no": "23TK0003",
      "enroll_no": "202308003",
      "year": "2"
  }
]


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


const createUser = async (item) => {
 

    // const newUser = new User({
    //   name: item.name.toUpperCase().trim(),
    //   email: item.email.trim(),
    //   password: await hashPassword(`${item.reg_no.toLowerCase().trim()}@mit`),
    //   register_no: item.reg_no.trim().toUpperCase(),
    //   enrollment_no: item.enroll_no.trim(),
    //   linkedin_link:'https://linkedin.com',
    //   github_link:'https://github.com',
    //   leetcode_link:'https://leetcode.com',
    //   year:item.year.trim(),
    //   profile_desc:'This is filler text, you guys can change the summary using edit option after login with username and password and one important thing is you have to change the links with your original profile links.',
    //   role:'stud'
    // });

    const newUser = new User({
      name: "nivaas",
      email: "nivaas23barath123@gmail.com",
      password: await hashPassword(`nivaas`),
      register_no:"22tk0012",
      enrollment_no: "202208010",
      linkedin_link:'https://linkedin.com',
      github_link:'https://github.com',
      leetcode_link:'https://leetcode.com',
      year:"3",
      profile_desc:'This is filler text, you guys can change the summary using edit option after login with username and password and one important thing is you have to change the links with your original profile links.',
      role:'stud'
    });
    // console.log(`${item.reg_no.toLowerCase().trim()}@mit`)
  
  
    
// const adminUser = async () => {
//   const newUser = new User({
//     name: 'admin',
//     password: await hashPassword('placement'),
//     role:'Admin'
//   });

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
    // console.log("running")

  } catch (error) {
    console.error('Error saving user:', error);
  } 
 
};

// Call the function to add the user
// student_year_3.map(async(item)=>{
// createUser(item);
// })

createUser()