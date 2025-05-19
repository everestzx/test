import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiEdit, FiTrash2, FiCheck, FiX } from "react-icons/fi";
import "../stylez/Dashboard.css";

const FullLoanTable = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const navigate = useNavigate();

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/loans/all");
      setLoans(response.data);
    } catch (error) {
      console.error("Error fetching loans:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this loan application?")) {
      try {
        await axios.delete(`/api/loans/${id}`);
        fetchLoans(); // Refresh the list
      } catch (error) {
        console.error("Error deleting loan:", error);
      }
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(`/api/loans/${id}/status`, { status });
      fetchLoans(); // Refresh the list
    } catch (error) {
      console.error("Error updating loan status:", error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Filter and sort loans
  const filteredLoans = loans
    .filter((loan) => {
      // Apply search filter
      const matchesSearch =
        loan.borrowerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loan.trackingNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loan.loanProduct?.toLowerCase().includes(searchQuery.toLowerCase());

      // Apply status filter
      const matchesStatus = statusFilter === "all" || loan.status.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      // Apply sorting
      if (a[sortBy] < b[sortBy]) {
        return sortOrder === "asc" ? -1 : 1;
      }
      if (a[sortBy] > b[sortBy]) {
        return sortOrder === "asc" ? 1 : -1;
      }
      return 0;
    });

  return (
    <div className="full-table-container">
      <header className="table-header">
        <h1>All Loan Applications</h1>
        <div className="filter-controls">
          <input
            type="text"
            placeholder="Search by name or tracking number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />

          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="filter-select">
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="disbursed">Disbursed</option>
          </select>

          <select
            value={`${sortBy}-${sortOrder}`}
            onChange={(e) => {
              const [newSortBy, newSortOrder] = e.target.value.split("-");
              setSortBy(newSortBy);
              setSortOrder(newSortOrder);
            }}
            className="sort-select"
          >
            <option value="createdAt-desc">Newest First</option>
            <option value="createdAt-asc">Oldest First</option>
            <option value="borrowerName-asc">Name (A-Z)</option>
            <option value="borrowerName-desc">Name (Z-A)</option>
            <option value="loanAmount-desc">Amount (High-Low)</option>
            <option value="loanAmount-asc">Amount (Low-High)</option>
          </select>
        </div>
      </header>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="table-responsive">
          <table className="full-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tracking No.</th>
                <th>Name</th>
                <th>Loan Type</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Application Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLoans.length > 0 ? (
                filteredLoans.map((loan) => (
                  <tr key={loan.id}>
                    <td>{loan.id}</td>
                    <td>{loan.trackingNumber}</td>
                    <td>{loan.borrowerName}</td>
                    <td>{loan.loanProduct}</td>
                    <td>
                      {new Intl.NumberFormat("en-PH", {
                        style: "currency",
                        currency: "PHP",
                      }).format(loan.loanAmount)}
                    </td>
                    <td>
                      <div className="status-dropdown">
                        <span className={`status-badge ${loan.status.toLowerCase()}`}>{loan.status}</span>
                        <div className="status-actions">
                          {loan.status !== "Approved" && (
                            <button className="status-btn approve" onClick={() => handleStatusChange(loan.id, "Approved")} title="Approve">
                              <FiCheck />
                            </button>
                          )}
                          {loan.status !== "Rejected" && (
                            <button className="status-btn reject" onClick={() => handleStatusChange(loan.id, "Rejected")} title="Reject">
                              <FiX />
                            </button>
                          )}
                          {loan.status === "Approved" && (
                            <button
                              className="status-btn disburse"
                              onClick={() => handleStatusChange(loan.id, "Disbursed")}
                              title="Mark as Disbursed"
                            >
                              <FiCheck />
                            </button>
                          )}
                        </div>
                      </div>
                    </td>
                    <td>{formatDate(loan.createdAt)}</td>
                    <td>
                      <div className="action-buttons">
                        <button className="view-btn" onClick={() => navigate(`/LoanApplicationView/${loan.id}`)} title="View">
                          View
                        </button>
                        {/* <button className="edit-btn icon-btn" onClick={() => navigate(`/LoanApplicationForm/edit/${loan.id}`)} title="Edit">
                          <FiEdit />
                        </button> */}
                        <button className="delete-btn icon-btn" onClick={() => handleDelete(loan.id)} title="Delete">
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="no-data">
                    {searchQuery || statusFilter !== "all" ? "No loans match your filters" : "No loan applications found"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FullLoanTable;
