import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiUsers, FiFileText, FiCheckCircle, FiDollarSign, FiClock } from "react-icons/fi";
import { BsGraphUp, BsPieChart } from "react-icons/bs";
import "../stylez/Dashboard.css";

const Dashboard = () => {
  const [stats, setStats] = useState([]);
  const [recentLoans, setRecentLoans] = useState([]);
  const [pendingLoans, setPendingLoans] = useState([]);
  const [recentMembers, setRecentMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    setErrors({});

    try {
      // Fetch dashboard stats
      try {
        const statsRes = await axios.get("/api/dashboard/stats");
        setStats(statsRes.data);
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        setErrors((prev) => ({ ...prev, stats: "Failed to load dashboard statistics" }));
      }

      // Fetch recent loans
      try {
        const recentLoansRes = await axios.get("/api/loans/recent");
        console.log("Recent loans response:", recentLoansRes.data);
        setRecentLoans(recentLoansRes.data);
      } catch (error) {
        console.error("Error fetching recent loans:", error);
        setErrors((prev) => ({ ...prev, recentLoans: "Failed to load recent loans" }));
      }

      // Fetch pending loans
      try {
        const pendingLoansRes = await axios.get("/api/loans/pending");
        console.log("Pending loans response:", pendingLoansRes.data);
        setPendingLoans(pendingLoansRes.data);
      } catch (error) {
        console.error("Error fetching pending loans:", error);
        setErrors((prev) => ({ ...prev, pendingLoans: "Failed to load pending loans" }));
      }

      // Fetch recent members - Try with both approaches
      try {
        console.log("Attempting to fetch recent members...");
        const membersRes = await axios.get("/api/members/recent");
        console.log("Recent members response:", membersRes.data);
        setRecentMembers(membersRes.data);
      } catch (firstError) {
        console.error("First attempt failed:", firstError);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleApproveLoan = async (loanId) => {
    try {
      // Updated to use relative path
      await axios.put(`/api/loans/${loanId}/approve`);
      // Refresh data after approval
      fetchData();
    } catch (error) {
      console.error("Error approving loan:", error);
    }
  };

  console.log("pendingLoans", pendingLoans);

  const statIcons = {
    totalMembers: <FiUsers size={24} />,
    pendingLoans: <FiFileText size={24} />,
    approvedLoans: <FiCheckCircle size={24} />,
    disbursedLoans: <FiDollarSign size={24} />,
    pendingMemberships: <FiClock size={24} />,
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>PASCCO Dashboard</h1>
        {loading && <div className="loading-indicator">Loading...</div>}
      </header>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className={`stat-card ${stat.color}`}>
            <div className="stat-icon">{statIcons[stat.key]}</div>
            <div className="stat-info">
              <h3>{stat.title}</h3>
              <p>{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-content">
        <div className="content-left small-charts">
          <div className="dashboard-card">
            <div className="card-header">
              <h3>Loan Applications</h3>
              <BsGraphUp size={20} />
            </div>
            <div className="chart-placeholder">
              <p className="text-center">Loan application trends chart</p>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="card-header">
              <h3>Loan Types Breakdown</h3>
              <BsPieChart size={20} />
            </div>
            <div className="chart-placeholder">
              <p className="text-center">Loan types pie chart</p>
            </div>
          </div>
        </div>

        <div className="content-right wide-tables">
          <div className="dashboard-card">
            <div className="card-header">
              <h3>Pending Loan Applications</h3>
              <span className="view-all" onClick={() => navigate("/loans/all")}>
                View All
              </span>
            </div>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Tracking No.</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingLoans.map((loan) => (
                    <tr key={loan.id}>
                      <td>{loan.id}</td>
                      <td>{loan.borrowerName}</td>
                      <td>{loan.trackingNumber}</td>
                      <td>{loan.loanProduct}</td>
                      <td>
                        {new Intl.NumberFormat("en-PH", {
                          style: "currency",
                          currency: "PHP",
                        }).format(loan.loanAmount)}
                      </td>
                      <td>
                        <span className={`status-badge ${loan.status.toLowerCase()}`}>{loan.status}</span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button className="approve-btn" onClick={() => handleApproveLoan(loan.id)}>
                            Approve
                          </button>
                          <button className="view-btn" onClick={() => navigate(`/LoanApplicationView/${loan.id}`)}>
                            View
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {pendingLoans.length === 0 && (
                    <tr>
                      <td colSpan="7" className="no-data">
                        No pending loan applications
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="card-header">
              <h3>Recent Loan Applications</h3>
              <span className="view-all" onClick={() => navigate("/loans/all")}>
                View All
              </span>
            </div>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Tracking No.</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentLoans.map((loan) => (
                    <tr key={loan.id}>
                      <td>{loan.id}</td>
                      <td>{loan.borrowerName}</td>
                      <td>{loan.trackingNumber}</td>
                      <td>{loan.loanProduct}</td>
                      <td>
                        {new Intl.NumberFormat("en-PH", {
                          style: "currency",
                          currency: "PHP",
                        }).format(loan.loanAmount)}
                      </td>
                      <td>
                        <span className={`status-badge ${loan.status.toLowerCase()}`}>{loan.status}</span>
                      </td>
                      <td>
                        <button className="view-btn" onClick={() => navigate(`/LoanApplicationView/${loan.id}`)}>
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                  {recentLoans.length === 0 && (
                    <tr>
                      <td colSpan="7" className="no-data">
                        No recent loan applications
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="card-header">
              <h3>Recent Members</h3>
              <span className="view-all" onClick={() => navigate("/members/all")}>
                View All
              </span>
            </div>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Membership No.</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentMembers.map((member) => (
                    <tr key={member.id}>
                      <td>{member.id}</td>
                      <td>{member.name}</td>
                      <td>{member.membership_no}</td>
                      <td>
                        <span className={`status-badge ${member.status.toLowerCase()}`}>{member.status}</span>
                      </td>
                      <td>
                        <button className="view-btn" onClick={() => navigate(`/member/${member.id}`)}>
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                  {recentMembers.length === 0 && (
                    <tr>
                      <td colSpan="5" className="no-data">
                        No recent members
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
