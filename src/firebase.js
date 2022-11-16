require("dotenv").config();
const { initializeApp, applicationDefault } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const {getStorage, ref} = require("firebase-admin/storage");

const app = initializeApp({
  credential: applicationDefault(),
  storageBucket : 'gs://logintest-30155.appspot.com'
});

const db = getFirestore();
const storage = getStorage(app).bucket()

module.exports = {
  db,
  storage
};