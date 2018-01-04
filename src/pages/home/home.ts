import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public modal: ModalController) {}

  // open a new site 
  openModalSite(){
  	const site = this.modal.create('ModalSite');

  	site.present();
  }


  // open login modal 
  openModalLogin(){
  	const site = this.modal.create('ModalLogin');

  	site.present();
  }
  

}
