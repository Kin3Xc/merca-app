import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
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

  constructor( private view: ViewController) {

  }

  ionViewWillLoad() {
    
  }

  // signin with google
  signInWithGoogle(){
  }


  // signin with facebook
  signInWithFacebook() {
  }


  closeModal(){
  	this.view.dismiss();
  }

  // signout
  signOut() {

  }

}
