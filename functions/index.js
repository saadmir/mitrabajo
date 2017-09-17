const Nexmo = require('nexmo');

const nexmo = new Nexmo({
    apiKey: '94ecf98f',
    apiSecret: '7af7b87cb1b48ee0'
});

const admin = require("firebase-admin");

const serviceAccount = require("./firebase.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://mitrabajo-us.firebaseio.com"
});

module.exports.makeAvailable = function (context, req) {
  context.log('> > > [index.js:18]', req.query || '');
  context.log('> > > [index.js:19]', req.body || {});

  const data = req.body || {};
  console.log('> > > [index.js:11]', `${data.msisdn}/available`);
  admin.database().ref(`/availables_log`).push(data).then(
    (snapshot) => {
      context.log('> > > [firebase]');
      _makeAvailable(data.msisdn, data.location || {});
      // nexmo.message.sendSms('12016728774', '14153356477', `wassup ${data.msisdn}`, function() {
      //   context.res = {
      //     // status: 200, /* Defaults to 200 */
      //     body: "Hello Hello " + name
      //   };
      //   context.done();
      // // context.res.redirect(303, snapshot.ref);
      // });
    }
  );
};

function _makeAvailable(phone, location) {
  admin.database().ref(`/availables/${phone}`).set({
    isAvailable: true,
    timestamp: Date.now(),
    location: location || {}
  });
}

function _makeUnavailable(phone) {
  admin.database().ref(`/availables/${phone}`).remove();
}

// exports.makeAvailable = functions.https.onRequest((req, res) => {
//   const data = req.query || {};
//   console.log('> > > [index.js:11]', `${req.msisdn}/available`);
//   admin.database().ref(`/availables_log`).push(data).then(
//     (snapshot) => {
//       _makeAvailable(data.msisdn, data.location || {});
//       res.redirect(303, snapshot.ref);
//     }
//   );
// });

// exports.makeUnAvailable = functions.https.onRequest((req, res) => {
//   const data = req.query || {};
//   console.log('> > > [makeUnavailable]', `${req.msisdn}`);
//   admin.database().ref(`/unavailables_log`).push(data).then(
//     (snapshot) => {
//       res.redirect(303, snapshot.ref);
//       _makeUnavailable(req.msisdn);
//     }
//   );
// });

// // get list of available users
// exports.getAvailables = functions.https.onRequest((req, res) => {
//   // Grab the text parameter.
//   const location = req.query.location || {};

//   console.log('> > > [getAvailables]', req.query);
// });

// // msg from user to user
// exports.sendMessage = functions.https.onRequest((req, res) => {
//   // Grab the text parameter.
//   const available = req.query;

//   console.log('> > > [index.js:11]', `${req.msisdn}/available`);
//   admin.database().ref(`/available/${req.query.msisdn}`).push(available).then(snapshot => {
//     res.redirect(303, snapshot.ref);
//   });
// });

// // rate a user
// exports.addRating = functions.https.onRequest((req, res) => {
//   // Grab the text parameter.
//   const available = req.query;

//   console.log('> > > [index.js:11]', `${req.msisdn}/available`);
//   admin.database().ref(`/available/${req.query.msisdn}`).push(available).then(snapshot => {
//     res.redirect(303, snapshot.ref);
//   });
// });
