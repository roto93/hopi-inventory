import cors from 'cors';
import express from 'express';
import * as path from 'path';
import userRoutes from './routes/userRoutes';

// mock database
export const user = []

const app = express();
app.use(cors())
app.use(express.json()) // json parser
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Routes
app.use('/user', userRoutes)

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
