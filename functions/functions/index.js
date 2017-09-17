// const Nexmo = require('nexmo');
const functions = require('firebase-functions');

// database collections
//  available
//  logs
//  messages

// const nexmo = new Nexmo({
//   apiKey: '94ecf98f',
//   apiSecret: '7af7b87cb1b48ee0'
// });

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

function _makeAvailable(phone, location) {
  admin.database().ref(`/availables/${phone}`).set({
    isAvailable: true,
    timestamp: Date.now(),
    location: location || {}
  });
  // nexmo.message.sendSms('saad', phone, 'wassup', {}, function() {
  //   console.log('> > > [index.js:25]', 'sensSms', arguments);
  // });
}

function _makeUnavailable(phone) {
  admin.database().ref(`/availables/${phone}`).remove();
}

exports.makeAvailable = functions.https.onRequest((req, res) => {
  const data = req.query || {};
  console.log('> > > [index.js:11]', `${data.phone}/available`);
  admin.database().ref(`/availables_log`).push(data).then(
    (snapshot) => {
      _makeAvailable(data.phone, data.location || {});
      res.status(200).end();
    }
  );
});

exports.makeUnAvailable = functions.https.onRequest((req, res) => {
  const data = req.query || {};
  console.log('> > > [makeUnavailable]', `${data.phone}`);
  admin.database().ref(`/unavailables_log`).push(data).then(
    (snapshot) => {
      _makeUnavailable(data.phone);
      res.status(200).end();
    }
  );
});

// get list of available users
exports.getAvailables = functions.https.onRequest((req, res) => {
  // Grab the text parameter.
  const location = req.query.location || {};
  admin.database().ref(`/availables`).once('value').then(
    (availables) => {
      console.log('> > > [getAvailables]', JSON.stringify(availables.val(), false, 3));
      res.status(200).send(availables.val());
    }
  );
});

// msg from user to user
exports.sendMessage = functions.https.onRequest((req, res) => {
  // Grab the text parameter.
  const available = req.query;

  console.log('> > > [index.js:11]', `${req.msisdn}/available`);
  admin.database().ref(`/available/${req.query.msisdn}`).push(available).then(snapshot => {
    res.redirect(303, snapshot.ref);
  });
});

// rate a user
exports.addRating = functions.https.onRequest((req, res) => {
  // Grab the text parameter.
  const available = req.query;

  console.log('> > > [index.js:11]', `${req.msisdn}/available`);
  admin.database().ref(`/available/${req.query.msisdn}`).push(available).then(snapshot => {
    res.redirect(303, snapshot.ref);
  });
});
