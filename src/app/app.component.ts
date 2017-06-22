import { Component } from '@angular/core';
import { Platform, Config } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MenuPage } from '../pages/menu/menu';

import { TranslateService } from '@ngx-translate/core'
import { Util } from '../providers/providers';
import { WelcomePage } from '../pages/welcome/welcome';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import {TutorialPage} from "../pages/tutorial/tutorial";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
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
  ) {

    this.platform.ready().then(() => {
      if (this.platform.is('cordova')) {
        this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
      }
      console.log("device ready");
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
          console.log("Iniciando GA");
        })
        .catch(e => console.log('Error starting GoogleAnalytics', e));

    });

    // this.initTranslate();
    // let self = this;
    // if (this.util.getPreference(this.util.constants.logged)) {
    //   self.rootPage = MenuPage;
    // }else{
    //   self.rootPage = WelcomePage;
    // }
  }

  ionViewDidLoad() {

    // this.platform.ready().then(() => {
    //   console.log("device ready");
    //   this.statusBar.styleDefault();
    //   this.splashScreen.hide();
    //   this.ga.startTrackerWithId('UA-101368936-1')
    //     .then(() => {
    //     console.log("Iniciando GA");
    //     })
    //     .catch(e => console.log('Error starting GoogleAnalytics', e));
    //
    // });
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('es');
    if (this.translate.getBrowserLang() !== undefined) {
      this.translate.use(this.translate.getBrowserLang());
    } else {
      this.translate.use('es'); // Set your language here
    }

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }
}
