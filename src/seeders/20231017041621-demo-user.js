"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     *
     */
    await queryInterface.bulkInsert(
      "User",
      [
        {
          email: "JohnDoe@gmail.com",
          password: "123",
          username: "John Doe",
        },
        {
          email: "test2@gmail.com",
          password: "123",
          username: "test 2",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
