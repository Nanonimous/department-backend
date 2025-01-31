import { useState, useEffect } from "react";
import style from "./Seperate_student_Edit.module.css";
import { Spinner } from "react-bootstrap";
import { checkJwtCookie } from "../../Jwt_verify/checkJwtCookie.jsx";
import { FaCreativeCommonsPdAlt } from "react-icons/fa";
import { formToJSON } from "axios";
import BufferToBase64 from '../../BufferToBase64/BufferToBase64.jsx'


export default function Seperate_student_Edit({ title }) {
  const [editContent, setEditContent] = useState(null);
  const [EditContentUpload, setEditContentUpload] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [imageSrc, setImageSrc] = useState(
    "https://assets.leetcode.com/users/Hirthick_Gowtham-G/avatar_1728091794.png"
  );
  const [pdfSrc, setPdfSrc] = useState("");
  useEffect(() => {
    const userData = checkJwtCookie();
    if (!userData) {
      console.error("No JWT data found");
      return;
    }

    const fetchData = async () => {
      try {
        console.log("Fetching data for reg:", userData.jwtPayload.reg);
        const response = await fetch("http://localhost:5000/fetchProfile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ids: userData.jwtPayload._id }),
        });

        if (!response.ok) {
          throw new Error(Failed to fetch data: ${response.status} ${response.statusText});
        }
        const data = await response.json();
        console.log(data);

        setEditContent({
          _id: data._id,
          profilePhoto: data.profile_photo || "",
          profileSummary: data.profile_desc,
          linkedinLink: data.linkedin_link,
          githubLink: data.github_link,
          gmailLink: data.email,
          leedcodeLink: data.leetcode_link,
          profileResume: data.resume || "", // Assuming resume is a buffer
        });



        setEditContentUpload({
          _id: data._id,
          profile_photo: data.profile_photo || "",
          register_no: data.register_no,
          profile_desc: data.profile_desc,
          linkedin_link: data.linkedin_link,
          github_link: data.github_link,
          email: data.email,
          leetcode_link: data.leetcode_link,
          resume: data.resume || ""
        });
        
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditContentUpload((prevContent) => ({
      ...prevContent,
      [name]: value,
    }));
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (type === "profile_photo") {
      // Only update the profile photo if a file is selected
      if (file) {
        setEditContentUpload((prevContent) => ({
          ...prevContent,
          profile_photo: file, // Update with the new file
        }));
      }
    } else if (type === "resume") {
      if (file) {
      setEditContentUpload((prevContent) => ({
        ...prevContent,
        resume: file, // Update resume if a file is selected
      }));
    }
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if data has changed
    const hasChanges = Object.keys(EditContentUpload).some(
      (key) => EditContentUpload[key] !== editContent[key]
    );
  
    // If no changes, don't submit the form
    if (!hasChanges) {
      console.log("No changes detected. Skipping update.");
      return;
    }
  
    const formData = new FormData();
    // If profile photo exists, append it to formData
    formData.append("profile_photo", EditContentUpload.profile_photo); // Ensure this is a File object
    formData.append("resume", EditContentUpload.resume); // Ensure this is a File object
    formData.append("_id", EditContentUpload._id);
    formData.append("register_no", EditContentUpload.register_no);
    formData.append("profile_desc", EditContentUpload.profile_desc);
    formData.append("linkedin_link", EditContentUpload.linkedin_link);
    formData.append("github_link", EditContentUpload.github_link);
    formData.append("email", EditContentUpload.email);
    formData.append("leetcode_link", EditContentUpload.leetcode_link);
    

    try {
      const response = await fetch('http://localhost:5000/editProfile', {
        method: 'POST',
        body: formData,
      });
    
      if (!response.ok) {
        throw new Error(HTTP error! Status: ${response.status});
      } else {
        const data = await response.json();
        console.log("Profile updated successfully:", data);
        window.location.reload()
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
    
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(URL.createObjectURL(file));
    }
  };

  if (!editContent) {
    return <Spinner animation="border" />;
  }

  const popUpHandle = (o) =>{
    setEditContentUpload((prev)=>({
      ...prev,
      profile_photo: editContent.profilePhoto || "",
      profile_desc: editContent.profileSummary,
      linkedin_link: editContent.linkedinLink,
      github_link: editContent.githubLink,
      email: editContent.gmailLink,
      leetcode_link: editContent.leedcodeLink,
      resume: editContent.profileResume || ""
    }));
    setShowPopup(o);
  }

  return (
    <>
      <div className={style.con}>
        <div className={style.texting_div}>
          <button className={style.edit_button} onClick={() => popUpHandle(true)}>
            Edit Your Profile
          </button>
        </div>
        <h1>{title}</h1>
        <div className={style.content}>
          <h2>Summary</h2>
          <div className={style.para}>
            <div>
              <p>{editContent.profileSummary}</p>
              <div className={style.option}>
                <li>
                  <a href={editContent.linkedinLink} target="blank">
                  <img src="/images/student_seperate_page/linked_in.png" alt="linkedin" height="10px" /> Linked in
                  </a>
                </li>
                <li>
                <a href={editContent.githubLink} target="blank">
                  <img src="/images/student_seperate_page/github.png" alt="github" height="10px" /> Github
                  </a>
                </li>
                <li>
                <a href={editContent.gmailLink} target="blank">
                  <img src="/images/student_seperate_page/mail.png" alt="mail" height="10px" /> Gmail
                  </a>
                </li>
                <li>
                <a href={editContent.leedcodeLink} target="blank">
                  <img src="/images/student_seperate_page/leetcode.png" alt="leet code" height="10px" /> Leet code
                  </a>
                </li>
              </div>
            </div>
            <div className={style.image_cover}>
              <div className={style.image}>
                <div className={style.image_size}>
                  {imageSrc ? (
                    <embed
                      src={data:image/jpeg;base64,${editContent.profilePhoto}}
                      width="100%"
                      height="100%"
                      style={{ borderRadius: '10px' }}
                      type="image/jpeg"
                    />
                  ) : (
                    <Spinner />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={style.line}></div>

        <div className={style.pdf_container}>
          <h1>Resume</h1>
          <div className={style.card_size}>
          <iframe src={data:application/pdf;base64,${editContent.profileResume}} className="w-100" style={{ height: "1200px" }} />
          </div>
        </div>
      </div>

      {showPopup && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Your Profile</h5>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="form-group mb-3">
                    <label>Upload Profile Image</label>
                    <input
                      type="file"
                      name="profile_photo"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, "profile_photo")}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label>Profile Summary</label>
                    <textarea
                      name="profile_desc"
                      value={EditContentUpload.profile_desc}
                      onChange={handleInputChange}
                      className="form-control custom_textarea"
                    ></textarea>
                  </div>
                  <div className="form-group mb-3">
                    <label>Linkedin (link)</label>
                    <input
                      type="text"
                      name="linkedin_link"
                      onChange={handleInputChange}
                      value={EditContentUpload.linkedin_link}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label>Github (link)</label>
                    <input
                      type="text"
                      name="github_link"
                      onChange={handleInputChange}
                      value={EditContentUpload.github_link}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      onChange={handleInputChange}
                      value={EditContentUpload.email}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label>Leetcode (link)</label>
                    <input
                      type="text"
                      name="leetcode_link"
                      onChange={handleInputChange}
                      value={EditContentUpload.leetcode_link}
                      className="form-control"
                    />
                  </div>
                <div className="form-group mb-3">
                  <label>Upload Your Resume (PDF)</label>
                  <input
                    type="file"
                    name="resume"
                    accept="application/pdf"  // Only allows PDF files
                    onChange={(e) => handleFileChange(e, "resume")}  // Handle the file change
                    className="form-control"
                    />
                </div>
                    </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => popUpHandle(false)}
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}