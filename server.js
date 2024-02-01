const express = require('express');
const axios = require('axios');

var {google} = require('googleapis');

var data = {"client_id":"292514726084-9058iaee5fpttgk21mik1p2mta44n3gf.apps.googleusercontent.com","project_id":"gmail-api-412303","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_secret":"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","redirect_uris":["http://localhost:1729/"]};

const oauth2Client = new google.auth.OAuth2(
    data['client_id'],
    data['client_secret'],
    'http://localhost:1729/',
  );

const app = express();

async function api(token){
    console.log('api');
    const response = await axios.get(
        'https://gmail.googleapis.com/gmail/v1/users/mohammedjavidhedu@gmail.com/profile',
        {
            headers: {
                authorization : "Bearer "+token,
            }
        }
    );
    console.log(response.data);
    
}

app.listen(1729, () => {
    console.log("server running.. on 1729");
});

app.get('/', (req, res) => {
    const code = req.query.code;
    // console.log(code);

    var access_token;

    oauth2Client.getToken(code, function (err, tokens) {
        access_token = tokens['access_token'];
        // console.log(access_token); 
        api(access_token);
    });

    res.send(code);
})

