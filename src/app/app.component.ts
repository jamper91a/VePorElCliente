import {Component, ViewChild} from '@angular/core';
import {Platform, Config, Nav, AlertController} from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MenuPage } from '../pages/menu/menu';

import { TranslateService } from '@ngx-translate/core'
import { Util } from '../providers/providers';
import { WelcomePage } from '../pages/welcome/welcome';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import {TutorialPage} from "../pages/tutorial/tutorial";
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import {VePorEl} from "../providers/veporel";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  private rootPage:any;

  constructor(
    private translate: TranslateService,
    private platform: Platform,
    private config: Config,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private util: Util,
    private ga: GoogleAnalytics,
    private screenOrientation: ScreenOrientation,
    public alertCtrl: AlertController,
    public push: Push,
    public veporel: VePorEl
  ) {

    this.platform.ready().then(() => {
      if (this.platform.is('cordova')) {
        this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
      }
      this.initTranslate();
      let self = this;
      if (this.util.getPreference(this.util.constants.logged)) {
        self.rootPage = MenuPage;
      }else{
        if(!this.util.getPreference(this.util.constants.tutorial))
          self.rootPage = TutorialPage;
        else
          self.rootPage = WelcomePage;
      }
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.ga.startTrackerWithId('UA-101368936-1')
        .then(() => {
        })
        .catch(e => console.log('Error starting GoogleAnalytics', e));
      this.initPushNotification();
    });
  }

  ionViewDidLoad() {
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('es');
    if (this.translate.getBrowserLang() !== undefined) {
      this.translate.use(this.translate.getBrowserLang());
    } else {
      this.translate.use('es'); // Set your language here
    }

    this.translate.get(['BACK_BUTTON_TEXT', 'obteniendo_tu_ubicacion']).subscribe(values => {
      console.log(values);
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }
  initPushNotification() {
    let self = this;
    this.push.hasPermission()
      .then((res: any) => {

        if (res.isEnabled) {
          console.log('We have permission to send push notifications');
        } else {
          console.log('We do not have permission to send push notifications');
        }

      });

// to initialize push notifications
    let topics = [];
    try{
      topics = JSON.parse(this.util.getPreference(this.util.constants.topics));
      if(topics==null)
        topics=[];
    }catch(e){

    }

    let aux_topic = topics.map((a) =>  {return  self.util.removeDiacritics(a.name)});
    const options: any = {
      android: {
        sound: true,
        vibrate: true
      },
      ios: {
        alert: true,
        badge: true,
        sound: 'false'
      },
      windows: {},
      browser: {
        pushServiceURL: 'http://push.api.phonegap.com/v1/push'
      }
    };

    const pushObject: PushObject = this.push.init(options);

    pushObject.on('notification').subscribe((data: any) => {
      console.log('message -> ' + data.message);
      //if user using app and push notification comes
      if (data.additionalData.foreground) {

      } else {
        //if user NOT using app and push notification comes
        //TODO: Your logic on click of push notification directly
        this.nav.push(MenuPage, { message: data.message });
      }

    });

    pushObject.on('registration').subscribe((registration: any) => {
      console.log('Device registered', registration)
      self.util.savePreference(self.util.constants.push_code, registration.registrationId);
    });

    pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));


  }
}
