'use strict';
module.exports = (sequelize, DataTypes) => {
  const Auction = sequelize.define('Auction', {
    companyId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    itemNumber: DataTypes.TEXT,
    messageNumber: DataTypes.TEXT,
    about: DataTypes.TEXT,
    startPrice: DataTypes.STRING,
	location: DataTypes.TEXT,
	isEmailSent: DataTypes.INTEGER
  }, {});
  Auction.associate = function(models) {
    // associations can be defined here
  };
  return Auction;
};