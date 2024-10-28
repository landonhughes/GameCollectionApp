import { findGame, getOAuthToken, clientID, clientSecret } from './game-api.js';
import { catchError } from './error-handling.js';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/game/:gameName", async(req, res) => {
    const gameName = req.params.gameName;
    const oauthResponse = await getOAuthToken(clientID, clientSecret);
    const [error, data] = await catchError(findGame(gameName, oauthResponse.access_token));
    
    if (error) {
        return res.json({
            "error": "Something happened. " + error
        });
    }
    
    return res.json(data);
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});