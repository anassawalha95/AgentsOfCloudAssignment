"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      this.belongsTo(User, { foreignKey: "service_provider_id" });
      this.belongsTo(User, { foreignKey: "service_requester_id" });
    }
  }
  Appointment.init(
    {
      selected_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          notNull: { msg: "Appointment must have a selected date" },
          notEmpty: { msg: "selected date  must not be empty" },
        },
      },

      // from_time: {
      //   type: DataTypes.TIME,
      //   allowNull: false,
      //   validate: {
      //     notNull: { msg: "Appointment must have a start time" },
      //     notEmpty: { msg: "start time  must not be empty" },
      //   },
      // },
      // to_time: {
      //   type: DataTypes.TIME,
      //   allowNull: false,
      //   validate: {
      //     notNull: { msg: "Appointment must have a end time" },
      //     notEmpty: { msg: "end time  must not be empty" },
      //   },
      // },

      appointment_status: {
        type: DataTypes.ENUM,
        values: ["undecided", "accepted", "rejected"],
      },

      description: {
        type: DataTypes.TEXT,
        defaultValue: null,
      },

      service_provider_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Appointment must have a service provider id" },
          notEmpty: { msg: "service provider id must not be empty" },
        },
      },

      service_requester_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Appointment must have a service requester id" },
          notEmpty: { msg: "service requester id must not be empty" },
        },
      },
    },
    {
      sequelize,
      tableName: "appointments",
      modelName: "Appointment",
      createdAt: false,
      updatedAt: false,
    }
  );
  return Appointment;
};
