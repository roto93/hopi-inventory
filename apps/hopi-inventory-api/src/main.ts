/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';
import cors from 'cors'


const app = express();

app.use(cors())

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to hopi-inventory-api!' });
});

app.post('/login', (req, res) => {
  res.send('Login')
})

app.post('/register', (req, res) => {
  res.send('Register')
})

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
