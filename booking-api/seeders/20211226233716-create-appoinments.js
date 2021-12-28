"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
  //    */
    //   await queryInterface.bulkInsert(
    //     "appointments",
    //     [
    //       // {
    //       //   selected_date: "2062-11-03",
    //       //   appointment_status: "undecided",
    //       //   service_provider_id: "1",
    //       //   service_requester_id: "2",
    //       // },
    //       // {
    //       //   selected_date: "2061-11-03",
    //       //   appointment_status: "accepted",
    //       //   service_provider_id: "1",
    //       //   service_requester_id: "2",
    //       // },
    //     ],
    //     {}
    //   );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     */
    // await queryInterface.bulkDelete("appointments", null, {});
  },
};
