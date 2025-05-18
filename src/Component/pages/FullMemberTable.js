import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FullLoanTable = () => {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    axios.get('/api/loans')
      .then(res => setLoans(res.data))
      .catch(err => console.error('Error fetching loans:', err));
  }, []);

  const columnHeaders = [
    "id", "user_id", "application_date", "borrowerName", "clientID", "address",
    "lengthofStayYears", "lengthofStayMonths", "conatactNo", "tin", "age", "gender",
    "spouseName", "occupation", "birthdate", "civilStatus", "spuseOccupation", "loanProduct",
    "loanAmount", "LoanAmountWords", "loanTeam", "payoutPreference", "paymentModel",
    "loanPurpose", "status", "createdAt", "updatedAt"
  ];

  const formatValue = (key, value) => {
    if (!value) return '';

    const dateFields = ["application_date", "birthdate", "createdAt", "updatedAt"];
    if (dateFields.includes(key)) {
      const date = new Date(value);
      return isNaN(date.getTime()) ? '' : date.toLocaleDateString();
    }

    return value;
  };

  return (
    <div className="dashboard-container">
      <h2>All Loan Applications</h2>
      <div className="table-container" style={{ overflowX: 'auto' }}>
        <table>
          <thead>
            <tr>
              {columnHeaders.map((header, i) => (
                <th key={i}>{header.replace(/_/g, ' ')}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loans.map((loan) => (
              <tr key={loan.id}>
                {columnHeaders.map((key, i) => (
                  <td key={i}>{formatValue(key, loan[key])}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FullLoanTable;
