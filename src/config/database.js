require('dotenv/config');

module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'root',
  database: 'ProjectManager',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
