const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const clientId = 'aoqq5yq3nokymtw9zpup1f5i270y8w';
const clientSecret = process.env.TWITCH_CLIENT_SECRET;
const channelName = 'thegrover_';

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    next();
});

app.get('/isTheGroverLive', async (req, res) => {
    try {
        console.log(clientId, clientSecret, channelName)
        const authUrl = `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`;
        const authResponse = await fetch(authUrl, { method: 'POST' });
        const authData = await authResponse.json();

        const accessToken = authData.access_token;
        const apiUrl = `https://api.twitch.tv/helix/streams?user_login=${channelName}`;
        const requestOptions = {
            method: 'GET',
            headers: {
                'Client-ID': clientId,
                'Authorization': `Bearer ${accessToken}`,
            },
        };

        const streamResponse = await fetch(apiUrl, requestOptions);
        const streamData = await streamResponse.json();

        console.log('streamData :', streamData);

        if (streamData.data && streamData.data.length > 0) {
            res.json({ isLive: true });
        } else {
            res.json({ isLive: false });
        }
    } catch (error) {
        console.error('Erreur lors de la vérification du statut en direct :', error);
        res.status(500).json({ error: 'Une erreur s\'est produite lors de la vérification du statut en direct.' });
    }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`L'API est en cours d'exécution sur le port ${port}`);
});
