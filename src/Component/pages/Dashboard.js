import React from 'react';
import { FiUsers, FiFileText, FiCheckCircle, FiDollarSign, FiClock } from 'react-icons/fi';
import { BsGraphUp, BsPieChart } from 'react-icons/bs';
import '../stylez/Dashboard.css';

const Dashboard = () => {
  // These will be replaced with real data from your API
  const dashboardStats = [
    { title: "Total Members", value: "1,250", icon: <FiUsers size={24} />, color: "bg-blue-500" },
    { title: "Pending Loans", value: "24", icon: <FiFileText size={24} />, color: "bg-yellow-500" },
    { title: "Approved Loans", value: "18", icon: <FiCheckCircle size={24} />, color: "bg-green-500" },
    { title: "Disbursed Loans", value: "12", icon: <FiDollarSign size={24} />, color: "bg-purple-500" },
    { title: "Pending Memberships", value: "8", icon: <FiClock size={24} />, color: "bg-orange-500" },
  ];

  const recentLoans = [
    { id: 1001, name: "Juan Dela Cruz", type: "Regular Loan", amount: "₱25,000", status: "approved", date: "2025-05-03" },
    { id: 1002, name: "Maria Santos", type: "Salary Loan", amount: "₱15,000", status: "pending", date: "2025-05-02" },
    { id: 1003, name: "Pedro Reyes", type: "Emergency Loan", amount: "₱10,000", status: "disbursed", date: "2025-05-01" },
    { id: 1004, name: "Ana Lopez", type: "Regular Loan", amount: "₱30,000", status: "approved", date: "2025-04-30" },
  ];

  const recentMembers = [
    { id: 2001, name: "Jorge Licup", membershipNo: "PASCO-0001", status: "active", joinDate: "2025-05-05" },
    { id: 2002, name: "CAms Asdhoasd", membershipNo: "PASCO-0002", status: "active", joinDate: "2025-05-05" },
    { id: 2003, name: "Luis Garcia", membershipNo: "PASCO-0003", status: "pending", joinDate: "2025-05-04" },
  ];

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>PASCO Dashboard</h1>
        <p>Welcome back! Here's what's happening today.</p>
      </header>

      {/* Stats Cards */}
      <div className="stats-grid">
        {dashboardStats.map((stat, index) => (
          <div key={index} className={`stat-card ${stat.color}`}>
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-info">
              <h3>{stat.title}</h3>
              <p>{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="dashboard-content">
        {/* Left Column */}
        <div className="content-left">
          {/* Loan Applications Chart */}
          <div className="dashboard-card">
            <div className="card-header">
              <h3>Loan Applications</h3>
              <BsGraphUp size={20} />
            </div>
            <div className="chart-placeholder">
              {/* Chart will go here - replace with actual chart component */}
              <p className="text-center">Loan application trends chart</p>
            </div>
          </div>

          {/* Loan Types Breakdown */}
          <div className="dashboard-card">
            <div className="card-header">
              <h3>Loan Types Breakdown</h3>
              <BsPieChart size={20} />
            </div>
            <div className="chart-placeholder">
              {/* Chart will go here - replace with actual chart component */}
              <p className="text-center">Loan types pie chart</p>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="content-right">
          {/* Recent Loan Applications */}
          <div className="dashboard-card">
            <div className="card-header">
              <h3>Recent Loan Applications</h3>
              <span className="view-all">View All</span>
            </div>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentLoans.map((loan) => (
                    <tr key={loan.id}>
                      <td>{loan.id}</td>
                      <td>{loan.name}</td>
                      <td>{loan.type}</td>
                      <td>{loan.amount}</td>
                      <td>
                        <span className={`status-badge ${loan.status}`}>
                          {loan.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Members */}
          <div className="dashboard-card">
            <div className="card-header">
              <h3>Recent Members</h3>
              <span className="view-all">View All</span>
            </div>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Membership No.</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentMembers.map((member) => (
                    <tr key={member.id}>
                      <td>{member.id}</td>
                      <td>{member.name}</td>
                      <td>{member.membershipNo}</td>
                      <td>
                        <span className={`status-badge ${member.status}`}>
                          {member.status}
                        </span>
                      </td>
                    </tr>
                  ))}
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