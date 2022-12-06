import Sequelize, { Model } from 'sequelize';

class Project extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        zip_code: Sequelize.STRING,
        cost: Sequelize.INTEGER,
        done: Sequelize.BOOLEAN,
        deadline: Sequelize.DATE,
        username: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}
export default Project;
