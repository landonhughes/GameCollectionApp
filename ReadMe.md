# Game Collection App

Utilizes the IGDB API to manage your video game collection.

## Todo

1. Create UI
   - Input to search for game
   - add game name + image + platform
2. Abilities to
   - add or remove game from collection
3. Save collection to localStorage

## Stretch Goals

Add more content about the games to the site besides the cover art and title using /search from the IGDB API.

```JavaScript
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


```
