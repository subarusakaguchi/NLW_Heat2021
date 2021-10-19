import "dotenv/config";
import express from "express";
import { router } from "./routes";

const app = express();

const PORT = 4000;

app.use(express.json())

app.use(router);

app.get('/github', (req, res) => {
  res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`);
});

app.get('/signin/callback', (req, res) => {
  const { code } = req.query;
  
  return res.json(code);
});

app.listen(PORT, () => console.log(`Server is running in port: ${PORT}`));

