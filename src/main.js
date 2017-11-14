// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import firebase from 'firebase';

Vue.config.productionTip = false;

// eslint-disable-next-line no-undef
const FIREBASE_CONF = process.env.FIREBASE_CONF;

let app;

const config = {
  apiKey: FIREBASE_CONF.FIREBASE_API_KEY,
  authDomain: FIREBASE_CONF.FIREBASE_AUTH_DOMAIN,
  databaseURL: FIREBASE_CONF.FIREBASE_DATABASE_URL,
  projectId: FIREBASE_CONF.FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_CONF.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_CONF.FIREBASE_MESSAGE_SENDER_ID
};

firebase.initializeApp(config);
firebase.auth().onAuthStateChanged(() => {
  if (app) {
    return;
  }

  app = new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
  });
});