import User from '../models/User';
import * as yup from 'yup';

class SessionController {
  async store(req, res) {
    let schema = yup.object().shape({
      username: yup.string().required(),
      password: yup.string().required(),
    });
    try {
      await schema.validate(req.body);
    } catch (err) {
      return res.status(422).json({ error: `Validation fails` });
    }
    const session = await User.findOne({
      where: { username: req.body.username, password: req.body.password },
    });

    if (!session) {
      return res.status(401).json({ error: 'Usuário ou senha inválida' });
    }

    return res.json(session);
  }
}

export default new SessionController();
