import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";

const CandidateCard = ({ candidate, refreshCandidates, onDelete }) => {
  const { user } = useContext(AuthContext);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/candidates/${candidate._id}/status`,
        { status: newStatus },
        config,
      );
      refreshCandidates();
    } catch (error) {
      console.error("Error updating status", error);
      alert("Failed to update status");
    }
  };

  return (
    <div className={`candidate-card status-${candidate.status}`}>
      <div className="candidate-info">
        <h3>{candidate.name}</h3>
        <p>
          <strong>Role:</strong> {candidate.jobTitle}
        </p>
        <p>
          <strong>Email:</strong> {candidate.email}
        </p>
        <p>
          <strong>Phone:</strong> {candidate.phone}
        </p>
      </div>
      <div className="card-actions">
        <a
          href={candidate.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn"
        >
          View Resume
        </a>
        <select
          value={candidate.status}
          onChange={handleStatusChange}
          className="status-select"
        >
          <option value="Pending">Pending</option>
          <option value="Reviewed">Reviewed</option>
          <option value="Hired">Hired</option>
          <option value="Rejected">Rejected</option>
        </select>
        <button
          onClick={() => onDelete(candidate._id)}
          className="btn btn-delete"
          style={{ marginLeft: "10px", backgroundColor: "#dc3545" }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default CandidateCard;
