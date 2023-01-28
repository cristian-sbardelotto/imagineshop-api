import express from 'express';
import 'dotenv/config';

import { UserService } from './services/user-service.js';
import { authMiddleware } from './middlewares/authMiddleware.js';

const app = express();
const port = 5550;

app.use(express.json());

app.get('/', async (req, res) => {
  res.send('Imagine Shop');
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const userService = new UserService();
  const userLogged = await userService.login(email, password);

  if (userLogged) {
    return res.status(200).json(userLogged);
  }
  return res.status(400).json({ message: 'email ou senha inválidos!' })
})

app.post('/users', async (req, res) => {
  const { name, email, password } = req.body;
  const user = { name, email, password };
  const userService = new UserService();
  await userService.create(user);

  return res.status(201).json(user);
});

app.get('/users', async (req, res) => {
  const userService = new UserService();

  const users = await userService.findAll();

  return res.status(200).json(users);
});

app.get('/users/:id', authMiddleware, async (req, res) => {
  const id = req.params.id;
  const userService = new UserService();

  const user = await userService.findById(id);

  if (user) {
    return res.status(200).json(user);
  }
  return res.status(404).json({ message: 'Usuário não encontrado!' });
});

app.delete('/users/:id', async (req, res) => {
  const id = req.params.id;
  const userService = new UserService();

  const user = await userService.findById(id);

  if (user) {
    await userService.delete(id);
    return res.status(200).json({ message: 'Usuário excluído com sucesso!' });
  }

  return res.status(404).json({ message: 'Usuário não encontrado!' });
});

app.put('/users/:id', async (req, res) => {
  const id = req.params.id;

  const { name, email, password } = req.body;
  const user = { name, email, password };
  const userService = new UserService();
  const findUser = await userService.findById(id);

  if (findUser) {
    await userService.update(id, user);
    return res.status(200).json({ message: 'Usuário atualizado com sucesso!' })
  }

  return res.status(404).json({ message: 'Usuário não encontrado!' });
});

app.listen(port, () => {
  console.log(`App linstening in http://localhost:${port}`);
});
