import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';

/**
 * Generated class for the ModalMas page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'modal-mas',
  templateUrl: 'mas.html',
})
export class ModalMas {
  public name:string;
  
  constructor(private view: ViewController) {
  }

  ionViewWillLoad() {
    
  }

  closeModal(){
  	this.view.dismiss();
  }

}
