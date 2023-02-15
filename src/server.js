import express from 'express';
import 'dotenv/config';
import jwt from 'jsonwebtoken';

import { UserService } from './services/user-service.js';
import { ProductService } from './services/product-service.js';
import { authMiddleware } from './middlewares/authMiddleware.js';

const app = express();
const port = process.env.PORT || 8080;

const userNotFoundMessage = { message: 'Usuário não encontrado!' };

app.use(express.json());

app.get('/', async (req, res) => {
  res.send('Imagine Shop');
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const userService = new UserService();
  const userLogged = await userService.login(email, password);

  if (userLogged) {
    const secretKey = process.env.SECRET_KEY;
    const token = jwt.sign({ user: userLogged }, secretKey, {
      expiresIn: '1d',
    });
    return res.status(200).json({ token });
  }
  return res.status(400).json({ message: 'email ou senha inválidos!' });
});

app.get('/products', async (req, res) => {
  const productService = new ProductService();
  const products = await productService.findAll();

  return res.status(200).json(products);
})

app.use(authMiddleware);

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

app.get('/users/:id', async (req, res) => {
  const id = req.params.id;
  const userService = new UserService();

  const user = await userService.findById(id);

  if (user) {
    return res.status(200).json(user);
  }
  return res.status(404).json(userNotFoundMessage);
});

app.delete('/users/:id', async (req, res) => {
  const id = req.params.id;
  const userService = new UserService();

  const user = await userService.findById(id);

  if (user) {
    await userService.delete(id);
    return res.status(200).json({ message: 'Usuário excluído com sucesso!' });
  }

  return res.status(404).json(userNotFoundMessage);
});

app.put('/users/:id', async (req, res) => {
  const id = req.params.id;

  const { name, email, password } = req.body;
  const user = { name, email, password };
  const userService = new UserService();
  const findUser = await userService.findById(id);

  if (findUser) {
    await userService.update(id, user);
    return res.status(200).json({ message: 'Usuário atualizado com sucesso!' });
  }

  return res.status(404).json(userNotFoundMessage);
});

app.post('/products', async (req, res) => {
  // name: String,
  // description: String,
  // price: Number,
  // summary: String,
  // stock: Number,
  // fileName: String,

  const { name, description, price, summary, stock } = req.body;
  const product = { name, description, price, summary, stock };
  const productService = new ProductService();
  await productService.create(product);
  return res.status(201).json(product);
});

app.listen(port, () => {
  console.log(`App linstening in http://localhost:${port}`);
});
