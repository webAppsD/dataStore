import {config} from './config';
import firebase from 'firebase';

firebase.initializeApp(config);

export const auth = firebase.auth();

export const fireauth = firebase.auth;

export const firestore = firebase.firestore();

export const firebasestore = firebase.firestore;