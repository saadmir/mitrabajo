const Nexmo = require('nexmo');

const nexmo = new Nexmo({
    apiKey: '94ecf98f',
    apiSecret: '7af7b87cb1b48ee0'
});

module.exports = function (context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');

  if (req.query.name || (req.body && req.body.name)) {
    const name = req.query.name || req.body.name;
    nexmo.message.sendSms('saad', '4153356477', `wassup ${name}`, {}, function() {
      console.log('> > > [index.js:25]', 'sensSms', arguments);
      context.res = {
            // status: 200, /* Defaults to 200 */
            body: "Hello There " + name
      };
    });
  } else {
    context.res = {
            status: 400,
            body: "Please pass a name on the query string or in the request body"
        };
  }
  context.done();
};