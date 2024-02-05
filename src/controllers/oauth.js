import {google} from 'googleapis';
import axios from 'axios';
import express from 'express';
import open, {openApp, apps} from 'open';


const app = express();
var data = {"installed":{"client_id":"292514726084-9058iaee5fpttgk21mik1p2mta44n3gf.apps.googleusercontent.com","project_id":"gmail-api-412303","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_secret":"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","redirect_uris":["http://localhost:1729"]}}

const oauth2Client = new google.auth.OAuth2(
  data['installed']['client_id'],
  data['installed']['client_secret'],
  data['installed']['redirect_uris'],
);

const scopes = [
  'https://mail.google.com/',
  'https://www.googleapis.com/auth/gmail.compose',
  'https://www.googleapis.com/auth/gmail.modify',
  'https://www.googleapis.com/auth/gmail.readonly'
];

var access_token;
var server;

function access_token_(code){

    oauth2Client.getToken(code, async function (err, tokens) {
        access_token = tokens['access_token'];
    });

}

async function get_access_token(){

    const url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes
      });

    console.log(url);

    open(url);

    var code;
      
    server = app.listen(1729, () => {
        console.log("server running.. on 1729");
    });

    app.get('/',  async (req, res) => {
        code = req.query.code;
        res.send(code);
    });

    return code;
} 

// async function api(token){
//     console.log('api');
//     const response = await axios.get(
//         'https://gmail.googleapis.com/gmail/v1/users/mohammedjavidhedu@gmail.com/messages',
//         {
//             headers: {
//                 authorization : "Bearer "+token,
//             }
//         }
//     );
//     console.log(response.data);
// }

console.log(await get_access_token());
// server.close();