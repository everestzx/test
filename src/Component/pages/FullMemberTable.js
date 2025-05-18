import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FullMemberTable = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5000/api/members/all')
      .then((res) => {
        setMembers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching members:', err);
        setError('Error fetching members: ' + (err.response?.data?.message || err.message));
        setLoading(false);
      });
  }, []);

  // Define the columns we want to display
  const columnHeaders = ['ID', 'Name', 'Membership No.', 'Status'];

  return (
    <div className="dashboard-container">
      <h2>All Members</h2>
      {loading ? (
        <p>Loading member data...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <div className="table-container" style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                {columnHeaders.map((header, i) => (
                  <th key={i}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {members.length > 0 ? (
                members.map((member) => (
                  <tr key={member.id}>
                    <td>{member.id}</td>
                    <td>{member.name}</td>
                    <td>{member.membership_no}</td>
                    <td>{member.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center' }}>
                    No member data available
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

export default FullMemberTable;
