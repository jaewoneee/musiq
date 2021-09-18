var express = require('express');
var SpotifyWebApi = require('spotify-web-api-node');
var SpotifyInfo = require('../spotify.json');
var router = express.Router();
var credentials = {
    clientId: SpotifyInfo.clientId,
    clientSecret: SpotifyInfo.clientSecret
};
var spotifyApi = new SpotifyWebApi(credentials);

router.get('/:id', function (req, res) {
    // let code = req.query['code'];
    // The code that's returned as a query parameter to the redirect URI
    // Retrieve an access token and a refresh token
    var id = req.params.id;
    console.log(id);
    spotifyApi.clientCredentialsGrant()
        .then(function (data) {
            console.log('The token expires in ' + data.body['expires_in']);
            console.log('The access token is ' + data.body['access_token']);


            // Set the access token on the API object to use it in later calls
            spotifyApi.setAccessToken(data.body['access_token']);
            // spotifyApi.setRefreshToken(data.body['refresh_token']);
            spotifyApi.searchTracks(id).then(
                function (data) {
                    console.log(data.body);
                    res.send(data.body);
                },
                function (err) {
                    console.log('Something went wrong!', err);
                }
            );
        })
        .catch(function (err) {
            console.log('Unfortunately, something has gone wrong.', err.message);
        });

});

module.exports = router;