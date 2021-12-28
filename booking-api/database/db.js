const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("booking_app", "anas", "anas", {
  host: "localhost",
  dialect: "postgres",
});

module.exports = sequelize;
