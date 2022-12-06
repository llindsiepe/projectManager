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
    adressFunction.location = {
      city: searchAdress.city,
      state: searchAdress.state,
    };

    return res.json(adressFunction);
  }

  async update(req, res) {
    let schema = yup.object().shape({
      title: yup.string(),
      zip_code: yup.number(),
      cost: yup.number(),
      deadline: yup.date(),
    });
    try {
      await schema.validate(req.body);
    } catch (err) {
      return res.status(422).json({ error: `Validation fails` });
    }

    const project = await Project.findByPk(req.params.id);
    if (project.username !== req.headers.username) {
      return res.status(401).json({ error: "you don't have a permission" });
    }

    const projectUpdate = await project.update(req.body);

    return res.json(projectUpdate);
  }

  async patch(req, res) {
    const project = await Project.findByPk(req.params.id);
    console.log(project.username);
    console.log(req.headers.username);
    if (project.username != req.headers.username) {
      return res.status(401).json({ error: "you don't have a permission" });
    }

    project.done = true;

    await project.save();

    return res.json(project);
  }

  async delete(req, res) {
    const project = await Project.findByPk(req.params.id);
    if (project.username !== req.headers.username) {
      return res.status(401).json({ error: "you don't have a permission" });
    }

    await project.destroy();

    return res.json({ ok: 'Projeto excluído com sucesso' });
  }
}

export default new ProjectController();
