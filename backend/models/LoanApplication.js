const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const LoanApplication = sequelize.define('LoanApplication', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'user_id',
    },
  },
  application_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  borrowerName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  clientId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lengthOfStayYears: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  lengthOfStayMonths: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  contactNo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tin: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  spouseName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  occupation: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  birthdate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  civilStatus: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  spouseOccupation: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  loanProduct: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  loanAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  loanAmountWords: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  loanTerm: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  payoutPreference: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  paymentMode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  loanPurpose: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'Pending',
    allowNull: false,
  },
});

module.exports = LoanApplication;
