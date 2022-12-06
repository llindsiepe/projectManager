import User from '../models/User';
import * as yup from 'yup';

class UserController {
  async store(req, res) {
    let schema = yup.object().shape({
      name: yup.string().required(),
      password: yup.string().required(),
      username: yup.string().required(),
    });
    try {
      await schema.validate(req.body);
    } catch (err) {
      return res.status(422).json({ error: `Validation fails` });
    }
    const createUser = await User.create(req.body);

    return res.json(createUser);
  }

  async index(req, res) {
    const user = await User.findAll({
      where: {
        username: req.body.username,
      },
    });
    return res.json(user);
  }

  async update(req, res) {}

  async delete(req, res) {}
}

export default new UserController();
