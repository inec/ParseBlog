var dotenv = require('dotenv');
dotenv.load();

var sendgrid_username   = process.env.SENDGRID_USERNAME;
var sendgrid_password   = process.env.SENDGRID_PASSWORD;
var to                  = process.env.TO;

var sendgrid   = require('sendgrid')(sendgrid_username, sendgrid_password);
var email      = new sendgrid.Email();

email.addTo(to);
email.setFrom("yl+a@happysavings.ca");
email.setSubject('[sendgrid-php-example] Owl');
email.setText('i am?');
email.setHtml('<strong>%how% are you doing?</strong>');
email.addSubstitution("%how%", "Owl");
email.addHeader('X-Sent-Using', 'SendGrid-API');
email.addHeader('X-Transport', 'web');


sendgrid.send(email, function(err, json) {
  if (err) { return console.error(err); }
  console.log(json);
});
