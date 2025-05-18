import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiUsers, FiFileText, FiCheckCircle, FiDollarSign, FiClock } from 'react-icons/fi';
import { BsGraphUp, BsPieChart } from 'react-icons/bs';
import '../stylez/Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState([]);
  const [recentLoans, setRecentLoans] = useState([]);
  const [recentMembers, setRecentMembers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/dashboard/stats')
      .then(res => setStats(res.data))
      .catch(err => console.error('Stats fetch error:', err));

    axios.get('/api/loans/recent')
      .then(res => setRecentLoans(res.data))
      .catch(err => console.error('Loans fetch error:', err));

    axios.get('/api/members/recent')
      .then(res => setRecentMembers(res.data))
      .catch(err => console.error('Members fetch error:', err));
  }, []);

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
              <h3>Recent Loan Applications</h3>
              <span className="view-all" onClick={() => navigate('/FullLoanTable')}>
                View All
              </span>
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

          <div className="dashboard-card">
            <div className="card-header">
              <h3>Recent Members</h3>
              <span className="view-all" onClick={() => navigate('/FullMemberTable')}>
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
