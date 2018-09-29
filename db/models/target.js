'use strict';
module.exports = (sequelize, DataTypes) => {
  const Target = sequelize.define('Target', {
    companyId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, {});
  Target.associate = function(models) {
    // associations can be defined here
  };
  return Target;
};