const express = require('express');
const axios = require('axios');

var {google} = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
    YOUR_CLIENT_ID,
    YOUR_CLIENT_SECRET,
    YOUR_REDIRECT_URL
  );

const app = express();


var data = {"client_id":"292514726084-9058iaee5fpttgk21mik1p2mta44n3gf.apps.googleusercontent.com","project_id":"gmail-api-412303","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_secret":"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","redirect_uris":["http://localhost:1729/"]};


async function getOAuth (code){
    try{
        const resp = await axios.get(
            "http://oauth2.googleapis.com/token", 
            {
                code,
                client_id : data['client_id'],
                client_secret : data['client_secret'],
                redirect_uri : data['redirect_uris'][0],
                grant_typr: "authorization_code",
            },
        );
        console.log(resp.data);
    }catch(err){
        console.log(err);
    }   
}

app.listen(1729, () => {
    console.log("server running.. on 1729");
});

app.get('/', (req, res) => {
    // console.log(req.query.code);
    const code = req.query.code;
    console.log(code);
    // getOAuth(code);

    oauth2Client.getToken(code, function (err, tokens) {
        console.log(tokens);
    });
    
    
    res.send(code);
})