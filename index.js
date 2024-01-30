const {google} = require('googleapis');

var data = {"installed":{"client_id":"292514726084-rrkktbloshqkns97tki5qsuju84oab3m.apps.googleusercontent.com","project_id":"gmail-api-412303","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_secret":"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","redirect_uris":["http://localhost"]}};



const oauth2Client = new google.auth.OAuth2(
  data['installed']['client_id'],
  data['installed']['client_secret'],
  data['installed']['redirect_uris'],
);

// generate a url that asks permissions for Blogger and Google Calendar scopes
const scopes = [
  'https://www.googleapis.com/auth/blogger',
  'https://www.googleapis.com/auth/calendar'
];

const url = oauth2Client.generateAuthUrl({
  // 'online' (default) or 'offline' (gets refresh_token)
  access_type: 'offline',

  // If you only need one scope you can pass it as a string
  scope: scopes
});

console.log(url);

// This will provide an object with the access_token and refresh_token.
// // Save these somewhere safe so they can be used at a later time.
// const {tokens} = await oauth2Client.getToken(code);
// oauth2Client.setCredentials(tokens);
