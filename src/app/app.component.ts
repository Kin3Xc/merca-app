import { Component } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { DeviceService } from '../services/devices';

// Implementamos la librería de notificaciones Push.
import { Push, PushObject, PushOptions } from '@ionic-native/push';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(
    private platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private alertCtrl: AlertController,
    private device: DeviceService,
    private push: Push) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      // Llamada a la función push.
      this.pushSetup();
    });
  }
  presentAlert(data) {
    let alert = this.alertCtrl.create({
      title: data.title,
      subTitle: data.message,
      buttons: ['OK']
    });
    alert.present();
  }
  pushSetup(){
    const options: PushOptions = {
      android: {
        // Añadimos el sender ID para Android.
        senderID: '5937485844'
      },
      ios: {
        alert: 'true',
        badge: true,
        sound: 'false'
      }
   };
   
   const pushObject: PushObject = this.push.init(options);

   pushObject.on('notification').subscribe((notification: any) => {
    this.presentAlert(notification);
   });
   
   pushObject.on('registration').subscribe((registration: any) => {
    localStorage.setItem('deviceToken', registration.registrationId);
    this.device.saveToken({
      uid: registration.registrationId,
      platform: 'android',//this.platform.platforms,
      token: registration,
      type: 'user'
    }).then(res => {});
   });

   pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));

 }
}
