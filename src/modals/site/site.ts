import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ModalSite page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'modal-site',
  templateUrl: 'site.html',
})
export class ModalSite {
  public data:string;
  public pet: string = "menu";


  constructor(private navParams: NavParams, private view: ViewController) {

  }

  ionViewWillLoad() {
    this.data = this.navParams.get('data');
    
  }

  closeModal(){
  	this.view.dismiss();
  }

}
