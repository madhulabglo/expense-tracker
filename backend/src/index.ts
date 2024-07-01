import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import loginRoutes from './router/loginRouter';
import otpRoutes from "./router/otpRouter"
import expenseRoutes from "./router/expenseRouter"
import onlyexpenseRoutes from "./router/onlyexpenseRouter"
import roommateRoutes from "./router/roommateRouter"
import cors from "cors"

import connectToDB from './config/dbConfig';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://expense-tracker-frontend-git-master-madhulabglos-projects.vercel.app'
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

// Enhanced logging
app.use((req, res, next) => {
  console.log(`Received ${req.method} request for ${req.url}`);
  // console.log('Request Headers:', req.headers);
  next();
});

// Middleware to parse JSON
app.use(express.json());

// Basic route
app.get('/api', (req: Request, res: Response) => {
  res.send('Hello, world!');
});

connectToDB();

// Routes
app.use('/api/otp', otpRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/onlyexpenses', onlyexpenseRoutes);
app.use('/api/roommates', roommateRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
