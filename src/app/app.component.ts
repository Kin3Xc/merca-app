import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';

// Implementamos la librería de notificaciones Push.
import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
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

  pushSetup(){
    const options: PushOptions = {
       android: {
        // Añadimos el sender ID para Android.
        senderID: '5937485844'
       },
       ios: {
        alert: 'true',
        badge: true,
        sound: 'true'
       },
       browser: {
        pushServiceURL: 'http://push.api.phonegap.com/v1/push'
      }
    };
 
    const pushObject: PushObject = this.push.init(options);
 
    pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));
    pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));
    pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
  }
}
