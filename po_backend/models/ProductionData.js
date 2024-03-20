const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');

class ProductionData extends Model {}

ProductionData.init({
  SaveTime: {
    type: DataTypes.STRING(14),
    allowNull: false,
    primaryKey: true
  },
  LineCode: {
    type: DataTypes.STRING(5),
    allowNull: false,
    primaryKey: true
  },
  GAP: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  PEND: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  MKCNT: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize, 
  modelName: 'ProductionData', 
  tableName: 'tGapHistory', 
  schema: 'dbo',
  timestamps: false, 
  omitNull: true,
});

module.exports = ProductionData;
