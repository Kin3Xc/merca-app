import {Injectable} from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/database';

@Injectable()
export class FirebaseService{
    public firebaseConfig: any = {
        apiKey: "AIzaSyBQk8q5UQWd9DudsitgVgGT6EqWzCGW-b4",
        authDomain: "merca-bf260.firebaseapp.com",
        databaseURL: "https://merca-bf260.firebaseio.com",
        projectId: "merca-bf260",
        storageBucket: "merca-bf260.appspot.com",
        messagingSenderId: "5937485844",
        appId: "1:5937485844:web:5147423cec4f3e76"
    };

    constructor(){
        firebase.initializeApp(this.firebaseConfig);
    }

    public saveToken(token) {
        firebase.database().ref('devices').set({ token });
    }

}