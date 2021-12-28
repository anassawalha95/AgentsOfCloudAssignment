"use strict";
const bcrypt = require("bcrypt");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    //Add seed commands here.

    Example: await queryInterface.bulkInsert(
      "users",
      [
        {
          first_name: "seller1",
          middle_name: "seller1",
          last_name: "seller1",
          email: "seller1@seller1.com",
          phone_number: "054153464",
          title: "Mr",
          industry_type: "Computer",
          role_type: "seller",
          password: await bcrypt.hash("seller1", 10),
        },

        {
          first_name: "seller2",
          middle_name: "seller2",
          last_name: "seller2",
          email: "seller2@seller2.com",
          phone_number: "02542264",
          title: "Mr",
          industry_type: "Computer",
          role_type: "seller",
          password: await bcrypt.hash("seller2", 10),
        },

        {
          first_name: "seller3",
          middle_name: "seller3",
          last_name: "seller3",
          email: "seller3@seller3.com",
          phone_number: "0544564",
          title: "Mr",
          industry_type: "Computer",
          role_type: "seller",
          password: await bcrypt.hash("seller3", 10),
        },
        {
          first_name: "buyer1",
          middle_name: "buyer1",
          last_name: "buyer1",
          email: "buyer1@buyer1.com",
          phone_number: "052454634",
          title: "Mrs",
          industry_type: "Computer",
          role_type: "buyer",
          password: await bcrypt.hash("buyer1", 10),
        },
        {
          first_name: "buyer2",
          middle_name: "buyer2",
          last_name: "buyer2",
          email: "buyer2@buyer2.com",
          phone_number: "044454634",
          title: "Mrs",
          industry_type: "Computer",
          role_type: "buyer",
          password: await bcrypt.hash("buyer2", 10),
        },
        {
          first_name: "buyer3",
          middle_name: "buyer3",
          last_name: "buyer3",
          email: "buyer3@buyer3.com",
          phone_number: "05444634",
          title: "Mrs",
          industry_type: "Computer",
          role_type: "buyer",
          password: await bcrypt.hash("buyer3", 10),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     */
    await queryInterface.bulkDelete("users", null, {});
  },
};
