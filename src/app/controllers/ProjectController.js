import Project from '../models/Project';
import * as yup from 'yup';
import User from '../models/User';

import cep from 'cep-promise';

class ProjectController {
  async store(req, res) {
    let schema = yup.object().shape({
      title: yup.string().required(),
      zip_code: yup.number().required(),
      cost: yup.number().required(),
      deadline: yup.date().required(),
    });
    try {
      await schema.validate(req.body);
    } catch (err) {
      return res.status(422).json({ error: `Validation fails` });
    }

    const user = await User.findOne({
      where: { username: req.headers.username },
    });

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    req.body.username = req.headers.username;

    const createProject = await Project.create(req.body);

    return res.json(createProject);
  }

  async index(req, res) {
    const project = await Project.findAll({
      where: {
        username: req.headers.username,
      },
    });
    return res.json(project);
  }

  async adress(req, res) {
    const adressFunction = await Project.findOne({
      where: { id: req.headers.id },
    });

    const searchAdress = await cep(adressFunction.zip_code);
    adressFunction.zip_code = {
      city: searchAdress.city,
      state: searchAdress.state,
    };

    return res.json(adressFunction);
  }

  async update(req, res) {}

  async delete(req, res) {}
}

export default new ProjectController();
