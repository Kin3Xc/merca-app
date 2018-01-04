import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';


/**
 * Generated class for the ModalLogin page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'modal-login',
  templateUrl: 'login.html',
})
export class ModalLogin {

  public userProfile:any = null;
  public user:any = null;

  constructor( private view: ViewController,
               private afAuth: AngularFireAuth) {

    // afAuth.authState.subscribe(user => {
    //   if (!user) {
    //     this.userProfile = null;        
    //     return;
    //   }
    //   this.userProfile = user;      
    // });

    firebase.auth().onAuthStateChanged( user => {
    if (user) {
      console.log(user);
      this.userProfile = user;
    } else {
      console.log("There's no user here");
    }
  });

  }

  ionViewWillLoad() {
    
  }

  // signin with google
  signInWithGoogle(){
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithRedirect(provider).then( () => {
      firebase.auth().getRedirectResult().then( result => {
        if (result.credential) {
          // This gives you a Google Access Token.
          // You can use it to access the Google API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          this.user = result.user;
          console.log(token, this.user);
        }
      }).catch(function(error) {
        // Handle Errors here.
        console.log(error.message);
      });
    });
  }


  // signin with facebook
  signInWithFacebook() {
    this.afAuth.auth
      .signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then(res => console.log(res));
  }


  closeModal(){
    console.log('Close modal');
  	this.view.dismiss();
  }

  // signout
  signOut() {
    this.afAuth.auth.signOut();
  }

}
