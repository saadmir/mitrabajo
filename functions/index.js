const Nexmo = require('nexmo');

const nexmo = new Nexmo({
    apiKey: '94ecf98f',
    apiSecret: '7af7b87cb1b48ee0'
});

module.exports = function (context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');
  context.log('> > > [index.js:10]', req.query.name);
  context.log('> > > [index.js:11]', (req.body || {}).name || '');

  if (req.query.name || (req.body && req.body.name)) {
    const name = req.query.name || req.body.name;
    nexmo.message.sendSms('saad', '14153356477', `wassup ${name}`, function() {
      context.log('> > > [index.js:14] sensSms');
      context.log('> > > [index.js:15] sensSms', arguments);
      context.res = {
            // status: 200, /* Defaults to 200 */
            body: "Hello Hello " + name
      };
      context.done();
    });
  } else {
    context.res = {
            status: 400,
            body: "Please pass a name on the query string or in the request body"
        };
    context.done();
  }
};