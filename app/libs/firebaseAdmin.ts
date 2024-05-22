// firebaseAdmin.ts

import * as admin from 'firebase-admin';

const serviceAccount = require('./path/to/serviceAccountKey.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  });
}

const firebaseAdmin = admin;

export default firebaseAdmin;
