import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';

/**
 * Generated class for the ModalCliente page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'modal-opciones',
  templateUrl: 'opciones.html',
})
export class ModalOpciones {

  public pet: string = "filter";

  constructor( private view: ViewController) {

  }

  ionViewWillLoad() {
    
  }

  closeModal(){
  	this.view.dismiss();
  }

}
