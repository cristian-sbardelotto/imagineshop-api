import 'dotenv/config';

import express from 'express';

import { UserService } from './services/user-service.js';

const app = express();
const port = 5550;

app.get('/', async (req, res) => {
  const userService = new UserService();

  await userService.add({
    name: 'Cristian',
    email: 'CristianSbardelotto@hotmail.com',
    password: '123456'
  });

  res.send('Helo World');
});

app.listen(port, () => {
    console.log(`App linstening in http://localhost:${port}`);
});