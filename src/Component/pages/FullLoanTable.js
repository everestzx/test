import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FullLoanTable = () => {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    axios.get('/api/loans')
      .then(res => setLoans(res.data))
      .catch(err => console.error('Error fetching loans:', err));
  }, []);

  return (
    <div className="dashboard-container">
      <h2>All Loan Applications</h2>
      <div className="table-container" style={{ overflowX: 'auto' }}>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>User ID</th>
              <th>Application Date</th>
              <th>Borrower Name</th>
              <th>Client ID</th>
              <th>Address</th>
              <th>Length of Stay (Years)</th>
              <th>Length of Stay (Months)</th>
              <th>Contact No.</th>
              <th>TIN</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Spouse Name</th>
              <th>Occupation</th>
              <th>Birthdate</th>
              <th>Civil Status</th>
              <th>Spouse Occupation</th>
              <th>Loan Product</th>
              <th>Loan Amount</th>
              <th>Loan Amount (in Words)</th>
              <th>Loan Team</th>
              <th>Payout Preference</th>
              <th>Payment Model</th>
              <th>Loan Purpose</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan) => (
              <tr key={loan.id}>
                <td>{loan.id}</td>
                <td>{loan.user_id}</td>
                <td>{new Date(loan.application_date).toLocaleDateString()}</td>
                <td>{loan.borrowerName}</td>
                <td>{loan.clientID}</td>
                <td>{loan.address}</td>
                <td>{loan.lengthofStayYears}</td>
                <td>{loan.lengthofStayMonths}</td>
                <td>{loan.conatactNo}</td>
                <td>{loan.tin}</td>
                <td>{loan.age}</td>
                <td>{loan.gender}</td>
                <td>{loan.spouseName}</td>
                <td>{loan.occupation}</td>
                <td>{new Date(loan.birthdate).toLocaleDateString()}</td>
                <td>{loan.civilStatus}</td>
                <td>{loan.spuseOccupation}</td>
                <td>{loan.loanProduct}</td>
                <td>{loan.loanAmount}</td>
                <td>{loan.LoanAmountWords}</td>
                <td>{loan.loanTeam}</td>
                <td>{loan.payoutPreference}</td>
                <td>{loan.paymentModel}</td>
                <td>{loan.loanPurpose}</td>
                <td>{loan.status}</td>
                <td>{new Date(loan.createdAt).toLocaleDateString()}</td>
                <td>{new Date(loan.updatedAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FullLoanTable;
