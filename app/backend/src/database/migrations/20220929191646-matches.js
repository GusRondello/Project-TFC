'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.createTable('Matches', {
    id: { 
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    home_team: { 
      allowNull: false,
      type: Sequelize.INTEGER,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      references: {
        model: 'Teams',
        key: 'id'
      }
    },
    home_team_goals: { 
      allowNull: true,
      type: Sequelize.INTEGER
    },
    away_team: { 
      allowNull: false,
      type: Sequelize.INTEGER,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      references: {
        model: 'Teams',
        key: 'id'
      }
    },
    away_team_goals: { 
      allowNull: true,
      type: Sequelize.INTEGER
    },
    in_progress: { 
      allowNull: false,
      type: Sequelize.BOOLEAN
    },
   });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Teams');
  }
};
