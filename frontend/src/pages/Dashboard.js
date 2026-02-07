import React, { useEffect, useState, useContext, useCallback } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import CandidateCard from "../components/CandidateCard";
import ReferralForm from "../components/ReferralForm";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [candidates, setCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [jobFilter, setJobFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const { user } = useContext(AuthContext);

  const calculateStats = (cands) => {
    return {
      total: cands.length,
      pending: cands.filter((c) => c.status === "Pending").length,
      reviewed: cands.filter((c) => c.status === "Reviewed").length,
      hired: cands.filter((c) => c.status === "Hired").length,
    };
  };

  const stats = calculateStats(candidates);

  const fetchCandidates = useCallback(async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/candidates`,
        config,
      );
      setCandidates(data);
      setFilteredCandidates(data);
    } catch (error) {
      console.error("Error fetching candidates", error);
    }
  }, [user.token]);

  const deleteCandidate = async (id) => {
    if (window.confirm("Are you sure you want to delete this candidate?")) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        await axios.delete(
          `${process.env.REACT_APP_API_URL}/api/candidates/${id}`,
          config,
        );
        fetchCandidates();
      } catch (error) {
        console.error("Error deleting candidate", error);
        alert("Failed to delete candidate");
      }
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, [fetchCandidates]);

  useEffect(() => {
    let result = candidates;

    if (jobFilter) {
      result = result.filter((candidate) =>
        candidate.jobTitle.toLowerCase().includes(jobFilter.toLowerCase()),
      );
    }

    if (statusFilter !== "All") {
      result = result.filter((candidate) => candidate.status === statusFilter);
    }

    setFilteredCandidates(result);
  }, [jobFilter, statusFilter, candidates]);

  return (
    <div className="container">
      <div className="dashboard-header">
        <div className="header-left">
          <img
            src={`${process.env.PUBLIC_URL}/favicon.png`}
            alt="Logo"
            className="dashboard-logo"
          />
          <h1>Dashboard</h1>
        </div>
        <button className="btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Close Form" : "Add New Referral"}
        </button>
      </div>

      {showForm && (
        <div style={{ marginBottom: "2rem" }}>
          <ReferralForm
            onCandidateAdded={() => {
              fetchCandidates();
              setShowForm(false);
            }}
          />
        </div>
      )}

      <div className="metrics-grid">
        <div className="stat-card">
          <h3>Total Referrals</h3>
          <p>{stats.total}</p>
        </div>
        <div className="stat-card">
          <h3>Pending</h3>
          <p>{stats.pending}</p>
        </div>
        <div className="stat-card">
          <h3>Reviewed</h3>
          <p>{stats.reviewed}</p>
        </div>
        <div className="stat-card">
          <h3>Hired</h3>
          <p>{stats.hired}</p>
        </div>
      </div>

      <div className="filter-section" style={{ marginBottom: "2rem" }}>
        <input
          type="text"
          placeholder="Filter by Job Title..."
          value={jobFilter}
          onChange={(e) => setJobFilter(e.target.value)}
          className="filter-input"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="filter-select"
        >
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Reviewed">Reviewed</option>
          <option value="Hired">Hired</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <div className="candidate-grid">
        {filteredCandidates.map((candidate) => (
          <CandidateCard
            key={candidate._id}
            candidate={candidate}
            refreshCandidates={fetchCandidates}
            onDelete={deleteCandidate}
          />
        ))}
        {filteredCandidates.length === 0 && <p>No candidates found.</p>}
      </div>
    </div>
  );
};

export default Dashboard;
