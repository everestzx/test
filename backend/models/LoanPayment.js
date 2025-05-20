const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const LoanPayment = sequelize.define('LoanPayment', {
  loan_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'LoanApplications',
      key: 'id',
    },
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'user_id',
    },
  },
  payment_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  payment_date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  payment_method: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  transaction_reference: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  payment_status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Completed',
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

module.exports = LoanPayment;
