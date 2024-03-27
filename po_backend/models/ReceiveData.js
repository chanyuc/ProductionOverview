const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');

class ReceiveData extends Model {}

ReceiveData.init({
  CarDate: {
    type: DataTypes.STRING(14),
    allowNull: false,
    primaryKey: true
  },
  MobisDate: {
    type: DataTypes.STRING(14),
    allowNull: false
  },
  YYYYMMDD: {
    type: DataTypes.STRING(8),
    allowNull: false
  },
  FSC: {
    type: DataTypes.STRING(25),
    allowNull: false
  },
  SEQ: {
    type: DataTypes.STRING(4),
    allowNull: false
  },
  VIN: {
    type: DataTypes.STRING(17),
    allowNull: false
  },
  BODY: {
    type: DataTypes.STRING(10),
    allowNull: false
  }
}, {
  sequelize, 
  modelName: 'ReceiveData', 
  tableName: 'tRecvOrd', 
  schema: 'dbo',
  timestamps: false, 
  omitNull: true,
});

module.exports = ReceiveData;
