import dotenv from "dotenv";
dotenv.config();
import express, {Request, Response} from "express";
import cors from "cors";

import { Database } from "./providers/database"
Database.init();

import Routes from "./routes";
const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

app.use(`/${process.env.API_PREFIX}`, Routes);

// error handling middleware
app.use((req: Request, res: Response) => {
  res.status(500).json({error: "Internal server error"});
});

// start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
