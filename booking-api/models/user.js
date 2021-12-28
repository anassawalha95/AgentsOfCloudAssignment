"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Appointment }) {
      // define association here

      // this.belongsTo(Industry, { foreignKey: "industry_id" });
      // this.belongsTo(Role, { foreignKey: "role_id" });

      this.hasMany(Appointment, { foreignKey: "service_provider_id" });
      this.hasMany(Appointment, { foreignKey: "service_requester_id" });
    }
  }
  User.init(
    {
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "User must have a first name" },
          notEmpty: { msg: "first name must not be empty" },
        },
      },
      middle_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "User must have a middle name" },
          notEmpty: { msg: "middle name must not be empty" },
        },
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "User must have a last name" },
          notEmpty: { msg: "last name must not be empty" },
        },
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: { msg: "User must have a email" },
          notEmpty: { msg: "email must not be empty" },
          isEmail: { msg: "you must enter an email" },
        },
      },
      phone_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        validate: {
          notNull: { msg: "User must have a phone_number" },
          notEmpty: { msg: "phone_number must not be empty" },
          isDecimal: { msg: "phone number must be decimal" },
        },
      },
      // ===
      title: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      industry_type: {
        type: DataTypes.ENUM,
        values: [
          "Manufacturing",
          "Production",
          "Agriculture",
          "Retail",
          "Mining",
          "Construction",
          "Finance",
          "Telecommunications",
          "Food industry",
          "Investment",
          "Transport",
          "Insurance",
          "Financial services",
          "Health care",
          "Wholesale",
          "Computer",
        ],
      },
      role_type: {
        type: DataTypes.ENUM,
        values: ["buyer", "seller"],
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "User must have a Password" },
          notEmpty: { msg: "Password  must not be empty" },
        },
      },
    },
    {
      sequelize,
      tableName: "users",
      modelName: "User",
      createdAt: false,
      updatedAt: false,
    }
  );
  return User;
};
