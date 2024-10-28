import 'dotenv/config';
import fetch from "node-fetch";

const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

async function getOAuthToken(clientID, clientSecret) {

    const oauthUrl = `https://id.twitch.tv/oauth2/token?client_id=${clientID}&client_secret=${clientSecret}&grant_type=client_credentials`;
    const response = await fetch(oauthUrl, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        }
    });
        
    return await response.json();  
}



async function findGame(gameName, accessToken) {

    const gamesResponse = await fetch("https://api.igdb.com/v4/search", {
        method: "POST",
        headers: {
            "Client-ID": clientID,
            "Authorization": `Bearer ${accessToken}`,
            "Accept": "application/json",
            "Content-Type": "text/plain"
        },
        body: `search "${gameName}";
                fields company,description,game,name,platform,published_at;
                limit 10;`
    });

    return await gamesResponse.json();
    
}

export {findGame, getOAuthToken, clientID, clientSecret};