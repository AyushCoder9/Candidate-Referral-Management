import React, { useState } from "react";
import axios from "axios";

const ReferralForm = ({ onCandidateAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    jobTitle: "",
  });
  const [resume, setResume] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const { name, email, phone, jobTitle } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!resume) {
      setError("Please upload a resume");
      return;
    }

    if (resume.type !== "application/pdf") {
      setError("Resume must be a PDF");
      return;
    }

    const data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("phone", phone);
    data.append("jobTitle", jobTitle);
    data.append("resume", resume);

    setLoading(true);

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/candidates`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      setSuccess("Referral submitted successfully!");
      setFormData({ name: "", email: "", phone: "", jobTitle: "" });
      setResume(null);
      // Reset file input manually if needed
      document.getElementById("resume").value = "";

      if (onCandidateAdded) onCandidateAdded();
    } catch (err) {
      setError(
        err.response && err.response.data.message
          ? err.response.data.message
          : "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Submit a Referral</h2>
      {error && <div className="error-message">{error}</div>}
      {success && (
        <div
          className="success-message"
          style={{ color: "green", textAlign: "center", marginBottom: "1rem" }}
        >
          {success}
        </div>
      )}

      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Candidate Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            required
            placeholder="User"
          />
        </div>
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
            placeholder="user@gmail.com"
          />
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="text"
            name="phone"
            value={phone}
            onChange={onChange}
            required
            placeholder="9876543210"
          />
        </div>
        <div className="form-group">
          <label>Job Title</label>
          <input
            type="text"
            name="jobTitle"
            value={jobTitle}
            onChange={onChange}
            required
            placeholder="Software Engineer"
          />
        </div>
        <div className="form-group">
          <label>Resume (PDF)</label>
          <input
            type="file"
            name="resume"
            id="resume"
            onChange={onFileChange}
            accept="application/pdf"
            required
          />
        </div>
        <button type="submit" className="btn btn-block" disabled={loading}>
          {loading ? "Submitting..." : "Submit Referral"}
        </button>
      </form>
    </div>
  );
};

export default ReferralForm;
